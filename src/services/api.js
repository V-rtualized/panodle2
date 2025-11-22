const API_BASE = '/api'

export const api = {
  async getDaily() {
    const response = await fetch(`${API_BASE}/daily`)
    if (!response.ok) throw new Error('Failed to fetch daily puzzle')
    return response.json()
  },

  async checkGuess(guess) {
    const response = await fetch(`${API_BASE}/daily/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guess })
    })
    if (!response.ok) throw new Error('Failed to check guess')
    return response.json()
  },

  async searchRuns(query) {
    if (!query || query.length < 1) return { success: true, data: [] }
    const response = await fetch(`${API_BASE}/runs/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error('Failed to search runs')
    return response.json()
  },

  async getAllRuns() {
    const response = await fetch(`${API_BASE}/runs`)
    if (!response.ok) throw new Error('Failed to fetch runs')
    return response.json()
  }
}
