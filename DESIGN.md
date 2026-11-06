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

**Personal portfolio for hiring / reskilling.** Brand name is the hero monument; selected prototypes (GRYPS → Triangora → Morea) live below the fold under Work. The Resilience Signature demo appears only inside the GRYPS Work block — not beside the name. Dark theater + Arctic-day light.

Competitor test: *On this page, Henrique Moreira’s portfolio reads as a person first, then tryable skill demos.*

## Colors

| Token | Dark | Arctic day (light) | Role |
|-------|------|--------------------|------|
| Neutral / stage | `#07080D` | `#F2F5F8` | Page foundation |
| Primary text | `#F0E8D8` | `#0A1018` | Body / monument ink |
| Secondary | `#8A9AA8` | `#4A5A6A` | Quiet chrome |
| Brand amber | `#D4891E` | `#A66A14` | Brand, primary CTAs |
| Ice | `#4FA8FF` | `#1F73C7` | GRYPS accents only |
| Teal | `#1EC8A8` | `#178A74` | Triangora strip accent |

## Typography

- **Fraunces** — display monument (hero name, case titles). Weight 200 italic.
- **Lora** — body narrative.
- **Syne** — UI labels, CTAs (uppercase tracking).
- **JetBrains Mono** — telemetry, coords, status labels.

## Layout

Hero budget: brand, one support line, View work + contact CTA group. No cards, no Signature panel, no product demo in the first viewport.

Work: GRYPS featured (optional instrument under card) → Triangora strip → Morea strip → archives accordion.

## Motion

Home budget: title entrance + scroll reveal. Instrument boot only when GRYPS Work is in view. Honor `prefers-reduced-motion`.

## Responsive

| Breakpoint | Width | Layout |
|------------|-------|--------|
| phone | &lt; 640 | Single column; full-width CTAs; safe-area insets |
| tablet | 640–1023 | Centered hero; stacked Work strips |
| desktop | ≥ 1024 | Centered hero max ~720px; Work max ~1040px |

Hook: `src/hooks/useBreakpoint.js`.

## Do's and Don'ts

- Do: person-first hero; GRYPS first under Work; Open prototype CTAs; non-commercial footnote
- Don't: Signature as hero object; FORGE login; commercial ban-list words; stack badge wall on home

## Known Gaps

- No `/work/triangora` case page yet (live link only)
- Live Advisor remains on gryps.vercel.app
