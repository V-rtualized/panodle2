import React from 'react'
import './App.css'

const App = () => {
  const letters = [
    { char: 'P', color: 'green', delay: 0 },
    { char: 'A', color: 'red', delay: 0.2 },
    { char: 'N', color: 'green', delay: 0.4 },
    { char: 'O', color: 'red', delay: 0.6 },
    { char: 'D', color: 'green', delay: 0.8 },
    { char: 'L', color: 'red', delay: 1.0 },
    { char: 'E', color: 'green', delay: 1.2 },
    { char: '\u00A0', color: 'none', delay: 0 },
    { char: 'V', color: 'red', delay: 1.4 },
    { char: '2', color: 'green', delay: 1.6 },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-100 overflow-hidden relative">
      <div className="text-center z-10 relative">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 flex gap-1 md:gap-2 justify-center tracking-wide">
          {letters.map((letter, index) => (
            <span
              key={index}
              className={letter.color === 'none' ? '' : `letter-${letter.color}`}
              style={letter.color !== 'none' ? { animationDelay: `${letter.delay}s` } : {}}
            >
              {letter.char}
            </span>
          ))}
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
          Coming Soon
        </p>
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
          <div className="snowflake">❄</div>
          <div className="snowflake">❅</div>
          <div className="snowflake">❆</div>
        </div>
      </div>
    </div>
  )
}

export default App
