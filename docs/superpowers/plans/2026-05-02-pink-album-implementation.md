# Pink Album Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic "Pink Album" website with floating Polaroid photos that come into focus synchronized with music.

**Architecture:** A Vite + React application using Framer Motion for animations. It uses a centralized state in `App.jsx` to synchronize the "active" photo with the `currentTime` of an HTML5 Audio element.

**Tech Stack:** Vite, React, Tailwind CSS, Framer Motion.

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`

- [ ] **Step 1: Create `package.json`**
```json
{
  "name": "pink-album",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.284.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.28",
    "tailwindcss": "^3.3.3",
    "vite": "^4.4.5"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 3: Create `index.html`**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pink Album</title>
  </head>
  <body class="bg-[#fce4ec] overflow-hidden">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Install dependencies**
Run: `npm install`

- [ ] **Step 5: Commit**
```bash
git add package.json vite.config.js index.html
git commit -m "chore: initial project scaffold"
```

---

### Task 2: Tailwind CSS & Theme Setup

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`

- [ ] **Step 1: Create `tailwind.config.js`**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce4ec',
          200: '#f8bbd0',
          300: '#f48fb1',
          400: '#f06292',
          500: '#ec407a',
        }
      }
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Create `postcss.config.js`**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Create `src/index.css`**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply m-0 p-0 font-sans;
  }
}

.polaroid-shadow {
  box-shadow: 0 10px 25px -5px rgba(236, 64, 122, 0.2), 0 8px 10px -6px rgba(236, 64, 122, 0.1);
}
```

- [ ] **Step 4: Commit**
```bash
git add tailwind.config.js postcss.config.js src/index.css
git commit -m "chore: setup tailwind and custom pink theme"
```

---

### Task 3: Entry Point & Basic Structure

**Files:**
- Create: `src/main.jsx`
- Create: `src/App.jsx`

- [ ] **Step 1: Create `src/main.jsx`**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 2: Create `src/App.jsx`**
```javascript
import React, { useState, useEffect, useRef } from 'react'

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden relative">
      <h1 className="absolute top-10 left-1/2 -translate-x-1/2 text-pink-500 font-bold text-2xl z-50">
        Pink Album
      </h1>
    </div>
  )
}

export default App
```

- [ ] **Step 3: Commit**
```bash
git add src/main.jsx src/App.jsx
git commit -m "feat: basic app structure"
```

---

### Task 4: Welcome Overlay & Audio Initialization

**Files:**
- Create: `src/components/WelcomeOverlay.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/WelcomeOverlay.jsx`**
```javascript
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
```

- [ ] **Step 2: Update `src/App.jsx` to handle state**
```javascript
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
           {/* Photos will go here */}
        </div>
      )}
    </div>
  )
}

export default App
```

- [ ] **Step 3: Commit**
```bash
git add src/components/WelcomeOverlay.jsx src/App.jsx
git commit -m "feat: add welcome overlay and audio control"
```

---

### Task 5: Polaroid Card Component

**Files:**
- Create: `src/components/PolaroidCard.jsx`

- [ ] **Step 1: Create `src/components/PolaroidCard.jsx`**
```javascript
import React from 'react'
import { motion } from 'framer-motion'

const PolaroidCard = ({ src, caption, isActive, initialPos }) => {
  return (
    <motion.div
      initial={{ 
        x: initialPos.x, 
        y: initialPos.y, 
        rotate: initialPos.rotate,
        scale: 0.8,
        opacity: 0 
      }}
      animate={isActive ? {
        x: 'calc(50vw - 150px)',
        y: 'calc(50vh - 200px)',
        rotate: 0,
        scale: 1.2,
        opacity: 1,
        zIndex: 50
      } : {
        x: initialPos.x,
        y: initialPos.y,
        rotate: initialPos.rotate,
        scale: 0.8,
        opacity: 0.6,
        zIndex: 10
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 20,
        duration: 0.8 
      }}
      className="absolute w-[250px] p-3 pb-10 bg-white polaroid-shadow border border-pink-50"
    >
      <div className="w-full h-[250px] overflow-hidden bg-pink-50">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      </div>
      <p className="mt-4 text-center font-serif text-pink-400 italic text-sm">
        {caption}
      </p>
    </motion.div>
  )
}

export default PolaroidCard
```

- [ ] **Step 2: Commit**
```bash
git add src/components/PolaroidCard.jsx
git commit -m "feat: add polaroid card component"
```

---

### Task 6: Audio Sync & Cinematic Logic

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update `src/App.jsx` with sync logic**
```javascript
import React, { useState, useEffect, useRef } from 'react'
import WelcomeOverlay from './components/WelcomeOverlay'
import PolaroidCard from './components/PolaroidCard'

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
  const audioRef = useRef(null)

  useEffect(() => {
    if (!started) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PHOTOS.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [started])

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) audioRef.current.play()
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 to-pink-200 overflow-hidden relative">
      <audio ref={audioRef} src="/assets/music.mp3" loop />
      {!started && <WelcomeOverlay onStart={handleStart} />}
      
      {started && (
        <div className="relative w-full h-screen">
          {PHOTOS.map((photo, index) => (
            <PolaroidCard
              key={photo.id}
              {...photo}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
```

- [ ] **Step 2: Commit**
```bash
git add src/App.jsx
git commit -m "feat: implement cinematic photo rotation"
```

---

### Task 7: Background Particles & Visualizer

**Files:**
- Create: `src/components/BackgroundParticles.jsx`
- Create: `src/components/AudioVisualizer.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/BackgroundParticles.jsx`**
```javascript
import React from 'react'
import { motion } from 'framer-motion'

const BackgroundParticles = () => {
  const particles = Array.from({ length: 20 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + 'vw', 
            y: '110vh',
            opacity: 0.3,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: '-10vh',
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          className="absolute w-4 h-4 text-pink-300"
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}

export default BackgroundParticles
```

- [ ] **Step 2: Create `src/components/AudioVisualizer.jsx`**
```javascript
import React from 'react'
import { motion } from 'framer-motion'

const AudioVisualizer = () => {
  return (
    <div className="fixed bottom-10 right-10 flex items-end gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [4, 24, 8, 28, 4] }}
          transition={{ 
            duration: 0.6, 
            repeat: Infinity, 
            delay: i * 0.1 
          }}
          className="w-1.5 bg-pink-400 rounded-full"
        />
      ))}
    </div>
  )
}

export default AudioVisualizer
```

- [ ] **Step 3: Update `src/App.jsx` to include new components**
```javascript
// ... existing imports
import BackgroundParticles from './components/BackgroundParticles'
import AudioVisualizer from './components/AudioVisualizer'

// ...
      {started && (
        <div className="relative w-full h-screen">
          <BackgroundParticles />
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
// ...
```

- [ ] **Step 4: Commit**
```bash
git add src/components/BackgroundParticles.jsx src/components/AudioVisualizer.jsx src/App.jsx
git commit -m "feat: add decorative particles and visualizer"
```

---

### Task 8: Vercel Configuration & Deployment

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create `vercel.json`**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 2: Commit**
```bash
git add vercel.json
git commit -m "chore: add vercel configuration"
```
