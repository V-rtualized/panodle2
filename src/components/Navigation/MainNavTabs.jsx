import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  colors,
  spacing,
  borderRadius,
  typography
} from '../../constants/theme'
import { transition } from '../../constants/animations'
import { getActiveSection } from './navigationConfig'

const MainNavTabs = ({ items }) => {
  const location = useLocation()
  const activeSection = getActiveSection(location.pathname)

  return (
    <div style={{ padding: `${spacing.md} 0` }}>
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Link
              key={item.id}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: spacing.xs,
                padding: `${spacing.sm} ${spacing['2xl']}`,
                borderRadius: borderRadius.md,
                textDecoration: 'none',
                color: isActive ? colors.primaryLight : colors.textMuted,
                background: isActive
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'transparent',
                transition: transition.all,
                minWidth: '100px'
              }}
              aria-current={isActive ? 'page' : undefined}>
              <Icon size={24} style={{ strokeWidth: isActive ? 2.5 : 2 }} />
              <span
                style={{
                  fontSize: typography.fontSize.base,
                  fontWeight: isActive
                    ? typography.fontWeight.bold
                    : typography.fontWeight.semibold
                }}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default MainNavTabs
