const express = require('express')
const router = express.Router()
const pool = require('../db/pool')

/**
 * Get current date in PST/PDT timezone
 * Resets at midnight Pacific Time (America/Vancouver)
 */
function getPSTDate() {
  const now = new Date()
  const pstDate = new Date(
    now.toLocaleString('en-US', {
      timeZone: 'America/Vancouver'
    })
  )

  const year = pstDate.getFullYear()
  const month = String(pstDate.getMonth() + 1).padStart(2, '0')
  const day = String(pstDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * GET /api/daily
 * Get today's daily puzzle run
 *
 * Resets at midnight PST/PDT (America/Vancouver timezone)
 * Returns a deterministic run based on the current PST date
 */
router.get('/', async (req, res) => {
  try {
    const today = getPSTDate()

    const seed = today.split('-').join('')

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
        error: 'No runs available for daily puzzle'
      })
    }

    res.json({
      success: true,
      date: today,
      timezone: 'America/Vancouver (PST/PDT)',
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
      error: 'Failed to fetch daily puzzle'
    })
  }
})

/**
 * POST /api/daily/check
 * Check if a guess is correct for today's puzzle
 */
router.post('/check', express.json(), async (req, res) => {
  try {
    const { guess } = req.body

    if (!guess) {
      return res.status(400).json({
        success: false,
        error: 'Guess is required'
      })
    }

    const today = getPSTDate()
    const seed = today.split('-').join('')

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
        error: 'Daily puzzle not found'
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
