# Paper & Ponder — Design System

Paper & Ponder is **analogue journaling, brought into modern times.** The product pairs the somatic act of writing by hand — slowing down, feeling pen on paper — with the analysis and conversation of modern AI. You write in a physical journal (the flagship **Obsidian Journal**: 160pp, 120gsm dot-grid, charcoal linen, lay-flat), then the app captures the page, reads it, and talks with you about what you wrote. The point is *not* to digitise journaling. The point is to keep the hand-and-paper part sacred and let the AI sit alongside it, like a careful reader.

This pairing — **tactile + thoughtful, paper + machine, slow + responsive** — is the entire brand. It is what makes the visual world's contrast between **flowing handwritten script** (Dancing Script) and **machine-precise mono labels** (Space Mono) not a decorative choice but a *literal product statement*. The script is the page. The mono is the AI reading it back.

The signature visual move is pairing **a flowing handwritten script** ("Paper & Ponder" in Dancing Script) with **machine-precise mono labels** (Space Mono in wide-tracked uppercase) on a **warm clay-toned earth palette**. It walks the line between "wedding boutique" and "premium artisan goods" — and lands firmly in the latter by leaning earthy, never pink-romantic.

The brand is in **late-stage logo and palette development**. Version 1.1 of the brand book locked in:
- The **"Warm Clay"** palette (Deep Clay / Terracotta / Sand / Charcoal / Alabaster) as the canonical direction
- **Dancing Script** as the primary wordmark face
- **Montserrat (Light)** for body & UI structure
- **Space Mono (Bold)** for monogram-style labels, hex codes, eyebrows
- A flagship physical product: *The Obsidian Journal* — 160 pages, 120gsm dot-grid, charcoal linen, lay-flat
- A companion app that scans pages, transcribes handwriting, and holds a conversation with you about what you wrote

There is **no shipping codebase yet** — only the brand-development document and the product description above. This design system extrapolates both surfaces (the app and the marketing site for the physical journal) from that brand.

---

## Sources

| Source | Path | Notes |
|---|---|---|
| Brand book v1.1 ("Warm Clay") | `Paper & Ponder/Paper & Ponder Brand Development.html` (local mount, read-only) | Canonical reference for palette, typography, components, packaging examples. |
| Typography exploration (proposals 1–7) | `Paper & Ponder/Paper&Ponder.html` (local mount, read-only) | Historical — captures the full font/color decision journey ending in Warm Clay. |
| Logo SVG | `uploads/Logo.svg` → `assets/logo.svg` | Wordmark; rewritten with inline styles so it renders standalone. |
| Monogram SVG | `uploads/monogram.svg` → `assets/monogram.svg` | "P&P" seal mark; rewritten with inline styles. |

No live codebase, no Figma file, no production website. Everything below is derived from the brand book.

---

## Content Fundamentals

The voice is **the curator at an independent bookshop** — warm, observant, never breathless. Sentences are short and a little wistful. There is no "AI tone," no exclamation points, no startup-bro hype.

**Pronoun & POV.** Mostly second-person about the *object* ("Bound in charcoal linen. Lay-flat design for uninterrupted thought.") — describing the artifact, not selling at you. When addressed to the reader, it's "you," never "we" hand-wringing. Customer service may use first-person, but never marketing copy.

**Casing.** Three registers, used distinctly:
1. **Sentence case** — body copy, product names ("The Obsidian Journal"), descriptions.
2. **Wide-tracked UPPERCASE in Space Mono** — eyebrows, buttons, labels, badges, captions. This is the brand's signature texture move. Tracking is always `0.2em`–`0.3em`. Examples: `NEW ARRIVAL`, `HANDBOUND IN THE UK`, `ADD TO CART`, `ARCHIVAL QUALITY`, `NO. 04 | A5 SIZE`.
3. **Numerals + ampersand in mono** — invoice numbers, edition numbers, hex codes. `No. 04`, `A5 Size`, `#7c2d12`.

