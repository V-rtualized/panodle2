export const COLORS = {
  correct: { from: '#10b981', to: '#34d399', border: '#059669' },
  incorrect: { from: '#64748b', to: '#94a3b8', border: '#475569' },
  partial: { from: '#f59e0b', to: '#fbbf24', border: '#d97706' },
  higher: { from: '#8b5cf6', to: '#a78bfa', border: '#7c3aed' },
  lower: { from: '#3b82f6', to: '#60a5fa', border: '#2563eb' }
}

export const LEGEND_ITEMS = [
  { label: 'Correct', status: 'correct' },
  { label: 'Incorrect', status: 'incorrect' },
  { label: 'Partial Match', status: 'partial' },
  { label: 'Higher', status: 'higher', icon: '↑' },
  { label: 'Lower', status: 'lower', icon: '↓' }
]

export const colors = {
  // Primary blues
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  primaryDark: '#2563eb',

  // Backgrounds
  bgDark: '#0f172a',
  bgMedium: '#1e293b',
  bgCard: '#1e293b',
  bgOverlay: 'rgba(15, 23, 42, 0.98)',

  // Text colors
  textPrimary: '#e0e7ff',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textWhite: '#ffffff',

  // Border colors
  borderLight: '#475569',
  borderDark: '#334155',

  // Status colors
  success: '#10b981',
  error: '#ef4444',
  errorLight: '#f87171',
  warning: '#f59e0b'
}

export const gradients = {
  background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
  primary: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
  card: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)'
}

export const typography = {
  fontFamily: {
    sans: '"Inter", sans-serif',
    heading: '"Outfit", sans-serif'
  },
  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '15px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
    '5xl': '56px'
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  }
}

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '60px'
}

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px'
}

export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.15)',
  md: '0 4px 12px rgba(0, 0, 0, 0.2)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.3)',
  xl: '0 12px 32px rgba(0, 0, 0, 0.4)',
  card: '0 4px 20px rgba(0, 0, 0, 0.25)',
  cardHover: '0 8px 24px rgba(0, 0, 0, 0.4)',
  nav: '0 -4px 20px rgba(0, 0, 0, 0.3)'
}

export const zIndex = {
  base: 1,
  elevated: 10,
  dropdown: 100,
  modal: 1000,
  navigation: 1000,
  tooltip: 2000
}

export const containers = {
  sm: '600px',
  md: '800px',
  lg: '1000px',
  xl: '1200px'
}
