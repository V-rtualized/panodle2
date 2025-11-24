import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../../components/Card'
import { colors, typography, spacing, shadows } from '../../../constants/theme'
import { transition, hover } from '../../../constants/animations'
import { formatDate } from '../../../utils/dateUtils'

const ArchiveDateCard = ({ date }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={`/classic/archive/${date}`}
      style={{
        textDecoration: 'none'
      }}>
      <Card
        style={{
          padding: `${spacing.lg} ${spacing.xl}`,
          cursor: 'pointer',
          transition: transition.all,
          transform: isHovered ? hover.lift.transform : 'translateY(0)',
          boxShadow: isHovered ? shadows.cardHover : shadows.card
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div
          style={{
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.bold,
            color: colors.textPrimary,
            marginBottom: spacing.xs
          }}>
          {date}
        </div>
        <div
          style={{
            fontSize: typography.fontSize.sm,
            color: colors.textMuted
          }}>
          {formatDate(date)}
        </div>
      </Card>
    </Link>
  )
}

export default ArchiveDateCard
