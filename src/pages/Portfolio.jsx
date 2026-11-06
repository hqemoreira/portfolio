import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import {
  CV_PATH,
  EMAIL,
  GITHUB_URL,
  HERO_ASK,
  HERO_SUBLINE,
  HIRING_ONE_LINER,
  LINKEDIN_URL,
  MONOPATI_TRUST,
  NONCOMMERCIAL_LINE,
  ROLE_FOCUS,
  TRIANGORA_BLURB,
  WHY_ME,
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
            letterSpacing: phone ? '0.16em' : '0.28em',
            textTransform: 'uppercase',
            color: c.amber,
            marginBottom: phone ? '14px' : '20px',
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          Espoo · Finland
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
            maxWidth: '540px',
            margin: '0 auto 24px',
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both',
          }}
        >
          {HERO_SUBLINE}
        </p>
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
            See GRYPS in action
          </CtaPrimary>
          <CtaGhost href="#contact" color={c.amber} block={phone}>
            Get in touch
          </CtaGhost>
        </div>
        <div
          style={{
            marginTop: phone ? '16px' : '20px',
            fontFamily: "'Lora', serif",
            fontSize: phone ? '13px' : '14px',
            fontStyle: 'italic',
            color: c.body,
            lineHeight: 1.5,
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.36s both',
          }}
        >
          {HERO_ASK}
        </div>
        <div
          style={{
            marginTop: phone ? '16px' : '22px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px',
            letterSpacing: phone ? '0.08em' : '0.14em',
            color: c.quiet,
            lineHeight: 1.7,
            animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both',
          }}
        >
          {NONCOMMERCIAL_LINE}
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

function WhyMe({ isLight }) {
  const { phone, narrow } = useBreakpoint()
  const c = t(isLight)

  return (
    <Section id="why-me" isLight={isLight}>
      <RevealWrapper>
        <SectionEyebrow color={c.amber}>Why me</SectionEyebrow>
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
              Commercial judgment behind the build.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {WHY_ME.map((para) => (
                <p key={para.slice(0, 32)} style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.8, color: c.body, margin: 0 }}>
                  {para}
                </p>
              ))}
            </div>
            <div style={{ marginTop: 18, fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: c.muted, letterSpacing: '0.06em' }}>
              Prior ops stamps · SAP · Power BI · CRM · BW — evidence, not the headline
            </div>
          </div>
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

