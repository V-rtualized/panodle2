import React, { useState, useEffect, useRef, useCallback } from 'react'
import { api } from '../../../../services/api'

const SearchInput = ({ onSubmit, disabled, query, onQueryChange }) => {
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleSelect = useCallback(
    (runName) => {
      setResults([])
      setIsOpen(false)
      setSelectedIndex(-1)
      onSubmit(runName)
    },
    [onSubmit]
  )

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

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen && e.key === 'Enter' && query.trim()) {
        handleSelect(query.trim())
        return
      }

      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex].name)
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    },
    [isOpen, query, results, selectedIndex, handleSelect]
  )

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        className="retro-input"
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a run name..."
        disabled={disabled}
        style={{
          width: '100%',
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text'
        }}
      />

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            zIndex: 1000,
            width: '100%',
            marginTop: '8px',
            background: 'rgba(51, 65, 85, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '3px solid #475569',
            borderRadius: '16px',
            maxHeight: '300px',
            overflowY: 'auto',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
          }}>
          {results.map((run, index) => (
            <div
              key={run.name}
              onClick={() => handleSelect(run.name)}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                background:
                  index === selectedIndex
                    ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
                    : 'transparent',
                color: index === selectedIndex ? '#fff' : '#e2e8f0',
                transition: 'all 0.2s',
                borderBottom:
                  index < results.length - 1
                    ? '1px solid rgba(71, 85, 105, 0.5)'
                    : 'none'
              }}
              onMouseEnter={() => setSelectedIndex(index)}>
              <div
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                  marginBottom: '4px'
                }}>
                {run.name}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  opacity: 0.8,
                  color: index === selectedIndex ? '#e0e7ff' : '#94a3b8'
                }}>
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
