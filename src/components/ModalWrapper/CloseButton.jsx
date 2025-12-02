import React from 'react'
import { X } from 'lucide-react'
import { colors, spacing, borderRadius } from '../../constants/theme'
import { transition } from '../../constants/animations'

const CloseButton = ({ onClose }) => (
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
)

export default CloseButton
