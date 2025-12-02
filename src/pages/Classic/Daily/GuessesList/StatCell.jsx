import React from 'react'
import { getScaledFontSize } from '../../../../utils/fontScaling'

const StatCell = ({ value, status, baseSize = 18, label }) => {
  const getStatusClass = () => {
    if (status === 'correct') return 'correct'
    if (status === 'incorrect') return 'incorrect'
    if (status === 'partial') return 'partial'
    if (status === 'higher') return 'higher'
    if (status === 'lower') return 'lower'
    return ''
  }

  return (
    <div
      className={`retro-stat ${getStatusClass()}`}
      style={{
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
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
      <div
        style={{
          fontSize: getScaledFontSize(value, baseSize),
          fontWeight: '700',
          color: '#fff',
          textAlign: 'center',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}>
        {value}
      </div>
    </div>
  )
}

export default StatCell
