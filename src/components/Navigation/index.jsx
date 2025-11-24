import React from 'react'
import { useLocation } from 'react-router-dom'
import MainNavTabs from './MainNavTabs'
import SubNavTabs from './SubNavTabs'
import {
  getMainNavItems,
  getSubNavItems,
  getActiveSection
} from './navigationConfig'
import { colors, zIndex, shadows } from '../../constants/theme'

const Navigation = () => {
  const location = useLocation()
  const mainNavItems = getMainNavItems()
  const activeSection = getActiveSection(location.pathname)
  const subNavItems = activeSection ? getSubNavItems(activeSection) : []
  const hasSubNav = subNavItems.length > 0

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.bgOverlay,
        borderTop: `3px solid ${colors.borderLight}`,
        zIndex: zIndex.navigation,
        backdropFilter: 'blur(10px)',
        boxShadow: shadows.nav
      }}
      role="navigation"
      aria-label="Main navigation">
      {hasSubNav && <SubNavTabs items={subNavItems} />}

      <MainNavTabs items={mainNavItems} />
    </nav>
  )
}

export default Navigation
