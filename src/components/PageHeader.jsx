import React from 'react'
import { colors, typography, spacing } from '../constants/theme'

const PageHeader = ({
  icon: Icon,
  iconSize = 48,
  title,
  subtitle,
  style = {}
}) => (
  <div style={{ textAlign: 'center', marginBottom: spacing['3xl'], ...style }}>
    {Icon && (
      <Icon
        size={iconSize}
        style={{
          color: colors.primaryLight,
          margin: `0 auto ${spacing.lg}`
        }}
      />
    )}
    {title && (
      <h1
        style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.textPrimary,
          marginBottom: spacing.sm
        }}>
        {title}
      </h1>
    )}
    {subtitle && (
      <p
        style={{
          fontSize: typography.fontSize.lg,
          color: colors.textMuted
        }}>
        {subtitle}
      </p>
    )}
  </div>
)

export default PageHeader
