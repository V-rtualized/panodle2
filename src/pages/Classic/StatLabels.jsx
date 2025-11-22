import React from 'react'
import { STAT_LABELS } from '../../constants/labels'

const StatLabels = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '12px',
      marginBottom: '24px',
      padding: '20px',
      background: 'rgba(30, 41, 59, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px'
    }}>
      {STAT_LABELS.map((label, i) => (
        <div key={label} style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '14px',
          color: '#cbd5e1',
          textAlign: 'center',
          letterSpacing: '1px',
          fontWeight: '700',
          animation: `bobble 2s ease-in-out infinite`,
          animationDelay: `${i * 0.1}s`
        }}>
          {label}
        </div>
      ))}
    </div>
  )
}

export default StatLabels
