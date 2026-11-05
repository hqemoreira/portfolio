import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBreakpoint } from '../hooks/useBreakpoint'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { HIRING_ONE_LINER, ROLE_FOCUS, TRANSITION_ARC } from '../copy'
import { GRYPS_ADVISOR, GRYPS_METHOD, MOREA_URL, t } from '../theme'

const SignatureInstrument = lazy(() => import('../components/SignatureInstrument'))

/** Sparse connectivity constellation — ice + amber links */
function useConstellation(canvasRef, isLight, reducedMotion, particleCount = 42) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    const n = particleCount
    const particles = Array.from({ length: n }, (_, i) => {
      const tier = i < 5 ? 'alpha' : i < 16 ? 'beta' : 'omega'
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (tier === 'alpha' ? 0.28 : 0.12),
        vy: (Math.random() - 0.5) * (tier === 'alpha' ? 0.22 : 0.1),
        size: tier === 'alpha' ? Math.random() * 2.2 + 3 : tier === 'beta' ? Math.random() * 1.2 + 1.4 : Math.random() * 0.6 + 0.5,
        opacity: tier === 'alpha' ? 0.9 : tier === 'beta' ? 0.5 : 0.18,
        pulse: Math.random() * Math.PI * 2,
        tier,
        ice: i % 3 === 0,
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
            const iceLink = a.ice || b.ice
            const r = iceLink ? 79 : 212
            const g = iceLink ? 168 : 137
            const b2 = iceLink ? 255 : 30
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${r},${g},${b2},${(isLight ? 0.2 : 0.16) * (1 - dist / maxD)})`
            ctx.lineWidth = a.tier === 'alpha' && b.tier === 'alpha' ? 0.9 : 0.35
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })
      particles.forEach((p) => {
        const pm = p.tier === 'alpha' ? Math.sin(p.pulse) * 0.15 + 0.85 : 1
        const r = p.ice ? 79 : 212
        const g = p.ice ? 168 : 137
        const b2 = p.ice ? 255 : 30
        const opMult = isLight ? 0.45 : 1
        if (p.tier === 'alpha') {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5)
          grad.addColorStop(0, `rgba(${r},${g},${b2},${0.22 * opMult})`)
          grad.addColorStop(1, `rgba(${r},${g},${b2},0)`)
          ctx.beginPath()
          ctx.fillStyle = grad
          ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pm, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b2},${p.opacity * pm * opMult})`
        ctx.fill()
        if (!reducedMotion) {
          p.pulse += 0.018
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
              background: 'radial-gradient(ellipse 100% 50% at 70% 20%, rgba(79,168,255,0.06) 0%, transparent 55%)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse 120% 60% at 30% 110%, rgba(180,90,20,0.08) 0%, transparent 60%)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 4,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(7,8,13,0.5) 100%)',
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
  const { phone, tablet, narrow } = useBreakpoint()
  const reducedMotion = usePrefersReducedMotion()
  const c = t(isLight)
  useConstellation(canvasRef, isLight, reducedMotion, phone ? 24 : tablet ? 34 : 42)
  const stack = narrow
  const titleSize = phone ? 'clamp(36px, 11.5vw, 56px)' : tablet ? 'clamp(48px, 8vw, 84px)' : 'clamp(52px, 9vw, 104px)'

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: phone ? 'auto' : '100svh',
        display: 'flex',
        alignItems: phone ? 'flex-start' : 'center',
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
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: stack ? '1fr' : 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
          gap: phone ? '28px' : tablet ? '36px' : '48px',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: stack ? 'center' : 'left', minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: phone ? '8px' : '9px',
              letterSpacing: phone ? '0.16em' : '0.28em',
              textTransform: 'uppercase',
              color: c.ice,
              marginBottom: phone ? '14px' : '20px',
              animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) both',
            }}
          >
            Resilience Instrument · Espoo
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
                textShadow: isLight ? 'none' : '0 0 100px rgba(212,137,30,0.14)',
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
                textShadow: isLight ? 'none' : '0 0 80px rgba(212,137,30,0.28)',
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
              maxWidth: '420px',
              margin: stack ? '0 auto 24px' : '0 0 28px',
              animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.2s both',
            }}
          >
            Nordic industrial ops → AI systems: open the Advisor, get a Resilience Signature.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              flexDirection: phone ? 'column' : 'row',
              alignItems: phone ? 'stretch' : stack ? 'center' : 'flex-start',
              justifyContent: stack ? 'center' : 'flex-start',
              animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.32s both',
            }}
          >
            <CtaPrimary href={GRYPS_ADVISOR} ice block={phone}>
              {phone ? 'Generate Signature →' : 'Generate a Resilience Signature →'}
            </CtaPrimary>
            <CtaGhost href="/work/gryps" color={c.amber} internal block={phone}>
              How it works
            </CtaGhost>
          </div>
          <div
            style={{
              marginTop: phone ? '20px' : '28px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              letterSpacing: phone ? '0.08em' : '0.14em',
              color: c.quiet,
              lineHeight: 1.7,
              animation: 'hmFadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both',
            }}
          >
            Personal reskilling · Non-commercial · No accounts / no billing
          </div>
        </div>

        <div style={{ animation: 'hmFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s both', minWidth: 0, width: '100%' }}>
          <Suspense
            fallback={
              <div
                aria-hidden
                style={{
                  minHeight: phone ? 240 : 300,
                  borderRadius: 2,
                  border: `1px solid ${c.iceBorder}`,
                  background: '#0B0F17',
                }}
              />
            }
          >
            <SignatureInstrument variant="hero" />
          </Suspense>
          <div
            style={{
              marginTop: '10px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.06em',
              color: c.quiet,
              textAlign: stack ? 'center' : 'left',
              lineHeight: 1.6,
            }}
          >
            Illustrative Path A · Score 47 · Grade D — open the live Advisor for a real Signature
          </div>
        </div>
      </div>
    </section>
  )
}

