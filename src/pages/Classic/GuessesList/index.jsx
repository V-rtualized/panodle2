import React from 'react'
import GuessRow from './GuessRow'

const GuessesList = ({ guesses }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {guesses.length === 0 ? (
        <div className="retro-card" style={{
          padding: '40px',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '18px',
          fontFamily: '"Inter", sans-serif'
        }}>
          No guesses yet. Start typing to search for a run!
        </div>
      ) : (
        guesses.map((g, index) => (
          <GuessRow
            key={g.id}
            guess={g.guess}
            comparison={g.comparison}
            isCorrect={g.correct}
            isNewest={index === 0}
          />
        ))
      )}
    </div>
  )
}

export default GuessesList
