import { useState, useCallback } from 'react'

export const useGameState = (maxGuesses) => {
  const [guesses, setGuesses] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  const addGuess = useCallback(
    (guessData) => {
      const newGuess = {
        id: Date.now(),
        guess: guessData.guess,
        comparison: guessData.comparison,
        correct: guessData.correct
      }

      setGuesses((prev) => [newGuess, ...prev])
      setCurrentQuery('')

      if (guessData.correct) {
        setWon(true)
        setGameOver(true)
      } else if (guesses.length + 1 >= maxGuesses) {
        setGameOver(true)
      }
    },
    [guesses.length, maxGuesses]
  )

  return {
    guesses,
    gameOver,
    won,
    currentQuery,
    setCurrentQuery,
    addGuess
  }
}
