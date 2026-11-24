import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CaseSection, CaseShell, TelemetryRail } from '../../components/CaseShell'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { GRYPS_CASE, SITE_TITLE } from '../../copy'
import { GRYPS_ADVISOR, GRYPS_METHOD, TRIANGORA_URL, t } from '../../theme'

function Paras({ paras, c }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {paras.map((para) => (
        <p key={para.slice(0, 48)} style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8, margin: 0 }}>
          {para}
        </p>
      ))}
    </div>
  )
}

function BulletList({ items, c }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.8 }}>
      {items.map((item) => (
        <li key={item.slice(0, 40)} style={{ marginBottom: 6 }}>{item}</li>
      ))}
    </ul>
  )
}

export default function GrypsCase({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const { phone, tablet, narrow } = useBreakpoint()
  const caseCopy = GRYPS_CASE

  useEffect(() => {
    document.title = 'GRYPS — Featured case study · Henrique Moreira'
    return () => {
      document.title = SITE_TITLE
    }
  }, [])

  const rail = (
    <TelemetryRail
      isLight={isLight}
      rows={[
        { label: 'Model', value: 'v0.4 · deterministic scoring' },
        { label: 'Loop', value: 'assess → score → rank → document' },
        { label: 'Stack', value: caseCopy.architecture.stack },
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
              padding: '14px 14px',
              minHeight: 44,
              boxSizing: 'border-box',
              background: c.ice,
              color: '#07080D',
              fontFamily: "'Syne', sans-serif",
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.12em',
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
              padding: '8px',
            }}
          >
            Methodology →
          </a>
        </div>
      }
    />
  )

  const ctaFace = (filled) => ({
    padding: '14px 22px',
    minHeight: 48,
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: phone ? '100%' : undefined,
    background: filled ? c.ice : 'transparent',
    border: filled ? 'none' : `1px solid ${c.amber}`,
    color: filled ? '#07080D' : c.amber,
    fontFamily: "'Syne', sans-serif",
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textAlign: 'center',
  })

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

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: phone ? '0.16em' : '0.32em', color: c.ice, textTransform: 'uppercase', marginBottom: 16 }}>
          {caseCopy.eyebrow}
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
          {caseCopy.title}
        </h1>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: phone ? '16px' : 'clamp(16px, 2vw, 20px)',
            fontStyle: 'italic',
            color: c.body,
            maxWidth: '680px',
            lineHeight: 1.55,
            marginBottom: phone ? 20 : 28,
          }}
        >
          {caseCopy.subline}
        </p>

        <figure style={{ margin: '0 0 28px', maxWidth: 900 }}>
          <img
            src="/work/gryps-signature.png"
            alt="GRYPS live hero with R&D PROTOTYPE chip and mining Resilience Signature 83 · B, Rec #1 OneWeb · 85"
            width={1200}
            height={750}
            loading="eager"
            decoding="async"
            style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${c.iceBorder}`, borderRadius: 2, background: '#0B0F17' }}
          />
          <figcaption style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.08em', color: c.quiet, lineHeight: 1.55 }}>
            Live reference · mining 83 · B · OneWeb · 85 · Model v0.4 · R&D PROTOTYPE chip beside wordmark
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: phone ? 28 : 40, textAlign: 'left', minWidth: 0 }}>
            <div
              style={{
                border: `1px solid ${c.iceBorder}`,
                borderLeft: `3px solid ${c.ice}`,
                padding: phone ? '16px' : '18px 20px',
                background: isLight ? 'rgba(43,127,212,0.05)' : 'rgba(79,168,255,0.05)',
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.ice, textTransform: 'uppercase', marginBottom: 10 }}>
                What this hiring case proves
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.ink, lineHeight: 1.7, margin: 0 }}>
                {caseCopy.proves}
              </p>
            </div>

            {narrow && rail}

            <CaseSection id="problem" label={caseCopy.problem.label} accent={c.amber}>
              <Paras paras={caseCopy.problem.paras} c={c} />
            </CaseSection>

            <CaseSection id="why" label={caseCopy.why.label} accent={c.amber}>
              <Paras paras={caseCopy.why.paras} c={c} />
            </CaseSection>

            <CaseSection id="research" label={caseCopy.research.label} accent={c.amber}>
              <Paras paras={caseCopy.research.paras} c={c} />
            </CaseSection>

            <CaseSection id="role" label={caseCopy.role.label} accent={c.amber}>
              <Paras paras={caseCopy.role.paras} c={c} />
              <figure style={{ margin: '20px 0 0' }}>
                <img
                  src="/work/gryps-fi-hero.png"
                  alt="GRYPS Finnish UI with T&K-PROTOTYYPPI chip and mining Signature 83 · B, OneWeb · 85"
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${c.iceBorder}`, borderRadius: 2 }}
                />
                <figcaption style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.08em', color: c.quiet }}>
                  FI UI · T&K-PROTOTYYPPI chip · same mining reference 83 · B · OneWeb · 85
                </figcaption>
              </figure>
            </CaseSection>

            <CaseSection id="architecture" label={caseCopy.architecture.label} accent={c.amber}>
              <Paras paras={caseCopy.architecture.paras} c={c} />
              <div
                style={{
                  marginTop: 16,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: phone ? '10px' : '11px',
                  letterSpacing: phone ? '0.08em' : '0.12em',
                  color: c.ice,
                  padding: '16px 18px',
                  border: `1px solid ${c.iceBorder}`,
                  background: isLight ? 'rgba(43,127,212,0.06)' : '#0B0F17',
                  overflowWrap: 'anywhere',
                }}
              >
                LOOP · assess → score → rank → document
                <br />
                STACK · {caseCopy.architecture.stack}
              </div>
            </CaseSection>

            <CaseSection id="demonstration" label={caseCopy.demonstration.label} accent={c.amber}>
              <Paras paras={caseCopy.demonstration.paras} c={c} />
              <div
                style={{
                  marginTop: 20,
                  display: 'grid',
                  gridTemplateColumns: phone ? '1fr' : '1fr 1fr',
                  gap: 16,
                }}
              >
                <figure style={{ margin: 0 }}>
                  <img
                    src="/work/gryps-mobile-signature.png"
                    alt="GRYPS mobile Signature card — mining 83 · B with R&D PROTOTYPE chip and OneWeb · 85"
                    width={750}
                    height={1334}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${c.iceBorder}`, borderRadius: 2, background: '#0B0F17' }}
                  />
                  <figcaption style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.08em', color: c.quiet }}>
                    Mobile · Signature 83 · B · OneWeb · 85
                  </figcaption>
                </figure>
                <figure style={{ margin: 0 }}>
                  <img
                    src="/work/gryps-footer-disclosure.png"
                    alt="GRYPS footer disclosure — non-commercial R&D research prototype, Model v0.4, Espoo Finland"
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${c.iceBorder}`, borderRadius: 2, background: '#0B0F17' }}
                  />
                  <figcaption style={{ marginTop: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.08em', color: c.quiet }}>
                    Footer proof · non-commercial · Model v0.4 · Espoo
                  </figcaption>
                </figure>
              </div>
            </CaseSection>

            <CaseSection id="limitations" label={caseCopy.limitations.label} accent={c.amber}>
              <BulletList items={caseCopy.limitations.items} c={c} />
            </CaseSection>

            <CaseSection id="skills" label={caseCopy.skills.label} accent={c.amber}>
              <BulletList items={caseCopy.skills.items} c={c} />
            </CaseSection>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 8, flexDirection: phone ? 'column' : 'row' }}>
              <a href={GRYPS_ADVISOR} target="_blank" rel="nofollow noreferrer" style={ctaFace(true)}>
                Generate a Resilience Signature →
              </a>
              <a href={TRIANGORA_URL} target="_blank" rel="nofollow noreferrer" style={ctaFace(false)}>
                Next evidence: Triangora ↗
              </a>
              <Link to="/work/morea" style={{ ...ctaFace(false), borderColor: c.muted, color: c.muted }}>
                Morea brief →
              </Link>
            </div>
          </div>

          {!narrow && rail}
        </div>
      </article>
    </CaseShell>
  )
}
