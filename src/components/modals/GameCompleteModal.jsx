import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, TrendingUp, Share2, X } from 'lucide-react'
import { useStats } from '../../hooks/useStats'
import { MAX_GUESSES } from '../../constants/gameConfig'
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  gradients
} from '../../constants/theme'
import { transition } from '../../constants/animations'

const GameCompleteModal = ({ isOpen, won, guessCount, shareText, onClose }) => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const { stats } = useStats()

  // Calculate distribution data
  const maxValue = Math.max(...Object.values(stats.guessDistribution), 1)
  const guessNumbers = Array.from({ length: MAX_GUESSES }, (_, i) => i + 1)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleViewStats = () => {
    navigate('/stats')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: zIndex.modal,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: colors.bgCard,
          borderRadius: borderRadius.lg,
          padding: spacing['4xl'],
          maxWidth: '500px',
          width: '90%',
          boxShadow: shadows.xl,
          zIndex: zIndex.modal + 1,
          textAlign: 'center'
        }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: spacing.lg,
            right: spacing.lg,
            background: 'transparent',
            border: 'none',
            color: colors.textMuted,
            cursor: 'pointer',
            padding: spacing.xs,
            borderRadius: borderRadius.sm,
            transition: transition.all,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.color = colors.textPrimary
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = colors.textMuted
          }}>
          <X size={24} />
        </button>

        {/* Icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: `0 auto ${spacing['2xl']}`,
            borderRadius: '50%',
            background: won ? gradients.success : gradients.error,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Trophy size={40} color={colors.textWhite} />
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.extrabold,
            color: colors.textPrimary,
            marginBottom: spacing.md,
            fontFamily: typography.fontFamily.heading
          }}>
          {won ? 'Amazing!' : 'Nice Try!'}
        </h2>

        {/* Message */}
        <p
          style={{
            fontSize: typography.fontSize.lg,
            color: colors.textSecondary,
            marginBottom: spacing['2xl'],
            lineHeight: '1.6'
          }}>
          {won
            ? `You found the run in ${guessCount} guess${guessCount === 1 ? '' : 'es'}!`
            : "Don't worry, there's always tomorrow!"}
        </p>

        {/* Mini Guess Distribution */}
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
              const count = stats.guessDistribution[num] || 0
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

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            gap: spacing.md,
            flexDirection: 'column'
          }}>
          {/* Share Button */}
          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
              padding: `${spacing.lg} ${spacing['2xl']}`,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.bold,
              color: colors.textWhite,
              background: gradients.primary,
              border: 'none',
              borderRadius: borderRadius.md,
              cursor: 'pointer',
              boxShadow: shadows.md,
              fontFamily: typography.fontFamily.sans,
              transition: transition.all
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = shadows.lg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = shadows.md
            }}>
            <Share2 size={20} />
            {copied ? 'Copied!' : 'Share'}
          </button>

          {/* View Stats Button */}
          <button
            onClick={handleViewStats}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.sm,
              padding: `${spacing.lg} ${spacing['2xl']}`,
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.semibold,
              color: colors.textPrimary,
              background: colors.bgDark,
              border: `2px solid ${colors.borderLight}`,
              borderRadius: borderRadius.md,
              cursor: 'pointer',
              fontFamily: typography.fontFamily.sans,
              transition: transition.all
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary
              e.currentTarget.style.color = colors.primaryLight
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.borderLight
              e.currentTarget.style.color = colors.textPrimary
            }}>
            <TrendingUp size={20} />
            View Stats
          </button>
        </div>
      </div>
    </>
  )
}

export default GameCompleteModal
