import React from 'react'
import { Heart } from 'lucide-react'

const WelcomeOverlay = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-pink-50">
      <button
        onClick={onStart}
        className="group flex flex-col items-center gap-4 p-10 bg-white rounded-3xl shadow-xl hover:scale-105 transition-transform"
      >
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 group-hover:animate-pulse">
          <Heart fill="currentColor" size={40} />
        </div>
        <p className="text-pink-500 font-medium text-lg italic">Tap to Start the Magic</p>
      </button>
    </div>
  )
}

export default WelcomeOverlay
