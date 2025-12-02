import React, { useState } from 'react'
import { Share2, TrendingUp } from 'lucide-react'
import {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients
} from '../../constants/theme'
import { transition } from '../../constants/animations'

const ActionButtons = ({ shareText, onViewStats }) => {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
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
        onClick={onViewStats}
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
  )
}

export default ActionButtons
