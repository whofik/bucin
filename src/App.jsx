import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import WelcomeOverlay from './components/WelcomeOverlay'
import PolaroidCard from './components/PolaroidCard'
import BackgroundParticles from './components/BackgroundParticles'
import AudioVisualizer from './components/AudioVisualizer'
import HangingRope from './components/HangingRope'

const PHOTOS = [
  { id: 1, src: 'https://njy.my.id/files/vfez.jpg', caption: 'Memories...', initialPos: { x: '5vw', y: '25px', rotate: -8 } },
  { id: 2, src: '/assets/p2.jpg', caption: 'Sweet Moments', initialPos: { x: '25vw', y: '45px', rotate: -4 } },
  { id: 3, src: '/assets/p3.jpg', caption: 'Joy', initialPos: { x: '45vw', y: '55px', rotate: 0 } },
  { id: 4, src: '/assets/p4.jpg', caption: 'Love', initialPos: { x: '65vw', y: '45px', rotate: 4 } },
  { id: 5, src: '/assets/p5.jpg', caption: 'Forever', initialPos: { x: '85vw', y: '25px', rotate: 8 } },
]

const App = () => {
  const [started, setStarted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [duration, setDuration] = useState(15) // Fallback duration 15s
  const audioRef = useRef(null)

  useEffect(() => {
    if (!started) return

    const intervalTime = (duration / PHOTOS.length) * 1000
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PHOTOS.length)
    }, intervalTime)

    return () => clearInterval(interval)
  }, [started, duration])

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error("Audio play failed:", err))
    }
  }

  const handleMetadata = (e) => {
    if (e.target.duration && e.target.duration > 0) {
      setDuration(e.target.duration)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(252,228,236,0.4)_100%)] pointer-events-none z-40" />
      <audio 
        ref={audioRef} 
        src="https://d.uguu.se/CwMxBqsG.mpeg" 
        loop 
        onLoadedMetadata={handleMetadata}
        onCanPlayThrough={handleMetadata}
      />
      <WelcomeOverlay onStart={handleStart} isVisible={!started} />
      
      {started && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="relative w-full h-screen"
        >
          <BackgroundParticles />
          
          <h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-pink-500 font-cursive text-4xl z-50 drop-shadow-sm">
            Pink Album
          </h1>

          <HangingRope />
          
          {PHOTOS.map((photo, index) => (
            <PolaroidCard
              key={photo.id}
              {...photo}
              isActive={index === activeIndex}
            />
          ))}
          
          <AudioVisualizer />
        </motion.div>
      )}
    </div>
  )
}

export default App
