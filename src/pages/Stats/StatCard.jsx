import React from 'react'
import Card from '../../components/Card'
import { colors, typography, spacing } from '../../constants/theme'

const StatCard = ({ label, value, icon: Icon, gradient = false }) => (
  <Card
    style={{
      padding: spacing['2xl'],
      textAlign: 'center',
      background: gradient || 'transparent',
      border: gradient ? 'none' : undefined
    }}>
    {Icon && (
      <Icon
        size={32}
        style={{
          color: gradient ? colors.textWhite : colors.primaryLight,
          marginBottom: spacing.md
        }}
      />
    )}
    <div
      style={{
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.extrabold,
        color: gradient ? colors.textWhite : colors.textPrimary,
        marginBottom: spacing.xs,
        fontFamily: typography.fontFamily.heading
      }}>
      {value}
    </div>
    <div
      style={{
        fontSize: typography.fontSize.md,
        color: gradient ? 'rgba(255, 255, 255, 0.9)' : colors.textMuted,
        fontWeight: typography.fontWeight.semibold,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
      {label}
    </div>
  </Card>
)

export default StatCard
