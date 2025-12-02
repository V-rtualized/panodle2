// LocalStorage keys
const GAME_STATE_PREFIX = 'panodle_game_'
const STATS_KEY = 'panodle_stats'

/**
 * Save game state for a specific date
 * Only saves guess names, not comparison data
 */
export const saveGameState = (date, gameState) => {
  try {
    const data = {
      guessNames: gameState.guesses.map((g) => g.guess.name),
      gameOver: gameState.gameOver,
      won: gameState.won,
      completedAt: gameState.gameOver ? Date.now() : null
    }
    localStorage.setItem(`${GAME_STATE_PREFIX}${date}`, JSON.stringify(data))
  } catch (err) {
    console.error('Failed to save game state:', err)
  }
}

/**
 * Load game state for a specific date
 */
export const loadGameState = (date) => {
  try {
    const data = localStorage.getItem(`${GAME_STATE_PREFIX}${date}`)
    if (!data) return null
    return JSON.parse(data)
  } catch (err) {
    console.error('Failed to load game state:', err)
    return null
  }
}

/**
 * Clear game state for a specific date
 */
export const clearGameState = (date) => {
  try {
    localStorage.removeItem(`${GAME_STATE_PREFIX}${date}`)
  } catch (err) {
    console.error('Failed to clear game state:', err)
  }
}

/**
 * Save player statistics
 */
export const saveStats = (stats) => {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch (err) {
    console.error('Failed to save stats:', err)
  }
}

/**
 * Load player statistics
 */
export const loadStats = () => {
  try {
    const data = localStorage.getItem(STATS_KEY)
    if (!data) {
      return {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: {},
        lastCompletedDate: null
      }
    }
    return JSON.parse(data)
  } catch (err) {
    console.error('Failed to load stats:', err)
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: {},
      lastCompletedDate: null
    }
  }
}

/**
 * Get all saved game dates
 */
export const getAllSavedGameDates = () => {
  try {
    const dates = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(GAME_STATE_PREFIX)) {
        dates.push(key.replace(GAME_STATE_PREFIX, ''))
      }
    }
    return dates
  } catch (err) {
    console.error('Failed to get saved game dates:', err)
    return []
  }
}

/**
 * Clear all game data (all saved games)
 */
export const clearAllGameData = () => {
  try {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(GAME_STATE_PREFIX)) {
        keys.push(key)
      }
    }
    keys.forEach((key) => localStorage.removeItem(key))
    return true
  } catch (err) {
    console.error('Failed to clear game data:', err)
    return false
  }
}

/**
 * Clear all data (games + stats)
 */
export const clearAllData = () => {
  try {
    clearAllGameData()
    localStorage.removeItem(STATS_KEY)
    return true
  } catch (err) {
    console.error('Failed to clear all data:', err)
    return false
  }
}
