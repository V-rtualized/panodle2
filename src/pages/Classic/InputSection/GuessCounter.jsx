import React from 'react'

const GuessCounter = ({ current, max }) => (
  <div
    style={{
      background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      border: 'none',
      borderRadius: '50px',
      padding: '18px 40px',
      fontFamily: '"Outfit", sans-serif',
      fontSize: '20px',
      color: '#fff',
      boxShadow: '0 6px 0 #2563eb, 0 8px 20px rgba(0,0,0,0.3)',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '700',
      minWidth: '80px',
      textAlign: 'center'
    }}>
    {current}/{max}
  </div>
)

export default GuessCounter
