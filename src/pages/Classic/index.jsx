import React, { useCallback } from 'react'
import { api } from '../../services/api'
import { useDailyPuzzle } from '../../hooks/useDailyPuzzle'
import { useGameState } from '../../hooks/useGameState'
import { MAX_GUESSES } from '../../constants/gameConfig'
import GameHeader from './GameHeader'
import InputSection from './InputSection'
import StatLabels from './StatLabels'
import GuessesList from './GuessesList'
import Legend from './Legend'
import LoadingScreen from './LoadingScreen'
import ErrorScreen from './ErrorScreen'

const Classic = () => {
  const { loading, error } = useDailyPuzzle()
  const gameState = useGameState(MAX_GUESSES)

  const handleGuess = useCallback(
    async (runName) => {
      if (gameState.gameOver || gameState.guesses.length >= MAX_GUESSES) return

      try {
        const response = await api.checkGuess(runName)

        if (response.success) {
          gameState.addGuess(response)
        }
      } catch (err) {
        console.error('Error submitting guess:', err)
      }
    },
    [gameState.gameOver, gameState.guesses.length, gameState.addGuess]
  )

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        padding: '0',
        margin: '0',
        fontFamily: '"Inter", sans-serif'
      }}>
      <GameHeader
        lastGuess={gameState.guesses.length > 0 ? gameState.guesses[0] : null}
      />

      <div
        style={{
          maxWidth: '1000px',
          margin: '-40px auto 60px',
          padding: '0 20px',
          position: 'relative',
          zIndex: 2
        }}>
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
