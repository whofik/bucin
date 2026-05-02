# Hanging Gallery Polish Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the photo album to use a "Hanging Gallery" aesthetic with organic swaying and smooth cinematic transitions.

**Architecture:** Introduce an `HangingRope` component (SVG) and update `PolaroidCard` to support a "swaying" idle state and a "focused" state.

**Tech Stack:** React, Framer Motion, Tailwind CSS.

---

### Task 1: Hanging Rope Component

**Files:**
- Create: `src/components/HangingRope.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/HangingRope.jsx`**
```javascript
import React from 'react'

const HangingRope = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-10">
      <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
          d="M0,20 Q500,80 1000,20"
          fill="none"
          stroke="#8d6e63"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-40"
        />
      </svg>
    </div>
  )
}

export default HangingRope
```

- [ ] **Step 2: Add Rope to `src/App.jsx`**
```javascript
import HangingRope from './components/HangingRope'
// ... inside App return, before PHOTOS map
<HangingRope />
```

- [ ] **Step 3: Commit**
```bash
git add src/components/HangingRope.jsx src/App.jsx
git commit -m "feat: add hanging rope SVG component"
```

---

### Task 2: Advanced Swaying Animation

**Files:**
- Modify: `src/components/PolaroidCard.jsx`

- [ ] **Step 1: Update `PolaroidCard` with organic sway**
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
        opacity: 0 
      }}
      animate={isActive ? {
        x: 'calc(50vw - 125px)',
        y: 'calc(50vh - 175px)',
        rotate: 0,
        scale: 1.1,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 50
      } : {
        x: initialPos.x,
        y: initialPos.y,
        // Organic Swaying Logic
        rotate: [initialPos.rotate - 2, initialPos.rotate + 2],
        y: [initialPos.y, initialPos.y + 5, initialPos.y],
        scale: 0.8,
        opacity: 0.5,
        filter: 'blur(1px)',
        zIndex: 10
      }}
      transition={isActive ? {
        type: 'spring',
        stiffness: 80,
        damping: 15
      } : {
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 3 + Math.random() * 2,
          ease: "easeInOut"
        },
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 4 + Math.random() * 2,
          ease: "easeInOut"
        },
        duration: 0.8
      }}
      className="absolute w-[220px] p-2 pb-8 bg-white polaroid-shadow border border-pink-50 origin-top"
    >
      {/* Clip/Hook visual */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-6 bg-pink-300 rounded-t-full opacity-60 z-20" />
      
      <div className="w-full h-[220px] overflow-hidden bg-pink-50">
        <img src={src} alt={caption} className="w-full h-full object-cover" />
      </div>
      <p className="mt-3 text-center font-serif text-pink-400 italic text-xs">
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
git commit -m "feat: implement organic swaying and blur effect"
```

---

### Task 3: Optimized Photo Layout on Rope

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Recalculate `PHOTOS` positions to follow the rope curve**
```javascript
const PHOTOS = [
  { id: 1, src: '/assets/p1.jpg', caption: 'Memories...', initialPos: { x: '5vw', y: '25px', rotate: -8 } },
  { id: 2, src: '/assets/p2.jpg', caption: 'Sweet Moments', initialPos: { x: '25vw', y: '45px', rotate: -4 } },
  { id: 3, src: '/assets/p3.jpg', caption: 'Joy', initialPos: { x: '45vw', y: '55px', rotate: 0 } },
  { id: 4, src: '/assets/p4.jpg', caption: 'Love', initialPos: { x: '65vw', y: '45px', rotate: 4 } },
  { id: 5, src: '/assets/p5.jpg', caption: 'Forever', initialPos: { x: '85vw', y: '25px', rotate: 8 } },
]
```

- [ ] **Step 2: Commit**
```bash
git add src/App.jsx
git commit -m "style: align photos to the hanging rope curve"
```
