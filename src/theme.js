/** Shared Resilience Instrument tokens — dark theater + Arctic day */
export const TOKENS = {
  dark: {
    bg: '#07080D',
    ink: '#F0E8D8',
    body: '#B8AE9A',
    muted: '#8A9AA8',
    quiet: '#6A5A3A',
    amber: '#D4891E',
    ice: '#4FA8FF',
    teal: '#1EC8A8',
    instrumentBg: '#0B0F17',
    panel: '#080C12',
    border: 'rgba(212,137,30,0.08)',
    iceBorder: 'rgba(79,168,255,0.2)',
    divider: 'rgba(255,255,255,0.06)',
    navBg: 'rgba(7,8,13,0.92)',
  },
  light: {
    bg: '#F4F7FA',
    ink: '#0B1220',
    body: '#2A3544',
    muted: '#5A6A7A',
    quiet: '#7A8A9A',
    amber: '#B8741A',
    ice: '#2B7FD4',
    teal: '#1A9A82',
    instrumentBg: '#0B0F17',
    panel: 'rgba(240,248,255,0.95)',
    border: 'rgba(43,127,212,0.18)',
    iceBorder: 'rgba(43,127,212,0.28)',
    divider: 'rgba(11,18,32,0.08)',
    navBg: 'rgba(244,247,250,0.95)',
  },
}

export function t(isLight) {
  return isLight ? TOKENS.light : TOKENS.dark
}

export const GRYPS_ADVISOR = 'https://gryps.vercel.app/#advisor'
export const GRYPS_METHOD = 'https://gryps.vercel.app/methodology'
export const MOREA_URL = 'https://morea-pack.vercel.app'
