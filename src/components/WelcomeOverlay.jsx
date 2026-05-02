import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

const WelcomeOverlay = ({ onStart, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-pink-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <button
              onClick={onStart}
              className="group relative flex flex-col items-center gap-4 p-12 bg-white rounded-full shadow-2xl hover:shadow-pink-200 transition-all duration-500"
            >
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                <Heart fill="currentColor" size={48} className="animate-pulse" />
              </div>
              <p className="text-pink-600 font-medium text-xl tracking-wide">
                Buka Album
              </p>
              
              {/* Decorative rings */}
              <div className="absolute inset-0 border-2 border-pink-100 rounded-full animate-ping opacity-20" />
            </button>
            <p className="text-pink-300 text-sm italic font-serif">Silakan ketuk untuk memulai</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeOverlay
