const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// Import API routes
const runsRoutes = require('./api/routes/runs')
const dailyRoutes = require('./api/routes/daily')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'panodle-v2',
    version: '2.0.0'
  })
})

// API routes (must come before static files)
app.use('/api/runs', runsRoutes)
app.use('/api/daily', dailyRoutes)

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')))

// Handle React routing - return index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
  console.log(`Health check available at http://0.0.0.0:${PORT}/health`)
  console.log(`API available at http://0.0.0.0:${PORT}/api`)
})
