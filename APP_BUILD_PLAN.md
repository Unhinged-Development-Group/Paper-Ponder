# Paper & Ponder — Standalone App Build Plan

## Executive Summary

The current system is a clever automation hack: iOS Shortcuts + Google Drive + Claude Desktop's CoWork folder access, documented in a static web app. The goal is to replace this with a purpose-built mobile app that handles scanning, transcription, AI chat, memory capture, reporting, personas, and the prompt library natively — no shortcuts, no manual folder management, no third-party cobbling.

---

## Technology Stack

### Mobile App
**React Native + Expo**

The existing UI kit is already written in React JSX (`ui_kits/companion/`). React Native targets both iOS and Android from a single codebase. Expo reduces boilerplate and handles native module complexity (camera, document scanning, file system, notifications).

### Backend
**Supabase**

PostgreSQL database, file storage, authentication, and Edge Functions (serverless) in one platform. Generous free tier, predictable pricing, open-source so there's no vendor lock-in.

### AI
**Claude API (Anthropic)**

Already the core of the system. The persona definitions, prompt templates, reporting structure, and memory system are all Claude-native.

### OCR / Handwriting Recognition
**Hybrid: on-device first, cloud fallback**
- iOS: Apple Vision Framework (on-device, free, strong handwriting recognition)
- Android: Google ML Kit Text Recognition (on-device, free)
- Cloud fallback for low-confidence results: Google Cloud Vision API (handwriting model)

---

## System Architecture

```
┌─────────────────────────────────────────────────┐
│              React Native + Expo App             │
│                                                 │
│  ┌──────────┐  ┌────────┐  ┌─────────────────┐ │
│  │  Scanner │  │  Vault │  │  AI Chat        │ │
│  │  + OCR   │  │ Browser│  │  + Memory Events│ │
│  └──────────┘  └────────┘  └─────────────────┘ │
│                                                 │
│  ┌──────────┐  ┌────────┐  ┌─────────────────┐ │
│  │ Personas │  │ Prompt │  │  Reports        │ │
│  │  Panel   │  │Library │  │  Browser        │ │
│  └──────────┘  └────────┘  └─────────────────┘ │
└─────────────────┬───────────────────────────────┘
                  │ HTTPS
┌─────────────────▼───────────────────────────────┐
│                   Supabase                       │
│                                                 │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐ │
│  │  Auth    │  │ PostgreSQL  │  │  Storage    │ │
│  │  (JWT)   │  │            │  │  (md files) │ │
│  └──────────┘  └────────────┘  └─────────────┘ │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │          Edge Functions (Deno)           │   │
│  │  - Claude API proxy (chat, reports)      │   │
│  │  - Memory event detection + writing      │   │
│  │  - Weekly/monthly consolidation cron     │   │
│  │  - OCR cloud fallback                    │   │
│  └──────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│                External APIs                     │
│   Claude API  │  Google Cloud Vision (OCR)       │
└─────────────────────────────────────────────────┘
```

---

## Data Model

### File / Vault Structure

```
User Vault (Supabase Storage + PostgreSQL)
├── entries/
│   ├── 2025-05-12.md          ← daily transcription
│   ├── 2025-05-13.md
│   └── 2025-05-14.md
│       ↓ (end of week — files above deleted)
├── weeks/
│   └── 2025-W20.md            ← full verbatim concatenation of the week
│       ↓ (end of month — file above deleted)
├── months/
│   └── 2025-05.md             ← full verbatim concatenation of the month
│
├── reports/
│   ├── weekly/
│   │   └── report-2025-W20.md ← AI-generated analysis (separate from content)
│   └── monthly/
│       └── report-2025-05.md
│
└── core_memory.md             ← running profile, updated from chat memory events
```

**Consolidation rules:**
- End of each week: all daily `.md` files concatenated (in order) into `weeks/YYYY-Www.md`, daily files deleted
- End of each month: all weekly `.md` files concatenated into `months/YYYY-MM.md`, weekly files deleted
- AI reports are generated separately and never deleted (they are the analysis layer)
- Original scans (PDFs/images) are discarded immediately after transcription is confirmed by the user

### Database Schema (PostgreSQL)

