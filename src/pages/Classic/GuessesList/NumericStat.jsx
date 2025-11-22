import React from 'react'
import { TrendingUp, TrendingDown, Check } from 'lucide-react'

const NumericStat = ({ value, unit, status }) => {
  const getStatusClass = () => {
    if (status === 'correct') return 'correct'
    if (status === 'incorrect') return 'incorrect'
    if (status === 'higher') return 'higher'
    if (status === 'lower') return 'lower'
    return ''
  }

  return (
    <div className={`retro-stat ${getStatusClass()}`} style={{
      padding: '16px 12px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '700',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        color: '#fff'
      }}>
        <span>{value}{unit}</span>
        {status === 'correct' && <Check size={18} />}
        {status === 'higher' && <TrendingUp size={18} />}
        {status === 'lower' && <TrendingDown size={18} />}
      </div>
    </div>
  )
}

export default NumericStat
