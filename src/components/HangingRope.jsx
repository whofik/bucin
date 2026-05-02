import React from 'react'

const HangingRope = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-64 pointer-events-none z-10">
      <svg width="100%" height="100%" viewBox="0 0 1000 120" preserveAspectRatio="none">
        {/* Shadow rope for depth */}
        <path
          d="M0,25 Q500,105 1000,25"
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="4"
          strokeLinecap="round"
          className="translate-y-1"
        />
        {/* Main rope */}
        <path
          d="M0,25 Q500,105 1000,25"
          fill="none"
          stroke="#8d6e63"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5,2"
          className="opacity-60"
        />
      </svg>
    </div>
  )
}

export default HangingRope
