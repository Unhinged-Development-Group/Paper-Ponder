# Storefront — UI Kit

A single-page marketing site for **The Obsidian Journal** + companion app. Built as a JSX recreation of the marketing surface the brand has not yet shipped.

## Sections (top to bottom)

| # | Component | Purpose |
|---|---|---|
| 00 | `Nav`           | Top navigation with wordmark, anchor links, and order CTA. |
| 01 | `Hero`          | Hero wordmark, value proposition (analogue + AI), dual CTA. Includes the brand's signature terracotta dot pattern. |
| 02 | `HowItWorks`    | Three-step practice: Write by hand → Capture the page → Sit with it. |
| 03 | `Product`       | The Obsidian Journal product card with charcoal "moody" hero image, full spec table, price + add-to-cart. |
| 04 | `Conversation`  | Dark-context section. Real bubble examples of the AI dialogue, plus the privacy posture ("end-to-end encrypted", "cancel by burning the journal"). |
| 05 | `Testimonials`  | Three quotes in script type. Edition number as social proof. |
| 06 | `Footer`        | Quiet footer ending on *"Don't mess this up."* — the brand-book's own internal-feeling sign-off. |

## Architecture

```
ui_kits/storefront/
├── index.html   — loads React, Babel, and site.jsx
├── site.css     — section / nav / button / typography
└── site.jsx     — all components, rendered top-to-bottom into #root
```

The whole site is a single JSX file because the components don't recur — this is a marketing surface, not an app shell. Pull components out into their own files only if a second page is added.

## Design notes

- The hero uses a **gigantic Dancing Script wordmark** (`clamp(80px, 12vw, 156px)`) on `--pp-sand-soft`, with the dot pattern at 32% opacity. This is the brand's defining hero treatment — keep it large, keep it centred.
- The **Product image** is a faux-photo: charcoal book on charcoal background with a debossed monogram. Replace with real photography as soon as it exists.
- The **Conversation section is dark-mode** mid-page, using the Charcoal / Sand / Terracotta combination. This is the brand's "Midnight" / "Dark Context" treatment from the brand book — it's the visual signature for talking about the AI side of the product.
- The footer's *"Don't mess this up."* line is **canon** — it's the brand book's own footer. Use it as a recurring self-aware brand voice signature.

## What's not in this kit

- Cart, checkout, account pages.
- Editorial / "Bindery notes" content pages.
- The companion-app surface lives in `ui_kits/companion/`.
