export const duration = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500
}

export const easing = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  linear: 'linear'
}

export const transition = {
  all: `all ${duration.normal}ms ${easing.easeInOut}`,
  fast: `all ${duration.fast}ms ${easing.easeInOut}`,
  slow: `all ${duration.slow}ms ${easing.easeInOut}`,
  transform: `transform ${duration.normal}ms ${easing.easeOut}`,
  opacity: `opacity ${duration.fast}ms ${easing.easeInOut}`,
  color: `color ${duration.normal}ms ${easing.easeInOut}`,
  background: `background ${duration.normal}ms ${easing.easeInOut}`
}

export const hover = {
  lift: { transform: 'translateY(-2px)' },
  liftMore: { transform: 'translateY(-4px)' },
  scale: { transform: 'scale(1.02)' },
  scaleMore: { transform: 'scale(1.05)' }
}

export const animations = {
  fadeIn: {
    animation: 'fadeIn 0.3s ease-in-out'
  },
  slideUp: {
    animation: 'slideUp 0.3s ease-out'
  },
  slideDown: {
    animation: 'slideDown 0.3s ease-out'
  }
}

export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  slideDown: `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
}