**Tone words to use.** *Hand-stitched. Archival. Lay-flat. Tactile. Considered. Bound. Stitched. Stocked. Lined. Dot-grid. Heritage.*

**Tone words to avoid.** *Curated* (overused), *bespoke* (cliché), *artisanal* (overused), *delight*, *unleash*, *power up*, *journey* (the noun, in marketing sense). Never use the words "minimalist" or "aesthetic" — show, don't claim.

**Emoji.** Never. Not in marketing, not in product copy, not in error states. The brand uses **typographic ornaments and dashes** instead — `|`, `—`, `&`, `·`.

**Numbered sections.** The brand book numbers sections `01. Typography`, `02. Logo Marks & Usage`, `03. The Clay Palette`. Use this pattern in editorial layouts, table-of-contents pages, and product detail tabs. Zero-padded.

**Microcopy examples (real, from brand book):**
- Section heading: *"03. The Clay Palette"*
- Product card: *"160 pages of 120gsm dot-grid paper. Bound in charcoal linen. Lay-flat design for uninterrupted thought."*
- Curator's note: *"The Obsidian Journal features hand-stitched binding that requires gentle break-in over the first week of use."*
- Edition label: *"No. 04 | A5 Size"*
- Package mark: *"Handbound in the UK · Archival Quality"*
- Footer line: *"Don't mess this up."* (the brand book's own footer — quiet, deadpan, internal-feeling. Keep this energy.)

**Taglines.** The brand book floated *"Let the paper ponder with you"* during exploration but **dropped it** in the Warm-Clay v1.1 lockup. Treat that line as a discarded draft, not canon. Until the brand commits to a tagline, **ship layouts without one** — the wordmark stands alone.

**Buttons.** Always wide-tracked uppercase, never sentence case. `ADD TO CART`, `NIGHT MODE`, `READ THE STORY`.

---

## Visual Foundations

The visual world is **warm, dry, and considered.** Everything should feel like it was photographed on a cloudy afternoon in a stone-walled studio — never glossy, never neon, never gradient-y.

### Color

Five hero colors, used in *strict proportion*: **Alabaster ~60% / Sand ~25% / Charcoal ~10% / Deep Clay ~5%** plus Terracotta as the live accent. Backgrounds dominate. Type grounds. Clay punches. See `colors_and_type.css` for tokens and `preview/color-*.html` for swatches.

| Token | Hex | Role |
|---|---|---|
| `--pp-alabaster` | `#fafaf9` | Page background (light) |
| `--pp-sand` | `#ffedd5` | Warm surface, kraft-paper panels |
| `--pp-sand-soft` | `#fff7ed` | Subtle tint (60%-ish of sand) |
| `--pp-deep-clay` | `#7c2d12` | Primary brand color, headlines, CTAs |
| `--pp-terracotta` | `#fb923c` | Live accent — ampersand, hover, focus |
| `--pp-charcoal` | `#1c1917` | Body type, dark surface |
| stone-50…900 | warm neutrals | Text + borders; never use cool gray |

**No cool gray, ever.** Borders are stone-200 (warm) or `#fde4c4` (orange-tinted). If something looks Apple-gray, replace it.

### Type

Three families, three different jobs — they do not overlap.

- **Dancing Script** — wordmark only. The hero "Paper & Ponder" lockup. Avoid for body copy, avoid in UI chrome. One generous use per screen.
- **Montserrat** — everything readable. Body, headings, navigation, prices, product detail. Default weight is **300 (Light)** for headings, **400 (Regular)** for body, **500 (Medium)** for emphasis. Avoid weights ≥700 — too aggressive for the brand.
- **Space Mono Bold** — labels, eyebrows, badges, hex codes, button text, captions. Always uppercase, always wide-tracked. This is the brand's textural counterpoint to Dancing Script.

The visual signature is **the contrast** between flowing script + machine mono — never script + serif, never script + heavy sans.

### Backgrounds

- **Solid warm flats** are the default — Alabaster, Sand, or Sand-soft.
- **One bespoke pattern** exists: tiny terracotta dots on Sand-soft, ~20px grid, 40% opacity. Used sparingly behind the hero only. See `preview/visual-pattern.html`.
- **No gradients except one:** a single soft radial glow of Deep Clay at 20% opacity, blurred 40px, used on dark panels (the "Midnight" card style). Never use linear gradients. Never use bluish-purple anything.
- **Full-bleed photography** is reserved for product hero images, shot dark and moody on Charcoal-toned surfaces (think: leather journal on slate). Treat it like a still life.

### Animation & motion

Restrained and slow. The default easing is `cubic-bezier(0.16, 1, 0.3, 1)` — a calm `ease-out`. The default duration is **300ms**, with **500–700ms** for entrance choreography.

- **Hover on cards:** `box-shadow` deepens (`sm → md`), no transform, no scale.
- **Hover on hero wordmark:** `scale(1.02)` over 500ms. One percent visible — like leaning in.
- **Hover on product images:** the inner "book" lifts via `translate-y(-8px)`, the outer card stays still.
- **Entrance:** `fade-in-up` — `translateY(20px) → 0`, opacity 0 → 1, over 800ms ease-out, with **100ms stagger** between sibling sections.
- **No bounce, no spring, no rubber-banding.** Nothing should feel "playful" in the tech-startup sense.

### Hover & press states

- **Buttons (primary):** hover darkens — `deep-clay #7c2d12 → clay #9a3412`. No shadow change.
- **Buttons (outline):** hover fills the button — border color fills the background, text inverts.
- **Cards:** hover deepens shadow only.
- **Links / tertiary:** hover changes text from `stone-500` → `deep-clay` over 300ms, with an arrow icon nudging `translateX(4px)`.
- **Press state:** no scale-down. Pressed buttons get a 1px inner shadow and a slightly darker fill. No "bounce back."
- **Toggles:** the orange knob slides; no overshoot.

### Borders, shadows, corners

- **Borders** are always present on cards — 1px, warm-neutral (`stone-200` or `border-soft #efece8`).
- **Hairlines** for dividers — `stone-100` between sections, never thicker.
- **Shadows** are very soft and slightly warm — see `--shadow-sm/-md/-lg` in CSS. Never harsh Material elevations.
- **Inner shadows** appear on Sand panels and on the "proportions" color bar — they make surfaces feel embossed/recessed.
- **Corner radii:** `--r-md (12px)` is the daily default for buttons and inputs. **`--r-lg (16px)` and `--r-xl (24px)`** for cards. `--r-2xl (32px)` for the largest hero panels. **Pill (`9999px`)** for badges and toggle backgrounds.
- The brand does not use sharp 0px corners or 4px "system" radii anywhere.

### Spacing & layout

- **4px base scale** — see `--space-*` tokens. Common values: `16 / 24 / 32 / 48 / 64`.
- **Generous vertical rhythm** — sections are spaced `64–96px` apart, not `32px`. The brand sells *breathing room*.
- **Max content width:** ~1100px (`max-w-5xl` in the brand book). Hero sections may go full-bleed.
- **No fixed/sticky elements** in the brand book. Navigation is part of the page flow. The brand reads like a printed page, not an app shell.

### Transparency & blur

- **Translucent surfaces** at `alpha 0.3–0.5` exist on warm backgrounds (`bg-orange-50/30`) — they create depth without color shifts.
- **Backdrop-blur** is used very sparingly — only on the radial glow behind dark cards. Never use frosted-glass nav bars.

### Imagery

When real photography is used, it should be:
- **Warm-toned** (yellow/orange cast, not cool/blue).
- **Slightly desaturated** — never punchy.
- **Often dark** — products on Charcoal or near-black surfaces.
- **Tactile** — show paper grain, linen weave, wax seals, leather edges.
- **Never** white-cyc product shots. Never blueish lifestyle stock.

### Cards (the canonical container)

```
background: var(--surface)         /* white */
border: 1px solid var(--border-soft) /* #efece8 */
border-radius: var(--r-lg)         /* 16px */
box-shadow: var(--shadow-sm)
padding: 32px (24px on mobile)
```

Hover lifts shadow to `--shadow-md`. Internal layout uses an **eyebrow label** (`Space Mono uppercase`) in the top-left corner, often absolute-positioned to free up the content area.

---

## Iconography

The brand book uses **hand-picked inline SVG icons in a single, restrained style** — **stroke-based, 24×24, 2px stroke, rounded line caps**. They are not from a single named icon library; they are written by hand to match the brand. They look closest to **Heroicons (outline)** and **Lucide** — same stroke weight, same rounded joins.

Examples seen in the brand book:
- A **right-arrow** on the tertiary "Learn more" link (`M14 5l7 7m0 0l-7 7m7-7H3`)
- An **info circle** in the curator's-note alert (`M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z`)
- A **check** inside the checked checkbox (`M5 13l4 4L19 7`)

**Substitution policy.** Since the brand has no icon font of its own, this design system **standardizes on Lucide** (CDN: `https://unpkg.com/lucide@latest`) — it matches the stroke style exactly, is permissively licensed, and gives broad coverage without us inventing icons. **Heroicons (outline)** is the secondary acceptable choice. **Do not** mix in Font Awesome, Material Icons, Phosphor's "fill" variant, or anything with filled glyphs as the default.

Rules:
1. **Stroke weight 2px**, rounded caps & joins. Never use thicker than 2.5px.
2. **Color = currentColor** so icons inherit text color. Light Charcoal for body, Deep Clay inside the curator alert, Terracotta on the dark theme.
3. **Size 14px / 16px / 20px / 24px.** Inline-with-text uses 14 or 16. Standalone uses 20 or 24.
4. **No filled variants** as primary state. Filled checks (✓) appear *inside* a colored container (e.g. the Deep-Clay checkbox), which provides the fill — the icon itself is still a stroke.
5. **No emoji**, anywhere, ever.
6. **No flag, hamburger-line, or floppy-disk vintage icons.** The set should feel editorial, not Web-2.0.

Logos & marks (in `assets/`):
- `logo.svg` — primary wordmark, full-color, transparent background.
- `monogram.svg` — round "P & P" seal mark, for avatars / packaging spots / favicons.

---

## File Index

| Path | What |
|---|---|
| `README.md` | This file — brand context, content, visual foundations, iconography. |
| `SKILL.md` | Skill manifest for use as an Agent Skill in Claude Code. |
| `colors_and_type.css` | CSS variables for the full color, type, spacing, shadow, motion system. Import this from any HTML file. |
| `fonts/DancingScript-*.ttf` | Bundled brand fonts — Regular, Medium, SemiBold, Bold, Variable. |
| `assets/logo.svg` | Primary wordmark (Dancing Script "Paper & Ponder"). |
| `assets/monogram.svg` | Round P&P monogram seal. |
| `preview/*.html` | Small design-system cards (swatches, type specimens, components) for the Design System tab. ~700×<height> each. |
| `ui_kits/companion/` | The **Companion App** UI kit — Today / Capture / Entry / Library screens. `index.html` is the clickable demo. |
| `ui_kits/storefront/` | The **Storefront** UI kit — single-page marketing site for The Obsidian Journal. |

Slides are not included — the brand provided no deck template.

---

## Caveats & known gaps

- **No production codebase or Figma file.** Everything is extrapolated from the 2-file brand book. Treat the UI kit as a *proposed* application of the brand, not a recreation of an existing product.
- **Fonts**: Dancing Script is bundled locally (`fonts/DancingScript-*.ttf`). **Montserrat** and **Space Mono** are loaded from Google Fonts — no brand files have been uploaded for those yet. **If brand-canonical files exist for Montserrat or Space Mono, please upload them** and we'll swap the Google Fonts import for local `@font-face` declarations.
- **Icons are CDN-only (Lucide).** No custom icon font exists yet.
- **"Don't mess this up."** — the brand book footer. Take it seriously.
