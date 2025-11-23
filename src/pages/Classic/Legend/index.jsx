import React from 'react'
import { LEGEND_ITEMS } from '../../../constants/theme'
import LegendItem from './LegendItem'

const Legend = () => (
  <div
    className="retro-card"
    style={{
      padding: '24px',
      marginTop: '40px',
      background: 'rgba(30, 41, 59, 0.8)'
    }}>
    <h3
      style={{
        fontFamily: '"Outfit", sans-serif',
        fontSize: '18px',
        fontWeight: '800',
        marginBottom: '16px',
        color: '#e2e8f0',
        letterSpacing: '1px'
      }}>
      Legend
    </h3>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '14px',
        fontFamily: '"Inter", sans-serif'
      }}>
      {LEGEND_ITEMS.map((item) => (
        <LegendItem key={item.label} {...item} />
      ))}
    </div>
  </div>
)

export default Legend
