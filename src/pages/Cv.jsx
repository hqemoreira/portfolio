import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CV_PATH, NONCOMMERCIAL_LINE, SITE_TITLE } from '../copy'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { GRYPS_ADVISOR, MOREA_URL, TRIANGORA_URL, t } from '../theme'

const CV_TITLE = 'Henrique Moreira — CV'
const CV_CANONICAL = 'https://henriquemoreira.eu/cv'
const CV_DESCRIPTION =
  'Curriculum vitae of Henrique Moreira: international B2B sales and commercial management, professional experience, education, capabilities and languages.'

const ROLES = [
  {
    title: 'Sales Manager – Commercial Excellence & Customer Solutions',
    dates: '01/2018–05/2026',
    place: 'Finland · International industrial B2B (paperboard)',
    points: [
      'Grew Portugal sales volume by +9.84% avg / year. Achieved average annual selling-price growth of 2.97% in Portugal. Delivered +4.26% annual price growth in international agent markets.',
      'Full commercial responsibility for Portugal and 50 international customer accounts across agent markets in Europe and MEA.',
      'Pricing strategy, contract negotiations and multi-year agreements. Demand alignment and portfolio performance. Commercial forecasting, budgeting and reporting. SAP/CRM Advanced Key User.',
      'Improved commercial reporting and visibility through SAP, BW, CRM and Power BI.',
      'Cross-functional collaboration with Supply Chain, Demand Planning, Logistics, Customer Service, Credit Control, Marketing and Sustainability.',
    ],
  },
  {
    title: 'Sales Support Manager – Commercial Reporting & Business Insights',
    dates: '04/2015–12/2017',
    place: 'Finland',
    points: [
      'Commercial operations support, budgeting, forecasting and reporting. Global lead follow-up and operational support to the Commercial Director.',
      'Production alignment, pricing support, contract structuring and portfolio development. Market intelligence and business expansion support.',
    ],
  },
  {
    title: 'Customer Service Coordinator & Business Process',
    dates: '04/2008–03/2015',
    place: 'Belgium / Finland',
    points: [
      'International order-to-delivery management. Export documentation and compliance. CRM customer master data and service agreements.',
      'Coordination with Sales, Mill Operations and Credit Management. Process improvement and service reliability.',
    ],
  },
]

const CAPABILITIES = [
  ['Business & international management (established at Metsä Board)', 'International B2B sales and business development, customer and key account management, commercial operations and business insights, pricing, market development and commercial performance, cross-functional coordination and process improvement.'],
  ['Product & systems thinking (evolving application)', 'Problem discovery, process improvement, business analysis, workflow design and solution design.'],
  ['Applied AI & technology (developing through practice)', 'AI product prototyping, multi-agent workflows, automation, evidence verification, and AI quality and evaluation.'],
  ['Enterprise systems experience', 'SAP, Power BI, CRM, BW, and Microsoft Power Platform / Power Automate (PL-900 & PL-200 in progress).'],
  ['Prototype stack (evidence, not the headline)', 'Next.js, Neon, MapLibre, Vite, React, Vercel, and optional Mistral.'],
]

function SectionTitle({ children, color }) {
  return (
    <h2
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color,
        margin: '0 0 16px',
      }}
    >
      {children}
    </h2>
  )
}

