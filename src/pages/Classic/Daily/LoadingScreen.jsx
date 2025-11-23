import React from 'react'

const LoadingScreen = () => (
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
    <div style={{ fontSize: '24px', color: '#cbd5e1' }}>
      Loading today's game...
    </div>
  </div>
)

export default LoadingScreen
