import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import { getArchiveDates, formatDate, getTodayPST } from '../../utils/dateUtils'

const Archive = () => {
  const allDates = getArchiveDates()
  const today = getTodayPST()
  const archiveDates = allDates.filter((date) => date !== today)
  const showPlaceholder = archiveDates.length === 0

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '0 20px'
      }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Calendar
          size={48}
          style={{
            color: '#60a5fa',
            margin: '0 auto 16px'
          }}
        />
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#e0e7ff',
            marginBottom: '8px'
          }}>
          Archive
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#94a3b8'
          }}>
          Play past daily games
        </p>
      </div>

      {showPlaceholder ? (
        <div
          className="retro-card"
          style={{
            padding: '32px',
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Come back tomorrow! You'll be able to play any past
            daily game by selecting a date.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px'
          }}>
          {archiveDates.map((date) => (
            <Link
              key={date}
              to={`/classic/archive/${date}`}
              style={{
                textDecoration: 'none'
              }}>
              <div
                className="retro-card"
                style={{
                  padding: '16px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow =
                    '0 8px 24px rgba(0, 0, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = ''
                }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#e0e7ff',
                    marginBottom: '4px'
                  }}>
                  {date}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#94a3b8'
                  }}>
                  {formatDate(date)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Archive
