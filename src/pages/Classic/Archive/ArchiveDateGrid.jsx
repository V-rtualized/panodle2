import React from 'react'
import ArchiveDateCard from './ArchiveDateCard'
import { spacing } from '../../../constants/theme'

const ArchiveDateGrid = ({ dates }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: spacing.md
    }}>
    {dates.map((date) => (
      <ArchiveDateCard key={date} date={date} />
    ))}
  </div>
)

export default ArchiveDateGrid
