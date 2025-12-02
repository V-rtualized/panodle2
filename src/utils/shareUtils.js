import { formatDate } from './dateUtils'

/**
 * Get emoji for a single stat comparison
 */
const getStatEmoji = (statValue) => {
  switch (statValue) {
    case 'correct':
      return '🟩'
    case 'incorrect':
      return '⬛'
    case 'partial':
      return '🟨'
    case 'higher':
      return '🔼'
    case 'lower':
      return '🔽'
    default:
      return '⬛'
  }
}

/**
 * Convert a single guess to a row of emojis
 */
const getGuessRow = (comparison) => {
  if (!comparison) return '⬜⬜⬜⬜⬜⬜⬜'

  const stats = [
    comparison.lift,
    comparison.zone,
    comparison.difficulty,
    comparison.features,
    comparison.length,
    comparison.starting_elevation,
    comparison.ending_elevation
  ]

  return stats.map((stat) => getStatEmoji(stat)).join('')
}

/**
 * Generate Wordle-style share text with stat grid
 */
export const generateShareText = (
  won,
  guessCount,
  maxGuesses,
  guesses,
  date,
  usedMap = false
) => {
  const dateFormatted = formatDate(date)
  const result = won ? guessCount : 'X'
  const mapSuffix = usedMap ? ' (with map)' : ''

  // Build emoji grid - each row is a guess, each column is a stat
  const emojiGrid = guesses
    .slice()
    .reverse() // Reverse to show oldest to newest
    .map((guess) => getGuessRow(guess.comparison))
    .join('\n')

  return `Panodle ${dateFormatted}
${result}/${maxGuesses}${mapSuffix}

${emojiGrid}

https://panodle.virtualized.dev`
}
