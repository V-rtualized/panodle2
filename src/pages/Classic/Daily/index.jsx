import React, { useCallback } from 'react'
import { api } from '../../../services/api'
import { useDailyPuzzle } from '../../../hooks/useDailyPuzzle'
import { useGameState } from '../../../hooks/useGameState'
import { useStats } from '../../../hooks/useStats'
import { MAX_GUESSES } from '../../../constants/gameConfig'
import GameHeader from './GameHeader'
import InputSection from './InputSection'
import StatLabels from './StatLabels'
import GuessesList from './GuessesList'
import Legend from './Legend'
import LoadingScreen from '../../../components/LoadingScreen'
import ErrorScreen from '../../../components/ErrorScreen'

const Daily = ({ date }) => {
  const { loading, error } = useDailyPuzzle(date)
  const { recordWin, recordLoss } = useStats()

  const handleGameComplete = useCallback(
    (won, guessCount) => {
      if (won) {
        recordWin(guessCount, date)
      } else {
        recordLoss(date)
      }
    },
    [recordWin, recordLoss, date]
  )

  const gameState = useGameState(MAX_GUESSES, date, handleGameComplete)

  const handleGuess = useCallback(
    async (runName) => {
      if (gameState.gameOver || gameState.guesses.length >= MAX_GUESSES) return

      try {
        const response = await api.checkGuess(runName, date)

        if (response.success) {
          gameState.addGuess(response)
        }
      } catch (err) {
        console.error('Error submitting guess:', err)
      }
    },
    [gameState.gameOver, gameState.guesses.length, gameState.addGuess, date]
  )

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />

  return (
    <>
      <GameHeader
        lastGuess={gameState.guesses.length > 0 ? gameState.guesses[0] : null}
        date={date}
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
    </>
  )
}

export default Daily
