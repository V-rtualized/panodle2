import React from 'react'
import { Construction } from 'lucide-react'

const Trails = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px 100px 20px',
      fontFamily: '"Inter", sans-serif'
    }}>
    <div
      style={{
        textAlign: 'center',
        maxWidth: '600px'
      }}>
      <Construction
        size={80}
        style={{
          color: '#3b82f6',
          display: 'inline',
          marginBottom: '24px'
        }}
      />
      <h1
        style={{
          fontSize: '48px',
          fontWeight: '700',
          color: '#e0e7ff',
          marginBottom: '16px',
          textShadow: '0 0 20px rgba(224, 231, 255, 0.3)'
        }}>
        Work in Progress
      </h1>
      <p
        style={{
          fontSize: '20px',
          color: '#cbd5e1',
          lineHeight: '1.6'
        }}>
        The Trails mode is currently under development. Check back soon for a
        new way to play!
      </p>
    </div>
  </div>
)

export default Trails
