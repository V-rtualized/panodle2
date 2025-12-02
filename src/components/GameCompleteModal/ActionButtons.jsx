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
  const [showShareText, setShowShareText] = useState(false)

  const handleShare = async () => {
    try {
      // Check if share API exists
      const hasShare = !!navigator.share
      const hasClipboard = !!navigator.clipboard

      // Try native share first (mobile)
      if (hasShare) {
        try {
          await navigator.share({
            text: shareText
          })
          return
        } catch (shareErr) {
          if (shareErr.name === 'AbortError') {
            return
          }
        }
      }

      // Try modern clipboard API (requires HTTPS)
      if (hasClipboard) {
        await navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
        return
      }

      // Fall back to legacy execCommand (works without HTTPS)
      const textArea = document.createElement('textarea')
      textArea.value = shareText
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (successful) {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      } else {
        setShowShareText(true)
      }
    } catch {
      setShowShareText(true)
    }
  }

  return (
    <>
      {/* Share Text for Manual Copy */}
      {showShareText && (
        <div
          style={{
            background: colors.bgDark,
            border: `2px solid ${colors.borderLight}`,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginBottom: spacing.md
          }}>
          <div
            style={{
              fontSize: typography.fontSize.xs,
              color: colors.textMuted,
              marginBottom: spacing.sm,
              fontWeight: typography.fontWeight.semibold,
              textTransform: 'uppercase'
            }}>
            Copy this text manually:
          </div>
          <div
            style={{
              fontSize: typography.fontSize.sm,
              color: colors.textPrimary,
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: spacing.sm,
              borderRadius: borderRadius.sm,
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
            {shareText}
          </div>
        </div>
      )}

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
    </>
  )
}

export default ActionButtons
