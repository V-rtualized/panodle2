import React, { useState, useEffect } from 'react'
import { api } from '../services/api'
import SearchInput from './SearchInput'
import GuessRow from './GuessRow'

const MAX_GUESSES = 10

const GameBoard = () => {
  const [dailyPuzzle, setDailyPuzzle] = useState(null)
  const [guesses, setGuesses] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDailyPuzzle()
  }, [])

  const loadDailyPuzzle = async () => {
    try {
      setLoading(true)
      const response = await api.getDaily()
      if (response.success) {
        setDailyPuzzle(response)
      } else {
        setError(response.error || 'Failed to load puzzle')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGuess = async (runName) => {
    if (gameOver || guesses.length >= MAX_GUESSES) return

    try {
      const response = await api.checkGuess(runName)

      if (response.success) {
        const newGuess = {
          guess: response.guess,
          comparison: response.comparison,
          correct: response.correct
        }

        setGuesses([...guesses, newGuess])

        if (response.correct) {
          setWon(true)
          setGameOver(true)
        } else if (guesses.length + 1 >= MAX_GUESSES) {
          setGameOver(true)
        }
      }
    } catch (err) {
      console.error('Error submitting guess:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading the daily...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">PANODLE</h1>
          <p className="text-lg text-gray-600">
            Daily - {dailyPuzzle?.date}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Guess {guesses.length}/{MAX_GUESSES}
          </p>
        </div>

        {/* Search Input */}
        {!gameOver && (
          <div className="flex justify-center mb-8">
            <SearchInput onSubmit={handleGuess} disabled={gameOver} />
          </div>
        )}

        {/* Game Over Message */}
        {gameOver && (
          <div className={`text-center mb-6 p-6 rounded-lg ${won ? 'bg-green-100' : 'bg-red-100'}`}>
            <h2 className={`text-3xl font-bold ${won ? 'text-green-700' : 'text-red-700'}`}>
              {won ? 'Congratulations!' : 'Game Over!'}
            </h2>
            <p className="text-lg mt-2">
              {won
                ? `You guessed it in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!`
                : 'Better luck tomorrow!'
              }
            </p>
          </div>
        )}

        {/* Guesses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Guesses</h2>
          {guesses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No guesses yet. Start typing to search for a run!</p>
          ) : (
            <div>
              {guesses.map((g, index) => (
                <GuessRow
                  key={index}
                  guess={g.guess}
                  comparison={g.comparison}
                />
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-2 text-gray-800">Legend:</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span>Incorrect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              <span>Partial Match</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-300 rounded"></div>
              <span>↑ Higher</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-300 rounded"></div>
              <span>↓ Lower</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameBoard
