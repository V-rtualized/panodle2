import React from 'react'

const WinLossMessage = ({ won }) => (
  <div
    style={{
      padding: '24px',
      background: won
        ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
        : 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      borderRadius: '16px',
      textAlign: 'center',
      color: '#fff',
      fontFamily: '"Outfit", sans-serif',
      fontSize: '32px',
      fontWeight: '800',
      textShadow: '2px 2px 0 rgba(0,0,0,0.2)'
    }}>
    {won ? 'You Found It!' : 'Better Luck Tomorrow!'}
  </div>
)

export default WinLossMessage
