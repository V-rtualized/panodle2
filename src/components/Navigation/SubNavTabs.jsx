import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  colors,
  spacing,
  borderRadius,
  typography
} from '../../constants/theme'
import { transition } from '../../constants/animations'

const SubNavTabs = ({ items }) => {
  const location = useLocation()

  if (!items || items.length === 0) return null

  return (
    <div
      style={{
        borderBottom: `1px solid ${colors.borderLight}`,
        padding: `${spacing.sm} 0`,
        background: 'rgba(30, 41, 59, 0.5)'
      }}>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          gap: spacing.sm,
          justifyContent: 'center',
          padding: `0 ${spacing.xl}`
        }}>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname.startsWith(item.path)

          return (
            <Link
              key={item.id}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: `6px ${spacing.lg}`,
                borderRadius: borderRadius.sm,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                textDecoration: 'none',
                color: isActive ? colors.textWhite : colors.textMuted,
                background: isActive
                  ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
                  : 'transparent',
                border: isActive
                  ? `1.5px solid ${colors.primaryDark}`
                  : '1.5px solid transparent',
                transition: transition.all
              }}
              aria-current={isActive ? 'page' : undefined}>
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SubNavTabs
