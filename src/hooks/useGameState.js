import { useState, useCallback, useEffect } from 'react'
import { saveGameState, loadGameState } from '../services/storage'
import { api } from '../services/api'

export const useGameState = (maxGuesses, date, onGameComplete) => {
  const [guesses, setGuesses] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')
  const [isRecalculating, setIsRecalculating] = useState(false)
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false)

  // Save to localStorage whenever game state changes (but not before initial load)
  useEffect(() => {
    if (date && !isRecalculating && hasLoadedInitial) {
      saveGameState(date, { guesses, gameOver, won })
    }
  }, [guesses, gameOver, won, date, isRecalculating, hasLoadedInitial])

  // Load and recalculate state when date changes
  useEffect(() => {
    const loadAndRecalculate = async () => {
      setHasLoadedInitial(false)
      const saved = loadGameState(date)

      if (saved && saved.guessNames && saved.guessNames.length > 0) {
        setIsRecalculating(true)
        setGameOver(saved.gameOver || false)
        setWon(saved.won || false)

        try {
          // Recalculate all guesses by making API calls
          // guessNames is stored newest first, so iterate forward to maintain order
          const recalculatedGuesses = []
          for (let i = 0; i < saved.guessNames.length; i++) {
            const guessName = saved.guessNames[i]
            const response = await api.checkGuess(guessName, date)

            if (response.success) {
              recalculatedGuesses.push({
                id: Date.now() + i,
                guess: response.guess,
                comparison: response.comparison,
                correct: response.correct
              })
            }
          }

          setGuesses(recalculatedGuesses)
        } catch (err) {
          console.error('Failed to recalculate guesses:', err)
          setGuesses([])
        } finally {
          setIsRecalculating(false)
        }
      } else {
        setGuesses([])
        setGameOver(false)
        setWon(false)
      }

      setCurrentQuery('')
      setHasLoadedInitial(true)
    }

    loadAndRecalculate()
  }, [date])

  const addGuess = useCallback(
    (guessData) => {
      // Don't allow guesses if game is over
      if (gameOver) return

      const newGuess = {
        id: Date.now(),
        guess: guessData.guess,
        comparison: guessData.comparison,
        correct: guessData.correct
      }

      const newGuesses = [newGuess, ...guesses]
      setGuesses(newGuesses)
      setCurrentQuery('')

      const isWin = guessData.correct
      const isLoss = !guessData.correct && newGuesses.length >= maxGuesses

      if (isWin) {
        setWon(true)
        setGameOver(true)
        if (onGameComplete) {
          onGameComplete(true, newGuesses.length)
        }
      } else if (isLoss) {
        setGameOver(true)
        if (onGameComplete) {
          onGameComplete(false, newGuesses.length)
        }
      }
    },
    [guesses, gameOver, maxGuesses, onGameComplete]
  )

  return {
    guesses,
    gameOver,
    won,
    currentQuery,
    setCurrentQuery,
    addGuess,
    isRecalculating
  }
}
