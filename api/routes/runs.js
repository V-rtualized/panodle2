const express = require('express')
const router = express.Router()
const pool = require('../db/pool')

/**
 * GET /api/runs
 * Get all ski runs
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM runs ORDER BY name ASC'
    )
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    })
  } catch (error) {
    console.error('Error fetching runs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch runs'
    })
  }
})

/**
 * GET /api/runs/random
 * Get a random ski run
 */
router.get('/random', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM runs ORDER BY RANDOM() LIMIT 1'
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No runs found'
      })
    }

    res.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching random run:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch random run'
    })
  }
})

/**
 * GET /api/runs/search?q=name
 * Search runs by name (autocomplete)
 */
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Query parameter "q" is required'
      })
    }

    const result = await pool.query(
      'SELECT name FROM runs WHERE name ILIKE $1 ORDER BY name ASC LIMIT 10',
      [`%${q}%`]
    )

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows.map(r => r.name)
    })
  } catch (error) {
    console.error('Error searching runs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to search runs'
    })
  }
})

/**
 * GET /api/runs/:name
 * Get a specific ski run by name
 */
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params

    const result = await pool.query(
      'SELECT * FROM runs WHERE name = $1',
      [name]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Run not found'
      })
    }

    res.json({
      success: true,
      data: result.rows[0]
    })
  } catch (error) {
    console.error('Error fetching run:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch run'
    })
  }
})

module.exports = router
