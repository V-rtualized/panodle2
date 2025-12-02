import { useState, useCallback, useEffect } from 'react'
import { loadStats, saveStats } from '../services/storage'
import { getTodayMST } from '../utils/dateUtils'

export const useStats = () => {
  const [stats, setStats] = useState(() => loadStats())

  // Save to localStorage whenever stats change
  useEffect(() => {
    saveStats(stats)
  }, [stats])

  const recordWin = useCallback((guessCount, date) => {
    setStats((prev) => {
      const today = getTodayMST()
      const isToday = date === today

      // Archive games don't count towards stats
      if (!isToday) {
        return prev
      }

      // Calculate streak
      const yesterday = new Date(today + 'T00:00:00')
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`

      let newCurrentStreak
      if (prev.lastCompletedDate === yesterdayStr || prev.gamesPlayed === 0) {
        newCurrentStreak = prev.currentStreak + 1
      } else if (prev.lastCompletedDate !== today) {
        newCurrentStreak = 1
      } else {
        newCurrentStreak = prev.currentStreak
      }

      const newMaxStreak = Math.max(prev.maxStreak, newCurrentStreak)

      // Update guess distribution
      const newDistribution = { ...prev.guessDistribution }
      newDistribution[guessCount] = (newDistribution[guessCount] || 0) + 1

      return {
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        currentStreak: newCurrentStreak,
        maxStreak: newMaxStreak,
        guessDistribution: newDistribution,
        lastCompletedDate: today
      }
    })
  }, [])

  const recordLoss = useCallback((date) => {
    setStats((prev) => {
      const today = getTodayMST()
      const isToday = date === today

      // Archive games don't count towards stats
      if (!isToday) {
        return prev
      }

      // Reset streak on loss
      return {
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0,
        lastCompletedDate: today
      }
    })
  }, [])

  const resetStats = useCallback(() => {
    const emptyStats = {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: {},
      lastCompletedDate: null
    }
    setStats(emptyStats)
    saveStats(emptyStats)
  }, [])

  return {
    stats,
    recordWin,
    recordLoss,
    resetStats
  }
}
