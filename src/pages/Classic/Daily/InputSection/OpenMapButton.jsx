import React from 'react'
import { ExternalLink } from 'lucide-react'

const TRAIL_MAP_URL =
  'https://issuu.com/panoramamountainvillage/docs/panorama_w2024-25_trail_map?fr=sMDJlMDYzNjg5MjU'

const OpenMapButton = ({ onMapOpen }) => {
  const handleClick = () => {
    window.open(TRAIL_MAP_URL, '_blank', 'noopener,noreferrer')
    if (onMapOpen) {
      onMapOpen()
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
        border: 'none',
        borderRadius: '50px',
        padding: '18px 32px',
        fontFamily: '"Outfit", sans-serif',
        fontSize: '16px',
        color: '#fff',
        boxShadow: '0 6px 0 #059669, 0 8px 20px rgba(0,0,0,0.3)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: '700',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow =
          '0 8px 0 #059669, 0 10px 25px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow =
          '0 6px 0 #059669, 0 8px 20px rgba(0,0,0,0.3)'
      }}>
      <ExternalLink size={18} />
      Open Map
    </button>
  )
}

export default OpenMapButton
