import { Link } from 'react-router-dom'
import { t } from '../theme'

const YEAR = new Date().getFullYear()

export function CaseShell({ theme = 'dark', children }) {
  const isLight = theme === 'light'
  const c = t(isLight)

  return (
    <div style={{ background: c.bg, minHeight: '100vh', color: c.body, transition: 'background 0.4s ease' }}>
      {children}
      <footer
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 24px 56px',
          borderTop: `1px solid ${c.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" style={{ color: c.amber, fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/work/gryps" style={{ color: c.amber, fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textDecoration: 'none' }}>
            GRYPS
          </Link>
          <Link to="/work/morea" style={{ color: c.amber, fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textDecoration: 'none' }}>
            Morea
          </Link>
          <Link to="/about" style={{ color: c.amber, fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.16em', textDecoration: 'none' }}>
            About
          </Link>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: c.quiet, letterSpacing: '0.12em', lineHeight: 1.7 }}>
          © {YEAR} Henrique Moreira · Personal reskilling · Non-commercial · No accounts / no billing
        </div>
      </footer>
    </div>
  )
}

export function TelemetryRail({ isLight, rows, cta }) {
  const c = t(isLight)
  return (
    <aside
      style={{
        position: 'sticky',
        top: 72,
        alignSelf: 'start',
        border: `1px solid ${c.iceBorder}`,
        background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(11,15,23,0.85)',
        padding: '18px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.28em', color: c.ice, textTransform: 'uppercase' }}>
        Telemetry
      </div>
      {rows.map((r) => (
        <div key={r.label}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', letterSpacing: '0.2em', color: c.quiet, textTransform: 'uppercase', marginBottom: 4 }}>
            {r.label}
          </div>
          <div style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: c.ink, lineHeight: 1.45 }}>{r.value}</div>
        </div>
      ))}
      {cta}
    </aside>
  )
}

export function CaseSection({ id, label, children, accent }) {
  return (
    <section id={id} style={{ scrollMarginTop: 96 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: accent,
          marginBottom: '12px',
        }}
      >
        [{label}]
      </div>
      {children}
    </section>
  )
}
