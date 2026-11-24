/** Locked hiring copy — keep Story / About / Contact in sync. Non-commercial only. */

export const HIRING_ONE_LINER =
  'Built GRYPS: open the Advisor, enter a remote site, get a Resilience Signature — live skill demo for Nordic / Arctic connectivity resilience (non-commercial research prototype).'

export const ROLE_FOCUS =
  'Open to roles in Finland and the EU where an established international commercial career is extended with applied AI and digital capabilities.'

export const HERO_IDENTITY_PRIMARY = 'International B2B Sales & Commercial Management'

export const HERO_IDENTITY_SECONDARY =
  'Applied AI and digital capabilities for commercial processes and business transformation.'

export const HERO_SUBLINE =
  '18 years of international industrial B2B experience at Metsä Board, from customer service and sales support to sales management.'

export const HERO_SUPPORT =
  'The Metsä Board career is the professional evidence. Applied AI extends that experience into commercial processes and business transformation.'

export const HERO_FOCUS = 'International B2B · Commercial Growth · Applied AI'

export const HERO_ASK = ROLE_FOCUS

export const HERO_LOCATION = 'Espoo, Finland · International perspective'

export const SITE_TITLE =
  'Henrique Moreira | International B2B Sales, Commercial Management & Applied AI'

export const SITE_DESCRIPTION =
  'International B2B Sales & Commercial Management. 18 years of international industrial experience, extended through applied AI and digital capabilities for commercial processes and business transformation.'

export const GRYPS_PRIMARY_CTA = 'Explore the GRYPS prototype'

/** About — two paragraphs + evolution tag. Homepage skim. */
export const ABOUT_HEADLINE = 'International B2B sales, extended through applied AI.'

export const ABOUT_PARAS = [
  '18 years at Metsä Board, from customer service and sales support to sales management across Portugal and 50 international customer accounts in agent markets across Europe and MEA.',
  'Applied AI and digital capabilities extend that commercial experience into commercial processes and business transformation.',
]

export const ABOUT_TAG =
  'Connected layers: the Metsä Board career is the evidence. Applied AI is the extension. Monopati is the further development.'

/** Capabilities — four compact groups. Established vs developing labels. */
export const CAPABILITIES_HEADLINE = 'What I bring'

export const CAPABILITIES_GROUPS = [
  {
    title: 'International B2B Sales & Market Development',
    label: 'Sales Manager · 01/2018–05/2026',
    items: 'Full commercial responsibility for Portugal and 50 international customer accounts across agent markets in Europe and MEA, including pricing, contracts, demand and performance.',
  },
  {
    title: 'Commercial Operations & Business Insights',
    label: 'Sales Support Manager · 04/2015–12/2017',
    items: 'Commercial operations support, budgeting, forecasting and reporting, including operational support to the Commercial Director.',
  },
  {
    title: 'Customer, Account & Stakeholder Management',
    label: 'Customer Service Coordinator · 04/2008–03/2015',
    items: 'International order-to-delivery, export documentation, CRM customer master data, and coordination with Sales, Mill Operations and Credit Management.',
  },
  {
    title: 'AI-enabled Business Processes & Digital Solutions',
    label: 'Applied to commercial work',
    items: 'Applied AI and digital capabilities extend the commercial career. The prototypes on this site are that extension. They were not commissioned by Metsä Board.',
  },
]

/** Historical Metsä Board result shown on the homepage. Selling-price growth stays on the CV only. */
export const COMMERCIAL_RESULTS = [
  {
    figure: '+9.84%',
    label: 'Portugal sales volume',
    detail: 'avg / year',
  },
]

export const COMMERCIAL_RESULTS_NOTE =
  'Historical result from the Sales Manager role at Metsä Board (01/2018–05/2026). The CV records Portugal sales volume as +9.84% avg / year and does not name the years included in the average.'

