import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos, isMobile }) => {
  const rotateDuration = useMemo(() => 4 + Math.random() * 2, []);
  const yDuration = useMemo(() => 5 + Math.random() * 2, []);
  const xOffset = useMemo(() => (Math.random() - 0.5) * 20, []);

  const cardWidth = isMobile ? 180 : 300;
  const cardHeight = isMobile ? 240 : 400;

  return (
    <motion.div
      initial={{ x: initialPos.x, y: -500, rotate: initialPos.rotate, opacity: 0 }}
      animate={isActive ? {
        x: `calc(50vw - ${cardWidth / 2}px)`,
        y: `calc(50vh - ${cardHeight / 2}px)`,
        rotate: [initialPos.rotate, 5, -3, 0],
        scale: 1.2,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 100,
        boxShadow: "0 30px 60px -12px rgba(236, 64, 122, 0.3), 0 18px 36px -18px rgba(0, 0, 0, 0.3)"
      } : {
        x: `calc(${initialPos.x} + ${xOffset}px)`,
        y: [initialPos.y, initialPos.y + 15, initialPos.y],
        rotate: [initialPos.rotate - 2, initialPos.rotate + 2],
        scale: isMobile ? 0.65 : 0.8,
        opacity: 0.4,
        filter: 'blur(2px)',
        zIndex: 10,
        boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={isActive ? {
        x: { type: 'spring', stiffness: 50, damping: 20 },
        y: { type: 'spring', stiffness: 50, damping: 20 },
        rotate: { duration: 1.5, ease: "easeOut" },
        scale: { type: 'spring', stiffness: 100, damping: 15 },
        default: { duration: 1 }
      } : {
        rotate: { repeat: Infinity, repeatType: "reverse", duration: rotateDuration, ease: "easeInOut" },
        y: { repeat: Infinity, repeatType: "loop", duration: yDuration, ease: "easeInOut" },
        opacity: { duration: 1 }
      }}
      style={{ width: cardWidth }}
      className="absolute p-3 pb-12 bg-white border border-pink-50 origin-center rounded-[4px] cursor-pointer"
    >
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-full shadow-md z-20 opacity-90" />
      <div className="w-full aspect-[4/5] overflow-hidden bg-pink-50 relative pointer-events-none rounded-[2px]">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </div>
      <p className="mt-5 text-center font-serif text-pink-600 italic text-xs md:text-lg tracking-widest select-none uppercase">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
