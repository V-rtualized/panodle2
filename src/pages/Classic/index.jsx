import React from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Daily from './Daily'
import Archive from './Archive'
import { getTodayPST } from '../../utils/dateUtils'

const DailyWrapper = () => <Daily date={getTodayPST()} />

const ArchiveWrapper = () => {
  const { date } = useParams()
  return <Daily date={date} />
}

const Classic = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      padding: '0 0 120px 0',
      margin: '0',
      fontFamily: '"Inter", sans-serif'
    }}>
    <Routes>
      <Route index element={<Navigate to="daily" replace />} />
      <Route path="daily" element={<DailyWrapper />} />
      <Route path="archive" element={<Archive />} />
      <Route path="archive/:date" element={<ArchiveWrapper />} />
    </Routes>
  </div>
)

export default Classic
