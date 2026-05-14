---
name: paper-and-ponder-design
description: Use this skill to generate well-branded interfaces and assets for Paper & Ponder, either for production or throwaway prototypes/mocks/etc. Paper & Ponder is analogue journaling brought into modern times — pairing the somatic act of handwritten journalling with the analysis and conversation of modern AI. Contains essential design guidelines, the Warm Clay color palette, Dancing Script + Montserrat + Space Mono typography, brand fonts, logo/monogram assets, and ready-made UI kit components for both the marketing site and the companion app.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. The README covers brand context, content fundamentals (voice, casing, microcopy patterns, tagline policy), visual foundations (color proportions, type roles, motion, hover/press states, borders, shadows, imagery, radii, transparency), and iconography (Lucide / Heroicons outline stroke style, no emoji).

Key files:
- `README.md` — brand context, content + visual rules, file index, caveats
- `colors_and_type.css` — full token system (CSS variables for colors, type, spacing, shadows, radii, motion)
- `fonts/` — bundled Dancing Script `.ttf` files (Regular, Medium, SemiBold, Bold, Variable)
- `assets/logo.svg`, `assets/monogram.svg` — primary wordmark and round seal
- `preview/*.html` — small cards demonstrating every foundation and component
- `ui_kits/companion/` — JSX recreation of the companion app (Today / Capture / Entry / Library screens)
- `ui_kits/storefront/` — JSX recreation of the marketing site (hero, how it works, product, conversation, testimonials, footer)

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy the assets you need out of `assets/`, `fonts/`, and the UI kits, then assemble static HTML files for the user to view. Reuse `colors_and_type.css` as the single source of truth for tokens — never reinvent the palette inline.

If working on production code, copy the relevant components out of `ui_kits/*/` and read the rules in `README.md` to become an expert in designing with this brand. The companion app's `components.jsx`, `sidebar.jsx`, and `screens.jsx` are well-factored starting points.

If the user invokes this skill without any other guidance, ask them what they want to build or design — a marketing page, a companion-app screen, a slide deck, packaging, an editorial article — ask a few clarifying questions (audience, surface, length, whether they want a dark "Midnight" treatment or light "Warm Clay"), and act as an expert designer who outputs HTML artifacts or production code, depending on the need.

**Three rules that override everything:**
1. **No emoji, ever.** Use typographic separators (`|`, `—`, `&`, `·`) and Space Mono uppercase labels for visual texture instead.
2. **No taglines.** *"Let the paper ponder with you"* was floated in exploration and explicitly dropped. Until the brand commits to one, ship layouts without one.
3. **Three type families, three jobs.** Dancing Script = wordmark only. Montserrat = body / UI. Space Mono = uppercase labels / eyebrows / badges. They do not overlap.
