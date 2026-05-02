import React from 'react'
import { motion } from 'framer-motion'

const AudioVisualizer = () => {
  return (
    <div className="fixed bottom-10 right-10 flex items-end gap-1.5 h-10 z-50">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            height: [8, 32, 12, 40, 8],
            opacity: [0.4, 0.8, 0.5, 1, 0.4]
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            delay: i * 0.12,
            ease: "easeInOut"
          }}
          className="w-2 bg-pink-400 rounded-full"
        />
      ))}
    </div>
  )
}

export default AudioVisualizer
