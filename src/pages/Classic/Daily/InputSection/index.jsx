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
      <>
        {/* Mobile: Open Map button above input */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
          className="mobile-map-button">
          <OpenMapButton onMapOpen={onMapOpen} />
        </div>

        {/* Desktop: Input and buttons in row */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
          className="desktop-input-row">
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

        {/* Mobile: Input and counter */}
        <div className="mobile-input-section">
          <SearchInput
            onSubmit={onGuess}
            disabled={gameOver}
            query={currentQuery}
            onQueryChange={onQueryChange}
          />
          <div
            style={{
              textAlign: 'center',
              marginTop: '12px'
            }}>
            <GuessCounter current={guesses.length} max={maxGuesses} />
          </div>
        </div>

        <style>
          {`
            @media (max-width: 767px) {
              .desktop-input-row {
                display: none !important;
              }
            }
            @media (min-width: 768px) {
              .mobile-map-button,
              .mobile-input-section {
                display: none !important;
              }
            }
          `}
        </style>
      </>
    )}
  </div>
)

export default InputSection
