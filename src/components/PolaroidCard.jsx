import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos, isMobile }) => {
  const rotateDuration = useMemo(() => 3 + Math.random() * 2, []);
  const yDuration = useMemo(() => 4 + Math.random() * 2, []);

  const cardWidth = isMobile ? 160 : 240;
  const cardHeight = isMobile ? 220 : 340;

  return (
    <motion.div
      initial={{ x: initialPos.x, y: initialPos.y, rotate: initialPos.rotate, opacity: 0 }}
      animate={isActive ? {
        x: `calc(50vw - ${cardWidth / 2}px)`,
        y: `calc(50vh - ${cardHeight / 2}px)`,
        rotate: 0,
        scale: 1.1,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 50
      } : {
        x: initialPos.x,
        y: [initialPos.y, initialPos.y + 8, initialPos.y],
        rotate: [initialPos.rotate - 1.5, initialPos.rotate + 1.5],
        scale: isMobile ? 0.7 : 0.85,
        opacity: 0.6,
        filter: isMobile ? 'blur(0px)' : 'blur(1.5px)',
        zIndex: 10
      }}
      transition={isActive ? { type: 'spring', stiffness: 60, damping: 15 } : {
        rotate: { repeat: Infinity, repeatType: "reverse", duration: rotateDuration, ease: "easeInOut" },
        y: { repeat: Infinity, repeatType: "loop", duration: yDuration, ease: "easeInOut" },
        duration: 0.8
      }}
      style={{ width: cardWidth }}
      className="absolute p-2 pb-8 bg-white shadow-xl border border-pink-50 origin-top rounded-[2px]"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-pink-400 rounded-t-full shadow-sm z-20" />
      <div className="w-full aspect-square overflow-hidden bg-pink-50 relative pointer-events-none">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      </div>
      <p className="mt-3 text-center font-serif text-pink-600 italic text-[10px] md:text-sm select-none">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
