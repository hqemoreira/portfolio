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
    bg: '#F2F5F8',
    ink: '#0A1018',
    body: '#243040',
    muted: '#4A5A6A',
    quiet: '#5C6B7A',
    amber: '#A66A14',
    ice: '#1F73C7',
    teal: '#178A74',
    instrumentBg: '#0B0F17',
    panel: '#FFFFFF',
    border: 'rgba(15, 40, 70, 0.12)',
    iceBorder: 'rgba(31, 115, 199, 0.35)',
    divider: 'rgba(11,18,32,0.1)',
    navBg: 'rgba(242,245,248,0.96)',
  },
}

export function t(isLight) {
  return isLight ? TOKENS.light : TOKENS.dark
}

export const GRYPS_ADVISOR = 'https://gryps.vercel.app/#advisor'
export const GRYPS_METHOD = 'https://gryps.vercel.app/methodology'
export const MOREA_URL = 'https://morea-pack.vercel.app'
