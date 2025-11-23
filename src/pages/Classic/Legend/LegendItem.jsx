import React from 'react'
import { COLORS } from '../../../constants/theme'

const LegendItem = ({ label, status, icon }) => {
  const color = COLORS[status]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          background: `linear-gradient(135deg, ${color.from} 0%, ${color.to} 100%)`,
          border: `3px solid ${color.border}`,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '18px'
        }}>
        {icon || ''}
      </div>
      <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{label}</span>
    </div>
  )
}

export default LegendItem
