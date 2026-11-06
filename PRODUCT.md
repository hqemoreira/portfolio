# Product brief — Portfolio hub

## Name

henriquemoreira.eu (portfolio)

## One-liner

Personal hiring / reskilling portfolio; **GRYPS** is the lead skill demo; **Triangora** then **Morea** are secondary non-commercial prototypes.

## Audience

Hiring evaluators and peers scanning skill demos (~60s path: Home → Work → GRYPS Advisor).

## Job to be done

Understand who Henrique is; reach Work; try GRYPS Signature; optionally browse Triangora / Morea; understand non-commercial posture.

## Surface types

- Marketing / landing: yes (Persuade — person-first hero)
- Case / Read: `/work/gryps`, `/work/morea`
- App screens: none (links out to prototypes)

## Constraints

- Stack: Vite + React 19 + React Router; inline styles (+ minimal global CSS)
- FORGE: list as private only — no public login
- Triangora: live Vercel link only; GitHub stays private while under development
- CTAs: **Open prototype** / **Generate a Resilience Signature** (GRYPS Work card only — not hero primary)
- Commercial status: non-commercial / reskilling (Finnish unemployment fund until further notice)

## Honesty

No SaaS, pricing, waitlists, or “production customer” claims. Seed/demo numbers are illustrative where noted on GRYPS.

## Success look

First viewport: **brand + transition + View work / contact** — no Signature instrument in the hero. Work order: GRYPS → Triangora → Morea → archives. Dark theater + Arctic-day light.

## Maintain (do not regress)

- **Person-first hero** — portfolio identity; proof lives under Work.
- **Lead with the system under Work** — GRYPS first; never a stack badge wall on the home hero.
- **Stack as case evidence** — on `/work/gryps` (and in GRYPS itself). Grow stack only by shipping into prototypes, then one honest line on the brief.
- **Stamps secondary** — SAP / Power BI / CRM / BW stay in the dossier, not the headline.
- **60s path** — Home → Work → try GRYPS Signature. Shared copy in `src/copy.js`.
- **Hub footer stack** — only technologies this repo uses (Vite · React · Router · Vercel).
