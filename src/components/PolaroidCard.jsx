import React from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos }) => {
  return (
    <motion.div
      initial={{ 
        x: initialPos.x, 
        y: initialPos.y, 
        rotate: initialPos.rotate,
        scale: 0.8,
        opacity: 0 
      }}
      animate={isActive ? {
        x: 'calc(50vw - 125px)', // Centered (250px width / 2)
        y: 'calc(50vh - 175px)', // Centered (350px height / 2 approx)
        rotate: 0,
        scale: 1.2,
        opacity: 1,
        zIndex: 50
      } : {
        x: initialPos.x,
        y: initialPos.y,
        rotate: initialPos.rotate,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 10
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        duration: 0.8 
      }}
      className="absolute w-[250px] p-3 pb-10 bg-white polaroid-shadow border border-pink-50 rounded-sm"
    >
      <div className="w-full h-[250px] overflow-hidden bg-pink-50">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      </div>
      <p className="mt-4 text-center font-serif text-pink-400 italic text-sm">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
