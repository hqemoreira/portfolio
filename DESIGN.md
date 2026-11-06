---
name: Portfolio Hub
description: Personal hiring portfolio — person-first hero; proof under Work
colors:
  primary: "#F0E8D8"
  secondary: "#8A9AA8"
  tertiary: "#D4891E"
  ice: "#4FA8FF"
  neutral: "#07080D"
  arctic-paper: "#F2F5F8"
  arctic-ink: "#0A1018"
typography:
  h1:
    fontFamily: "Fraunces"
    fontSize: "clamp(48px, 10vw, 120px)"
    fontWeight: 200
    fontStyle: italic
  body-md:
    fontFamily: "Lora"
    fontSize: 1rem
    lineHeight: 1.75
  ui:
    fontFamily: "Syne"
  telemetry:
    fontFamily: "JetBrains Mono"
rounded:
  sm: 1px
  md: 2px
spacing:
  md: 16px
  lg: 32px
  xl: 64px
---

## Overview

**Personal portfolio for hiring / reskilling.** Brand name is the hero monument; value subline + dual CTAs; Why me; then Work with live case screenshots. Dark theater + Arctic-day light.

Competitor test: *On this page, Henrique Moreira’s portfolio reads as a person first, then tryable skill demos with evidence.*

## Colors

| Token | Dark | Arctic day (light) | Role |
|-------|------|--------------------|------|
| Neutral / stage | `#07080D` | `#F2F5F8` | Page foundation |
| Primary text | `#F0E8D8` | `#0A1018` | Monument ink |
| Body | `#CDC4B4` | `#243040` | Narrative |
| Secondary | `#9AABBA` | `#4A5A6A` | Quiet chrome |
| Quiet | `#9A8A6A` | `#5C6B7A` | Footnotes — contrast-safe |
| Brand amber | `#D4891E` | `#A66A14` | Brand, primary CTAs |
| Coat tan | `#A67C52` | — | Lycaon mid mottles (hero field) |
| Coat umber | `#5C3A1E` | — | Lycaon dark mottles (hero field) |
| Ice | `#4FA8FF` | `#1F73C7` | GRYPS Work card / instrument only — never hero field |
| Teal | `#1EC8A8` | `#178A74` | Triangora / Monopati accent |

## Atmosphere

Hero field = **Lycaon Pictus coat mottling** (`useConstellation`): irregular gold / tan / umber blotches + rare cream flecks; warm gold/tan links only. No cyan/ice dots in the floating field. Dark stage uses soft amber/umber radials (name sits in a warm pocket); ice blue reserved for the GRYPS Work block.

## Typography

- **Fraunces** — display monument (hero name, case titles). Weight 200 italic.
- **Lora** — body narrative.
- **Syne** — UI labels, CTAs (uppercase tracking).
- **JetBrains Mono** — telemetry, coords, status labels.

## Layout

Hero budget: brand (amber bloom on MOREIRA), one value subline, See GRYPS + Get in touch, quiet ask + non-commercial small print. No cards, no Signature panel in the first viewport.

Home order: Hero → Why me → Work (Monopati trust → GRYPS featured → Morea featured → also built) → Contact (Download CV + LinkedIn).

## Motion

Home budget: title entrance + fade-up + quiet Scroll hairline. Instrument boot only when GRYPS Work is in view. Honor `prefers-reduced-motion` (static scroll cue).

## Responsive

| Breakpoint | Width | Layout |
|------------|-------|--------|
| phone | &lt; 640 | Single column; full-width CTAs; safe-area insets |
| tablet | 640–1023 | Centered hero; stacked Work strips |
| desktop | ≥ 1024 | Centered hero max ~720px; Work max ~1040px |

Hook: `src/hooks/useBreakpoint.js`.

## Do's and Don'ts

- Do: person-first hero; Lycaon gold/brown coat field; GRYPS first under Work with live screenshots; Open prototype CTAs; non-commercial footnote; Download CV button
- Don't: ice/cyan particles in the hero field; Signature as hero object; FORGE login; commercial ban-list words; stack badge wall on home; purple SaaS glow kits; concept-art dashboards as product evidence

## Known Gaps

- No `/work/triangora` case page yet (live link only)
- Live Advisor remains on gryps.vercel.app
- OG image should stay 1200×630 amber monument card
