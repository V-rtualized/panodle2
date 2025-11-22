import React from 'react'
import { MountainSnow } from 'lucide-react'

const GameHeader = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e3a8a 100%)',
      padding: '60px 20px 80px',
      position: 'relative',
      overflow: 'hidden'
    }} className="snow-pattern">
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          animation: 'bobble 3s ease-in-out infinite'
        }}>
          <MountainSnow size={56} color="#e0e7ff" strokeWidth={2.5} />
        </div>
        <h1 style={{
          fontFamily: '"Outfit", sans-serif',
          fontSize: '84px',
          margin: '20px 0 10px',
          color: '#e0e7ff',
          textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
          letterSpacing: '2px',
          lineHeight: '1',
          fontWeight: '800'
        }}>
          Panodle
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#cbd5e1',
          fontWeight: '700',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          Panorama Ski Run Guessing Game
        </p>
      </div>
    </div>
  )
}

export default GameHeader
