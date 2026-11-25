import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import {
  CAPABILITIES_GROUPS,
  CAPABILITIES_HEADLINE,
  CONTACT_BODY,
  CONTACT_HEADLINE,
  CV_PATH,
  EMAIL,
  PROJECT_BRIEFS,
  SITE_DESCRIPTION,
  SITE_TITLE,
  GITHUB_URL,
  GRYPS_PRIMARY_CTA,
  HERO_FOCUS,
  HERO_IDENTITY_PRIMARY,
  HERO_IDENTITY_SECONDARY,
  HERO_LOCATION,
  HERO_SUBLINE,
  HERO_SUPPORT,
  EXPERIENCE_PARAS,
  NONCOMMERCIAL_LINE,
  LINKEDIN_URL,
  MONOPATI_LINK_LABEL,
  MONOPATI_ONGOING,
  PROJECT_CONTRIBUTIONS,
  TRIANGORA_CAPTION,
} from '../copy'
import { GRYPS_ADVISOR, GRYPS_METHOD, MOREA_URL, TRIANGORA_URL, t } from '../theme'

function CaseShot({ src, alt, caption, border }) {
  return (
    <figure style={{ margin: '0 0 20px', textAlign: 'left' }}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={750}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: 2,
          border: `1px solid ${border}`,
          background: '#0B0F17',
        }}
      />
      {caption ? (
        <figcaption
          style={{
            marginTop: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px',
            letterSpacing: '0.08em',
            color: 'inherit',
            opacity: 0.75,
            lineHeight: 1.55,
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

const SignatureInstrument = lazy(() => import('../components/SignatureInstrument'))

/** Lycaon Pictus coat field — gold / tan / umber mottling only (no ice blue) */
const COAT = {
  gold: { r: 212, g: 137, b: 30 },
  tan: { r: 166, g: 124, b: 82 },
  umber: { r: 92, g: 58, b: 30 },
  cream: { r: 240, g: 232, b: 216 },
}

function pickCoat(i) {
  const roll = (i * 17 + 11) % 100
  if (roll < 42) return 'gold'
  if (roll < 72) return 'tan'
  if (roll < 92) return 'umber'
  return 'cream'
}

function useConstellation(canvasRef, isLight, reducedMotion, particleCount = 42) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const n = particleCount
    const particles = Array.from({ length: n }, (_, i) => {
      const tier = i < 6 ? 'alpha' : i < 18 ? 'beta' : 'omega'
      const coat = tier === 'omega' && i % 7 === 0 ? 'cream' : pickCoat(i)
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (tier === 'alpha' ? 0.26 : 0.11),
        vy: (Math.random() - 0.5) * (tier === 'alpha' ? 0.2 : 0.09),
        size:
          tier === 'alpha'
            ? Math.random() * 3.2 + 3.2
            : tier === 'beta'
              ? Math.random() * 1.6 + 1.5
              : Math.random() * 0.7 + 0.4,
        opacity: tier === 'alpha' ? 0.92 : tier === 'beta' ? 0.55 : coat === 'cream' ? 0.28 : 0.2,
        pulse: Math.random() * Math.PI * 2,
        tier,
        coat,
      }
    })
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const hubs = particles.filter((p) => p.tier !== 'omega')
      hubs.forEach((a, ai) => {
        hubs.forEach((b, bi) => {
          if (ai >= bi) return
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxD = a.tier === 'alpha' && b.tier === 'alpha' ? 220 : 130
          if (dist < maxD) {
            const link = a.coat === 'umber' || b.coat === 'umber' ? COAT.tan : COAT.gold
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${link.r},${link.g},${link.b},${(isLight ? 0.18 : 0.17) * (1 - dist / maxD)})`
            ctx.lineWidth = a.tier === 'alpha' && b.tier === 'alpha' ? 0.85 : 0.35
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })
      particles.forEach((p) => {
        const pm = p.tier === 'alpha' ? Math.sin(p.pulse) * 0.12 + 0.88 : 1
        const { r, g, b } = COAT[p.coat] || COAT.gold
        const opMult = isLight ? 0.42 : 1
        if (p.tier === 'alpha') {
          const glow = p.size * 5.5
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow)
          grad.addColorStop(0, `rgba(${r},${g},${b},${0.28 * opMult})`)
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
          ctx.beginPath()
          ctx.fillStyle = grad
          ctx.arc(p.x, p.y, glow, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pm, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity * pm * opMult})`
        ctx.fill()
        if (!reducedMotion) {
          p.pulse += 0.016
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = canvas.width + 10
          if (p.x > canvas.width + 10) p.x = -10
          if (p.y < -10) p.y = canvas.height + 10
          if (p.y > canvas.height + 10) p.y = -10
        }
      })
      if (!reducedMotion) animId = requestAnimationFrame(draw)
    }
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw()
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, isLight, reducedMotion, particleCount])
}

function useScrollReveal(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          el.style.filter = 'blur(0px)'
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

function RevealWrapper({ children, delay = 0 }) {
  const ref = useRef(null)
  useScrollReveal(ref)
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(28px)',
        filter: 'blur(5px)',
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function BgLayers({ isLight }) {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.011 0.009' numOctaves='5' seed='12' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0.5 0 0 0 0.09 0.3 0 0 0 0.05 0 0 0 0 0.01 0 0 0 0.16 0'/%3E%3C/filter%3E%3Crect width='800' height='800' filter='url(%23c)'/%3E%3C/svg%3E")`,
          backgroundSize: '800px',
          opacity: isLight ? 0.08 : 0.45,
          mixBlendMode: isLight ? 'multiply' : 'screen',
        }}
      />
      {!isLight && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse 90% 55% at 50% 28%, rgba(212,137,30,0.1) 0%, transparent 58%)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse 110% 55% at 20% 100%, rgba(92,58,30,0.14) 0%, transparent 55%)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse 120% 60% at 80% 105%, rgba(180,90,20,0.1) 0%, transparent 55%)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 4,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 42%, transparent 18%, rgba(7,8,13,0.52) 100%)',
            }}
          />
        </>
      )}
    </>
  )
}

