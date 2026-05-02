import React, { useState, useRef } from 'react'
import WelcomeOverlay from './components/WelcomeOverlay'

const App = () => {
  const [started, setStarted] = useState(false)
  const audioRef = useRef(null)

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden relative">
      <audio ref={audioRef} src="/assets/music.mp3" loop />
      {!started && <WelcomeOverlay onStart={handleStart} />}
      
      {started && (
        <div className="relative w-full h-screen">
           <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-pink-500 font-bold text-2xl z-50">
            Pink Album
          </h1>
        </div>
      )}
    </div>
  )
}

export default App
