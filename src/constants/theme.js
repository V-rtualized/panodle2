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
