import React from 'react'
import { gradients, colors, typography } from '../constants/theme'

const ErrorScreen = ({ message }) => (
  <div
    style={{
      minHeight: '100vh',
      background: gradients.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 0 120px 0',
      fontFamily: typography.fontFamily.sans
    }}>
    <div style={{ fontSize: typography.fontSize['2xl'], color: colors.error }}>
      Error: {message}
    </div>
  </div>
)

export default ErrorScreen
