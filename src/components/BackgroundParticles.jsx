import React from 'react'
import { motion } from 'framer-motion'

const BackgroundParticles = () => {
  const particles = Array.from({ length: 20 })
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
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
          }}
          transition={{ 
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-4 h-4 text-pink-300 select-none"
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}

export default BackgroundParticles
