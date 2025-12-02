import React from 'react'
import SearchInput from './SearchInput'
import GuessCounter from './GuessCounter'
import OpenMapButton from './OpenMapButton'
import WinLossMessage from './WinLossMessage'

const InputSection = ({
  gameOver,
  won,
  guesses,
  maxGuesses,
  onGuess,
  currentQuery,
  onQueryChange,
  onMapOpen
}) => (
  <div
    className="retro-card"
    style={{
      padding: '40px',
      marginBottom: '40px',
      position: 'relative',
      zIndex: 10
    }}>
    {gameOver ? (
      <WinLossMessage won={won} />
    ) : (
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <SearchInput
            onSubmit={onGuess}
            disabled={gameOver}
            query={currentQuery}
            onQueryChange={onQueryChange}
          />
        </div>
        <GuessCounter current={guesses.length} max={maxGuesses} />
        <OpenMapButton onMapOpen={onMapOpen} />
      </div>
    )}
  </div>
)

export default InputSection
