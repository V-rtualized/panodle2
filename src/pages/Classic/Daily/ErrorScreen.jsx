import React from 'react'

const ErrorScreen = ({ message }) => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 0 120px 0',
      fontFamily: '"Inter", sans-serif'
    }}>
    <div style={{ fontSize: '24px', color: '#ef4444' }}>Error: {message}</div>
  </div>
)

export default ErrorScreen
