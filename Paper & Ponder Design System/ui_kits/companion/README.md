# Companion App — UI Kit

A React+JSX recreation of the **Paper & Ponder companion app**. The app's job is to take a photo of a handwritten journal page, transcribe it, and hold a conversation about it. This kit covers the four primary screens.

## Screens

| Route | File | What |
|---|---|---|
| `today`   | `screens.jsx → TodayScreen`   | Landing. Today's prompt, latest pondering, open threads, monthly stats. |
| `capture` | `screens.jsx → CaptureScreen` | Camera viewfinder framing a journal page; live OCR preview alongside. |
| `entry`   | `screens.jsx → EntryScreen`   | A single entry: scanned page (left) + the AI conversation (right). |
| `library` | `screens.jsx → LibraryScreen` | Chronological list of past entries, grouped by month, filterable by thread. |

The chrome (sidebar + topbar) is in `app.jsx` and `sidebar.jsx`.

## Architecture

```
ui_kits/companion/
├── index.html       — loads React, Babel, and all .jsx files in order
├── app.css          — app-shell styles (rail, topbar, page, bubble, paper)
├── components.jsx   — Icon, Btn, Pill, Eyebrow, SectionHead, Bubble, PaperPage, Avatar, MonoSeal
├── sidebar.jsx      — left navigation rail
├── screens.jsx      — Today / Capture / Entry / Library screens
└── app.jsx          — top-level shell, routing state
```

All components export to `window.*` (Babel runs each `<script type="text/babel">` in its own scope, so cross-file usage requires globals).

## Design notes that matter

- The **paper surface** (`.paper`, `.paper--dotgrid`) renders dot-grid on a warm `#fbf5ea` ground. It's the literal centrepiece — never crop it small.
- **Caveat** (from Google Fonts) is used inside `.handwriting` as a stand-in for actual scanned handwriting. Replace with a real font upload or, ideally, with a real scan when one is available.
- The **AI's name** in the app is **"Ponder"** — never use "AI", "Claude", or any other system name in UI copy.
- The **sidebar brand mark** uses `<MonoSeal>` (round P&P seal) + a small Dancing Script wordmark — the same pairing as the brand book.
- Active rail items use `sand` background, not the primary brand color. Reserve Clay for actions, not selection.

## What's intentionally missing

- Settings, "The Journal" (account / merch) — routed but not screened. They fall back to `TodayScreen`.
- Authentication, onboarding, dark mode toggle — the `Night` button in the topbar is decorative.
- Real photo capture / file upload. The viewfinder is a static composition.

These are next-step screens, not gaps in the design system.
