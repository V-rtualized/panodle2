import React from 'react'
import { getScaledFontSize } from '../../../../utils/fontScaling'

const StatCell = ({ value, status, baseSize = 18 }) => {
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
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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
