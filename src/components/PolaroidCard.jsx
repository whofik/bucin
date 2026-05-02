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
      className="absolute w-[240px] p-3 pb-12 bg-white polaroid-shadow border border-pink-50 origin-top rounded-[2px]"
    >
      {/* Clip/Hook visual */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-8 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-full shadow-inner opacity-80 z-20" />
      
      <div className="w-full h-[240px] overflow-hidden bg-pink-50 relative">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
        {/* Subtle overlay for realism */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
      </div>
      <p className="mt-4 text-center font-serif text-pink-500 italic text-sm tracking-wide">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
