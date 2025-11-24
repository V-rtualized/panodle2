import React from 'react'
import Card from '../../../components/Card'
import {
  colors,
  typography,
  spacing,
  containers
} from '../../../constants/theme'

const ArchiveEmptyState = () => (
  <Card
    style={{
      padding: spacing['3xl'],
      maxWidth: containers.sm,
      margin: '0 auto',
      textAlign: 'center'
    }}>
    <p style={{ color: colors.textMuted, fontSize: typography.fontSize.lg }}>
      Come back tomorrow! You'll be able to play any past daily game by
      selecting a date.
    </p>
  </Card>
)

export default ArchiveEmptyState