function Section({ id, children, style = {}, isLight }) {
  const { phone, tablet } = useBreakpoint()
  const c = t(isLight)
  return (
    <section
      id={id}
      style={{
        position: 'relative',
        zIndex: 5,
        maxWidth: '960px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        padding: phone ? '48px 16px' : tablet ? '72px 28px' : '100px 40px',
        textAlign: 'center',
        borderTop: `1px solid ${c.border}`,
        ...style,
      }}
    >
      {children}
    </section>
  )
}

function SectionEyebrow({ children, color }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '28px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '9px',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color,
      }}
    >
      <span style={{ width: '24px', height: '1px', background: color, opacity: 0.5 }} />
      {children}
    </div>
  )
}

function CtaPrimary({ href, children, ice, block }) {
  const color = ice ? '#4FA8FF' : '#D4891E'
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'nofollow noreferrer' : undefined}
      style={{ textDecoration: 'none', display: block ? 'block' : 'inline-block', width: block ? '100%' : undefined, maxWidth: block ? 420 : undefined }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px 18px',
          minHeight: 44,
          width: block ? '100%' : undefined,
          boxSizing: 'border-box',
          border: `1px solid ${color}`,
          background: color,
          color: '#07080D',
          fontFamily: "'Syne', sans-serif",
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          borderRadius: '1px',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'transform 0.15s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 28px ${ice ? 'rgba(79,168,255,0.35)' : 'rgba(212,137,30,0.4)'}`
          e.currentTarget.style.transform = 'scale(0.98)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {children}
      </div>
    </a>
  )
}

function GhostFace({ children, color, block }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 18px',
        minHeight: 44,
        width: block ? '100%' : undefined,
        boxSizing: 'border-box',
        border: `1px solid ${color}`,
        color,
        fontFamily: "'Syne', sans-serif",
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        borderRadius: '1px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = `${color}14` }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      {children}
    </div>
  )
}

function CtaGhost({ href, children, color, internal, block }) {
  const wrap = block
    ? { textDecoration: 'none', display: 'block', width: '100%', maxWidth: 420 }
    : { textDecoration: 'none', display: 'inline-block' }
  if (internal) {
    return (
      <Link to={href} style={wrap}>
        <GhostFace color={color} block={block}>{children}</GhostFace>
      </Link>
    )
  }
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'nofollow noreferrer' : undefined}
      style={wrap}
    >
      <GhostFace color={color} block={block}>{children}</GhostFace>
    </a>
  )
}