| Table | Key Columns | Purpose |
|---|---|---|
| `users` | id, email, created_at, settings_json | User account + preferences |
| `entries` | id, user_id, period_type (day/week/month), period_key, content_md, word_count, created_at | All vault content |
| `threads` | id, user_id, name, description | Named threads grouping related entries |
| `entry_threads` | entry_id, thread_id | Many-to-many join |
| `reports` | id, user_id, type (weekly/monthly), period_key, content_md, created_at | AI-generated reports |
| `core_memory` | id, user_id, content_md, updated_at | Running psychological profile |
| `memory_events` | id, user_id, session_id, summary, category, source_message_id, created_at, status (pending/saved/dismissed) | Individual memory moments captured during chat |
| `chat_sessions` | id, user_id, context_type, context_ref, persona, started_at | AI conversations |
| `chat_messages` | id, session_id, role (user/assistant), content, created_at | Individual messages |

---

## Feature Breakdown

### 1. Scan New Entry

**What it does:** User taps the prominent scan button → native document scanner opens → they photograph their journal pages → a review screen shows the transcription → user confirms, and it is saved. The original scan is then discarded.

**How it works:**
- `react-native-document-scanner-plugin` wraps iOS VisionKit and Android's native document scanner
- On confirm: app runs on-device OCR (Apple Vision on iOS / Google ML Kit on Android)
- Confidence score returned — if below threshold (~80%), the image is sent to Google Cloud Vision API for a higher-accuracy pass
- Review screen: user sees the transcription, can make minor edits before saving
- On save: transcription stored as Markdown in Supabase (`entries` table + storage), scan image discarded
- Entry appears immediately in the vault

**Libraries:**
- `react-native-document-scanner-plugin`
- `@react-native-ml-kit/text-recognition` (Android)
- Apple Vision via Expo bare workflow (iOS)
- `@supabase/supabase-js` for upload

---

### 2. The Vault

**What it does:** Scrollable, searchable list of all content. Organised by day → week → month. Tap any entry to read it or start an AI conversation about it.

**Consolidation model (destructive combining):**

| Trigger | Action |
|---|---|
| End of week (Sunday night, scheduled) | Concatenate all daily `.md` files for the week into one `weeks/YYYY-Www.md`, delete the daily files |
| End of month (1st of month, scheduled) | Concatenate all weekly `.md` files for the month into one `months/YYYY-MM.md`, delete the weekly files |

Each consolidated file is the complete, verbatim content — nothing is summarised or lost. The AI reports are a separate layer.

**Vault features:**
- Full-text search across all content (PostgreSQL `tsvector` for fast search)
- Filter by thread, by date range, by persona used
- Tap any entry/week/month to read or open a chat

---

### 3. AI Chat

**What it does:** Conversational interface where the user selects a context and persona, then talks to Claude.

**Context options:**

| Option | What Claude receives |
|---|---|
| Specific entry | That day's transcription |
| A week | The weekly consolidated file |
| A month | The monthly consolidated file |
| General chat | Core Memory only — no journal text; open conversation about present emotions, events, or thoughts |

**How it works:**
- User selects context and persona before starting
- Each message goes to a Supabase Edge Function which calls the Claude API with:
  - System prompt: persona definition
  - Background context: Core Memory (prompt-cached — see cost notes)
  - Journal context: the selected entry/week/month text (if applicable)
  - Conversation history: last N turns
- Response streams back to the app in real time
- The Edge Function also runs memory event detection in parallel (see Memory Events section)

**Model:** `claude-sonnet-4-6` for all chat; `claude-haiku-4-5` for lightweight tasks (tagging, OCR post-processing).

**General chat** is useful for processing something in the moment that hasn't been written down yet, or for open conversation without anchoring to past entries. Core Memory still provides background context so Claude is never starting cold.

---

### 4. Memory Events During Chat

**What it does:** During any AI conversation, significant moments — breakthroughs, newly identified patterns, triggers, relational dynamics, stated intentions — are detected and offered to the user for saving to their Core Memory.

This keeps Core Memory alive and growing from conversation, not just from journal entries.

**Memory event types:**

| Category | Example |
|---|---|
| Pattern | "I always withdraw when I feel criticised, even when it's constructive" |
| Trigger | "Sunday evenings reliably produce dread — connected to the school week as a child" |
| Relational dynamic | "Interactions with [person] consistently leave me dysregulated for hours" |
| Coping mechanism | "Cold water on my face works. Breathing exercises don't — too much effort when flooded" |
| Breakthrough | "I realised I've been performing capability rather than actually feeling it" |
| Intention / goal | "I want to try one week of not checking my phone before 9am" |
| Somatic note | "Chest tightness appears before I consciously register anxiety" |
| Contradiction | "I say I don't care what my father thinks — my body clearly disagrees" |

