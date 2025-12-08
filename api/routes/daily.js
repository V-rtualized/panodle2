const express = require('express')
const router = express.Router()
const pool = require('../db/pool')

/**
 * Get current date in MST/MDT timezone
 * Resets at midnight Mountain Time (America/Denver)
 */
function getMSTDate() {
  const now = new Date()
  const mstDate = new Date(
    now.toLocaleString('en-US', {
      timeZone: 'America/Denver'
    })
  )

  const year = mstDate.getFullYear()
  const month = String(mstDate.getMonth() + 1).padStart(2, '0')
  const day = String(mstDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Generate a seed for a given date
 * Seeds changed on 2025-12-08 to use a new generation method
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Seed value for database query
 */
function generateSeed(dateString) {
  const CUTOFF_DATE = '2025-12-07'

  // For dates up to and including Dec 7, 2025, use the original seed format
  if (dateString <= CUTOFF_DATE) {
    return dateString.split('-').join('')  // e.g., "20251207"
  }

  // For dates from Dec 8, 2025 onwards, use new seed format
  // Prefix with 'v2-' to ensure different MD5 hash
  return `v2-${dateString.split('-').join('')}`  // e.g., "v2-20251208"
}

/**
 * GET /api/daily
 * Get today's daily game run (or specific date if provided)
 *
 * Resets at midnight MST/MDT (America/Denver timezone)
 * Returns a deterministic run based on the MST date
 * Query param: ?date=YYYY-MM-DD (optional)
 */
router.get('/', async (req, res) => {
  try {
    const targetDate = req.query.date || getMSTDate()

    const seed = generateSeed(targetDate)

    const result = await pool.query(
      `
      SELECT * FROM runs
      ORDER BY md5(name || $1)
      LIMIT 1
    `,
      [seed]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No runs available for daily game'
      })
    }

    res.json({
      success: true,
      date: targetDate,
      timezone: 'America/Denver (MST/MDT)',
      data: {
        lift: result.rows[0].lift,
        zone: result.rows[0].zone,
        difficulty: result.rows[0].difficulty,
        features: result.rows[0].features,
        length: result.rows[0].length,
        starting_elevation: result.rows[0].starting_elevation,
        ending_elevation: result.rows[0].ending_elevation
      },
      hash: require('crypto')
        .createHash('md5')
        .update(result.rows[0].name)
        .digest('hex')
    })
  } catch (error) {
    console.error('Error fetching daily run:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily game'
    })
  }
})

/**
 * POST /api/daily/check
 * Check if a guess is correct for today's game (or specific date)
 * Body: { guess: string, date?: string }
 */
router.post('/check', express.json(), async (req, res) => {
  try {
    const { guess, date } = req.body

    if (!guess) {
      return res.status(400).json({
        success: false,
        error: 'Guess is required'
      })
    }

    const targetDate = date || getMSTDate()
    const seed = generateSeed(targetDate)

    const dailyResult = await pool.query(
      `
      SELECT * FROM runs
      ORDER BY md5(name || $1)
      LIMIT 1
    `,
      [seed]
    )

    if (dailyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Daily game not found'
      })
    }

    const dailyRun = dailyResult.rows[0]

    const guessResult = await pool.query('SELECT * FROM runs WHERE name = $1', [
      guess
    ])

    if (guessResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Invalid guess - run not found'
      })
    }

    const guessedRun = guessResult.rows[0]

    const isCorrect = guessedRun.name === dailyRun.name

    const comparison = {
      correct: isCorrect,
      lift: guessedRun.lift === dailyRun.lift ? 'correct' : 'incorrect',
      zone: guessedRun.zone === dailyRun.zone ? 'correct' : 'incorrect',
      difficulty:
        guessedRun.difficulty === dailyRun.difficulty ? 'correct' : 'incorrect',
      features: compareArrays(guessedRun.features, dailyRun.features),
      length: compareNumbers(guessedRun.length, dailyRun.length),
      starting_elevation: compareNumbers(
        guessedRun.starting_elevation,
        dailyRun.starting_elevation
      ),
      ending_elevation: compareNumbers(
        guessedRun.ending_elevation,
        dailyRun.ending_elevation
      )
    }

    res.json({
      success: true,
      correct: isCorrect,
      guess: guessedRun,
      comparison,
      answer: isCorrect ? dailyRun.name : undefined
    })
  } catch (error) {
    console.error('Error checking guess:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to check guess'
    })
  }
})

function compareArrays(arr1, arr2) {
  const set1 = new Set(arr1 || [])
  const set2 = new Set(arr2 || [])
  const intersection = [...set1].filter((x) => set2.has(x))

  if (arr1.length === arr2.length && intersection.length === arr1.length) {
    return 'correct'
  } else if (intersection.length > 0) {
    return 'partial'
  }
  return 'incorrect'
}

function compareNumbers(num1, num2) {
  if (num1 === num2) return 'correct'
  return num1 < num2 ? 'higher' : 'lower'
}

module.exports = router
