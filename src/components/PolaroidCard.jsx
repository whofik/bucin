import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos }) => {
  const rotateDuration = useMemo(() => 3 + Math.random() * 2, []);
  const yDuration = useMemo(() => 4 + Math.random() * 2, []);

  return (
    <motion.div
      initial={{ 
        x: initialPos.x, 
        y: initialPos.y, 
        rotate: initialPos.rotate,
        opacity: 0 
      }}
      animate={isActive ? {
        x: 'calc(50vw - 125px)',
        y: 'calc(50vh - 175px)',
        rotate: 0,
        scale: 1.1,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 50
      } : {
        x: initialPos.x,
        // Organic Swaying Logic
        rotate: [initialPos.rotate - 2, initialPos.rotate + 2],
        y: [initialPos.y, `calc(${initialPos.y} + 5px)`, initialPos.y],
        scale: 0.8,
        opacity: 0.5,
        filter: 'blur(1px)',
        zIndex: 10
      }}
      transition={isActive ? {
        type: 'spring',
        stiffness: 80,
        damping: 15
      } : {
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: rotateDuration,
          ease: "easeInOut"
        },
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: yDuration,
          ease: "easeInOut"
        },
        duration: 0.8
      }}
      className="absolute w-[220px] p-2 pb-8 bg-white polaroid-shadow border border-pink-50 origin-top"
    >
      {/* Clip/Hook visual */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-pink-300 rounded-t-full opacity-60 z-20" />
      
      <div className="w-full h-[220px] overflow-hidden bg-pink-50">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      </div>
      <p className="mt-3 text-center font-serif text-pink-400 italic text-xs">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
