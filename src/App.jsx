import React, { useState, useEffect, useRef } from 'react'
import WelcomeOverlay from './components/WelcomeOverlay'
import PolaroidCard from './components/PolaroidCard'
import BackgroundParticles from './components/BackgroundParticles'
import AudioVisualizer from './components/AudioVisualizer'
import HangingRope from './components/HangingRope'

const PHOTOS = [
  { id: 1, src: '/assets/p1.jpg', caption: 'Memories...', initialPos: { x: '10vw', y: '20vh', rotate: -15 } },
  { id: 2, src: '/assets/p2.jpg', caption: 'Sweet Moments', initialPos: { x: '70vw', y: '15vh', rotate: 10 } },
  { id: 3, src: '/assets/p3.jpg', caption: 'Joy', initialPos: { x: '15vw', y: '60vh', rotate: 5 } },
  { id: 4, src: '/assets/p4.jpg', caption: 'Love', initialPos: { x: '75vw', y: '65vh', rotate: -10 } },
  { id: 5, src: '/assets/p5.jpg', caption: 'Forever', initialPos: { x: '45vw', y: '70vh', rotate: 2 } },
]

const App = () => {
  const [started, setStarted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!started || duration === 0) return

    const intervalTime = (duration / PHOTOS.length) * 1000
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PHOTOS.length)
    }, intervalTime)

    return () => clearInterval(interval)
  }, [started, duration])

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const handleMetadata = (e) => {
    setDuration(e.target.duration)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden relative">
      <audio 
        ref={audioRef} 
        src="https://d.uguu.se/CwMxBqsG.mpeg" 
        loop 
        onLoadedMetadata={handleMetadata}
      />
      {!started && <WelcomeOverlay onStart={handleStart} />}
      
      {started && (
        <div className="relative w-full h-screen">
          <BackgroundParticles />
          
          <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-pink-500 font-bold text-2xl z-50">
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
        </div>
      )}
    </div>
  )
}

export default App
