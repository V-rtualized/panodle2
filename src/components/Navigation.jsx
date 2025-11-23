import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mountain, Route, Calendar, Sun } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/classic/daily', label: 'Classic', icon: Mountain },
    { path: '/trails', label: 'Trails', icon: Route }
  ]

  const subNavItems = [
    { path: '/classic/daily', label: 'Daily', icon: Sun },
    { path: '/classic/archive', label: 'Archive', icon: Calendar }
  ]

  const isClassicRoute = location.pathname.startsWith('/classic')

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(15, 23, 42, 0.98)',
        borderTop: '3px solid #475569',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
      }}>
      {/* Sub-navigation for Classic mode */}
      {isClassicRoute && (
        <div
          style={{
            borderBottom: '1px solid #475569',
            padding: '8px 0',
            background: 'rgba(30, 41, 59, 0.5)'
          }}>
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              padding: '0 20px'
            }}>
            {subNavItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname.startsWith(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    color: isActive ? '#ffffff' : '#94a3b8',
                    background: isActive
                      ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
                      : 'transparent',
                    border: isActive
                      ? '1.5px solid #2563eb'
                      : '1.5px solid transparent',
                    transition: 'all 0.2s'
                  }}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Main navigation tabs */}
      <div
        style={{
          padding: '12px 0'
        }}>
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              item.path === '/classic/daily'
                ? location.pathname.startsWith('/classic')
                : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 24px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: isActive ? '#60a5fa' : '#94a3b8',
                  background: isActive
                    ? 'rgba(59, 130, 246, 0.1)'
                    : 'transparent',
                  transition: 'all 0.2s',
                  minWidth: '100px'
                }}>
                <Icon
                  size={24}
                  style={{
                    strokeWidth: isActive ? 2.5 : 2
                  }}
                />
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? '700' : '600'
                  }}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