function Hero({ isLight }) {
  const canvasRef = useRef(null)
  const { phone, tablet } = useBreakpoint()
  const reducedMotion = usePrefersReducedMotion()
  const c = t(isLight)
  useConstellation(canvasRef, isLight, reducedMotion, phone ? 24 : tablet ? 34 : 42)
  const titleSize = phone ? 'clamp(36px, 11.5vw, 56px)' : tablet ? 'clamp(48px, 8vw, 84px)' : 'clamp(52px, 9vw, 104px)'

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: phone ? 'auto' : '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: phone ? 'max(80px, calc(56px + env(safe-area-inset-top)))' : tablet ? 96 : 100,
        paddingBottom: phone ? 'max(40px, env(safe-area-inset-bottom))' : 56,
        paddingLeft: phone ? 'max(16px, env(safe-area-inset-left))' : tablet ? 28 : 40,
        paddingRight: phone ? 'max(16px, env(safe-area-inset-right))' : tablet ? 28 : 40,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center',
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: phone ? '8px' : '9px',
            letterSpacing: phone ? '0.08em' : '0.12em',
            textTransform: 'uppercase',
            color: c.amber,
            marginBottom: phone ? '10px' : '14px',
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) both',
            lineHeight: 1.6,
          }}
        >
          {HERO_IDENTITY_PRIMARY}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: phone ? '8px' : '9px',
            letterSpacing: phone ? '0.1em' : '0.16em',
            textTransform: 'uppercase',
            color: c.muted,
            marginBottom: phone ? '14px' : '20px',
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.04s both',
            lineHeight: 1.6,
          }}
        >
          {HERO_IDENTITY_SECONDARY}
        </div>
        <h1 style={{ margin: 0 }}>
          <span
            style={{
              display: 'block',
              fontFamily: "'Fraunces', serif",
              fontSize: titleSize,
              fontWeight: 200,
              fontStyle: 'italic',
              letterSpacing: phone ? '-0.03em' : '-0.04em',
              lineHeight: 0.92,
              color: c.ink,
              whiteSpace: 'nowrap',
              textShadow: isLight ? 'none' : '0 0 90px rgba(212,137,30,0.2), 0 0 40px rgba(212,137,30,0.12)',
              animation: 'hmTitleIn 1.2s cubic-bezier(0.16,1,0.3,1) both',
            }}
          >
            HENRIQUE
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: "'Fraunces', serif",
              fontSize: titleSize,
              fontWeight: 200,
              fontStyle: 'italic',
              letterSpacing: phone ? '-0.03em' : '-0.04em',
              lineHeight: 0.92,
              color: c.amber,
              whiteSpace: 'nowrap',
              textShadow: isLight
                ? 'none'
                : '0 0 100px rgba(212,137,30,0.45), 0 0 48px rgba(212,137,30,0.28), 0 0 16px rgba(166,124,82,0.2)',
              marginBottom: phone ? '16px' : '22px',
              animation: 'hmTitleIn 1.2s cubic-bezier(0.16,1,0.3,1) 0.08s both',
            }}
          >
            MOREIRA
          </span>
        </h1>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: phone ? '15px' : 'clamp(15px, 1.8vw, 19px)',
            fontStyle: 'italic',
            color: c.body,
            lineHeight: 1.55,
            maxWidth: '640px',
            margin: '0 auto 12px',
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both',
          }}
        >
          {HERO_SUBLINE}
        </p>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: phone ? '14px' : '15px',
            color: c.body,
            lineHeight: 1.65,
            maxWidth: '640px',
            margin: '0 auto 16px',
            opacity: 0.92,
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.24s both',
          }}
        >
          {HERO_SUPPORT}
        </p>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: phone ? '9px' : '10px',
            letterSpacing: phone ? '0.08em' : '0.14em',
            textTransform: 'uppercase',
            color: c.amber,
            lineHeight: 1.6,
            marginBottom: '22px',
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.28s both',
          }}
        >
          {HERO_FOCUS}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            flexDirection: phone ? 'column' : 'row',
            alignItems: phone ? 'stretch' : 'center',
            justifyContent: 'center',
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.32s both',
          }}
        >
          <CtaPrimary href={GRYPS_ADVISOR} ice={false} block={phone}>
            {GRYPS_PRIMARY_CTA}
          </CtaPrimary>
          <CtaGhost href="#contact" color={c.amber} block={phone}>
            Get in touch
          </CtaGhost>
        </div>
        <div
          style={{
            marginTop: phone ? '14px' : '18px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: phone ? '9px' : '10px',
            letterSpacing: '0.06em',
            color: c.muted,
            lineHeight: 1.5,
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.34s both',
          }}
        >
          {HERO_LOCATION}
        </div>
        <div
          style={{
            marginTop: phone ? '28px' : '40px',
            animation: reducedMotion ? 'none' : 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.28em',
              color: c.quiet,
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Scroll
          </div>
          <div
            style={{
              width: '1px',
              height: phone ? '28px' : '40px',
              background: 'linear-gradient(to bottom, rgba(212,137,30,0.55), transparent)',
              margin: '0 auto',
              animation: reducedMotion ? 'none' : 'hmBounce 2.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}

function ProjectBrief({ brief, ink, body }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '640px', marginBottom: '16px' }}>
      {brief.map((row) => (
        <p key={row.label} style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: body, lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: ink }}>{row.label}.</strong> {row.text}
        </p>
      ))}
    </div>
  )
}

