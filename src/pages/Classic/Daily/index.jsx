import React, { useCallback, useState, useEffect } from 'react'
import { api } from '../../../services/api'
import { useDailyPuzzle } from '../../../hooks/useDailyPuzzle'
import { useGameState } from '../../../hooks/useGameState'
import { useStats } from '../../../hooks/useStats'
import { getTodayMST } from '../../../utils/dateUtils'
import { MAX_GUESSES } from '../../../constants/gameConfig'
import GameCompleteModal from '../../../components/modals/GameCompleteModal'
import { generateShareText } from '../../../utils/shareUtils'
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
  const [showModal, setShowModal] = useState(false)

  const handleGameComplete = useCallback(
    (won, guessCount) => {
      if (won) {
        recordWin(guessCount, date)
      } else {
        recordLoss(date)
      }
      // Show modal after a short delay (only for today's game)
      if (date === getTodayMST()) {
        setTimeout(() => setShowModal(true), 500)
      }
    },
    [recordWin, recordLoss, date]
  )

  const gameState = useGameState(MAX_GUESSES, date, handleGameComplete)

  // Reset modal when date changes
  useEffect(() => {
    setShowModal(false)
  }, [date])

  // Show modal if game was already completed (when loading from localStorage)
  // Only show for today's game
  useEffect(() => {
    if (gameState.gameOver && !loading && date === getTodayMST()) {
      setTimeout(() => setShowModal(true), 500)
    }
  }, [gameState.gameOver, loading, date])

  // Generate share text
  const shareText = generateShareText(
    gameState.won,
    gameState.guesses.length,
    MAX_GUESSES,
    gameState.guesses,
    date
  )

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

      {/* Game Complete Modal */}
      <GameCompleteModal
        isOpen={showModal && gameState.gameOver}
        won={gameState.won}
        guessCount={gameState.guesses.length}
        shareText={shareText}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}

export default Daily