function Story({ isLight }) {
  const { phone, tablet, narrow } = useBreakpoint()
  const c = t(isLight)
  const languages = ['Portuguese · native', 'Spanish', 'Catalan', 'English', 'Finnish', 'French']
  const credentials = [
    { label: 'Background', value: 'International Business Management · Packaging · Forest Industry' },
    { label: 'Systems practice', value: 'Account development · Pricing discipline · Cross-functional delivery' },
    { label: 'Prior ops tools', value: 'SAP · Power BI · CRM · BW' },
    { label: 'Build proof', value: 'GRYPS — assess → score → rank → document a Resilience Signature' },
    { label: 'Focus', value: 'OT connectivity · Nordic / Arctic ops · EU AI literacy' },
    { label: 'Path', value: 'Monopati — public study progress · satellite + AI Solutions track' },
  ]
  const coords = [
    'PT · 39.40°N 8.22°W', 'AD · 42.51°N 1.52°E',
    'ES · 40.46°N 3.75°W', 'GR · 39.07°N 21.82°E',
    'BE · 50.50°N 4.47°E', 'FI · 61.92°N 25.75°E',
  ]

  return (
    <Section id="story" isLight={isLight}>
      <RevealWrapper>
        <SectionEyebrow color={c.amber}>Dossier</SectionEyebrow>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: narrow ? '1fr' : '1fr 1.15fr',
            gap: phone ? '24px' : tablet ? '36px' : '48px',
            alignItems: 'center',
            marginBottom: phone ? '24px' : '40px',
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
                  maxHeight: phone ? '280px' : tablet ? '360px' : '440px',
                  filter: isLight ? 'brightness(1.05)' : 'brightness(0.92)',
                }}
              />
            </picture>
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '8px',
                letterSpacing: '0.22em',
                color: c.amber,
                textTransform: 'uppercase',
              }}
            >
              Espoo · Vila Nova de Gaia
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: phone ? '28px' : 'clamp(30px, 3.8vw, 46px)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: c.ink,
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
                marginBottom: '20px',
              }}
            >
              Nordic industrial ops → <span style={{ color: c.amber }}>AI systems.</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              {TRANSITION_ARC.map((para) => (
                <p key={para.slice(0, 28)} style={{ fontFamily: "'Lora', serif", fontSize: '15px', lineHeight: 1.8, color: c.body }}>
                  {para}
                </p>
              ))}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.35em', color: c.quiet, textTransform: 'uppercase', marginBottom: '10px' }}>
              Languages
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
              {languages.map((l) => (
                <div
                  key={l}
                  style={{
                    padding: '5px 12px',
                    border: `1px solid ${c.border}`,
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: c.muted,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px 16px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: c.quiet,
                letterSpacing: '0.04em',
              }}
            >
              {coords.map((coord) => (
                <span key={coord}>{coord}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: phone ? '1fr' : tablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '4px' }}>
          {credentials.map((cred) => (
            <div
              key={cred.label}
              style={{
                background: isLight ? 'rgba(43,127,212,0.04)' : 'rgba(212,137,30,0.04)',
                border: `1px solid ${c.border}`,
                borderRadius: '2px',
                padding: '14px 16px',
                textAlign: 'left',
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', letterSpacing: '0.28em', color: c.amber, textTransform: 'uppercase', marginBottom: '6px', opacity: 0.75 }}>
                {cred.label}
              </div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: c.body, lineHeight: 1.55 }}>{cred.value}</div>
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

function Work({ isLight }) {
  const { phone, tablet } = useBreakpoint()
  const c = t(isLight)
  const [archivesOpen, setArchivesOpen] = useState(false)

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
            marginBottom: '36px',
          }}
        >
          Lead proof: a live Resilience Signature — then quieter learning prototypes.
        </h2>
      </RevealWrapper>

      <RevealWrapper delay={100}>
        <div
          style={{
            background: isLight ? c.panel : c.panel,
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
            R&D · Non-commercial · Model v0.4
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '36px' : 'clamp(34px, 4.5vw, 52px)', fontWeight: 200, fontStyle: 'italic', color: c.ink, letterSpacing: '-0.03em', marginBottom: '12px' }}>
            GRYPS
          </div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '15px', color: c.body, lineHeight: 1.7, maxWidth: '560px', marginBottom: '10px' }}>
            Enter a Nordic / Arctic site profile and get a <strong style={{ color: c.ink, fontWeight: 600 }}>Resilience Signature</strong> — score, grade, top risk, ranked options. OT / satellite literacy — not procurement advice.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: c.muted, marginBottom: '20px', letterSpacing: '0.06em' }}>
            assess → score → rank → document · no account for the initial Signature
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: phone ? 'stretch' : 'center', flexDirection: phone ? 'column' : 'row' }}>
            <CtaPrimary href={GRYPS_ADVISOR} ice block={phone}>
              {phone ? 'Generate Signature →' : 'Generate a Resilience Signature →'}
            </CtaPrimary>
            <CtaGhost href="/work/gryps" color={c.ice} internal block={phone}>
              Mission brief
            </CtaGhost>
            <a
              href={GRYPS_METHOD}
              target="_blank"
              rel="nofollow noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.1em',
                color: c.muted,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
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
      </RevealWrapper>

      {/* Morea secondary */}
      <RevealWrapper delay={150}>
        <div
          style={{
            marginTop: '48px',
            border: `1px solid ${c.border}`,
            borderLeft: `3px solid ${c.amber}`,
            padding: phone ? '18px 14px' : '24px 28px',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: phone || tablet ? '1fr' : '1fr auto',
            gap: '16px',
            alignItems: 'center',
            minWidth: 0,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.amber, textTransform: 'uppercase', marginBottom: '8px' }}>
              Secondary · Educational literacy
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: phone ? '26px' : '28px', fontWeight: 200, fontStyle: 'italic', color: c.ink, marginBottom: '8px' }}>
              Morea
            </div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: c.body, lineHeight: 1.65, maxWidth: '520px', margin: 0 }}>
              Article 4 Evidence Pack walkthrough — literacy trail, not a compliance service.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: phone ? 'column' : 'row', gap: '10px', alignItems: phone ? 'stretch' : 'flex-start', flexWrap: 'wrap' }}>
            <CtaGhost href={MOREA_URL} color={c.amber} block={phone}>
              Open prototype ↗
            </CtaGhost>
            <CtaGhost href="/work/morea" color={c.muted} internal block={phone}>
              Brief
            </CtaGhost>
          </div>
        </div>
      </RevealWrapper>

      {/* Archives telemetry */}
      <RevealWrapper delay={180}>
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
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
              Earlier learning prototypes · telemetry
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
              <div style={{ padding: '12px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: c.quiet, letterSpacing: '0.08em', lineHeight: 1.6 }}>
                Linked from this page only · not submitted to search engines · interview walkthrough if useful
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '28px',
            display: 'grid',
            gridTemplateColumns: phone ? '1fr' : '1fr 1fr',
            gap: '8px',
            textAlign: 'left',
          }}
        >
          <div style={{ border: `1px solid ${c.border}`, padding: '16px 18px', minWidth: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.teal, textTransform: 'uppercase', marginBottom: '8px' }}>
              Study path
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontStyle: 'italic', color: c.ink, marginBottom: '6px' }}>Monopati</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: c.body, lineHeight: 1.55, marginBottom: '12px' }}>
              Public progress on a 12-month AI Solutions + satellite track — direction, not build proof.
            </p>
            <a
              href="https://monopati.vercel.app/progress"
              target="_blank"
              rel="nofollow noreferrer"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: c.teal, letterSpacing: '0.1em' }}
            >
              Progress →
            </a>
          </div>
          <div style={{ border: `1px solid ${c.border}`, padding: '16px 18px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: c.muted, textTransform: 'uppercase', marginBottom: '8px' }}>
              Internal · Private
            </div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontStyle: 'italic', color: c.ink, marginBottom: '6px' }}>FORGE</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: c.body, lineHeight: 1.55, margin: 0 }}>
              Personal projects dashboard — private; no public login.
            </p>
          </div>
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
          60s path · Signature → /work/gryps · industrial ops → AI systems
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', flexDirection: phone ? 'column' : 'row', alignItems: phone ? 'stretch' : 'center', marginBottom: '40px', maxWidth: phone ? 360 : undefined, marginLeft: 'auto', marginRight: 'auto' }}>
          <a href="mailto:hqe.moreira@gmail.com" style={{ textDecoration: 'none', width: phone ? '100%' : undefined }}>
            <div style={contactBtn(true)}>Send a message</div>
          </a>
          <a href="https://github.com/hqemoreira" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', width: phone ? '100%' : undefined }}>
            <div style={contactBtn(false)}>GitHub ↗</div>
          </a>
          <a href="https://www.linkedin.com/in/hqemoreira" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', width: phone ? '100%' : undefined }}>
            <div style={contactBtn(false)}>LinkedIn ↗</div>
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
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: c.quiet, opacity: 0.7, letterSpacing: '0.12em' }}>
            Personal reskilling · Non-commercial · Not a product for sale · No accounts / no billing
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
          jobTitle: 'AI Builder & Systems Thinker',
          description:
            'Builder based in Espoo, Finland. Live skill demo: GRYPS — generate a Resilience Signature for Nordic and Arctic remote operations connectivity. Secondary: Morea Evidence Pack. Earlier learning prototypes include Grantemia, Velu, Lycaon, DisclAI and Iraun. Study path: Monopati.',
          address: { '@type': 'PostalAddress', addressLocality: 'Espoo', addressCountry: 'FI' },
          sameAs: ['https://www.linkedin.com/in/hqemoreira'],
          knowsAbout: ['Artificial Intelligence', 'Systems Thinking', 'Software Development', 'EU AI Act', 'Supply Chain', 'International Business'],
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
                text: 'A personal portfolio for Henrique Moreira (Espoo, Finland). It features GRYPS as a live non-commercial R&D demo and links earlier learning prototypes. Factual posture: https://henriquemoreira.eu/about',
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
              name: 'Are the other prototypes for sale?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Morea, Grantemia, Velu, Lycaon, DisclAI, and Iraun are learning prototypes shown for portfolio context. Lead hiring proof is GRYPS.',
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
      <Story isLight={isLight} />
      <Work isLight={isLight} />
      <Contact isLight={isLight} />
    </div>
  )
}
