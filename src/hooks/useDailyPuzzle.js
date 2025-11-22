import { useState, useEffect } from 'react'
import { api } from '../services/api'

export const useDailyPuzzle = () => {
  const [puzzle, setPuzzle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPuzzle()
  }, [])

  const loadPuzzle = async () => {
    try {
      setLoading(true)
      const response = await api.getDaily()
      if (response.success) {
        setPuzzle(response)
      } else {
        setError(response.error || 'Failed to load puzzle')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { puzzle, loading, error }
}
