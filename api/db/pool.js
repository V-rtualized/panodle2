const { Pool } = require('pg')

// Database connection pool
const pool = new Pool({
  host: process.env.REACT_APP_DB_HOST || 'localhost',
  port: process.env.REACT_APP_DB_PORT || 5432,
  database: process.env.REACT_APP_DB_NAME || 'panodle',
  user: process.env.REACT_APP_DB_USER || 'panodle_user',
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// Test connection on startup
pool.on('connect', () => {
  console.log('✓ Database connected')
})

pool.on('error', (err) => {
  console.error('Unexpected database error:', err)
})

module.exports = pool