export const EXPERIENCE_ROLES = [
  {
    title: 'Sales Manager – Commercial Excellence & Customer Solutions',
    dates: '01/2018–05/2026',
    place: 'Metsä Board · Finland · International industrial B2B (paperboard)',
    points: [
      'Full commercial responsibility for Portugal and 50 international customer accounts across agent markets in Europe and MEA.',
      'Pricing strategy, contract negotiations and multi-year agreements.',
      'Demand alignment and portfolio performance.',
      'Commercial forecasting, budgeting and reporting.',
      'SAP/CRM Advanced Key User responsibilities.',
      'Improvements to commercial reporting and visibility through SAP, BW, CRM and Power BI.',
      'Cross-functional collaboration with Supply Chain, Demand Planning, Logistics, Customer Service, Credit Control, Marketing and Sustainability.',
    ],
  },
  {
    title: 'Sales Support Manager – Commercial Reporting & Business Insights',
    dates: '04/2015–12/2017',
    place: 'Metsä Board · Finland',
    points: [
      'Commercial operations support, budgeting, forecasting and reporting.',
      'Global lead follow-up and operational support to the Commercial Director.',
      'Production alignment, pricing support, contract structuring and portfolio development.',
      'Market intelligence and business expansion support.',
    ],
  },
  {
    title: 'Customer Service Coordinator & Business Process',
    dates: '04/2008–03/2015',
    place: 'Metsä Board · Belgium / Finland',
    points: [
      'International order-to-delivery management.',
      'Export documentation and compliance.',
      'CRM customer master data and service agreements.',
      'Coordination with Sales, Mill Operations and Credit Management.',
      'Process improvement and service reliability.',
    ],
  },
]

