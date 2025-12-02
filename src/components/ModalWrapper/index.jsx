import React from 'react'
import CloseButton from './CloseButton'
import {
  colors,
  spacing,
  borderRadius,
  shadows,
  zIndex
} from '../../constants/theme'

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  maxWidth = '500px',
  showCloseButton = true
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: zIndex.modal,
          backdropFilter: 'blur(4px)'
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: colors.bgCard,
          borderRadius: borderRadius.lg,
          padding: spacing['4xl'],
          maxWidth,
          width: '90%',
          boxShadow: shadows.xl,
          zIndex: zIndex.modal + 1,
          textAlign: 'center'
        }}>
        {showCloseButton && <CloseButton onClose={onClose} />}
        {children}
      </div>
    </>
  )
}

export default ModalWrapper