**Detection mechanism:**

The Edge Function runs two Claude calls per assistant turn:
1. The main chat response (streamed to user)
2. A lightweight parallel call to `claude-haiku-4-5` that analyses the just-completed exchange (user message + assistant response) for memory-worthy content

The haiku call returns structured JSON:
```json
{
  "memory_event_detected": true,
  "category": "pattern",
  "summary": "Identifies withdrawal as default response to criticism, even when constructive",
  "confidence": 0.87
}
```

If `memory_event_detected` is true and confidence exceeds threshold (~0.75), a memory event record is saved to the `memory_events` table with `status: pending`.

**User experience — non-intrusive prompt:**

A small card surfaces at the bottom of the chat (above the input bar) immediately after the relevant exchange:

```
┌─────────────────────────────────────────────┐
│  Memory moment                              │
│  "Withdrawal as default response to         │
│   criticism — even when constructive"       │
│                          [ Dismiss ] [ Save ]│
└─────────────────────────────────────────────┘
```

- **Save:** The memory event is formatted by Claude and appended to `core_memory.md` with a timestamp and source tag (`via chat, 2025-05-14`). Status updated to `saved`.
- **Dismiss:** Status updated to `dismissed`. No further action.
- Card auto-dismisses after 30 seconds if ignored (treated as dismissed).

**Manual flagging:**

User can long-press any message bubble in chat to reveal a "Save to Memory" option. This triggers the same flow — Claude formats the flagged message into a memory event and presents the confirmation card.

**End-of-session summary:**

When a chat session is closed, if any memory events were saved during it, a brief summary card is shown:

```
Session summary — 2 memories saved
· Withdrawal pattern under criticism
· Sunday evening dread (childhood origin)
```

Tapping the card opens the Core Memory view.

**Core Memory view:**

A dedicated screen showing the full `core_memory.md` in readable format, with entries listed by date, category badge, and source (from journal / from chat). User can delete individual memory entries, but cannot bulk-clear (safeguard against accidental loss).

---

### 5. Weekly & Monthly Reports

**What it does:** Every Sunday and the 1st of each month, an AI-generated analysis report is automatically created and waiting for the user.

**How it works:**
- Supabase Edge Function scheduled via `pg_cron`
- Weekly report: reads the just-consolidated `weeks/YYYY-Www.md` + Core Memory → sends to Claude with the 5-section weekly report structure
- Monthly report: reads `months/YYYY-MM.md` + Core Memory → sends to Claude with the 5-section monthly structure
- Report saved to `reports` table
- Push notification sent: *"Your Weekly Report is ready."*
- User can open any report and start a chat about it (same AI chat interface, context = report)

**Weekly report structure** (Somatic Review · Relational Audit · Distortion Check · Grounding · Core Memory Updates)

**Monthly report structure** (Macro Themes · Interrogation · Trajectory · Space · Next Step)

These structures are unchanged from the current system.

---

### 6. Personas Panel

**What it does:** All 13 personas plus the Default State, presented as a selectable card grid. Each card shows the persona name, one-line description, and when to use it.

**How it works:**
- Persona selection is the first step before opening a chat
- All persona system prompts live server-side in the Edge Function — users never see or edit the raw prompts
- Persona can be switched between sessions; switching mid-session starts a new context window
- Last used persona is remembered per user

**The 13 Personas:**
The Researcher · The Observer · The Challenger · The Historian · The Strategist · The Somatic Guide · The Archivist · The Witness · The Boundary Auditor · The Grief Keeper · The Devil's Advocate · The Default State · The Cross-Dialogue

---

### 7. Prompt Library

**What it does:** A browsable collection of pre-written prompts using the C.P.T. structure (Context + Persona + Task), covering the 6 template families.

**Template families:** De-escalation · Pattern Breaking · Mechanics Analysis · Relational Mapping · Perspective Shift · Cross-Dialogue

