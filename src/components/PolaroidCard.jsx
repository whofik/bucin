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
        x: 'calc(50vw - 120px)',
        y: 'calc(50vh - 160px)',
        rotate: 0,
        scale: 1.15,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 50
      } : {
        x: initialPos.x,
        y: [initialPos.y, initialPos.y + 10, initialPos.y],
        rotate: [initialPos.rotate - 2, initialPos.rotate + 2],
        scale: 0.8,
        opacity: 0.6,
        filter: 'blur(1.5px)',
        zIndex: 10
      }}
      transition={isActive ? {
        type: 'spring',
        stiffness: 70,
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
        duration: 1
      }}
      className="absolute w-[240px] p-3 pb-12 bg-white shadow-xl border border-pink-50 origin-top rounded-[2px]"
    >
      {/* Clip/Hook visual */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-8 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-full shadow-md z-20" />
      
      <div className="w-full h-[240px] overflow-hidden bg-pink-50 relative pointer-events-none">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
      </div>
      <p className="mt-4 text-center font-serif text-pink-600 italic text-sm tracking-wider">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
