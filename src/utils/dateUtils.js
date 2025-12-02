import { OLDEST_ARCHIVE_DATE } from '../constants/gameConfig'

export const getTodayMST = () => {
  const now = new Date()
  const mstDate = new Date(
    now.toLocaleString('en-US', {
      timeZone: 'America/Denver'
    })
  )

  const year = mstDate.getFullYear()
  const month = String(mstDate.getMonth() + 1).padStart(2, '0')
  const day = String(mstDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getArchiveDates = () => {
  const todayStr = getTodayMST()
  const dates = []

  const current = new Date(todayStr + 'T00:00:00')

  while (true) {
    const year = current.getFullYear()
    const month = String(current.getMonth() + 1).padStart(2, '0')
    const day = String(current.getDate()).padStart(2, '0')
    const dateStr = `${year}-${month}-${day}`

    if (dateStr < OLDEST_ARCHIVE_DATE) break

    dates.push(dateStr)
    current.setDate(current.getDate() - 1)
  }

  return dates
}

export const formatDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
