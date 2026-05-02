import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos, isMobile, mousePos }) => {
  const rotateDuration = useMemo(() => 4 + Math.random() * 2, []);
  const yDuration = useMemo(() => 5 + Math.random() * 2, []);
  
  const cardWidth = isMobile ? 140 : 320;
  const cardHeight = isMobile ? 200 : 420;

  // Calculate tilt based on mouse position
  const tiltX = isActive ? 0 : (mousePos?.y || 0) * 0.2;
  const tiltY = isActive ? 0 : (mousePos?.x || 0) * -0.2;

  return (
    <motion.div
      initial={{ x: initialPos.x, y: -500, rotate: initialPos.rotate, opacity: 0 }}
      whileHover={!isMobile ? { scale: 1.1, rotateY: 10, rotateX: -5, zIndex: 110 } : {}}
      animate={isActive ? {
        x: '0%', 
        y: '0%',
        left: `calc(50% - ${cardWidth / 2}px)`,
        top: `calc(50% - ${cardHeight / 2}px)`,
        rotate: [initialPos.rotate, 5, -3, 0],
        rotateX: 0,
        rotateY: 0,
        scale: 1.15,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 100,
        boxShadow: "0 40px 80px -15px rgba(236, 64, 122, 0.4), 0 20px 40px -20px rgba(0, 0, 0, 0.4)"
      } : {
        x: '0%',
        y: [0, 12, 0],
        left: initialPos.x,
        top: `${initialPos.y}%`,
        rotate: [initialPos.rotate - 1, initialPos.rotate + 1],
        rotateX: tiltX,
        rotateY: tiltY,
        scale: isMobile ? 0.7 : 0.85,
        opacity: 0.4,
        filter: isMobile ? 'blur(0px)' : 'blur(1.5px)',
        zIndex: 10,
        boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={isActive ? {
        left: { type: 'spring', stiffness: 40, damping: 20 },
        top: { type: 'spring', stiffness: 40, damping: 20 },
        rotate: { duration: 2 },
        scale: { type: 'spring', stiffness: 80, damping: 12 },
        default: { duration: 1.2 }
      } : {
        rotate: { repeat: Infinity, repeatType: "reverse", duration: rotateDuration, ease: "easeInOut" },
        y: { repeat: Infinity, repeatType: "loop", duration: yDuration, ease: "easeInOut" },
        opacity: { duration: 1.5 }
      }}
      style={{ 
        width: cardWidth,
        position: 'absolute',
        transformStyle: 'preserve-3d'
      }}
      className="p-2 md:p-3 pb-8 md:pb-14 bg-white border border-pink-50 origin-top rounded-[2px] cursor-pointer"
    >
      {/* The String connecting to the rope */}
      {!isActive && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-[#8d6e63]/30"
          style={{ height: '100px', top: '-100px' }}
        />
      )}

      <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-6 md:w-8 h-10 md:h-12 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-full shadow-lg z-20 opacity-90" />
      
      <div className="w-full aspect-[4/5] overflow-hidden bg-pink-50 relative pointer-events-none rounded-[1px] shadow-inner">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
      </div>
      <p className="mt-3 md:mt-6 text-center font-serif text-pink-600 italic text-[9px] md:text-xl tracking-tight md:tracking-[0.2em] select-none uppercase font-bold leading-tight px-1">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
