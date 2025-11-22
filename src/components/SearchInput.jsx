import React, { useState, useEffect, useRef } from 'react'
import { api } from '../services/api'

const SearchInput = ({ onSubmit, disabled }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const searchRuns = async () => {
      if (query.length < 1) {
        setResults([])
        setIsOpen(false)
        return
      }

      try {
        const response = await api.searchRuns(query)
        if (response.success) {
          setResults(response.data)
          setIsOpen(response.data.length > 0)
        }
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      }
    }

    const debounce = setTimeout(searchRuns, 200)
    return () => clearTimeout(debounce)
  }, [query])

  const handleKeyDown = (e) => {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex].name)
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleSelect = (runName) => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setSelectedIndex(-1)
    onSubmit(runName)
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type a run name..."
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {results.map((run, index) => (
            <div
              key={run.name}
              onClick={() => handleSelect(run.name)}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-semibold">{run.name}</div>
              <div className={`text-sm ${index === selectedIndex ? 'text-blue-100' : 'text-gray-600'}`}>
                {run.lift} • {run.zone} • {run.difficulty}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchInput
