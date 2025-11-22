import React from 'react'
import { api } from '../../services/api'
import { useDailyPuzzle } from '../../hooks/useDailyPuzzle'
import { useGameState } from '../../hooks/useGameState'
import { MAX_GUESSES } from '../../constants/gameConfig'
import GameHeader from './GameHeader'
import InputSection from './InputSection'
import StatLabels from './StatLabels'
import GuessesList from './GuessesList'
import Legend from './Legend'

const Classic = () => {
  const { loading, error } = useDailyPuzzle()
  const gameState = useGameState(MAX_GUESSES)

  const handleGuess = async (runName) => {
    if (gameState.gameOver || gameState.guesses.length >= MAX_GUESSES) return

    try {
      const response = await api.checkGuess(runName)

      if (response.success) {
        gameState.addGuess(response)
      }
    } catch (err) {
      console.error('Error submitting guess:', err)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", sans-serif'
      }}>
        <div style={{ fontSize: '24px', color: '#cbd5e1' }}>Loading today's puzzle...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", sans-serif'
      }}>
        <div style={{ fontSize: '24px', color: '#ef4444' }}>Error: {error}</div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      padding: '0',
      margin: '0',
      fontFamily: '"Inter", sans-serif'
    }}>
      <GameHeader />

      <div style={{ maxWidth: '1000px', margin: '-40px auto 60px', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        <InputSection
          gameOver={gameState.gameOver}
          won={gameState.won}
          guesses={gameState.guesses}
          maxGuesses={MAX_GUESSES}
          onGuess={handleGuess}
          currentQuery={gameState.currentQuery}
          onQueryChange={gameState.setCurrentQuery}
        />

        <StatLabels />

        <GuessesList guesses={gameState.guesses} />

        <Legend />
      </div>
    </div>
  )
}

export default Classic
