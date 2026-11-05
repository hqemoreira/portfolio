/**
 * Resilience Signature instrument — Path A golden freeze (Score 47 · Grade D).
 * Variants: hero (compact ~15s loop) | full (work stage).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'

const GOLDEN = {
  lat: 68.2,
  lng: 27.4,
  sector: 'forestry',
  autonomy: 'autonomous',
  criticality: 'safety-critical',
  setup: 'Starlink standard kit, no backup',
  score: 47,
  grade: 'D',
  summary:
    'Single-provider setup with no redundancy poses high operational risk for safety-critical autonomous forestry operations in Arctic conditions.',
  risks: [
    {
      label: 'Single-provider dependency',
      severity: 'critical',
      detail:
        'Starlink alone is vulnerable to orbital congestion, solar activity, or regional outages.',
    },
    {
      label: 'Arctic environmental exposure',
      severity: 'high',
      detail: 'Extreme cold and auroral activity can degrade signal or damage equipment.',
    },
  ],
  gaps: [
    {
      label: 'No backup connectivity',
      detail: 'Critical safety systems lack failover if the primary link fails.',
    },
  ],
  options: [
    { provider: 'OneWeb', type: 'LEO', confidence: 85, note: 'Polar coverage; latency may impact autonomy.' },
    { provider: 'Iridium Certus', type: 'LEO', confidence: 90, note: 'High reliability for safety-critical ops.', highlight: true },
    { provider: 'Inmarsat Global Xpress', type: 'GEO', confidence: 75, note: 'Stable backup; higher latency.' },
  ],
  recommendation:
    'Deploy Iridium Certus as primary backup with OneWeb as secondary. Add thermal shielding for Arctic conditions.',
  caveats: [
    'LEO providers may experience temporary outages during polar passes.',
    "Starlink's Arctic coverage is improving but not fully optimized for high latitudes.",
  ],
  realData: { realDataScore: 17, elevationCenterM: 291, elevationVarianceM: 41.6 },
}

const PHASE = { INPUT: 0, EXEC: 1, DIAGNOSIS: 2, OPTIONS: 3, ADVISORY: 4, CLOSE: 5 }
const mono = "'JetBrains Mono', ui-monospace, monospace"
const ui = "'Syne', system-ui, sans-serif"

/** Compressed Path A — score visible by ~3s; full loop ~15s */
const TIMING = {
  hero: { exec: 900, diag: 2800, opts: 6500, optStep: 700, adv: 10000, close: 13000, loop: 15500 },
  full: { exec: 1200, diag: 3200, opts: 7500, optStep: 800, adv: 11500, close: 14500, loop: 17000 },
}

