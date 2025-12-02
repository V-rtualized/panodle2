import React from 'react'
import { DifficultyIcon } from '../../../../utils/difficultyUtils'

const DifficultyStatCell = ({ difficulty, status }) => {
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
      <DifficultyIcon difficulty={difficulty} size={24} />
    </div>
  )
}

export default DifficultyStatCell
