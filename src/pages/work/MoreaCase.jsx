import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CaseSection, CaseShell, TelemetryRail } from '../../components/CaseShell'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { MOREA_URL, t } from '../../theme'

export default function MoreaCase({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const { phone, tablet, narrow } = useBreakpoint()

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '14px 14px',
            minHeight: 44,
            marginTop: 8,
            boxSizing: 'border-box',
            border: `1px solid ${c.amber}`,
            color: c.amber,
            fontFamily: "'Syne', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.12em',
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
          width: '100%',
          boxSizing: 'border-box',
          paddingTop: phone ? 'max(88px, calc(64px + env(safe-area-inset-top)))' : 110,
          paddingBottom: phone ? 'max(32px, env(safe-area-inset-bottom))' : 48,
          paddingLeft: phone ? 'max(16px, env(safe-area-inset-left))' : tablet ? 28 : 40,
          paddingRight: phone ? 'max(16px, env(safe-area-inset-right))' : tablet ? 28 : 40,
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
            display: 'inline-flex',
            alignItems: 'center',
            minHeight: 44,
            marginBottom: 20,
          }}
        >
          ← Work
        </Link>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: phone ? '0.16em' : '0.32em', color: c.amber, textTransform: 'uppercase', marginBottom: 16 }}>
          Brief · Secondary literacy demo
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: phone ? '42px' : 'clamp(40px, 6vw, 72px)',
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
            fontSize: phone ? '16px' : 'clamp(16px, 2vw, 20px)',
            fontStyle: 'italic',
            color: c.body,
            maxWidth: '640px',
            lineHeight: 1.55,
            marginBottom: phone ? 20 : 28,
          }}
        >
          An educational Article 4 Evidence Pack walkthrough — literacy trail for AI inventory, roles, and an illustrative exportable pack.
        </p>

        <figure style={{ margin: '0 0 28px', maxWidth: 900 }}>
          <img
            src="/work/morea-dossier.png"
            alt="Morea sample Evidence Pack dossier with track, inventory, quiz score, and verification ID"
            width={1200}
            height={750}
            loading="eager"
            decoding="async"
            style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${c.border}`, borderRadius: 2 }}
          />
          <figcaption style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.08em', color: c.quiet, lineHeight: 1.55 }}>
            Illustrative Evidence Pack · dated, hashable, printable · not auditor attestation
          </figcaption>
        </figure>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: narrow ? '1fr' : 'minmax(0, 1fr) 260px',
            gap: phone ? 28 : 48,
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: phone ? 28 : 36, textAlign: 'left', minWidth: 0 }}>
            <div
              style={{
                border: `1px solid ${c.border}`,
                borderLeft: `3px solid ${c.amber}`,
                padding: phone ? '16px' : '18px 20px',
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.amber, textTransform: 'uppercase', marginBottom: 10 }}>
                What this proves
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.ink, lineHeight: 1.7, margin: 0 }}>
                Ability to shape a calm literacy product around regulation language — without claiming compliance-as-a-service. Secondary to GRYPS for hiring conversations.
              </p>
            </div>

            {narrow && rail}

            <CaseSection id="challenge" label="Problem" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                Article 4 literacy is dense. Small EU teams need a walkthrough that produces an illustrative Evidence Pack without pretending to certify or “get you compliant.”
              </p>
            </CaseSection>

            <CaseSection id="solution" label="What I built" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                Guided trail: inventory → exposure → role-aware literacy → quiz → optional policy draft → exportable pack framed as educational / illustrative only.
              </p>
            </CaseSection>

            <CaseSection id="tradeoff" label="My role · one trade-off" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                Solo product and UI. I kept data browser-local until export — privacy by default over accounts and cloud sync — and framed every surface as educational so the pack never reads as auditor attestation.
              </p>
            </CaseSection>

            <CaseSection id="outcome" label="Verify in a minute" accent={c.amber}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
                Open the prototype, skim the sample pack, or run the short trail. Not a compliance product, not for sale, not a substitute for legal advice.
              </p>
            </CaseSection>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, flexDirection: phone ? 'column' : 'row' }}>
              <a
                href={MOREA_URL}
                target="_blank"
                rel="nofollow noreferrer"
                style={{
                  padding: '14px 22px',
                  minHeight: 48,
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: phone ? '100%' : undefined,
                  border: `1px solid ${c.amber}`,
                  color: c.amber,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Open prototype ↗
              </a>
              <Link
                to="/work/gryps"
                style={{
                  padding: '14px 22px',
                  minHeight: 48,
                  boxSizing: 'border-box',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: phone ? '100%' : undefined,
                  border: `1px solid ${c.ice}`,
                  color: c.ice,
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                ← GRYPS brief
              </Link>
            </div>
          </div>

          {!narrow && rail}
        </div>
      </article>
    </CaseShell>
  )
}
