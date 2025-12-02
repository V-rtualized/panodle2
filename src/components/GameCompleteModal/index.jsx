import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useStats } from '../../hooks/useStats'
import ModalWrapper from '../ModalWrapper'
import ModalHeader from './ModalHeader'
import GuessDistribution from './GuessDistribution'
import ActionButtons from './ActionButtons'

const GameCompleteModal = ({ isOpen, won, guessCount, shareText, onClose }) => {
  const navigate = useNavigate()
  const { stats } = useStats()

  // Calculate distribution data, ensuring current guess is included
  const currentDistribution = { ...stats.guessDistribution }
  if (won) {
    currentDistribution[guessCount] = (currentDistribution[guessCount] || 0) + 1
  }

  const handleViewStats = () => {
    navigate('/stats')
    onClose()
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="500px">
      <ModalHeader won={won} guessCount={guessCount} />
      <GuessDistribution
        distribution={currentDistribution}
        won={won}
        guessCount={guessCount}
      />
      <ActionButtons shareText={shareText} onViewStats={handleViewStats} />
    </ModalWrapper>
  )
}

export default GameCompleteModal
