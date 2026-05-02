# Design Spec: Pink Album Cinematic Website

## 1. Overview
A modern, visually appealing "Pink Album" website built with Vite, React, and Tailwind CSS. The core experience is a cinematic audio-visual journey where polaroid-style photos float gracefully and come into focus synchronized with a background soundtrack.

## 2. Visual & UI Design
- **Theme:** "Soft Pink & White" aesthetic.
- **Background:** Gradient from `#fce4ec` (top) to `#f8bbd0` (bottom).
- **Photo Style:** Polaroid-style cards (white frame, soft shadow, subtle rotation).
- **Animations:** 
    - **Background:** Photos and soft particles (hearts/petals) floating with a parallax effect.
    - **Focus:** Every 5-10 seconds (synced to audio), a photo "flies" to the center, scales up, and becomes the main focus while others fade.
- **UI Elements:**
    - Minimalist overlay.
    - Subtle audio visualizer in the corner.
    - Initial "Click to Start" overlay (to handle browser auto-play policies).

## 3. Technical Architecture
- **Framework:** Vite + React (TypeScript/JavaScript).
- **Styling:** Tailwind CSS + Vanilla CSS for custom animations.
- **Animation Library:** Framer Motion (for smooth layout transitions and floating physics).
- **Audio Sync:** React `useRef` and `useEffect` monitoring `currentTime` of an HTML5 Audio element.
- **Assets:** Stored in `public/assets/` (5 photos + 1 audio file).

## 4. Components
- `App`: State management for current active photo and playback status.
- `WelcomeOverlay`: Handles the initial user interaction to start audio.
- `PolaroidCard`: Individual photo component with floating and focus states.
- `BackgroundParticles`: Renders small floating decorative elements.
- `AudioController`: Manages playback and emits timing events.

## 5. Deployment
- **Platform:** Vercel.
- **Configuration:** `vercel.json` for single-page application routing.

## 6. Implementation Strategy
1. Scaffold Vite project.
2. Setup Tailwind CSS.
3. Create asset folder and placeholders.
4. Implement the "Click to Start" logic.
5. Build the floating Polaroid engine with Framer Motion.
6. Implement the audio sync logic for the "Cinematic Focus" transition.
7. Polishing (colors, shadows, particles).