function Work({ isLight }) {
  const { phone, tablet } = useBreakpoint()
  const c = t(isLight)
  const [archivesOpen, setArchivesOpen] = useState(false)
  const figCap = { color: c.quiet }

  return (
    <Section id="work" isLight={isLight} style={{ maxWidth: '1040px', width: '100%' }}>
      <RevealWrapper>
        <SectionEyebrow color={c.ice}>Work</SectionEyebrow>
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
          Non-commercial prototypes — then quieter archives.
        </h2>
        <div
          style={{
            marginBottom: '28px',
            border: `1px solid ${c.border}`,
            borderLeft: `3px solid ${c.teal}`,
            padding: phone ? '14px 14px' : '16px 20px',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: phone || tablet ? '1fr' : 'minmax(0, 1fr) auto',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.teal, textTransform: 'uppercase', marginBottom: 6 }}>
              Trust signal · Monopati
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.65, margin: 0 }}>
              {MONOPATI_TRUST}
            </p>
          </div>
          <a
            href="https://monopati.vercel.app/progress"
            target="_blank"
            rel="nofollow noreferrer"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: c.teal, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
          >
            Progress →
          </a>
        </div>
      </RevealWrapper>

      {/* GRYPS featured */}
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
            01 · Lead hiring proof · Non-commercial · Model v0.4
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '36px' : 'clamp(34px, 4.5vw, 52px)', fontWeight: 200, fontStyle: 'italic', color: c.ink, letterSpacing: '-0.03em', marginBottom: '10px' }}>
            GRYPS
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.7, maxWidth: '640px', marginBottom: '16px' }}>
            Connectivity resilience scoring for Nordic and Arctic remote operations — a live research prototype that turns a site profile into a <strong style={{ color: c.ink, fontWeight: 600 }}>Resilience Signature</strong>.
          </p>

          <div style={{ ...figCap }}>
            <CaseShot
              src="/work/gryps-signature.png"
              alt="GRYPS Resilience Signature — score 75, grade B for a mining site at 67°N"
              caption="Live Signature artifact · score, grade, risks, ranked option · Model v0.4"
              border={c.iceBorder}
            />
          </div>

          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '12px' }}>
            <strong style={{ color: c.ink }}>Problem:</strong> remote industrial sites often depend on a single connectivity path. Operators need a fast, auditable resilience read — without a consultancy deck or false precision.
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '12px' }}>
            <strong style={{ color: c.ink }}>Built:</strong> assess → score → rank → document, ending in the Signature. Deterministic Model v0.4 owns the number; optional AI prose never changes it.
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '12px' }}>
            <strong style={{ color: c.ink }}>Trade-off:</strong> I kept the score deterministic and gated email behind the longer report only. Trust over theater — hiring managers skim one object, not a chat transcript.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.muted, marginBottom: '18px', letterSpacing: '0.06em' }}>
            Stack · Next.js · Neon (EU) · MapLibre · optional Mistral · Vercel
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
        </div>

        <Suspense
          fallback={
            <div aria-hidden style={{ minHeight: 280, borderRadius: 2, border: `1px solid ${c.iceBorder}`, background: '#0B0F17' }} />
          }
        >
          <SignatureInstrument variant="full" />
        </Suspense>
        <div style={{ marginTop: '10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.06em', color: c.quiet, textAlign: 'left', lineHeight: 1.6 }}>
          Illustrative Path A freeze · open the live Advisor for a real Signature
        </div>
      </RevealWrapper>

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
            02 · Non-commercial · Multi-agent verification
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '30px' : '36px', fontWeight: 200, fontStyle: 'italic', color: c.ink, marginBottom: '10px' }}>
            Triangora
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.7, maxWidth: '640px', marginBottom: '16px' }}>
            {TRIANGORA_BLURB}
          </p>
          <div style={{ ...figCap }}>
            <CaseShot
              src="/work/triangora-verdict.png"
              alt="Triangora verification diagram — claim, independent source families, verdict"
              caption="Never generates intelligence · verifies what you already have"
              border={c.border}
            />
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '12px' }}>
            <strong style={{ color: c.ink }}>Problem:</strong> an informed-looking report can still rest on repetition, omission, or contradiction — URL count is not evidence count.
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '12px' }}>
            <strong style={{ color: c.ink }}>Built:</strong> submit existing claims → extract → check source families → adversarial review → verdict or honest abstention.
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '18px' }}>
            <strong style={{ color: c.ink }}>Trade-off:</strong> agent agreement is never treated as proof — only independent source families count; abstention is a correct outcome when evidence is thin.
          </p>
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
            03 · Non-commercial · Educational literacy
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '30px' : '36px', fontWeight: 200, fontStyle: 'italic', color: c.ink, marginBottom: '10px' }}>
            Morea
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.7, maxWidth: '640px', marginBottom: '16px' }}>
            EU AI Act Article 4 Evidence Pack walkthrough for a small team — literacy you can practice and export, not a compliance service.
          </p>
          <div style={{ ...figCap }}>
            <CaseShot
              src="/work/morea-dossier.png"
              alt="Morea sample Evidence Pack dossier with track, inventory, quiz, and verification ID"
              caption="Illustrative Evidence Pack · dated, hashable, printable · not auditor attestation"
              border={c.border}
            />
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '12px' }}>
            <strong style={{ color: c.ink }}>Problem:</strong> Article 4 literacy is dense. Teams need a calm walkthrough that produces an illustrative pack without pretending to certify.
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '12px' }}>
            <strong style={{ color: c.ink }}>Built:</strong> inventory → exposure → literacy → quiz → optional policy → export &amp; verify locally.
          </p>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.75, maxWidth: '640px', marginBottom: '18px' }}>
            <strong style={{ color: c.ink }}>Trade-off:</strong> kept everything browser-local until export — privacy by default over accounts and cloud sync.
          </p>
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

      {/* Also built */}
      <RevealWrapper delay={160}>
        <div style={{ marginTop: '48px', textAlign: 'left' }}>
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
              Earlier learning prototypes
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
          {ROLE_FOCUS}
        </h2>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: phone ? '14px' : '15px',
            fontStyle: 'italic',
            color: c.body,
            lineHeight: 1.65,
            maxWidth: '560px',
            margin: '0 auto 28px',
          }}
        >
          {HIRING_ONE_LINER}
        </p>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.quiet, letterSpacing: '0.08em', marginBottom: '32px' }}>
          60s path · Home → Work → try GRYPS Signature
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

export default function Portfolio({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const c = t(isLight)

  useEffect(() => {
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
          jobTitle: 'AI Product Builder',
          description:
            'Espoo-based builder: eighteen years in European B2B operations, now shipping non-commercial AI skill demos. Lead proof: GRYPS Resilience Signature. Secondary: Triangora (fact verification), then Morea (EU AI Act literacy). CV and LinkedIn on site.',
          address: { '@type': 'PostalAddress', addressLocality: 'Espoo', addressCountry: 'FI' },
          sameAs: ['https://www.linkedin.com/in/hqemoreira', 'https://github.com/hqemoreira'],
          knowsAbout: ['Artificial Intelligence', 'Systems Thinking', 'Software Development', 'EU AI Act', 'B2B Sales', 'International Business'],
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
                text: 'A personal hiring portfolio for Henrique Moreira (Espoo, Finland). Lead skill demo is GRYPS; then Triangora and Morea as secondary non-commercial prototypes. Factual posture: https://henriquemoreira.eu/about',
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
      <WhyMe isLight={isLight} />
      <Work isLight={isLight} />
      <Contact isLight={isLight} />
    </div>
  )
}
