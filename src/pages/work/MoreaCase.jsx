import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaseSection, CaseShell, TelemetryRail } from '../../components/CaseShell'
import { MOREA_URL, t } from '../../theme'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 900 : false)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function MoreaCase({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const isMobile = useIsMobile()

  useEffect(() => {
    document.title = 'Morea — Evidence Pack brief · Henrique Moreira'
    return () => {
      document.title = 'Henrique Moreira — AI Product Builder · Espoo, Finland'
    }
  }, [])

  const rail = (
    <TelemetryRail
      isLight={isLight}
      rows={[
        { label: 'Role', value: 'Secondary to GRYPS' },
        { label: 'Focus', value: 'EU AI Act Article 4 literacy' },
        { label: 'Artifact', value: 'Illustrative Evidence Pack' },
        { label: 'Posture', value: 'Educational · not a compliance service' },
        { label: 'Status', value: 'Learning prototype' },
      ]}
      cta={
        <a
          href={MOREA_URL}
          target="_blank"
          rel="nofollow noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '12px 14px',
            marginTop: 8,
            border: `1px solid ${c.amber}`,
            color: c.amber,
            fontFamily: "'Syne', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Open prototype ↗
        </a>
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

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.32em', color: c.amber, textTransform: 'uppercase', marginBottom: 16 }}>
          Brief · Secondary literacy demo
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
          Morea
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
          An educational Article 4 Evidence Pack walkthrough — literacy trail for AI inventory, roles, and an illustrative exportable pack.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1fr) 260px',
            gap: isMobile ? 36 : 48,
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36, textAlign: 'left' }}>
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderLeft: `3px solid ${c.amber}`,
                padding: '18px 20px',
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.24em', color: c.amber, textTransform: 'uppercase', marginBottom: 10 }}>
                What this proves
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.ink, lineHeight: 1.7, margin: 0 }}>
                Ability to shape a calm literacy product around regulation language — without claiming compliance-as-a-service. Secondary to GRYPS for hiring conversations.
              </p>
            </div>

            {isMobile && rail}

            <CaseSection id="challenge" label="Challenge" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                Article 4 literacy is dense. Teams need a walkthrough that produces an illustrative Evidence Pack without pretending to certify or “get you compliant.”
              </p>
            </CaseSection>

            <CaseSection id="solution" label="Solution" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                Guided trail: inventory → role-aware modules → quiz → optional policy draft → exportable pack framed as educational / illustrative only.
              </p>
            </CaseSection>

            <CaseSection id="outcome" label="Outcome" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                A clear secondary demo after GRYPS. Not a compliance product, not for sale, not a substitute for legal advice.
              </p>
            </CaseSection>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                href={MOREA_URL}
                target="_blank"
                rel="nofollow noreferrer"
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
                Open prototype ↗
              </a>
              <Link
                to="/work/gryps"
                style={{
                  padding: '14px 22px',
                  border: `1px solid ${c.ice}`,
                  color: c.ice,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                ← GRYPS brief
              </Link>
            </div>
          </div>

          {!isMobile && rail}
        </div>
      </article>
    </CaseShell>
  )
}
