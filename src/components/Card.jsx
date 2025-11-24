import React from 'react'

const Card = ({ children, className = '', style = {}, ...props }) => (
  <div className={`retro-card ${className}`} style={style} {...props}>
    {children}
  </div>
)

export default Card
