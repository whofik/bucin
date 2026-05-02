import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos, isMobile, mousePos }) => {
  const rotateDuration = useMemo(() => 4 + Math.random() * 2, []);
  const yDuration = useMemo(() => 5 + Math.random() * 2, []);
  
  const cardWidth = isMobile ? 180 : 320;
  const cardHeight = isMobile ? 240 : 420;

  return (
    <motion.div
      initial={{ x: initialPos.x, y: -500, rotate: initialPos.rotate, opacity: 0 }}
      whileHover={{ scale: 1.25, rotate: 0, zIndex: 110 }}
      animate={isActive ? {
        x: isMobile ? 0 : 0,
        y: isMobile ? 0 : 0,
        rotate: [initialPos.rotate, 10, -5, 0],
        scale: 1.2,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 100,
        boxShadow: "0 40px 80px -15px rgba(236, 64, 122, 0.4), 0 20px 40px -20px rgba(0, 0, 0, 0.4)"
      } : {
        x: `calc(${initialPos.x} + ${mousePos.x * 0.5}px)`,
        y: [initialPos.y, initialPos.y + 15, initialPos.y],
        rotate: [initialPos.rotate - 2, initialPos.rotate + 2],
        scale: isMobile ? 0.6 : 0.8,
        opacity: 0.35,
        filter: 'blur(2.5px)',
        zIndex: 10,
        boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={isActive ? {
        x: { type: 'spring', stiffness: 40, damping: 20 },
        y: { type: 'spring', stiffness: 40, damping: 20 },
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
        position: isActive ? 'relative' : 'absolute' 
      }}
      className="p-3 pb-14 bg-white border border-pink-50 origin-center rounded-[4px] cursor-pointer"
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-full shadow-lg z-20 opacity-90" />
      <div className="w-full aspect-[4/5] overflow-hidden bg-pink-50 relative pointer-events-none rounded-[1px]">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      </div>
      <p className="mt-6 text-center font-serif text-pink-600 italic text-[11px] md:text-xl tracking-[0.2em] select-none uppercase font-bold drop-shadow-sm">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
