import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const WelcomeOverlay = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#fce4ec]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200/50 rounded-full blur-[100px] animate-pulse delay-700" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-10 p-8 text-center"
      >
        <div className="space-y-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-pink-600 font-cursive text-4xl md:text-6xl tracking-tight drop-shadow-sm"
          >
            Album Kenangan
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-[1px] w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto" 
          />
        </div>

        <button
          onClick={onStart}
          className="group relative flex flex-col items-center transition-all duration-500"
        >
          {/* Glowing Aura */}
          <div className="absolute inset-[-20px] bg-white/40 rounded-full blur-2xl group-hover:bg-pink-200/60 transition-colors duration-500" />
          
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full shadow-[0_20px_50px_rgba(236,64,122,0.15)] flex items-center justify-center transform group-hover:scale-110 group-active:scale-95 transition-all duration-500 overflow-hidden">
            {/* Liquid Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-white" />
            
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                filter: ["drop-shadow(0 0 0px #ec407a)", "drop-shadow(0 0 15px #f48fb1)", "drop-shadow(0 0 0px #ec407a)"]
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Heart fill="#ec407a" size={56} className="text-pink-500" />
            </motion.div>
          </div>

          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-pink-600 font-serif italic text-lg md:text-xl tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity"
          >
            Ketuk untuk Membuka
          </motion.span>
        </button>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-pink-300 font-sans text-[10px] md:text-xs uppercase tracking-[0.3em]"
        >
          Special for Shafira
        </motion.p>
      </motion.div>
    </div>
  )
}

export default WelcomeOverlay
