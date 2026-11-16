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

export const MONOPATI_ONGOING =
  'Monopati · three OpenAI Academy courses done · Power Platform next'

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

export const MONOPATI_LINK_LABEL = 'View study progress →'

/** GRYPS hiring case — /work/gryps. Homepage stays frozen; depth lives here. */
export const GRYPS_CASE = {
  eyebrow: 'Featured case study · Model v0.4',
  title: 'GRYPS',
  subline:
    'Complex business problem → research → methodology → decision-support prototype. A live Resilience Signature for Nordic / Arctic remote connectivity resilience.',
  proves:
    'End-to-end judgment under hard constraints: define the problem, evaluate what data can honestly support, design a scoring methodology, ship a closed loop (assess → score → rank → document), and document limitations. Not a slide deck. Not commercial procurement advice.',
  problem: {
    label: 'Business problem and context',
    paras: [
      'Remote industrial and safety-critical operations in Nordic and Arctic environments often depend on a single connectivity path — typically one LEO or terrestrial link with little structured visibility into what fails when that path degrades.',
      'Operators and planners still need a fast, auditable resilience read: what is the site’s exposure, what are the ranked backups, and what assumptions sit under the number. Today that answer often arrives as a consultancy narrative, a vendor deck, or informal tribal knowledge — late, opaque, and hard to compare across sites.',
    ],
  },
  why: {
    label: 'Why the problem matters',
    paras: [
      'Connectivity failure at a remote site is not only a technical inconvenience. It affects autonomy, safety posture, operational continuity and the commercial cost of downtime.',
      'False precision is as dangerous as no analysis. A score that looks authoritative but rests on live RF pretence, hidden assumptions or LLM-generated grades misleads decision-makers. The business need is literacy and structured comparison — not a fake NOC.',
    ],
  },
  research: {
    label: 'Research and approach',
    paras: [
      'I started from the operational question, not from a model catalogue: what would a decision-maker need in one minute to reason about resilience without waiting for a full study?',
      'That led to a closed loop — assess site profile → score with a deterministic Model v0.4 → rank connectivity options → document a Resilience Signature — before stack choices. Optional AI prose may explain; it must never move the grade.',
      'Research constraints I accepted up front: no live RF feeds; honest labelling of seed / illustrative data on the demo path; methodology and limitations published alongside the prototype.',
    ],
  },
  role: {
    label: 'My role and decisions',
    paras: [
      'Solo product framing, methodology, scoring logic, Advisor UX and end-to-end ship of the research prototype.',
      'Decisions that were mine: keep Model v0.4 deterministic; refuse to let optional LLM output rewrite the Signature number; gate email behind the longer report after the initial result; treat mission priorities as re-ranking options, not rewriting the score; document assumptions instead of implying validated procurement advice.',
    ],
  },
  architecture: {
    label: 'Architecture and technology',
    paras: [
      'The system is the loop. Stack is evidence, not the headline: Next.js application, Neon (EU) for persistence where needed, MapLibre for geographic context, optional Mistral for prose that cannot alter the score, deployed on Vercel.',
      'Logic stays interchangeable — another model or map library should not redefine what a Signature means. The hiring proof is the closed decision-support object, not a wall of vendor logos.',
    ],
    stack: 'Next.js · Neon (EU) · MapLibre · optional Mistral · Vercel',
  },
  demonstration: {
    label: 'Demonstration and outputs',
    paras: [
      'Open the Advisor, set latitude / longitude and an operational profile (providers, autonomy, criticality), generate a Signature in about a minute — no account or email for the initial result.',
      'Output: Resilience Signature with score, grade, risks and ranked options. Methodology lives on the project site. The portfolio’s Path A freeze (e.g. Score 47 · Grade D) is an illustrative snapshot; the Advisor produces a live assessment.',
    ],
  },
  limitations: {
    label: 'Limitations and what I would improve',
    items: [
      'Not live RF monitoring, NOC telemetry, SLAs or commercial connectivity advice',
      'Seed / synthetic research data where noted — illustrative, not production site inventory',
      'Non-commercial research / skill demo — no SaaS, accounts or billing',
      'Would next: tighten seed-data labelling in the UI, expand scenario coverage, and keep the score non-negotiable under any AI prose path',
    ],
  },
  skills: {
    label: 'Skills demonstrated',
    items: [
      'Complex business problem definition in industrial / OT context',
      'Research and honest data-source evaluation',
      'Decision-support methodology and scoring / prioritisation logic',
      'Systems thinking and product framing (closed loop before stack)',
      'Applied AI used under constraints (explanation only; never owns the grade)',
      'End-to-end prototype development and transparent limitation documentation',
    ],
  },
}

export const CV_PATH = '/Henrique_Moreira_CV.pdf'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/hqemoreira'
export const GITHUB_URL = 'https://github.com/hqemoreira'
export const EMAIL = 'hqe.moreira@gmail.com'