**How it works:**
- Static content — no API call needed to display
- Tap any template → auto-populates the chat input, ready to send or edit
- Favourites saved locally via AsyncStorage
- Future v2: user-created custom prompts saved to Supabase

---

## Development Phases & Timeline

### Phase 1 — Foundation (Weeks 1–6)
- Expo project setup + Supabase project
- Authentication (email/password + Apple Sign-In + Google Sign-In)
- Design system translated to React Native components (full token set already exists in `colors_and_type.css`)
- Navigation structure (bottom tabs: Vault · Scan · Chat · Reports · Settings)
- Database schema + migrations

**Deliverable:** App launches, user can sign up/log in, sees empty vault.

---

### Phase 2 — Scanning & Vault (Weeks 7–12)
- Document scanner integration (iOS + Android)
- On-device OCR pipeline + cloud fallback
- Transcription review screen (user confirms before saving)
- Scan discarded on confirm — only `.md` stored
- Entry storage (Supabase DB)
- Vault list view + entry detail view
- Full-text search
- Thread tagging system
- End-of-week consolidation (scheduled Edge Function + manual trigger)
- End-of-month consolidation (scheduled Edge Function + manual trigger)

**Deliverable:** User can scan, confirm, browse, search, and see entries consolidate automatically.

---

### Phase 3 — AI Chat + Memory Events (Weeks 13–20)
- Supabase Edge Function: Claude API proxy with streaming
- Chat UI (message thread, streaming responses, persona header)
- Context selector (day / week / month / general chat)
- Persona selection screen
- Core Memory view (read + individual delete)
- Memory event detection (parallel haiku call per exchange)
- In-chat memory prompt card (Save / Dismiss)
- Manual long-press memory flagging
- End-of-session memory summary card
- Core Memory append pipeline (Claude formats → appended to `core_memory.md`)

**Deliverable:** Full AI conversations with live memory capture working end to end.

---

### Phase 4 — Reports (Weeks 21–24)
- pg_cron scheduled Edge Functions for weekly and monthly report generation
- Report generation (Claude API with existing 5-section structures)
- Push notifications (Expo Push Notifications)
- Reports browser UI
- AI chat about reports (same chat interface, context = report)

**Deliverable:** Reports auto-generate, notify the user, and are discussable.

---

### Phase 5 — Personas & Prompt Library (Weeks 25–27)
- Persona card grid UI (all 13 + default)
- All persona system prompts integrated server-side
- Prompt Library browsable UI with 6 families
- Tap-to-insert prompt functionality
- Favourites (AsyncStorage)

**Deliverable:** Full persona and prompt library feature complete.

---

### Phase 6 — Polish, Beta & Launch (Weeks 28–32)
- Performance optimisation (pagination, lazy loading)
- Offline support (local SQLite cache via `expo-sqlite` — vault readable without network)
- App Store submission (Apple review: 1–3 weeks)
- Google Play submission (review: 1–3 days)
- Beta testing (TestFlight + Firebase App Distribution)
- Privacy policy + terms of service
- GDPR data export tooling (full vault export as zip of `.md` files)

**Deliverable:** Live on both app stores.

### Total Timeline: ~8 months

---

## Cost Breakdown

### Development Costs

| Approach | Description | Estimated Cost |
|---|---|---|
| **AI-assisted solo dev** | One experienced developer using Claude Code throughout. Requires React Native + backend experience. | £28,000–50,000 |
| **Small agency / 2-person team** | 1 mobile dev + 1 backend dev. Faster, more parallel work. | £65,000–95,000 |
| **Design savings** | Full design system + companion UI kit already exists — no design phase required | ~£20,000–30,000 saved |

---

### Monthly Running Costs (Infrastructure)

| Service | Free Tier | At 500 Users | At 5,000 Users |
|---|---|---|---|
| **Supabase** | Free (500MB DB, 1GB storage, 50k MAU) | Pro: £20/mo | Pro: £20/mo + storage overage ~£5 |
| **Claude API** — Sonnet (chat + reports) | — | ~£45–110/mo | ~£450–1,100/mo |
| **Claude API** — Haiku (memory detection) | — | ~£5–15/mo | ~£50–150/mo |
| **Google Cloud Vision** (OCR fallback) | 1,000 units/mo free | ~£8–25/mo | ~£80–250/mo |
| **Expo Push Notifications** | Free | Free | Free |
| **Apple Developer** | — | £79/year | £79/year |
| **Google Play** | — | £20 one-time | £20 one-time |
| **Total (approximate)** | — | **~£80–170/mo** | **~£600–1,505/mo** |

