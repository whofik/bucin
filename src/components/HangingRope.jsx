import React from 'react'

const HangingRope = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-10">
      <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          d="M0,20 Q500,80 1000,20"
          fill="none"
          stroke="#8d6e63"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-40"
        />
      </svg>
    </div>
  )
}

export default HangingRope
