import { useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'

export const useDailyPuzzle = (date) => {
  const [puzzle, setPuzzle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadPuzzle = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.getDaily(date)
      if (response.success) {
        setPuzzle(response)
      } else {
        setError(response.error || 'Failed to load game')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => {
    loadPuzzle().then()
  }, [loadPuzzle])

  return { puzzle, loading, error }
}