**Prompt caching note:** Core Memory and persona system prompts are ideal candidates for Anthropic's prompt caching feature. These are injected into every chat call and rarely change — caching them reduces input token cost by ~75% on those cached sections. Real-world saving: 40–60% reduction in total Claude API spend for active users.

**Memory detection cost note:** Using `claude-haiku-4-5` for the parallel memory detection call (rather than Sonnet) keeps this overhead minimal — approximately £0.001–0.003 per chat exchange. At 500 active users sending 10 messages per session, twice per week: ~£5–15/month additional.

---

### Monetization Model

| Tier | Price | Limits |
|---|---|---|
| **Free** | £0/mo | 15 scans/month, basic chat (default persona only), no reports, no memory events |
| **Ponder** | £9.99/mo or £79.99/yr | Unlimited scans, all 13 personas, weekly reports, prompt library, memory events |
| **Ponder+** | £14.99/mo or £119.99/yr | Everything + monthly reports, Core Memory view, thread tracking, full vault export |

At 1,000 paying subscribers on the mid tier: ~£9,990/month gross. Infrastructure at that scale: ~£350–600/month. Strong unit economics.

---

## Key Technical Decisions

| Decision | Chosen | Alternative | Why |
|---|---|---|---|
| Cross-platform | React Native + Expo | Flutter | Existing JSX UI kit; JavaScript familiarity |
| Backend | Supabase | Firebase | Open source; SQL; no vendor lock-in |
| OCR | On-device + cloud fallback | Cloud-only | Privacy; works offline; cost |
| AI proxy | Claude API via Edge Functions | Direct from client | API key security; persona prompt protection |
| Auth | Supabase Auth (email + OAuth) | Custom auth | Built-in, secure, fast |
| Reports | Scheduled server-side (pg_cron) | Client-triggered | Runs even if user doesn't open the app |
| Memory detection | Parallel haiku call per exchange | Post-session analysis | Real-time feedback feels alive; post-session feels admin |
| Combining | Destructive consolidation (weekly → monthly) | Additive (keep all files) | Clean storage; simpler vault; no redundancy |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Handwriting OCR accuracy is poor | Medium | High | Multi-pass (on-device → cloud); user review/edit screen before saving |
| Memory event false positives feel intrusive | Medium | Medium | Confidence threshold (0.75+); card is subtle and auto-dismisses; easy to dismiss |
| Claude API costs spike with usage | Medium | High | Prompt caching; haiku for detection; usage caps per tier |
| App Store rejection (mental wellness category) | Low–Medium | High | Frame as journaling tool, not therapy; include disclaimer; review Apple's guidelines early |
| Users churn if reports feel generic | Medium | High | Core Memory personalisation is the differentiator — invest heavily in the memory pipeline |
| Data privacy concerns | Low | Very High | No raw scans retained; all data in user's own Supabase row; clear privacy policy; no AI training on user data |

---

## What Already Exists (Head Start)

| Asset | Status | Value |
|---|---|---|
| Complete design system (tokens, typography, colours) | Done | ~£8,000–12,000 saved |
| 13 persona definitions + system prompts | Done | ~£3,000–5,000 saved |
| Prompt library (C.P.T. + 6 families) | Done | ~£2,000–3,000 saved |
| Weekly/monthly report structures | Done | ~£2,000–3,000 saved |
| Companion app UI kit (4 screens, React JSX) | Done | ~£5,000–8,000 saved |
| Core product vision + validated workflow | Done | Priceless |

**Estimated head start value: ~£20,000–31,000**

---

## Recommended First Steps

1. **Supabase project setup** — 30 minutes, free tier, get schema in place
2. **Bootstrap Expo app** — 1 day, connect to Supabase, auth working end to end
3. **Prove the scan-to-text pipeline** — 1 week; validate OCR quality on real handwriting samples before committing to the architecture
4. **Build the chat + memory pipeline** — 1 week; Claude API Edge Function + streaming UI + haiku memory detection running in parallel
5. **Soft launch to waitlist** — TestFlight beta with 20–30 real users at Phase 3 complete; gather feedback before investing in reports and polish

---

*Last updated: May 2025*