function ContributionDetails({ contribution, ink, body, quiet, accent, panelId }) {
  const [open, setOpen] = useState(false)
  const rows = [
    ['Problem identified', contribution.problem],
    ['Why this approach', contribution.approach],
    ['Designed', contribution.designed],
    ['Developed', contribution.implemented],
    ['Decisions that were mine', contribution.decisions || contribution.keyDecision],
    ['Learned / would improve', contribution.learned],
  ].filter(([, text]) => Boolean(text))

  if (rows.length === 0) return null

  const id = panelId || 'contribution-panel'

  return (
    <div style={{ marginTop: 8, marginBottom: 14, maxWidth: 640 }}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          width: '100%',
          minHeight: 44,
          padding: '10px 0',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${quiet}44`,
          color: ink,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          What I contributed &amp; design decisions
        </span>
        <span
          aria-hidden
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            color: accent || ink,
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div
          id={id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingTop: 14,
            paddingBottom: 4,
          }}
        >
          {rows.map(([label, text]) => (
            <p key={label} style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: body, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: ink }}>{label}:</strong> {text}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function AboutSection({ isLight }) {
  const { phone, narrow } = useBreakpoint()
  const c = t(isLight)

  return (
    <Section id="experience" isLight={isLight}>
      <RevealWrapper>
        <SectionEyebrow color={c.amber}>Experience</SectionEyebrow>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: narrow ? '1fr' : 'minmax(0, 200px) 1fr',
            gap: phone ? '20px' : '36px',
            alignItems: 'start',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              border: `1px solid ${c.border}`,
              background: '#1A1612',
              maxWidth: narrow ? 220 : undefined,
              margin: narrow ? '0 auto' : undefined,
            }}
          >
            <picture>
              <source srcSet="/henrique.webp" type="image/webp" />
              <img
                src="/henrique.jpg"
                alt="Henrique Moreira presenting, holding notes and a clicker"
                width={530}
                height={1100}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: '50% 15%',
                  maxHeight: phone ? '220px' : '280px',
                  filter: isLight ? 'brightness(1.05)' : 'brightness(0.92)',
                }}
              />
            </picture>
          </div>
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: phone ? '28px' : 'clamp(30px, 3.8vw, 44px)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: c.ink,
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                marginBottom: '18px',
              }}
            >
              Professional experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {EXPERIENCE_PARAS.map((para) => (
                <p key={para.slice(0, 32)} style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.7, color: c.body, margin: 0 }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </RevealWrapper>
    </Section>
  )
}

function Capabilities({ isLight }) {
  const { phone } = useBreakpoint()
  const c = t(isLight)

  return (
    <Section id="capabilities" isLight={isLight}>
      <RevealWrapper>
        <SectionEyebrow color={c.amber}>Capabilities</SectionEyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: phone ? '28px' : 'clamp(30px, 3.8vw, 44px)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: c.ink,
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
            marginBottom: '22px',
            textAlign: 'left',
          }}
        >
          {CAPABILITIES_HEADLINE}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: phone ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: phone ? '18px' : '22px',
            textAlign: 'left',
          }}
        >
          {CAPABILITIES_GROUPS.map((group) => (
            <div key={group.title} style={{ borderTop: `2px solid ${c.amber}`, paddingTop: 12 }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  color: c.ink,
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}
              >
                {group.title}
              </div>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', lineHeight: 1.55, color: c.body, margin: 0 }}>
                {group.items}
              </p>
            </div>
          ))}
        </div>
      </RevealWrapper>
    </Section>
  )
}

const ARCHIVES = [
  { name: 'Grantemia', blurb: 'Research-funding matching · shelved learning', href: 'https://grantemia.fi' },
  { name: 'Velu', blurb: 'B2B ops intelligence modules · research prototype', href: 'https://velu.fi' },
  { name: 'Lycaon', blurb: 'Anticipatory foresight · exploratory, not active', href: 'https://lycaon.vercel.app' },
  { name: 'DisclAI', blurb: 'EU AI Act drafting demo · exploratory', href: 'https://disclai.vercel.app' },
  { name: 'Iraun', blurb: 'Personal AI ops assistant · exploratory', href: 'https://iraun.vercel.app' },
]

function GrypsCase({ isLight }) {
  const { phone, tablet } = useBreakpoint()
  const c = t(isLight)
  const figCap = { color: c.quiet }
  return (
    <div id="case" style={{ textAlign: 'left' }}>
      <RevealWrapper delay={80}>
        <div
          style={{
            background: c.panel,
            border: `1px solid ${c.iceBorder}`,
            borderLeft: `4px solid ${c.ice}`,
            borderRadius: '2px',
            padding: phone ? '20px 16px' : tablet ? '26px 24px' : '32px 36px',
            textAlign: 'left',
            marginBottom: '8px',
            minWidth: 0,
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: phone ? '0.16em' : '0.28em', color: c.ice, textTransform: 'uppercase', marginBottom: '12px' }}>
            01 · Research prototype · Model v0.4
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '36px' : 'clamp(34px, 4.5vw, 52px)', fontWeight: 200, fontStyle: 'italic', color: c.ink, letterSpacing: '-0.03em', marginBottom: '10px' }}>
            GRYPS
          </div>
          <ProjectBrief brief={PROJECT_BRIEFS.gryps} ink={c.ink} body={c.body} />

          <div style={{ ...figCap }}>
            <CaseShot
              src="/work/gryps-signature.png"
              alt="GRYPS live hero with R&D PROTOTYPE chip and mining Resilience Signature 83 · B, Rec #1 OneWeb · 85"
              caption="Live reference · mining 83 · B · OneWeb · 85 · Model v0.4 · R&D PROTOTYPE chip (no amber banner)"
              border={c.iceBorder}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: phone ? 'stretch' : 'center', flexDirection: phone ? 'column' : 'row' }}>
            <CtaPrimary href={GRYPS_ADVISOR} ice block={phone}>
              Verify in a minute →
            </CtaPrimary>
            <CtaGhost href="/work/gryps" color={c.ice} internal block={phone}>
              Full brief
            </CtaGhost>
            <a
              href={GRYPS_METHOD}
              target="_blank"
              rel="nofollow noreferrer"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', color: c.muted, textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Methodology →
            </a>
          </div>
          <ContributionDetails
            contribution={PROJECT_CONTRIBUTIONS.gryps}
            ink={c.ink}
            body={c.body}
            quiet={c.quiet}
            accent={c.ice}
            panelId="gryps-contribution-panel"
          />
        </div>

        <Suspense
          fallback={
            <div aria-hidden style={{ minHeight: 280, borderRadius: 2, border: `1px solid ${c.iceBorder}`, background: '#0B0F17' }} />
          }
        >
          <SignatureInstrument variant="full" />
        </Suspense>
        <div style={{ marginTop: '10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.06em', color: c.quiet, textAlign: 'left', lineHeight: 1.6 }}>
          Illustrative Signature (demo freeze) · generate a live assessment in the Advisor
        </div>
      </RevealWrapper>
    </div>
  )
}


function Work({ isLight }) {
  const { phone } = useBreakpoint()
  const c = t(isLight)
  const [archivesOpen, setArchivesOpen] = useState(false)
  const figCap = { color: c.quiet }

  return (
    <Section id="work" isLight={isLight} style={{ maxWidth: '1040px', width: '100%' }}>
      <RevealWrapper>
        <SectionEyebrow color={c.ice}>Projects</SectionEyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(28px, 3.8vw, 48px)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: c.ink,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Selected projects
        </h2>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: c.muted,
            margin: '0 0 28px',
            textAlign: 'left',
          }}
        >
          GRYPS leads. Triangora and Morea follow.
        </p>
      </RevealWrapper>

      <GrypsCase isLight={isLight} />

      {/* Triangora featured */}
      <RevealWrapper delay={120}>
        <div
          style={{
            marginTop: '40px',
            background: c.panel,
            border: `1px solid ${c.border}`,
            borderLeft: `4px solid ${c.teal}`,
            borderRadius: '2px',
            padding: phone ? '20px 16px' : '28px 32px',
            textAlign: 'left',
            minWidth: 0,
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.teal, textTransform: 'uppercase', marginBottom: '10px' }}>
            02 · Multi-agent verification
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '30px' : '36px', fontWeight: 200, fontStyle: 'italic', color: c.ink, marginBottom: '10px' }}>
            Triangora
          </div>
          <ProjectBrief brief={PROJECT_BRIEFS.triangora} ink={c.ink} body={c.body} />
          <div style={{ ...figCap }}>
            <CaseShot
              src="/work/triangora-verdict.png"
              alt="Triangora verification diagram — claim, independent source families, verdict"
              caption={TRIANGORA_CAPTION}
              border={c.border}
            />
          </div>
          <ContributionDetails
            contribution={PROJECT_CONTRIBUTIONS.triangora}
            ink={c.ink}
            body={c.body}
            quiet={c.quiet}
            accent={c.teal}
            panelId="triangora-contribution-panel"
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flexDirection: phone ? 'column' : 'row' }}>
            <CtaGhost href={TRIANGORA_URL} color={c.teal} block={phone}>
              Open prototype ↗
            </CtaGhost>
          </div>
        </div>
      </RevealWrapper>

      {/* Morea featured */}
      <RevealWrapper delay={140}>
        <div
          style={{
            marginTop: '24px',
            background: c.panel,
            border: `1px solid ${c.border}`,
            borderLeft: `4px solid ${c.amber}`,
            borderRadius: '2px',
            padding: phone ? '20px 16px' : '28px 32px',
            textAlign: 'left',
            minWidth: 0,
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.amber, textTransform: 'uppercase', marginBottom: '10px' }}>
            03 · Educational literacy
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '30px' : '36px', fontWeight: 200, fontStyle: 'italic', color: c.ink, marginBottom: '10px' }}>
            Morea
          </div>
          <ProjectBrief brief={PROJECT_BRIEFS.morea} ink={c.ink} body={c.body} />
          <div style={{ ...figCap }}>
            <CaseShot
              src="/work/morea-dossier.png"
              alt="Morea sample Evidence Pack dossier with track, inventory, quiz, and verification ID"
              caption="Illustrative Evidence Pack · dated, hashable, printable · not auditor attestation"
              border={c.border}
            />
          </div>
          <ContributionDetails
            contribution={PROJECT_CONTRIBUTIONS.morea}
            ink={c.ink}
            body={c.body}
            quiet={c.quiet}
            accent={c.amber}
            panelId="morea-contribution-panel"
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', flexDirection: phone ? 'column' : 'row' }}>
            <CtaGhost href={MOREA_URL} color={c.amber} block={phone}>
              Open prototype ↗
            </CtaGhost>
            <CtaGhost href="/work/morea" color={c.muted} internal block={phone}>
              Full brief
            </CtaGhost>
          </div>
        </div>
      </RevealWrapper>

      {/* Ongoing development · Monopati */}
      <RevealWrapper delay={150}>
        <div
          style={{
            marginTop: '28px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: phone ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: phone ? '8px' : '16px',
            alignItems: phone ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            paddingTop: 16,
            borderTop: `1px solid ${c.divider}`,
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.muted, letterSpacing: '0.08em', lineHeight: 1.5 }}>
            {MONOPATI_ONGOING}
          </span>
          <a
            href="https://monopati.vercel.app/progress"
            target="_blank"
            rel="nofollow noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: c.teal,
              letterSpacing: '0.1em',
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              flexShrink: 0,
            }}
          >
            {MONOPATI_LINK_LABEL}
          </a>
        </div>
      </RevealWrapper>

      {/* Also built */}
      <RevealWrapper delay={160}>
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.28em', color: c.muted, textTransform: 'uppercase', marginBottom: '16px' }}>
            Also built
          </div>
          <div style={{ border: `1px solid ${c.border}`, padding: '16px', minWidth: 0, marginBottom: '16px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.muted, textTransform: 'uppercase', marginBottom: 8 }}>
              Internal · Private
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontStyle: 'italic', color: c.ink, marginBottom: 8 }}>FORGE</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: c.body, lineHeight: 1.6, margin: 0 }}>
              Personal projects dashboard — private; no public login.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setArchivesOpen((o) => !o)}
            aria-expanded={archivesOpen}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              background: 'transparent',
              border: `1px solid ${c.border}`,
              padding: '14px 16px',
              cursor: 'pointer',
              color: c.muted,
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
              Earlier Experiments &amp; Prototypes
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.amber }}>{archivesOpen ? '−' : '+'}</span>
          </button>
          {archivesOpen && (
            <div style={{ border: `1px solid ${c.border}`, borderTop: 'none' }}>
              {ARCHIVES.map((a) => (
                <a
                  key={a.name}
                  href={a.href}
                  target="_blank"
                  rel="nofollow noreferrer"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: phone ? '1fr' : '140px 1fr auto',
                    gap: '8px 16px',
                    padding: '14px 16px',
                    borderBottom: `1px solid ${c.divider}`,
                    textDecoration: 'none',
                    color: 'inherit',
                    minHeight: 48,
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', color: c.ink }}>{a.name}</span>
                  <span style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: c.body }}>{a.blurb}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: c.amber, letterSpacing: '0.1em' }}>Open ↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </RevealWrapper>
    </Section>
  )
}

function Contact({ isLight }) {
  const { phone } = useBreakpoint()
  const c = t(isLight)
  const year = new Date().getFullYear()
  const legalLink = {
    color: c.quiet,
    textDecoration: 'none',
    borderBottom: `1px solid ${c.quiet}55`,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '8px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    padding: '8px 2px',
    minHeight: 40,
    display: 'inline-flex',
    alignItems: 'center',
  }
  const contactBtn = (filled) => ({
    padding: '14px 22px',
    minHeight: 48,
    boxSizing: 'border-box',
    width: phone ? '100%' : undefined,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: filled ? c.amber : 'transparent',
    border: filled ? 'none' : `1px solid ${c.amber}`,
    color: filled ? '#07080D' : c.amber,
    fontFamily: "'Syne', sans-serif",
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
  })

  return (
    <Section id="contact" isLight={isLight} style={{ textAlign: 'center', paddingBottom: phone ? 'max(40px, env(safe-area-inset-bottom))' : '56px' }}>
      <RevealWrapper>
        <SectionEyebrow color={c.amber}>Contact</SectionEyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: phone ? '26px' : 'clamp(26px, 3.6vw, 44px)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: c.ink,
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            maxWidth: '680px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {CONTACT_HEADLINE}
        </h2>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: phone ? '14px' : '15px',
            color: c.body,
            lineHeight: 1.7,
            maxWidth: '580px',
            margin: '0 auto 12px',
          }}
        >
          {CONTACT_BODY}
        </p>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.quiet, letterSpacing: '0.08em', marginBottom: '32px' }}>
          Espoo, Finland · International perspective
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', flexDirection: phone ? 'column' : 'row', alignItems: phone ? 'stretch' : 'center', marginBottom: '16px', maxWidth: phone ? 360 : undefined, marginLeft: 'auto', marginRight: 'auto' }}>
          <a href={CV_PATH} download="Henrique_Moreira_CV.pdf" style={{ textDecoration: 'none', width: phone ? '100%' : undefined }}>
            <div style={contactBtn(true)}>Download CV</div>
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', width: phone ? '100%' : undefined }}>
            <div style={contactBtn(false)}>LinkedIn ↗</div>
          </a>
        </div>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px', alignItems: 'center' }}>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: c.muted,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              padding: '8px 4px',
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {EMAIL}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: c.muted,
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              padding: '8px 4px',
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            GitHub ↗
          </a>
        </div>
        <div style={{ borderTop: `1px solid ${c.divider}`, paddingTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/about" style={legalLink}>About</Link>
            <span style={{ color: c.quiet, opacity: 0.4 }}>·</span>
            <Link to="/privacy" style={legalLink}>Privacy</Link>
            <span style={{ color: c.quiet, opacity: 0.4 }}>·</span>
            <Link to="/terms" style={legalLink}>Terms</Link>
            <span style={{ color: c.quiet, opacity: 0.4 }}>·</span>
            <Link to="/work/gryps" style={legalLink}>GRYPS brief</Link>
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontStyle: 'italic', color: c.quiet }}>H·M</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: c.quiet, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Vila Nova de Gaia → Espoo
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: c.quiet, letterSpacing: '0.12em' }}>
            © {year} Henrique Moreira · All rights reserved
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: c.quiet, opacity: 0.85, letterSpacing: '0.12em' }}>
            {NONCOMMERCIAL_LINE}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: c.quiet, opacity: 0.65 }}>
            Vite · React · React Router · Vercel
          </div>
        </div>
      </RevealWrapper>
    </Section>
  )
}

function BidConcept({ isLight }) {
  const { phone } = useBreakpoint()
  const c = t(isLight)
  return (
    <Section id="bid-case" isLight={isLight} style={{ textAlign: 'left', maxWidth: '1040px', paddingTop: phone ? 40 : 64, paddingBottom: phone ? 40 : 64 }}>
      <RevealWrapper>
        <SectionEyebrow color={c.amber}>Applied commercial case</SectionEyebrow>
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(28px, 3.8vw, 44px)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: c.ink,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 14px',
            maxWidth: 720,
          }}
        >
          How I Think About Applying AI to International B2B Commercial Processes
        </h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.7, color: c.body, margin: '0 0 18px', maxWidth: 680 }}>
          A showcase of my thinking on how AI can support international sales, pricing and commercial operations. Starting with the business context, I mapped process challenges, identified opportunities and explored how AI could help improve decisions, coordination and execution across markets and accounts.
        </p>
        <CtaGhost href="/work/bids" color={c.amber} internal>
          Explore my approach
        </CtaGhost>
      </RevealWrapper>
    </Section>
  )
}

export default function Portfolio({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)

  useEffect(() => {
    document.title = SITE_TITLE
    const style = document.createElement('style')
    style.id = 'portfolio-styles'
    style.textContent = `
      @keyframes hmTitleIn { from { opacity: 0; transform: translateY(24px); filter: blur(8px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
      @keyframes hmFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes hmBounce { 0%,100%{ transform: translateY(0); opacity: 0.55; } 50%{ transform: translateY(6px); opacity: 1; } }
    `
    document.head.appendChild(style)

    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'portfolio-schema'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://henriquemoreira.eu/#person',
          name: 'Henrique Moreira',
          url: 'https://henriquemoreira.eu',
          email: 'hqe.moreira@gmail.com',
          jobTitle: 'International B2B Sales & Commercial Management',
          description:
            SITE_DESCRIPTION + ' Personal reskilling, non-commercial. Lead proof: GRYPS. A separate case shows how applied AI could support international commercial processes.',
          address: { '@type': 'PostalAddress', addressLocality: 'Espoo', addressCountry: 'FI' },
          sameAs: ['https://www.linkedin.com/in/hqemoreira', 'https://github.com/hqemoreira'],
          knowsAbout: ['International B2B', 'Industrial Business', 'Applied AI', 'Digital Transformation', 'Systems Thinking', 'EU AI Act', 'Commercial Operations'],
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://henriquemoreira.eu/#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is this site?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A personal reskilling portfolio for Henrique Moreira (Espoo, Finland). The foundation is an international commercial career. GRYPS, Triangora and Morea are non-commercial prototypes that extend that experience. Earlier prototypes are Grantemia, Velu, Lycaon, DisclAI, and Iraun. LitrixEU is not a project on this site. Monopati is the study path. Machine-readable guidance: https://henriquemoreira.eu/llms.txt',
              },
            },
            {
              '@type': 'Question',
              name: 'What is GRYPS?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'GRYPS is a non-commercial skill demo: enter a site profile and get a Resilience Signature (score, grade, risks, ranked options) from Model v0.4. Live Advisor: https://gryps.vercel.app/#advisor — case brief: https://henriquemoreira.eu/work/gryps',
              },
            },
            {
              '@type': 'Question',
              name: 'How does the commercial case use applied AI?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Applying AI to International B2B Commercial Processes describes how applied AI could support international sales, pricing and commercial operations. Pricing approvals and customer commitments stay with the people responsible. https://henriquemoreira.eu/work/bids',
              },
            },
            {
              '@type': 'Question',
              name: 'Are the prototypes for sale?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. GRYPS, Triangora, Morea, and earlier learning prototypes are non-commercial research / skill demos. None are products for sale.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is FORGE a public product?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. FORGE is a private personal ops dashboard. It is not offered as a public product or login destination.',
              },
            },
          ],
        },
      ],
    })
    document.head.appendChild(schema)

    return () => {
      document.getElementById('portfolio-styles')?.remove()
      document.getElementById('portfolio-schema')?.remove()
    }
  }, [])

  return (
    <div style={{ background: c.bg, minHeight: '100vh', overflowX: 'hidden', transition: 'background 0.4s ease' }}>
      <BgLayers isLight={isLight} />
      <Hero isLight={isLight} />
      <Capabilities isLight={isLight} />
      <BidConcept isLight={isLight} />
      <Work isLight={isLight} />
      <AboutSection isLight={isLight} />
      <Contact isLight={isLight} />
    </div>
  )
}
