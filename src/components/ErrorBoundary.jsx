import React from 'react'
import {
  gradients,
  colors,
  typography,
  spacing,
  borderRadius,
  shadows
} from '../constants/theme'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.state = {
      hasError: true,
      error,
      errorInfo
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: gradients.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.xl,
            fontFamily: typography.fontFamily.sans
          }}>
          <div
            style={{
              maxWidth: '600px',
              background: colors.bgCard,
              borderRadius: borderRadius.lg,
              padding: spacing['4xl'],
              boxShadow: shadows.lg,
              textAlign: 'center'
            }}>
            <div
              style={{
                fontSize: typography.fontSize['4xl'],
                marginBottom: spacing['2xl']
              }}>
              �
            </div>
            <h1
              style={{
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.textPrimary,
                marginBottom: spacing.lg
              }}>
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: typography.fontSize.lg,
                color: colors.textMuted,
                marginBottom: spacing['3xl'],
                lineHeight: 1.6
              }}>
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: `${spacing.md} ${spacing['3xl']}`,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: colors.textWhite,
                background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                border: 'none',
                borderRadius: borderRadius.md,
                cursor: 'pointer',
                boxShadow: shadows.md,
                fontFamily: typography.fontFamily.sans
              }}>
              Reload Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details
                style={{
                  marginTop: spacing['3xl'],
                  textAlign: 'left',
                  fontSize: typography.fontSize.sm,
                  color: colors.textMuted
                }}>
                <summary
                  style={{ cursor: 'pointer', marginBottom: spacing.md }}>
                  Error details (development only)
                </summary>
                <pre
                  style={{
                    background: colors.bgDark,
                    padding: spacing.lg,
                    borderRadius: borderRadius.sm,
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}>
                  {this.state.error && this.state.error.toString()}
                  {'\n'}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
