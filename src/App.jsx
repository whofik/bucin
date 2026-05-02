import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import WelcomeOverlay from './components/WelcomeOverlay'
import PolaroidCard from './components/PolaroidCard'
import BackgroundParticles from './components/BackgroundParticles'
import AudioVisualizer from './components/AudioVisualizer'
import HangingRope from './components/HangingRope'

const PHOTOS = [
  { id: 1, src: 'https://njy.my.id/files/vfez.jpg', caption: 'Memories...', initialPos: { x: '8vw', y: 15, rotate: -12 } },
  { id: 2, src: 'https://njy.my.id/files/mcwy.jpg', caption: 'Sweet Moments', initialPos: { x: '28vw', y: 35, rotate: -5 } },
  { id: 3, src: 'https://njy.my.id/files/ned.jpg', caption: 'Eternal Joy', initialPos: { x: '48vw', y: 45, rotate: 2 } },
  { id: 4, src: '/assets/p4.jpg', caption: 'Love', initialPos: { x: '68vw', y: 35, rotate: 6 } },
  { id: 5, src: '/assets/p5.jpg', caption: 'Forever', initialPos: { x: '88vw', y: 15, rotate: 14 } },
]

const App = () => {
  const [started, setStarted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [duration, setDuration] = useState(15)
  const [isMobile, setIsMobile] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      audioRef.current.play().catch(() => {})
    }
  }

  const handleMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setDuration(audioRef.current.duration)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden relative">
      {/* Dynamic Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_70%)] pointer-events-none z-0" />
      
      <audio 
        ref={audioRef} 
        src="/assets/music.mp3" 
        preload="auto"
        loop 
        onLoadedMetadata={handleMetadata}
      />
      
      {!started ? (
        <WelcomeOverlay onStart={handleStart} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-screen"
        >
          <BackgroundParticles />
          <HangingRope />
          
          <h1 className="absolute top-6 left-1/2 -translate-x-1/2 text-pink-500 font-cursive text-3xl md:text-5xl z-50 drop-shadow-md select-none">
            Pink Album
          </h1>

          <div className="relative w-full h-full">
            {PHOTOS.map((photo, index) => (
              <PolaroidCard 
                key={photo.id} 
                {...photo} 
                isActive={index === activeIndex}
                isMobile={isMobile}
              />
            ))}
          </div>
          
          <AudioVisualizer />
        </motion.div>
      )}
    </div>
  )
}

export default App
