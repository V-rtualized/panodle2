import React from 'react'

const GuessRow = ({ guess, comparison }) => {
  const getCellColor = (status) => {
    switch (status) {
      case 'correct':
        return 'bg-green-500 text-white'
      case 'incorrect':
        return 'bg-red-500 text-white'
      case 'partial':
        return 'bg-yellow-500 text-white'
      case 'higher':
        return 'bg-orange-300 text-gray-800'
      case 'lower':
        return 'bg-blue-300 text-gray-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  const getArrow = (status) => {
    if (status === 'higher') return '↑'
    if (status === 'lower') return '↓'
    return null
  }

  return (
    <div className="w-full mb-3">
      <div className="font-semibold text-lg mb-2 text-gray-800">{guess.name}</div>
      <div className="grid grid-cols-7 gap-2">
        {/* Lift */}
        <div className={`p-3 rounded-lg text-center font-semibold ${getCellColor(comparison.lift)}`}>
          <div className="text-xs uppercase mb-1 opacity-80">Lift</div>
          <div className="text-sm">{guess.lift}</div>
        </div>

        {/* Zone */}
        <div className={`p-3 rounded-lg text-center font-semibold ${getCellColor(comparison.zone)}`}>
          <div className="text-xs uppercase mb-1 opacity-80">Zone</div>
          <div className="text-sm">{guess.zone}</div>
        </div>

        {/* Difficulty */}
        <div className={`p-3 rounded-lg text-center font-semibold ${getCellColor(comparison.difficulty)}`}>
          <div className="text-xs uppercase mb-1 opacity-80">Difficulty</div>
          <div className="text-sm">{guess.difficulty}</div>
        </div>

        {/* Features */}
        <div className={`p-3 rounded-lg text-center font-semibold ${getCellColor(comparison.features)}`}>
          <div className="text-xs uppercase mb-1 opacity-80">Features</div>
          <div className="text-xs">{guess.features?.join(', ') || 'None'}</div>
        </div>

        {/* Length */}
        <div className={`p-3 rounded-lg text-center font-semibold ${getCellColor(comparison.length)}`}>
          <div className="text-xs uppercase mb-1 opacity-80">Length</div>
          <div className="text-sm">
            {guess.length}m {getArrow(comparison.length)}
          </div>
        </div>

        {/* Starting Elevation */}
        <div className={`p-3 rounded-lg text-center font-semibold ${getCellColor(comparison.starting_elevation)}`}>
          <div className="text-xs uppercase mb-1 opacity-80">Start</div>
          <div className="text-sm">
            {guess.starting_elevation}m {getArrow(comparison.starting_elevation)}
          </div>
        </div>

        {/* Ending Elevation */}
        <div className={`p-3 rounded-lg text-center font-semibold ${getCellColor(comparison.ending_elevation)}`}>
          <div className="text-xs uppercase mb-1 opacity-80">End</div>
          <div className="text-sm">
            {guess.ending_elevation}m {getArrow(comparison.ending_elevation)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuessRow
