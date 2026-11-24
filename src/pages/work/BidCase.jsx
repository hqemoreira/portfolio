import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CaseSection, CaseShell, TelemetryRail } from '../../components/CaseShell'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { BID_CASE, SITE_TITLE } from '../../copy'
import { t } from '../../theme'

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

export default function BidCase({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const { phone, tablet, narrow } = useBreakpoint()
  const study = BID_CASE

  useEffect(() => {
    document.title = `${study.title} · Henrique Moreira`
    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content')
    if (meta) meta.setAttribute('content', study.subline)
    return () => {
      document.title = SITE_TITLE
      if (meta && previous) meta.setAttribute('content', previous)
    }
  }, [study.subline, study.title])

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
          to="/#bid-case"
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
          ← Home
        </Link>

        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: phone ? '0.16em' : '0.32em', color: c.amber, textTransform: 'uppercase', marginBottom: 16 }}>
          Applied commercial case
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: phone ? '36px' : 'clamp(36px, 5vw, 60px)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: c.ink,
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            marginBottom: 16,
            maxWidth: 820,
          }}
        >
          {study.title}
        </h1>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: phone ? '16px' : 'clamp(16px, 2vw, 20px)',
            fontStyle: 'italic',
            color: c.body,
            maxWidth: '680px',
            lineHeight: 1.55,
            marginBottom: 16,
          }}
        >
          {study.subline}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: narrow ? '1fr' : 'minmax(0, 1fr) 260px',
            gap: phone ? 28 : 48,
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: phone ? 28 : 40, textAlign: 'left', minWidth: 0 }}>
            <CaseSection id="context" label={study.context.label} accent={c.amber}>
              <Paras paras={study.context.paras} c={c} />
            </CaseSection>
            <CaseSection id="challenges" label={study.challenges.label} accent={c.amber}>
              <BulletList items={study.challenges.items} c={c} />
            </CaseSection>
            <CaseSection id="approach" label={study.approach.label} accent={c.amber}>
              <Paras paras={study.approach.paras} c={c} />
              <div style={{ marginTop: 12 }}>
                <BulletList items={study.approach.items} c={c} />
              </div>
            </CaseSection>
            <CaseSection id="value" label={study.value.label} accent={c.amber}>
              <BulletList items={study.value.items} c={c} />
            </CaseSection>
          </div>
          <TelemetryRail
            isLight={isLight}
            rows={[
              { label: 'Setting', value: 'Multi-market B2B commercial operations' },
              { label: 'Focus', value: 'Information, pricing and coordination' },
              { label: 'Applications', value: 'Support for preparation' },
              { label: 'Decisions', value: 'Stay with the people responsible' },
            ]}
          />
        </div>
      </article>
    </CaseShell>
  )
}