/** Featured projects — homepage skim. Depth on case pages / Triangora details. */
export const FEATURED_PROJECTS = {
  gryps: {
    blurb:
      'Assess → score → rank → document a Resilience Signature for Nordic / Arctic remote connectivity (Model v0.4). Reference scenario: mining 83 · B · OneWeb · 85.',
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

/** Homepage project briefs — only claims already documented on the case material. */
export const PROJECT_BRIEFS = {
  gryps: [
    {
      label: 'Business or research problem',
      text: 'Remote industrial sites often depend on a single connectivity path and need a fast, auditable resilience read, without a consultancy deck or false precision.',
    },
    {
      label: 'Approach',
      text: 'The loop was framed before the stack: assess a site profile, score it with a deterministic Model v0.4, rank connectivity options, and document a Resilience Signature. Optional AI prose may explain. It cannot move the grade. There are no live RF feeds. Seed data is labelled as illustrative.',
    },
    {
      label: 'Solution',
      text: 'An Advisor and a research prototype that return a Resilience Signature: score, grade, risks and ranked options. The reference scenario on this site is illustrative: mining 83 · B · OneWeb · 85.',
    },
    {
      label: 'What it demonstrates',
      text: 'Industrial problem investigation, structured research and methodology, decision-support product thinking, applied AI under a hard constraint, and attention to operational requirements. It is not evidence of commercial sales results.',
    },
    {
      label: 'Status and limitations',
      text: 'Research prototype. Not live RF monitoring, not procurement advice, not commercially deployed, and not generating revenue. Seed or illustrative data where noted.',
    },
  ],
  triangora: [
    {
      label: 'Business or research problem',
      text: 'An informed-looking report can still rest on repetition, omission or contradiction. A count of URLs is not a count of evidence.',
    },
    {
      label: 'Approach',
      text: 'Verification is organised around independent source families and honest abstention. Agent agreement is not treated as proof, and the system does not generate claims.',
    },
    {
      label: 'Solution',
      text: 'A working prototype: submit a claim, extract it, check source families, run an adversarial review, then return a verdict or abstain.',
    },
    {
      label: 'What it demonstrates',
      text: 'AI quality and evidence, fact-checking and source triangulation, AI product design, and responsible AI application. Abstention is a valid outcome when evidence is thin.',
    },
    {
      label: 'Status and limitations',
      text: 'Research prototype, still in development. The repository remains private. This page does not claim a published accuracy score or commercial adoption.',
    },
  ],
  morea: [
    {
      label: 'Business or research problem',
      text: 'EU AI Act Article 4 literacy is dense. A team needs a calm walkthrough that can produce an illustrative pack without pretending to certify anyone.',
    },
    {
      label: 'Approach',
      text: 'The walkthrough stays educational and in the browser until export, so practice does not read as auditor attestation.',
    },
    {
      label: 'Solution',
      text: 'The implemented flow is inventory, exposure, literacy, quiz, an optional policy, then export of an illustrative Evidence Pack.',
    },
    {
      label: 'What it demonstrates',
      text: 'Product development, user experience and product thinking, and the design of an educational digital walkthrough. It does not demonstrate a compliance service.',
    },
    {
      label: 'Status and limitations',
      text: 'Educational research prototype. Not a compliance service, not certification, and not an operational product.',
    },
  ],
}

export const TRIANGORA_CAPTION =
  "Doesn't generate claims. Independently verifies existing claims against supporting evidence."

/** 60-second evaluator path */
export const HIRING_PATH_STEPS = [
  { n: '1', label: 'Home', detail: 'Brand + Metsä Board career as evidence; prototypes as the extension' },
  { n: '2', label: 'About & capabilities', detail: 'Established commercial experience, then applied AI as a separate reskilling layer' },
  { n: '3', label: 'Work → GRYPS', detail: 'Lead prototype: gryps.vercel.app/#advisor — no account for the initial result · brief at /work/gryps' },
]

export const TRIANGORA_BLURB = FEATURED_PROJECTS.triangora.blurb

export const MONOPATI_ONGOING =
  'Monopati · further development — applied AI on a commercial foundation · three OpenAI Academy courses done · Power Platform next'

/** Hero — short portfolio framing (identity over storefront disclaimers). */
export const HERO_PORTFOLIO_LINE =
  'Independent professional portfolio · Non-commercial research and prototypes'

/** Footer uses NONCOMMERCIAL_LINE (full reskilling posture). */
export const NONCOMMERCIAL_LINE =
  'Personal reskilling · Non-commercial · Not a product for sale · No accounts / no billing'

export const CONTACT_HEADLINE = "Let's talk about problems worth solving."

export const CONTACT_BODY =
  'The Metsä Board career is established evidence. The prototypes show the extension. Monopati shows what I am learning next.'

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
      'Output: Resilience Signature with score, grade, risks and ranked options (Model v0.4). Reference scenario on this portfolio: remote-operated mining · 83 · B · Rec #1 OneWeb · 85. Status UX uses a compact R&D PROTOTYPE / T&K-PROTOTYYPPI chip — not a commercial banner. The Path A motion panel (Score 47 · Grade D) is a separate illustrative freeze; the Advisor produces a live assessment.',
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

export const BID_CASE = {
  title: 'Applying AI to International B2B Commercial Processes',
  status:
    'Conceptual exploration based on professional experience. Proposed application of AI to commercial processes. Not a production deployment.',
  subline:
    'Developed from practical experience managing international B2B sales, pricing, contract negotiations and commercial operations. The AI applications are a conceptual exploration. They were not implemented or commissioned by Metsä Board.',
  context: {
    label: 'Professional basis',
    paras: [
      'Developed from practical experience managing international B2B sales, pricing, contract negotiations and commercial operations across Portugal and 50 international customer accounts across agent markets in Europe and MEA.',
      'This conceptual case explores how applied AI could support complex commercial workflows, improve information processing and strengthen decision preparation, while keeping commercial judgement and accountability with people.',
      'The Metsä Board responsibilities are real professional experience. The proposed AI applications are a conceptual exploration based on that experience. They were not implemented or commissioned by Metsä Board, and this case is not a project delivered during that employment. No customer, contract or internal document is described.',
    ],
  },
  challenges: {
    label: 'Where the work is demanding',
    note: 'These are general characteristics of commercial work at that scope. They are not measured findings, and they are not drawn from confidential company information.',
    items: [
      'Commercial documents, customer requirements and internal conditions have to be read together.',
      'Pricing and contract positions have to stay consistent with what has already been agreed.',
      'Missing information, inconsistencies and risk are easy to miss when the material is spread across people and files.',
      'Historical commercial knowledge is useful only when the person preparing a decision can find it.',
    ],
  },
  approach: {
    label: 'Proposed AI applications',
    paras: [
      'The exploration is how applied AI could support preparation. It is not a system Metsä Board used, and it is not a formal bid-management function.',
    ],
    items: [
      'Extracting and structuring information from commercial documents.',
      'Comparing customer requirements, commercial terms and internal conditions.',
      'Supporting pricing and contract review workflows.',
      'Identifying missing information, inconsistencies and potential risks.',
      'Improving access to historical commercial information and knowledge.',
      'Supporting preparation of commercial proposals and decision-making.',
    ],
  },
  oversight: {
    label: 'Human accountability',
    paras: [
      'Pricing approvals, contractual commitments, customer negotiations and final commercial decisions remain with people. A comparison, a gap flag or a draft is an input to that judgement. It is not an approval, a commitment or a decision.',
    ],
  },
  value: {
    label: 'What this demonstrates',
    note: 'No production deployment, adoption, accuracy, measurable benefit or revenue is claimed.',
    items: [
      'Commercial understanding of international B2B sales, pricing and operations.',
      'The ability to connect that experience to practical AI applications.',
      'A clear line between professional experience and a proposal that has not been built for, or by, an employer.',
    ],
  },
}

export const CV_PATH = '/Henrique_Moreira_CV.pdf'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/hqemoreira'
export const GITHUB_URL = 'https://github.com/hqemoreira'
export const EMAIL = 'hqe.moreira@gmail.com'
