/** Locked hiring copy — keep Story / About / Contact in sync. Non-commercial only. */

export const HIRING_ONE_LINER =
  'Built GRYPS: open the Advisor, enter a remote site, get a Resilience Signature — live skill demo for Nordic / Arctic connectivity resilience (non-commercial research prototype).'

export const ROLE_FOCUS =
  'Open to opportunities where international B2B and industrial business experience can shape applied AI, digital transformation and intelligent systems — Finland and the EU.'

export const HERO_IDENTITY_PRIMARY = 'International B2B & Industrial Business Professional'

export const HERO_IDENTITY_SECONDARY = 'Applied AI · Digital Transformation · Systems Thinking'

export const HERO_SUBLINE =
  '18 years of international B2B experience. Evolving that expertise through AI and intelligent systems.'

export const HERO_SUPPORT =
  'Combining commercial and operational understanding with technology to turn business challenges into practical solutions.'

export const HERO_ASK = ROLE_FOCUS

export const HERO_LOCATION = 'Espoo, Finland · International perspective'

export const GRYPS_PRIMARY_CTA = 'Explore the GRYPS prototype'

/** About — two paragraphs + evolution tag. Homepage skim. */
export const ABOUT_HEADLINE = 'Business experience meets applied AI.'

export const ABOUT_PARAS = [
  'With 18 years in international industrial B2B environments, I bring extensive experience in commercial operations, sales, bidding, international account management and business development.',
  'My approach starts with understanding people, processes and business objectives. I am building on that foundation through applied AI, automation and digital product development — exploring how technology can solve practical business challenges and improve how organisations work.',
]

export const ABOUT_TAG =
  'Evolution, not reinvention: bringing established business expertise into an increasingly AI-driven world.'

/** Capabilities — four compact groups. Established vs developing labels. */
export const CAPABILITIES_HEADLINE = 'What I bring'

export const CAPABILITIES_GROUPS = [
  {
    title: 'Business & International Management',
    label: 'Established experience',
    items: 'Industrial B2B · Commercial operations · International accounts · Sales & bidding · Business development · International stakeholder coordination',
  },
  {
    title: 'Product & Systems Thinking',
    label: 'Business foundation, evolving application',
    items: 'Problem discovery · Process improvement · Business analysis · Workflow design · Solution design',
  },
  {
    title: 'Applied AI & Technology',
    label: 'Developing through practice',
    items: 'AI prototyping · Multi-agent workflows · Automation · Evidence verification · AI quality and evaluation',
  },
  {
    title: 'How I work',
    label: 'Professional approach',
    items: 'Business-first thinking · Research-driven decisions · Practical experimentation · Iterative development · Transparency',
  },
]

/** Featured projects — homepage skim. Depth on case pages / Triangora details. */
export const FEATURED_PROJECTS = {
  gryps: {
    blurb: 'Remote connectivity resilience intelligence for industrial operations.',
    themes: ['Problem framing', 'Research & data evaluation', 'Decision-support design', 'Prototype development'],
    status: 'Non-commercial research prototype · Interactive decision-support demonstration',
  },
  triangora: {
    blurb: 'Multi-agent verification of existing claims through independent evidence.',
    themes: ['Claim verification', 'Evidence triangulation', 'Multi-agent workflows', 'Prototype development'],
    status: 'Non-commercial research / skill demo',
  },
  morea: {
    blurb: 'An educational EU AI Act Article 4 literacy walkthrough.',
    themes: ['AI literacy research', 'Educational UX', 'Local-first design', 'Prototype development'],
    status: 'Educational · Non-commercial · Not a compliance service',
  },
}

/**
 * Depth payloads — homepage disclosure + case pages.
 * Framed so employers can distinguish human problem framing, design choices, and limits from tool-assisted build.
 */
