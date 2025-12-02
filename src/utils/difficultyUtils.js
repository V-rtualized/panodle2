import React from 'react'
import { Circle, Square, Diamond } from 'lucide-react'

/**
 * Map difficulty levels to ski slope symbols with colors
 * Green Circle - Easiest
 * Blue Square - Intermediate
 * Black Diamond - Advanced
 * Double Black Diamond - Expert
 */

export const DifficultyIcon = ({ difficulty, size = 16 }) => {
  switch (difficulty) {
    case 'Green':
      return <Circle size={size} fill="#22c55e" color="#ffffff" />
    case 'Blue':
      return <Square size={size} fill="#3b82f6" color="#ffffff" />
    case 'Black':
      return <Diamond size={size} fill="#000000" color="#ffffff" />
    case 'Double Black':
      return (
        <span style={{ display: 'inline-flex', gap: '2px' }}>
          <Diamond size={size} fill="#000000" color="#ffffff" />
          <Diamond size={size} fill="#000000" color="#ffffff" />
        </span>
      )
    default:
      return null
  }
}
