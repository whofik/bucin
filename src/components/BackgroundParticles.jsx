import React from 'react'
import { motion } from 'framer-motion'

const BackgroundParticles = ({ mousePos }) => {
  const particles = Array.from({ length: 25 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: '110vh',
            opacity: 0.2,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: '-10vh',
            x: `calc(${Math.random() * 100}vw + ${mousePos?.x * (Math.random() * 2)}px)`,
          }}
          transition={{ 
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-6 h-6 text-pink-300/40 select-none drop-shadow-sm"
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}

export default BackgroundParticles
