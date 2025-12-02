import React from 'react'
import { Check } from 'lucide-react'
import StatCell from './StatCell'
import NumericStat from './NumericStat'
import DifficultyStatCell from './DifficultyStatCell'

const GuessRow = ({ guess, comparison, isCorrect, isNewest }) => (
  <div
    className="retro-card"
    style={{
      padding: '24px',
      animation: isNewest ? 'bobble 0.6s ease-out' : 'none'
    }}>
    <div
      style={{
        fontFamily: '"Outfit", sans-serif',
        fontSize: '24px',
        marginBottom: '16px',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '800'
      }}>
      {isCorrect && <Check size={28} color="#10b981" />}
      {guess.name}
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px'
      }}>
      <StatCell
        value={guess.lift}
        status={comparison.lift}
        baseSize={20}
        label="Lift"
      />
      <StatCell
        value={guess.zone}
        status={comparison.zone}
        baseSize={18}
        label="Zone"
      />
      <DifficultyStatCell
        difficulty={guess.difficulty}
        status={comparison.difficulty}
        label="Difficulty"
      />
      <StatCell
        value={guess.features?.join(', ') || 'None'}
        status={comparison.features}
        baseSize={16}
        label="Features"
      />
      <NumericStat
        value={guess.length}
        unit="m"
        status={comparison.length}
        label="Length"
      />
      <NumericStat
        value={guess.starting_elevation}
        unit="m"
        status={comparison.starting_elevation}
        label="Start"
      />
      <NumericStat
        value={guess.ending_elevation}
        unit="m"
        status={comparison.ending_elevation}
        label="End"
      />
    </div>
  </div>
)

export default GuessRow
