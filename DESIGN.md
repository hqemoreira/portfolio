---
name: Portfolio Hub — Resilience Instrument
description: Arctic/ops theater — brand monument + living Signature as the hero object
colors:
  primary: "#F0E8D8"
  secondary: "#8A9AA8"
  tertiary: "#D4891E"
  ice: "#4FA8FF"
  neutral: "#07080D"
  arctic-paper: "#F4F7FA"
  arctic-ink: "#0B1220"
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

**Resilience Instrument.** Nordic–Arctic connectivity resilience becomes a living Signature (score · grade · risk · ranked options). Brand name is the monument; particles are a sparse connectivity constellation; ice blue is reserved for the GRYPS instrument. Dark is primary theater; light is Arctic day — cold paper, not cream.

Competitor test: *On this page, Nordic–Arctic connectivity resilience becomes a living Signature instrument.*

## Colors

| Token | Dark | Arctic day (light) | Role |
|-------|------|--------------------|------|
| Neutral / stage | `#07080D` | `#F2F5F8` | Page foundation |
| Primary text | `#F0E8D8` | `#0A1018` | Body / monument ink |
| Secondary | `#8A9AA8` | `#4A5A6A` | Quiet chrome |
| Brand amber | `#D4891E` | `#A66A14` | Brand, CTAs secondary |
| Ice | `#4FA8FF` | `#1F73C7` | GRYPS instrument only |
| Teal pulse | `#1EC8A8` | `#178A74` | Secondary pulse only — scarce |

Accent scarcity: amber for brand; ice for GRYPS; no third accent competing in the hero.

## Typography

- **Fraunces** — display monument (hero name, case titles). Weight 200 italic.
- **Lora** — body narrative.
- **Syne** — UI labels, CTAs (uppercase tracking).
- **JetBrains Mono** — telemetry rails, coords, Model tags.

## Layout

Hero budget: brand + one support line + Signature instrument + one CTA group. No cards, no badge clusters, no geo grid in the first viewport.

Section max measure ~960px; case mission-brief may use wider ~1100px with sticky telemetry rail.

## Elevation & Depth

Flat planes + hairline borders. Instrument panel: ice border on near-black (`#0B0F17`). No multi-layer shadows; soft amber bloom on title entrance only.

## Shapes

Near-sharp: 1–2px radius. Pills avoided in hero; mono telemetry uses rectangles.

## Motion

Home budget: **3 intentional motions**

1. Title entrance (stagger / soft bloom)
2. Instrument boot (Path A compressed ~14–16s loop)
3. Scroll reveal / instrument presence into Work stage

`transform` / `opacity` only. Honor `prefers-reduced-motion` — static Signature still + CTAs. No scroll-video, no catalog effect spam.

## Components

- **SignatureInstrument** — hero (compact) and full variants; Path A golden freeze
- **Nav** — logo, Work / About / Contact, theme toggle
- **Telemetry rail** — case sticky meta
- **Archive strip** — accordion / mono list, not card grid
- CTAs: **Generate a Resilience Signature** / **Open prototype** only

## Do's and Don'ts

- Do: GRYPS first; ice reserved for instrument; Arctic-day light
- Don't: cream/terracotta; purple SaaS glow; neon terminal cosplay; FORGE login; commercial ban-list words; card spam in hero

## Responsive

| Breakpoint | Width | Layout |
|------------|-------|--------|
| phone | &lt; 640 | Single column; full-width CTAs; compact nav; safe-area insets |
| tablet | 640–1023 | Single column until 900; then two-col where space allows |
| desktop | ≥ 1024 | Brand + instrument side-by-side |

Hook: `src/hooks/useBreakpoint.js` (`phone` / `tablet` / `desktop` / `narrow`).

## Known Gaps

- Scroll “dock” morph hero→Work is CSS sticky/fade, not GSAP ScrollTrigger (upgrade only if needed)
- Live Advisor remains on gryps.vercel.app (iframe embed deferred for CSP/performance)
