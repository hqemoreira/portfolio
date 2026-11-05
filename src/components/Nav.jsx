import { Link, useLocation } from 'react-router-dom'
import HMSymbol from './HMSymbol'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { t } from '../theme'

const linkBase = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '9px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  opacity: 0.8,
  transition: 'opacity 0.2s',
  padding: '8px 4px',
  minHeight: 44,
  display: 'inline-flex',
  alignItems: 'center',
  boxSizing: 'border-box',
}

function NavLink({ children, color, ...props }) {
  return (
    <a
      {...props}
      style={{ ...linkBase, color }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = 1 }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.8 }}
    >
      {children}
    </a>
  )
}

export default function Nav({ theme, onToggleTheme }) {
  const isLight = theme === 'light'
  const c = t(isLight)
  const { phone, tablet } = useBreakpoint()
  const compact = phone || tablet
  const location = useLocation()
  const onHome = location.pathname === '/'

  const handleLogoClick = (e) => {
    if (!onHome) return
    e.preventDefault()
    const hero = document.getElementById('hero')
    if (hero) hero.scrollIntoView()
    else window.scrollTo(0, 0)
  }

  const scrollHomeSection = (id) => (e) => {
    if (!onHome) return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: phone ? 8 : 12,
        paddingTop: phone ? 'max(10px, env(safe-area-inset-top))' : 14,
        paddingBottom: phone ? 10 : 14,
        paddingLeft: phone ? 'max(12px, env(safe-area-inset-left))' : tablet ? 24 : 40,
        paddingRight: phone ? 'max(12px, env(safe-area-inset-right))' : tablet ? 24 : 40,
        background: c.navBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `0.5px solid ${c.border}`,
        transition: 'background 0.4s ease',
      }}
    >
      <Link
        to="/"
        aria-label={onHome ? 'Back to top' : 'Home'}
        onClick={handleLogoClick}
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, minHeight: 44 }}
      >
        <HMSymbol size={phone ? 32 : 40} theme={isLight ? 'light' : 'dark'} />
      </Link>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: phone ? 6 : tablet ? 12 : 20,
          flexWrap: 'nowrap',
          minWidth: 0,
        }}
      >
        <NavLink href="/#work" color={c.amber} onClick={scrollHomeSection('work')}>
          Work
        </NavLink>
        <Link
          to="/about"
          style={{ ...linkBase, color: c.amber }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = 1 }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.8 }}
        >
          About
        </Link>
        <NavLink href="/#contact" color={c.amber} onClick={scrollHomeSection('contact')}>
          Contact
        </NavLink>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
          title={isLight ? 'Dark theater' : 'Arctic day'}
          style={{
            background: isLight ? 'rgba(166,106,20,0.08)' : 'transparent',
            border: `1px solid ${isLight ? 'rgba(166,106,20,0.45)' : 'rgba(212,137,30,0.25)'}`,
            borderRadius: '2px',
            padding: phone ? '10px 12px' : compact ? '8px 10px' : '8px 12px',
            minHeight: 44,
            minWidth: phone ? 52 : undefined,
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: phone ? '10px' : '10px',
            letterSpacing: phone ? '0.06em' : '0.12em',
            color: c.amber,
            opacity: 0.95,
            transition: 'opacity 0.2s, background 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = 1 }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.95 }}
        >
          {isLight ? (phone ? 'Dark' : '◑ Dark') : (phone ? 'Day' : '◑ Light')}
        </button>
      </div>
    </nav>
  )
}
