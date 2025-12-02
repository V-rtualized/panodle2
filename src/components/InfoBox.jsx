import React from 'react'
import { Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { colors, typography, borderRadius, spacing } from '../constants/theme'

const variantConfig = {
  info: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: colors.primary,
    icon: Info,
    iconColor: colors.primary
  },
  warning: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderColor: colors.warning,
    icon: AlertCircle,
    iconColor: colors.warning
  },
  success: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: colors.success,
    icon: CheckCircle,
    iconColor: colors.success
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: colors.error,
    icon: XCircle,
    iconColor: colors.error
  }
}

const InfoBox = ({
  variant = 'info',
  icon: CustomIcon,
  children,
  style = {}
}) => {
  const config = variantConfig[variant]
  const Icon = CustomIcon || config.icon

  return (
    <div
      style={{
        background: config.backgroundColor,
        border: `1px solid ${config.borderColor}`,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        display: 'flex',
        gap: spacing.md,
        alignItems: 'flex-start',
        ...style
      }}>
      <Icon
        size={20}
        style={{
          color: config.iconColor,
          marginTop: '2px',
          flexShrink: 0
        }}
      />
      <div
        style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
          lineHeight: '1.6',
          flex: 1
        }}>
        {children}
      </div>
    </div>
  )
}

export default InfoBox
