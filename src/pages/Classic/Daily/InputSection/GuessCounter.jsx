import React from 'react'

const GuessCounter = ({ current, max }) => (
  <>
    <div
      className="guess-counter"
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
    <style>
      {`
        @media (max-width: 767px) {
          .guess-counter {
            background: none !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 2px 0 !important;
            box-shadow: none !important;
            font-size: 16px !important;
            color: #cbd5e1 !important;
            min-width: auto !important;
          }
        }
      `}
    </style>
  </>
)

export default GuessCounter
