import React from 'react'
import { MountainSnow } from 'lucide-react'
import { COLORS } from '../../constants/theme'

const GameHeader = ({ lastGuess }) => {
  const getLetterColor = (statKey) => {
    if (!lastGuess || !lastGuess.comparison) return '#e0e7ff'

    const status = lastGuess.comparison[statKey]

    if (status === 'correct') return COLORS.correct.to
    if (status === 'incorrect') return '#e0e7ff' // white
    if (status === 'partial') return COLORS.partial.to
    if (status === 'higher') return COLORS.higher.to
    if (status === 'lower') return COLORS.lower.to

    return '#e0e7ff'
  }

  // Map each letter to a stat
  const letterStats = [
    { letter: 'P', stat: 'lift' },
    { letter: 'a', stat: 'zone' },
    { letter: 'n', stat: 'difficulty' },
    { letter: 'o', stat: 'features' },
    { letter: 'd', stat: 'length' },
    { letter: 'l', stat: 'starting_elevation' },
    { letter: 'e', stat: 'ending_elevation' }
  ]

  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)',
        padding: '60px 20px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="snow-pattern">
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
        <div
          style={{
            display: 'inline-block',
            animation: 'bobble 3s ease-in-out infinite'
          }}>
          <MountainSnow size={56} color="#e0e7ff" strokeWidth={2.5} />
        </div>
        <h1
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '84px',
            margin: '20px 0 10px',
            textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            letterSpacing: '2px',
            lineHeight: '1',
            fontWeight: '800'
          }}>
          {letterStats.map((item, index) => (
            <span
              key={index}
              style={{
                color: getLetterColor(item.stat),
                transition: 'color 0.5s ease'
              }}>
              {item.letter}
            </span>
          ))}
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#cbd5e1',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
          Panorama Ski Run Guessing Game
        </p>
      </div>
    </div>
  )
}

export default GameHeader