export default function SignatureInstrument({ variant = 'full' }) {
  const timing = TIMING[variant] || TIMING.full
  const compact = variant === 'hero'
  const { phone, tablet } = useBreakpoint()
  const [phase, setPhase] = useState(PHASE.INPUT)
  const [visibleOptions, setVisibleOptions] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const [scanning, setScanning] = useState(false)
  const [reduced, setReduced] = useState(false)
  const timeouts = useRef([])
  const rootRef = useRef(null)
  const runRef = useRef(null)

  const clearAll = useCallback(() => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
  }, [])

  const at = useCallback((fn, ms) => {
    timeouts.current.push(setTimeout(fn, ms))
  }, [])

  const run = useCallback(() => {
    clearAll()
    setPhase(PHASE.INPUT)
    setVisibleOptions(0)
    setScanning(false)
    setOpacity(0)

    at(() => setOpacity(1), 60)
    at(() => {
      setPhase(PHASE.EXEC)
      setScanning(true)
    }, timing.exec)
    at(() => {
      setScanning(false)
      setPhase(PHASE.DIAGNOSIS)
    }, timing.diag)
    at(() => {
      setPhase(PHASE.OPTIONS)
      setVisibleOptions(1)
    }, timing.opts)
    at(() => setVisibleOptions(2), timing.opts + timing.optStep)
    at(() => setVisibleOptions(3), timing.opts + timing.optStep * 2)
    at(() => setPhase(PHASE.ADVISORY), timing.adv)
    at(() => setPhase(PHASE.CLOSE), timing.close)
    at(() => runRef.current?.(), timing.loop)
  }, [at, clearAll, timing])

  useEffect(() => {
    runRef.current = run
  }, [run])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener?.('change', apply)
    return () => mq.removeEventListener?.('change', apply)
  }, [])

  useEffect(() => {
    if (document.getElementById('sig-instrument-css')) return
    const style = document.createElement('style')
    style.id = 'sig-instrument-css'
    style.textContent = `
      @keyframes sigScan { 0%,100%{opacity:.35} 50%{opacity:1} }
      @keyframes sigIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    `
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    if (reduced) {
      at(() => {
        setOpacity(1)
        setPhase(PHASE.ADVISORY)
        setVisibleOptions(3)
      }, 0)
      return clearAll
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) run()
        else clearAll()
      },
      { threshold: compact ? 0.2 : 0.35 },
    )
    if (rootRef.current) io.observe(rootRef.current)
    return () => {
      io.disconnect()
      clearAll()
    }
  }, [reduced, run, clearAll, at, compact])

  const showDiag = phase >= PHASE.DIAGNOSIS && phase < PHASE.ADVISORY
  const showOpts = phase >= PHASE.OPTIONS && phase < PHASE.ADVISORY
  const showAdv = phase === PHASE.ADVISORY
  const showClose = phase === PHASE.CLOSE
  const scoreSize = phone ? 44 : compact ? 52 : 72
  const minH = phone ? (compact ? 260 : 300) : compact ? 300 : tablet ? 360 : 400

  return (
    <div
      ref={rootRef}
      aria-label="GRYPS Resilience Signature instrument — Path A sample"
      style={{
        borderRadius: 2,
        border: '1px solid rgba(79,168,255,0.22)',
        background: '#0B0F17',
        overflow: 'hidden',
        opacity,
        transition: 'opacity 0.5s ease',
        position: 'relative',
        minHeight: minH,
        aspectRatio: phone ? '5 / 4' : compact ? '4 / 3' : '16 / 9',
        maxHeight: phone ? 420 : undefined,
        width: '100%',
        maxWidth: '100%',
        fontFamily: mono,
        color: '#94A3B8',
        boxShadow: '0 0 60px rgba(79,168,255,0.08)',
        boxSizing: 'border-box',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: scanning ? 0.9 : 0.4,
          animation: scanning ? 'sigScan 1.1s ease-in-out infinite' : 'none',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: phone ? '12px 12px' : compact ? '14px 16px' : '20px 22px',
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: phone ? 6 : compact ? 8 : 12,
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ fontSize: phone ? 8 : 9, letterSpacing: phone ? '0.1em' : '0.16em', color: '#4FA8FF' }}>
            GRYPS · RESILIENCE SIGNATURE
          </div>
          <div style={{ fontSize: 8, letterSpacing: '0.08em', color: '#64748B' }}>
            {GOLDEN.lat}°N · {GOLDEN.lng}°E · Model v0.4
          </div>
        </div>

        {(phase === PHASE.INPUT || phase === PHASE.EXEC) && (
          <div style={{ animation: 'sigIn 0.4s ease', flex: 1 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {[GOLDEN.sector, GOLDEN.autonomy, GOLDEN.criticality].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 7,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '3px 7px',
                    border: '1px solid rgba(148,163,184,0.3)',
                    color: '#CBD5E1',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ fontSize: 10, color: '#E2E8F0', marginBottom: 8 }}>SETUP: {GOLDEN.setup}</div>
            {phase === PHASE.EXEC ? (
              <div style={{ marginTop: compact ? 16 : 28 }}>
                <div style={{ fontSize: 12, letterSpacing: '0.18em', color: '#4FA8FF', animation: 'sigScan 1s ease-in-out infinite' }}>
                  ASSESS → SCORE → RANK…
                </div>
                <div style={{ fontSize: 8, marginTop: 8, letterSpacing: '0.12em', color: '#64748B' }}>
                  MULTI-ORBIT RISK PROFILE
                </div>
              </div>
            ) : (
              <div
                style={{
                  marginTop: compact ? 20 : 36,
                  display: 'inline-flex',
                  padding: '8px 14px',
                  border: '1px solid #4FA8FF',
                  color: '#4FA8FF',
                  fontFamily: ui,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                }}
              >
                BOOT INSTRUMENT
              </div>
            )}
          </div>
        )}

        {showDiag && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: showOpts && !compact ? 'minmax(140px, 0.9fr) 1.3fr' : '1fr',
              gap: 12,
              flex: 1,
              minHeight: 0,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                border: '2px solid rgba(239,68,68,0.5)',
                background: 'rgba(239,68,68,0.08)',
                padding: compact ? '12px 14px' : '16px 18px',
                animation: 'sigIn 0.3s ease',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: scoreSize, fontWeight: 900, color: '#EF4444', lineHeight: 0.9, letterSpacing: '-0.05em' }}>
                  {GOLDEN.score}
                </div>
                <div
                  style={{
                    fontSize: compact ? 22 : 28,
                    fontWeight: 900,
                    color: '#EF4444',
                    border: '2px solid rgba(239,68,68,0.6)',
                    padding: '2px 10px',
                    lineHeight: 1,
                  }}
                >
                  {GOLDEN.grade}
                </div>
              </div>
              <div style={{ fontSize: compact ? 9 : 10, color: '#CBD5E1', lineHeight: 1.5 }}>{GOLDEN.summary}</div>
              {!compact && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {GOLDEN.risks.map((r) => (
                    <div key={r.label} style={{ borderLeft: '2px solid #EF4444', paddingLeft: 8 }}>
                      <div style={{ fontSize: 8, color: '#FCA5A5' }}>
                        {r.label} · {r.severity}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {showOpts && !compact && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', opacity: 0.85 }}>
                <div style={{ fontSize: 7, letterSpacing: '0.12em', color: '#64748B' }}>RANKED OPTIONS</div>
                {GOLDEN.options.slice(0, visibleOptions).map((o) => (
                  <div
                    key={o.provider}
                    style={{
                      border: o.highlight ? '1px solid rgba(79,168,255,0.45)' : '1px solid rgba(148,163,184,0.18)',
                      padding: '7px 9px',
                      animation: 'sigIn 0.25s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#94A3B8' }}>
                      <span>
                        {o.provider} · {o.type}
                      </span>
                      <span style={{ color: '#64748B' }}>{o.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {showAdv && (
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 8, animation: 'sigIn 0.35s ease', overflow: 'hidden' }}>
            <div style={{ fontSize: compact ? 22 : 28, fontWeight: 900, color: '#EF4444', letterSpacing: '-0.03em' }}>
              {GOLDEN.score} · {GOLDEN.grade}
            </div>
            <div style={{ fontSize: compact ? 9 : 10, color: '#E2E8F0', lineHeight: 1.5, overflowY: 'auto' }}>
              {GOLDEN.recommendation}
            </div>
            <div style={{ fontSize: 7, color: '#475569', letterSpacing: '0.08em', marginTop: 'auto' }}>
              DOCUMENT · terrain {GOLDEN.realData.realDataScore} · elev {GOLDEN.realData.elevationCenterM}m
            </div>
          </div>
        )}

        {showClose && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: 8,
              animation: 'sigIn 0.4s ease',
            }}
          >
            <div style={{ fontFamily: ui, fontSize: compact ? 28 : 40, fontWeight: 700, color: '#F8FAFC', letterSpacing: '0.24em' }}>
              GRYPS
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>assess → score → rank → document</div>
            <div style={{ fontSize: 9, color: '#4FA8FF', letterSpacing: '0.12em' }}>
              {GOLDEN.score} · {GOLDEN.grade} · illustrative sample
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
