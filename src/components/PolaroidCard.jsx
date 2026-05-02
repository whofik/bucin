import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos, isMobile, mousePos }) => {
  const rotateDuration = useMemo(() => 4 + Math.random() * 2, []);
  const yDuration = useMemo(() => 5 + Math.random() * 2, []);
  
  const cardWidth = isMobile ? 150 : 320;
  const cardHeight = isMobile ? 210 : 420;

  return (
    <motion.div
      initial={{ x: initialPos.x, y: -500, rotate: initialPos.rotate, opacity: 0 }}
      whileHover={!isMobile ? { scale: 1.1, rotate: 0, zIndex: 110 } : {}}
      animate={isActive ? {
        x: '0%', 
        y: '0%',
        left: `calc(50% - ${cardWidth / 2}px)`,
        top: `calc(50% - ${cardHeight / 2}px)`,
        rotate: [initialPos.rotate, 5, -3, 0],
        scale: 1.15,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 100,
        boxShadow: "0 40px 80px -15px rgba(236, 64, 122, 0.4), 0 20px 40px -20px rgba(0, 0, 0, 0.4)"
      } : {
        x: '0%',
        y: [0, 15, 0],
        left: initialPos.x,
        top: `${initialPos.y}%`,
        rotate: [initialPos.rotate - 2, initialPos.rotate + 2],
        scale: isMobile ? 0.65 : 0.8,
        opacity: 0.35,
        filter: isMobile ? 'blur(0.5px)' : 'blur(2.5px)',
        zIndex: 10,
        boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={isActive ? {
        left: { type: 'spring', stiffness: 40, damping: 20 },
        top: { type: 'spring', stiffness: 40, damping: 20 },
        rotate: { duration: 2, ease: "easeInOut" },
        scale: { type: 'spring', stiffness: 80, damping: 12 },
        default: { duration: 1.2 }
      } : {
        rotate: { repeat: Infinity, repeatType: "reverse", duration: rotateDuration, ease: "easeInOut" },
        y: { repeat: Infinity, repeatType: "loop", duration: yDuration, ease: "easeInOut" },
        opacity: { duration: 1.5 }
      }}
      style={{ 
        width: cardWidth,
        position: 'absolute' 
      }}
      className="p-2 md:p-3 pb-10 md:pb-14 bg-white border border-pink-50 origin-center rounded-[4px] cursor-pointer"
    >
      <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-6 md:w-8 h-10 md:h-12 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-full shadow-lg z-20 opacity-90" />
      <div className="w-full aspect-[4/5] overflow-hidden bg-pink-50 relative pointer-events-none rounded-[1px]">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
      <p className="mt-4 md:mt-6 text-center font-serif text-pink-600 italic text-[10px] md:text-xl tracking-[0.1em] md:tracking-[0.2em] select-none uppercase font-bold drop-shadow-sm leading-tight px-1">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
