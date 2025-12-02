import React from 'react'
import { MAX_GUESSES } from '../../constants/gameConfig'
import {
  colors,
  typography,
  spacing,
  borderRadius,
  gradients
} from '../../constants/theme'

const GuessDistribution = ({ distribution, won, guessCount }) => {
  const maxValue = Math.max(...Object.values(distribution), 1)
  const guessNumbers = Array.from({ length: MAX_GUESSES }, (_, i) => i + 1)

  return (
    <div
      style={{
        background: colors.bgDark,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        marginBottom: spacing['3xl']
      }}>
      <h3
        style={{
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.bold,
          color: colors.textMuted,
          marginBottom: spacing.md,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
        Guess Distribution
      </h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.xs
        }}>
        {guessNumbers.map((num) => {
          const count = distribution[num] || 0
          const percentage = maxValue > 0 ? (count / maxValue) * 100 : 0
          const hasValue = count > 0
          const isCurrentGuess = won && num === guessCount

          return (
            <div
              key={num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm
              }}>
              <div
                style={{
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.textMuted,
                  width: '12px',
                  textAlign: 'right'
                }}>
                {num}
              </div>

              <div
                style={{
                  flex: 1,
                  position: 'relative',
                  height: '20px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${Math.max(percentage, hasValue ? 8 : 0)}%`,
                    background: isCurrentGuess
                      ? gradients.success
                      : hasValue
                        ? 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)'
                        : 'transparent',
                    transition: 'width 0.3s ease-out',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: spacing.xs
                  }}>
                  {hasValue && (
                    <span
                      style={{
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.bold,
                        color: colors.textWhite
                      }}>
                      {count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GuessDistribution
