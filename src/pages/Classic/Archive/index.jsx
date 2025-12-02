import React from 'react'
import { Calendar } from 'lucide-react'
import PageHeader from '../../../components/PageHeader'
import InfoBox from '../../../components/InfoBox'
import ArchiveDateGrid from './ArchiveDateGrid'
import ArchiveEmptyState from './ArchiveEmptyState'
import { getArchiveDates, getTodayMST } from '../../../utils/dateUtils'
import { containers, spacing, colors } from '../../../constants/theme'

const Archive = () => {
  const allDates = getArchiveDates()
  const today = getTodayMST()
  const archiveDates = allDates.filter((date) => date !== today)
  const showPlaceholder = archiveDates.length === 0

  return (
    <div
      style={{
        maxWidth: containers.lg,
        margin: `${spacing['4xl']} auto`,
        padding: `0 ${spacing.xl}`
      }}>
      <PageHeader
        icon={Calendar}
        title="Archive"
        subtitle="Play past daily games"
      />

      {/* Stats Disclaimer */}
      <InfoBox
        variant="warning"
        style={{
          marginBottom: spacing['3xl'],
          maxWidth: '600px',
          margin: `0 auto ${spacing['3xl']}`
        }}>
        <p style={{ margin: 0 }}>
          <strong style={{ color: colors.textPrimary }}>Note:</strong> Archive
          games are for practice only. They don't count towards your statistics
          or streaks.
        </p>
      </InfoBox>

      {showPlaceholder ? (
        <ArchiveEmptyState />
      ) : (
        <ArchiveDateGrid dates={archiveDates} />
      )}
    </div>
  )
}

export default Archive
