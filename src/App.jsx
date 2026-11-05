import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Nav from './components/Nav'
import Portfolio from './pages/Portfolio'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import About from './pages/About'
import NotFound from './pages/NotFound'
import GrypsCase from './pages/work/GrypsCase'
import MoreaCase from './pages/work/MoreaCase'

const THEME_KEY = 'hm-theme'

function HashScroll() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])
  return null
}

function readTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(readTheme)
  const toggleTheme = () =>
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })

  useEffect(() => {
    document.documentElement.style.background = theme === 'light' ? '#F2F5F8' : '#07080D'
    document.body.style.background = theme === 'light' ? '#F2F5F8' : '#07080D'
  }, [theme])

  return (
    <BrowserRouter>
      <HashScroll />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Portfolio theme={theme} />} />
        <Route path="/about" element={<About theme={theme} />} />
        <Route path="/privacy" element={<Privacy theme={theme} />} />
        <Route path="/terms" element={<Terms theme={theme} />} />
        <Route path="/work/gryps" element={<GrypsCase theme={theme} />} />
        <Route path="/work/morea" element={<MoreaCase theme={theme} />} />
        <Route path="*" element={<NotFound theme={theme} />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  )
}