export default function Cv({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const { phone } = useBreakpoint()

  useEffect(() => {
    document.title = CV_TITLE
    const meta = document.querySelector('meta[name="description"]')
    const canonical = document.querySelector('link[rel="canonical"]')
    const previousDescription = meta?.getAttribute('content')
    const previousCanonical = canonical?.getAttribute('href')
    if (meta) meta.setAttribute('content', CV_DESCRIPTION)
    if (canonical) canonical.setAttribute('href', CV_CANONICAL)
    return () => {
      document.title = SITE_TITLE
      if (meta && previousDescription) meta.setAttribute('content', previousDescription)
      if (canonical && previousCanonical) canonical.setAttribute('href', previousCanonical)
    }
  }, [])

  return (
    <div className="cv-sheet" style={{ background: c.bg, minHeight: '100vh', color: c.body }}>
      <article
        style={{
          maxWidth: 760,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          paddingTop: phone ? 'max(96px, calc(72px + env(safe-area-inset-top)))' : 120,
          paddingBottom: phone ? 'max(40px, env(safe-area-inset-bottom))' : 64,
          paddingLeft: phone ? 'max(16px, env(safe-area-inset-left))' : 28,
          paddingRight: phone ? 'max(16px, env(safe-area-inset-right))' : 28,
        }}
      >
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: c.amber, margin: '0 0 14px' }}>
          Curriculum vitae
        </p>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 200, fontStyle: 'italic', fontSize: phone ? '40px' : 'clamp(44px, 6vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1.05, color: c.ink, margin: '0 0 14px' }}>
          Henrique Moreira
        </h1>
        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: phone ? '15px' : '17px', fontWeight: 700, letterSpacing: '0.01em', color: c.ink, lineHeight: 1.35, margin: '0 0 8px' }}>
          International B2B Sales & Commercial Management
        </p>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '16px', lineHeight: 1.55, color: c.body, margin: '0 0 18px', maxWidth: 620 }}>
          Applied AI and digital capabilities for commercial processes and business transformation.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', lineHeight: 1.7, color: c.muted, margin: '0 0 18px' }}>
          Espoo, Finland
          <span aria-hidden="true"> · </span>
          <a href="tel:+358401436351" style={{ color: c.muted }}>+358 40 143 6351</a>
          <span aria-hidden="true"> · </span>
          <a href="mailto:hqe.moreira@gmail.com" style={{ color: c.muted }}>hqe.moreira@gmail.com</a>
          <span aria-hidden="true"> · </span>
          <a href="https://www.linkedin.com/in/hqemoreira" style={{ color: c.muted }}>LinkedIn</a>
          <span aria-hidden="true"> · </span>
          <Link to="/" style={{ color: c.muted }}>henriquemoreira.eu</Link>
        </p>
        <p className="cv-actions no-print" style={{ margin: '0 0 36px' }}>
          <a
            href={CV_PATH}
            download="Henrique_Moreira_CV.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 44,
              padding: '12px 18px',
              border: `1px solid ${c.amber}`,
              color: c.amber,
              textDecoration: 'none',
              fontFamily: "'Syne', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Download PDF
          </a>
        </p>

        <section className="cv-block" style={{ marginBottom: 36 }}>
          <SectionTitle color={c.amber}>Profile</SectionTitle>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
            International B2B sales and commercial management professional at Metsä Board, from customer service and sales support to sales management across Portugal and 50 international customer accounts in agent markets across Europe and MEA. Applied AI and digital capabilities extend that experience into commercial processes and business transformation. GRYPS is the lead research prototype; Triangora and Morea follow. Monopati tracks further study.
          </p>
        </section>

        <section className="cv-block" style={{ marginBottom: 36 }}>
          <SectionTitle color={c.amber}>Professional experience</SectionTitle>
          <p className="cv-employer" style={{ fontFamily: "'Syne', sans-serif", fontSize: '14px', fontWeight: 700, color: c.ink, margin: '0 0 16px' }}>
            Metsä Board
          </p>
          <div className="cv-rail" style={{ borderLeft: `1px solid ${c.border}`, marginLeft: 4, paddingLeft: 18 }}>
            {ROLES.map((role) => (
              <article key={role.title} className="cv-role" style={{ position: 'relative', marginBottom: 26 }}>
                <span className="cv-dot" aria-hidden="true" style={{ position: 'absolute', left: -22, top: 7, width: 7, height: 7, borderRadius: '50%', background: c.amber }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', fontWeight: 700, color: c.ink, lineHeight: 1.35, margin: 0, flex: '1 1 220px' }}>
                    {role.title}
                  </h3>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: c.quiet, margin: 0, letterSpacing: '0.04em' }}>
                    <time>{role.dates}</time>
                  </p>
                </div>
                <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '14px', color: c.muted, margin: '4px 0 8px' }}>
                  {role.place}
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.15em', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {role.points.map((point) => (
                    <li key={point.slice(0, 32)} style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-block" style={{ marginBottom: 36 }}>
          <SectionTitle color={c.amber}>Education</SectionTitle>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6, margin: '0 0 10px' }}>
            <strong style={{ fontWeight: 700, color: c.ink }}>Executive Education Diploma – Sales & Strategic Commercial Leadership</strong>
            {' · Hanken Executive Education, Finland · 2025'}
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ fontWeight: 700, color: c.ink }}>Bachelor of Social Science (B.Soc.Sc.)</strong>
            {' · Faculdade de Letras da Universidade do Porto, Portugal · 2004'}
          </p>
        </section>

        <section className="cv-block" style={{ marginBottom: 36 }}>
          <SectionTitle color={c.amber}>Certifications & development</SectionTitle>
          <ul style={{ margin: 0, paddingLeft: '1.15em', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>OpenAI Academy — Scope AI Solutions, AI Foundations, Applied AI Foundations (Nov 2026).</li>
            <li style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>Microsoft Power Platform PL-900 and PL-200 — in progress (target end of Jan 2027).</li>
            <li style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>Certified Lean Six Sigma Green Belt | BPM Master Class.</li>
            <li style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>
              Ongoing study path in applied AI, automation and systems design —{' '}
              <a href="https://monopati.vercel.app/progress" style={{ color: c.body }}>monopati.vercel.app/progress</a>.
            </li>
          </ul>
        </section>

        <section className="cv-block" style={{ marginBottom: 36 }}>
          <SectionTitle color={c.amber}>Skills and capabilities</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CAPABILITIES.map(([label, detail]) => (
              <p key={label} style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', fontWeight: 700, color: c.ink }}>{label}. </strong>
                {detail}
              </p>
            ))}
          </div>
        </section>

        <section className="cv-block" style={{ marginBottom: 36 }}>
          <SectionTitle color={c.amber}>Selected research prototypes</SectionTitle>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', fontStyle: 'italic', color: c.muted, margin: '0 0 10px' }}>
            Non-commercial skill demonstrations — not client deployments or products for sale.
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.15em', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>
              <strong style={{ color: c.ink }}>GRYPS (Model v0.4) — featured case:</strong> decision-support for Nordic / Arctic remote connectivity resilience (assess → score → rank → document a Resilience Signature). Proves problem framing, methodology and end-to-end ship.{' '}
              <a href={GRYPS_ADVISOR} style={{ color: c.amber }}>gryps.vercel.app</a>
              {' · '}
              <Link to="/work/gryps" style={{ color: c.amber }}>henriquemoreira.eu/work/gryps</Link>
            </li>
            <li style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>
              <strong style={{ color: c.ink }}>Triangora:</strong> verifies existing claims via independent source families; never generates claims; abstention when evidence is thin.{' '}
              <a href={TRIANGORA_URL} style={{ color: c.amber }}>triangora.vercel.app</a>
            </li>
            <li style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6 }}>
              <strong style={{ color: c.ink }}>Morea:</strong> educational EU AI Act Article 4 Evidence Pack walkthrough (not a compliance service).{' '}
              <a href={MOREA_URL} style={{ color: c.amber }}>morea-pack.vercel.app</a>
              {' · Earlier experiments: Grantemia, Velu, Lycaon, DisclAI, Iraun.'}
            </li>
          </ul>
        </section>

        <section className="cv-block">
          <SectionTitle color={c.amber}>Languages</SectionTitle>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Portuguese (native); English, Spanish, Catalan and French (fluent); Finnish (intermediate).
          </p>
        </section>

        <footer className="no-print" style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${c.divider}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link to="/" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.amber, textDecoration: 'none', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>
            Home
          </Link>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.08em', color: c.quiet, margin: 0, lineHeight: 1.6 }}>
            {NONCOMMERCIAL_LINE}
          </p>
        </footer>
      </article>
    </div>
  )
}
