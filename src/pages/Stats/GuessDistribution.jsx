import React from 'react'
import Card from '../../components/Card'
import { colors, typography, spacing } from '../../constants/theme'
import { MAX_GUESSES } from '../../constants/gameConfig'

const GuessDistribution = ({ distribution }) => {
  // Find max value for scaling bars
  const maxValue = Math.max(...Object.values(distribution), 1)

  // Create array of all possible guess counts (1 to MAX_GUESSES)
  const guessNumbers = Array.from({ length: MAX_GUESSES }, (_, i) => i + 1)

  return (
    <Card style={{ padding: spacing['3xl'] }}>
      <h3
        style={{
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.bold,
          color: colors.textPrimary,
          marginBottom: spacing['2xl'],
          textAlign: 'center'
        }}>
        Guess Distribution
      </h3>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {guessNumbers.map((num) => {
          const count = distribution[num] || 0
          const percentage = maxValue > 0 ? (count / maxValue) * 100 : 0
          const hasValue = count > 0

          return (
            <div
              key={num}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.md
              }}>
              <div
                style={{
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.textMuted,
                  width: '20px',
                  textAlign: 'right'
                }}>
                {num}
              </div>

              <div
                style={{
                  flex: 1,
                  position: 'relative',
                  height: '32px',
                  background: colors.bgDark,
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${Math.max(percentage, hasValue ? 8 : 0)}%`,
                    background: hasValue
                      ? 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)'
                      : 'transparent',
                    transition: 'width 0.3s ease-out',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: spacing.md
                  }}>
                  {hasValue && (
                    <span
                      style={{
                        fontSize: typography.fontSize.sm,
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

      {Object.keys(distribution).length === 0 && (
        <p
          style={{
            textAlign: 'center',
            color: colors.textMuted,
            fontSize: typography.fontSize.md,
            marginTop: spacing.xl
          }}>
          No games completed yet. Start playing to see your distribution!
        </p>
      )}
    </Card>
  )
}

export default GuessDistribution
