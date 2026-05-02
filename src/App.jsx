import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import WelcomeOverlay from './components/WelcomeOverlay'
import PolaroidCard from './components/PolaroidCard'
import BackgroundParticles from './components/BackgroundParticles'
import AudioVisualizer from './components/AudioVisualizer'
import HangingRope from './components/HangingRope'

const PHOTOS = [
  { id: 1, src: 'https://njy.my.id/files/vfez.jpg', caption: 'Kamu adalah tenang yang paling rumah', initialPos: { x: '10%', y: 15, rotate: -10 } },
  { id: 2, src: 'https://njy.my.id/files/mcwy.jpg', caption: 'Abadi dalam ingatan, meski fana dalam kenyataan', initialPos: { x: '35%', y: 25, rotate: -5 } },
  { id: 3, src: 'https://njy.my.id/files/ned.jpg', caption: 'Cukup kamu, untuk melengkapi kurangku', initialPos: { x: '60%', y: 25, rotate: 5 } },
  { id: 4, src: 'https://njy.my.id/files/qdn.jpg', caption: 'Mencintaimu adalah pulang yang paling aku tuju', initialPos: { x: '85%', y: 15, rotate: 12 } },
]

const App = () => {
  const [started, setStarted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [duration, setDuration] = useState(15)
  const [isMobile, setIsMobile] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const audioRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 overflow-hidden relative">
      {/* Dynamic Ambient Light following mouse */}
      <motion.div 
        animate={{ x: mousePos.x * 2, y: mousePos.y * 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.5)_0%,_transparent_70%)] pointer-events-none z-0" 
      />
      
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
          <BackgroundParticles mousePos={mousePos} />
          <HangingRope />
          
          <h1 className="absolute top-6 left-1/2 -translate-x-1/2 text-pink-500 font-cursive text-3xl md:text-5xl z-50 drop-shadow-md select-none tracking-tighter">
            Our Pink Memories
          </h1>

          <div className="relative w-full h-full flex items-center justify-center">
            {PHOTOS.map((photo, index) => (
              <PolaroidCard 
                key={photo.id} 
                {...photo} 
                isActive={index === activeIndex}
                isMobile={isMobile}
                mousePos={mousePos}
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
