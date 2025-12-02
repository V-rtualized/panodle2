import React from 'react'
import { Trophy } from 'lucide-react'
import { colors, typography, spacing, gradients } from '../../constants/theme'

const ModalHeader = ({ won, guessCount }) => (
  <>
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
  </>
)

export default ModalHeader
