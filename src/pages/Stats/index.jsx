import React, { useState } from 'react'
import { BarChart3, Trophy, Flame, Target, Trash2 } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import InfoBox from '../../components/InfoBox'
import StatCard from './StatCard'
import GuessDistribution from './GuessDistribution'
import { useStats } from '../../hooks/useStats'
import { clearAllData } from '../../services/storage'
import {
  containers,
  spacing,
  colors,
  typography,
  gradients,
  borderRadius,
  shadows
} from '../../constants/theme'
import { transition } from '../../constants/animations'

const Stats = () => {
  const { stats, resetStats } = useStats()
  const [showConfirm, setShowConfirm] = useState(false)

  const winRate =
    stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0

  const handleClearData = () => {
    clearAllData()
    resetStats()
    setShowConfirm(false)
  }

  return (
    <div
      style={{
        maxWidth: containers.lg,
        margin: `${spacing['4xl']} auto`,
        padding: `0 ${spacing.xl} 140px`
      }}>
      <PageHeader
        icon={BarChart3}
        title="Statistics"
        subtitle="Track your Panodle performance"
      />

      {/* Main Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: spacing.lg,
          marginBottom: spacing['3xl']
        }}>
        <StatCard
          label="Games Played"
          value={stats.gamesPlayed}
          icon={Target}
        />
        <StatCard
          label="Win Rate"
          value={`${winRate}%`}
          icon={Trophy}
          gradient={gradients.success}
        />
        <StatCard
          label="Current Streak"
          value={stats.currentStreak}
          icon={Flame}
          gradient={gradients.primary}
        />
        <StatCard label="Max Streak" value={stats.maxStreak} icon={Flame} />
      </div>

      {/* Guess Distribution */}
      <div style={{ marginBottom: spacing['3xl'] }}>
        <GuessDistribution distribution={stats.guessDistribution} />
      </div>

      {/* Data Management */}
      <Card style={{ padding: spacing['3xl'], textAlign: 'center' }}>
        <h3
          style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.textPrimary,
            marginBottom: spacing.md
          }}>
          Data Management
        </h3>

        {/* Privacy Notice */}
        <InfoBox
          variant="info"
          style={{
            marginBottom: spacing['2xl'],
            maxWidth: '600px',
            margin: `0 auto ${spacing['2xl']}`
          }}>
          <p style={{ margin: 0 }}>
            <strong style={{ color: colors.textPrimary }}>Privacy Note:</strong>{' '}
            All your game data and stats are saved only on your device (in your
            browser). We don't store or have access to any of your information.
          </p>
        </InfoBox>

        <p
          style={{
            fontSize: typography.fontSize.md,
            color: colors.textMuted,
            marginBottom: spacing['2xl'],
            maxWidth: '500px',
            margin: `0 auto ${spacing['2xl']}`
          }}>
          Clear all saved games and statistics. This action cannot be undone.
        </p>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: spacing.sm,
              padding: `${spacing.md} ${spacing['2xl']}`,
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.semibold,
              color: colors.textWhite,
              background: gradients.error,
              border: 'none',
              borderRadius: borderRadius.md,
              cursor: 'pointer',
              boxShadow: shadows.md,
              fontFamily: typography.fontFamily.sans,
              transition: transition.all
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = shadows.lg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = shadows.md
            }}>
            <Trash2 size={16} />
            Clear All Data
          </button>
        ) : (
          <div>
            <p
              style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.error,
                marginBottom: spacing.lg
              }}>
              Are you sure? This will delete all your progress!
            </p>
            <div
              style={{
                display: 'flex',
                gap: spacing.md,
                justifyContent: 'center'
              }}>
              <button
                onClick={handleClearData}
                style={{
                  padding: `${spacing.md} ${spacing['2xl']}`,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.textWhite,
                  background: gradients.error,
                  border: 'none',
                  borderRadius: borderRadius.md,
                  cursor: 'pointer',
                  fontFamily: typography.fontFamily.sans
                }}>
                Yes, Delete Everything
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: `${spacing.md} ${spacing['2xl']}`,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.textPrimary,
                  background: colors.bgCard,
                  border: `2px solid ${colors.borderLight}`,
                  borderRadius: borderRadius.md,
                  cursor: 'pointer',
                  fontFamily: typography.fontFamily.sans
                }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Stats
