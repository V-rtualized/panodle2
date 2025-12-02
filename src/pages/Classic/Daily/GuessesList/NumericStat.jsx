import React from 'react'
import { TrendingUp, TrendingDown, Check } from 'lucide-react'

const NumericStat = ({ value, unit, status, label }) => {
  const getStatusClass = () => {
    if (status === 'correct') return 'correct'
    if (status === 'incorrect') return 'incorrect'
    if (status === 'higher') return 'higher'
    if (status === 'lower') return 'lower'
    return ''
  }

  return (
    <div
      className={`retro-stat ${getStatusClass()}`}
      style={{
        padding: '16px 12px',
        textAlign: 'center'
      }}>
      <div
        style={{
          fontSize: '14px',
          fontWeight: '700',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: '#fff'
        }}>
        {label && (
          <>
            <div
              className="stat-cell-label"
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
              {label}
            </div>
            <style>
              {`
                @media (min-width: 768px) {
                  .stat-cell-label {
                    display: none !important;
                  }
                }
              `}
            </style>
          </>
        )}
        <span>
          {value}
          {unit}
        </span>
        {status === 'correct' && <Check size={18} />}
        {status === 'higher' && <TrendingUp size={18} />}
        {status === 'lower' && <TrendingDown size={18} />}
      </div>
    </div>
  )
}

export default NumericStat
