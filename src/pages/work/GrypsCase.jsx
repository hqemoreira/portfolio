import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaseSection, CaseShell, TelemetryRail } from '../../components/CaseShell'
import { GRYPS_ADVISOR, GRYPS_METHOD, t } from '../../theme'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 900 : false)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function GrypsCase({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const isMobile = useIsMobile()

  useEffect(() => {
    document.title = 'GRYPS — Resilience Signature mission brief · Henrique Moreira'
    return () => {
      document.title = 'Henrique Moreira — AI Product Builder · Espoo, Finland'
    }
  }, [])

  const rail = (
    <TelemetryRail
      isLight={isLight}
      rows={[
        { label: 'Model', value: 'v0.4 · deterministic scoring' },
        { label: 'Loop', value: 'assess → score → rank → document' },
        { label: 'Stack', value: 'Next.js · Neon · MapLibre · optional Mistral' },
        { label: 'Domain', value: 'OT / Nordic–Arctic connectivity literacy' },
        { label: 'Posture', value: 'Non-commercial research · skill demo' },
        { label: 'Access', value: 'No account / no email for initial Signature' },
      ]}
      cta={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
          <a
            href={GRYPS_ADVISOR}
            target="_blank"
            rel="nofollow noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '12px 14px',
              background: c.ice,
              color: '#07080D',
              fontFamily: "'Syne', sans-serif",
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Generate Signature →
          </a>
          <a
            href={GRYPS_METHOD}
            target="_blank"
            rel="nofollow noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              color: c.ice,
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          >
            Methodology →
          </a>
        </div>
      }
    />
  )

  return (
    <CaseShell theme={theme}>
      <article
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: isMobile ? '100px 20px 40px' : '110px 40px 48px',
        }}
      >
        <Link
          to="/#work"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: c.quiet,
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: 28,
          }}
        >
          ← Work
        </Link>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.32em', color: c.ice, textTransform: 'uppercase', marginBottom: 16 }}>
          Mission brief · Lead hiring proof
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: c.ink,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 16,
          }}
        >
          GRYPS
        </h1>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontStyle: 'italic',
            color: c.body,
            maxWidth: '640px',
            lineHeight: 1.55,
            marginBottom: 40,
          }}
        >
          A live research prototype that turns a remote site profile into a Resilience Signature — score, grade, risks, ranked connectivity options.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 260px',
            gap: isMobile ? 36 : 48,
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, textAlign: 'left' }}>
            <div
              style={{
                border: `1px solid ${c.iceBorder}`,
                borderLeft: `3px solid ${c.ice}`,
                padding: '18px 20px',
                background: isLight ? 'rgba(43,127,212,0.05)' : 'rgba(79,168,255,0.05)',
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.24em', color: c.ice, textTransform: 'uppercase', marginBottom: 10 }}>
                What this proves
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.ink, lineHeight: 1.7, margin: 0 }}>
                A closed loop under Nordic / Arctic constraints: <strong>assess → score → rank → document</strong>. End-to-end ship of a domain scoring engine — not a slide deck. Seed / synthetic research data where noted; not live RF monitoring or procurement advice.
              </p>
            </div>

            {isMobile && rail}

            <CaseSection id="challenge" label="Challenge" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                Remote industrial and safety-critical sites often depend on a single connectivity path. Operators need a fast, auditable way to see resilience risk — without waiting for a consultancy deck or inventing false precision.
              </p>
            </CaseSection>

            <CaseSection id="constraints" label="Constraints" accent={c.amber}>
              <ul style={{ margin: 0, paddingLeft: 18, fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8 }}>
                <li>No live RF feeds — literacy and structured scoring, not NOC telemetry</li>
                <li>Honest about seed / illustrative numbers on the demo path</li>
                <li>Deterministic Model v0.4 core; optional AI prose must not change the score</li>
                <li>Non-commercial reskilling posture — no SaaS, accounts, or billing</li>
              </ul>
            </CaseSection>

            <CaseSection id="decisions" label="Key decisions" accent={c.amber}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  {
                    t: 'Signature as the artifact',
                    d: 'The output is a Resilience Signature (score · grade · risks · ranked options), not a chat transcript. Hiring managers can skim one object.',
                  },
                  {
                    t: 'Score stays deterministic',
                    d: 'Model v0.4 owns the number. Optional prose never mutates grade — trust over theater.',
                  },
                  {
                    t: 'Advisor without gatekeeping',
                    d: 'Initial Signature needs no email. Friction belongs after curiosity, not before proof.',
                  },
                ].map((item) => (
                  <div key={item.t} style={{ borderLeft: `2px solid ${c.ice}`, paddingLeft: 14 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: c.ink, marginBottom: 6 }}>
                      {item.t}
                    </div>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.7, margin: 0 }}>{item.d}</p>
                  </div>
                ))}
              </div>
            </CaseSection>

            <CaseSection id="solution" label="Solution" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: '0 0 16px' }}>
                Open the Advisor, set a site profile (location, providers, autonomy, criticality), generate a Signature in about a minute. Methodology and limitations live on the project site.
              </p>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: c.ice,
                  padding: '16px 18px',
                  border: `1px solid ${c.iceBorder}`,
                  background: '#0B0F17',
                }}
              >
                LOOP · assess → score → rank → document
              </div>
            </CaseSection>

            <CaseSection id="outcome" label="Outcome" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                What it proves for hiring: end-to-end product judgment in a hard domain — not a tool-wall of logos. What it is not: customer deployments, SLAs, or commercial connectivity advice. Try the live path; the frozen Path A sample on the hub (Score 47 · Grade D) is illustrative only.
              </p>
            </CaseSection>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 8 }}>
              <a
                href={GRYPS_ADVISOR}
                target="_blank"
                rel="nofollow noreferrer"
                style={{
                  padding: '14px 22px',
                  background: c.ice,
                  color: '#07080D',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Generate a Resilience Signature →
              </a>
              <Link
                to="/work/morea"
                style={{
                  padding: '14px 22px',
                  border: `1px solid ${c.amber}`,
                  color: c.amber,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Next: Morea brief →
              </Link>
            </div>
          </div>

          {!isMobile && rail}
        </div>
      </article>
    </CaseShell>
  )
}
