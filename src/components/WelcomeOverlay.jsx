import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const WelcomeOverlay = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pink-50">
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={onStart}
          className="group relative flex flex-col items-center gap-4 p-12 bg-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-pink-500">
            <Heart fill="currentColor" size={48} className="animate-pulse" />
          </div>
          <p className="text-pink-600 font-cursive text-2xl">
            Buka Album
          </p>
        </button>
      </div>
    </div>
  )
}

export default WelcomeOverlay
