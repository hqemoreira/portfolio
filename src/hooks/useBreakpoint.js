import { useEffect, useState } from 'react'

/** phone < 640 · tablet 640–1023 · desktop ≥ 1024 */
export function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === 'undefined') return { width: 1024, phone: false, tablet: false, desktop: true, narrow: false }
    return fromWidth(window.innerWidth)
  })

  useEffect(() => {
    const update = () => setBp(fromWidth(window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return bp
}

function fromWidth(width) {
  const phone = width < 640
  const tablet = width >= 640 && width < 1024
  const desktop = width >= 1024
  /** Single-column layout for hero / dense grids */
  const narrow = width < 900
  return { width, phone, tablet, desktop, narrow }
}

/** Legacy helper — true below tablet landscape / desktop */
export function useIsMobile(threshold = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < threshold : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < threshold)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [threshold])
  return isMobile
}
