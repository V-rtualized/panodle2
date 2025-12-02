import { Mountain, Route, Sun, Calendar, BarChart3 } from 'lucide-react'

export const navigationConfig = {
  classic: {
    id: 'classic',
    path: '/classic',
    label: 'Classic',
    icon: Mountain,
    subNav: [
      {
        id: 'classic-daily',
        path: '/classic/daily',
        label: 'Daily',
        icon: Sun
      },
      {
        id: 'classic-archive',
        path: '/classic/archive',
        label: 'Archive',
        icon: Calendar
      }
    ]
  },
  trails: {
    id: 'trails',
    path: '/trails',
    label: 'Trails',
    icon: Route
  },
  stats: {
    id: 'stats',
    path: '/stats',
    label: 'Stats',
    icon: BarChart3
  }
}

export const getMainNavItems = () => Object.values(navigationConfig)

export const getSubNavItems = (sectionId) =>
  navigationConfig[sectionId]?.subNav || []

export const getActiveSection = (pathname) => {
  if (pathname.startsWith('/classic')) return 'classic'
  if (pathname.startsWith('/trails')) return 'trails'
  if (pathname.startsWith('/stats')) return 'stats'
  return null
}