export const PROJECT_CONTRIBUTIONS = {
  gryps: {
    problem: 'Remote industrial sites often depend on a single connectivity path and need a fast, auditable resilience read — without a consultancy deck or false precision.',
    approach: 'I framed a closed business loop (assess → score → rank → document) before choosing stack, so the Signature stays a decision-support object rather than a chat demo.',
    designed: 'Methodology, Model v0.4 framing, Advisor UX, and documentation of assumptions and limitations.',
    implemented: 'End-to-end research prototype: deterministic scoring path; optional AI prose that never changes the grade.',
    decisions: 'Kept the score deterministic and gated email behind the longer report only. Mission priorities re-rank options; they never rewrite the Signature number.',
    learned: 'Would next tighten seed-data labelling in the UI and expand scenario coverage while keeping the score non-negotiable.',
    conceptualised: 'Decision-support for remote connectivity resilience — a Resilience Signature as a closed assess → score → rank → document loop.',
    researched: 'Domain constraints for Nordic / Arctic remote operations, data-source honesty, and what a score is allowed to weigh.',
    experimental: 'Non-commercial research prototype — not live RF monitoring, not procurement advice; seed / illustrative data where noted.',
    keyDecision: 'Kept the score deterministic and gated email behind the longer report only. Trust over theater — hiring managers skim one object, not a chat transcript.',
  },
  triangora: {
    problem: 'An informed-looking report can still rest on repetition, omission or contradiction — URL count is not evidence count.',
    approach: 'I designed verification around independent source families and honest abstention, not agent agreement or claim generation.',
    designed: 'Claim submission flow, source-family checking, adversarial review, and evidence-based verdict UX.',
    implemented: 'Working prototype: submit → extract → check → adversarial review → verdict or honest abstention.',
    decisions: 'Agent agreement is never treated as proof; abstention is a correct outcome when evidence is thin. The system never generates intelligence.',
    learned: 'Would next harden source-family classification and evaluation harnesses while keeping the “verify, don’t invent” boundary absolute.',
    conceptualised: 'Multi-agent verification of existing claims — triangulates evidence; never generates intelligence.',
    researched: 'Verification methodology grounded in independent source families rather than agent agreement.',
    experimental: 'Non-commercial research / skill demo; GitHub remains private while under development.',
    keyDecision: 'Agent agreement is never treated as proof — only independent source families count; abstention is a correct outcome when evidence is thin.',
  },
  morea: {
    problem: 'Article 4 literacy is dense. Teams need a calm walkthrough that produces an illustrative pack without pretending to certify.',
    approach: 'I kept the product educational and local-first so practice stays private and never reads as auditor attestation.',
    designed: 'Browser-local inventory → exposure → literacy → quiz → optional policy → export flow and UX.',
    implemented: 'Illustrative walkthrough prototype with local-first privacy until export.',
    decisions: 'Browser-local until export; every surface framed as educational / illustrative — not a compliance service.',
    learned: 'Would next improve pack export clarity and quiz feedback without adding accounts or “get compliant” language.',
    conceptualised: 'Educational EU AI Act Article 4 literacy walkthrough that produces an illustrative evidence pack.',
    researched: 'Article 4 literacy framing for teams — educational, not certification.',
    experimental: 'Educational non-commercial prototype — not a compliance service.',
    keyDecision: 'Kept everything browser-local until export — privacy by default over accounts and cloud sync.',
  },
}

export const TRIANGORA_CAPTION =
  "Doesn't generate claims. Independently verifies existing claims against supporting evidence."

/** 60-second evaluator path */
export const HIRING_PATH_STEPS = [
  { n: '1', label: 'Home', detail: 'Brand + who I am — international B2B foundation evolving through applied AI' },
  { n: '2', label: 'About & capabilities', detail: 'Business foundation, established experience, developing AI capabilities' },
  { n: '3', label: 'Work → GRYPS', detail: 'Lead prototype: gryps.vercel.app/#advisor — no account for the initial result · brief at /work/gryps' },
]

export const TRIANGORA_BLURB = FEATURED_PROJECTS.triangora.blurb

export const MONOPATI_ONGOING = 'Ongoing development · Monopati study progress'

/** Hero — short portfolio framing (identity over storefront disclaimers). */
export const HERO_PORTFOLIO_LINE =
  'Independent professional portfolio · Non-commercial research and prototypes'

/** Footer — shorter companion line. */
export const FOOTER_PORTFOLIO_LINE =
  'Independent portfolio · Non-commercial research and prototypes'

/** Longer honesty line for surfaces that still need explicit reskilling posture. */
export const NONCOMMERCIAL_LINE =
  'Personal reskilling · Non-commercial · Not a product for sale · No accounts / no billing'

export const CONTACT_HEADLINE = "Let's talk about problems worth solving."

export const CONTACT_BODY =
  'Interested in opportunities and collaborations where business understanding, international experience and applied AI can make a meaningful difference.'

export const MONOPATI_LINK_LABEL = 'View learning progress →'

export const CV_PATH = '/Henrique_Moreira_CV.pdf'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/hqemoreira'
export const GITHUB_URL = 'https://github.com/hqemoreira'
export const EMAIL = 'hqe.moreira@gmail.com'
