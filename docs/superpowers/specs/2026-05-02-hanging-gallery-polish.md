# Design Spec Update: The Hanging Gallery (Pink Album)

## 1. Overview
Enhancing the "Pink Album" with a realistic and organic "Hanging Gallery" effect. Photos are attached to a curved rope and sway naturally before transitioning to the center for cinematic focus.

## 2. Visual Enhancements
- **The Rope:** A subtle, curved SVG path at the top of the screen.
- **The Swaying Effect:** Each Polaroid card has a continuous, organic sway animation (rotation and subtle Y-axis movement) to simulate wind/hanging motion.
- **The Transition:** When a photo becomes "active", it smoothly detaches from its anchor point on the rope and travels to the center of the screen with a premium spring animation.
- **Depth of Field:** Background photos and the rope get a slight blur (`filter: blur(2px)`) when a photo is in focus.

## 3. Technical Implementation
- **Framer Motion `animate`:** Use the `repeat: Infinity` and `repeatType: "reverse"` for the idle swaying.
- **SVG Anchor Points:** Calculate 5 points along a quadratic bezier curve to place the photos consistently on the "rope".
- **State Management:** Track `isDetached` for the active photo to switch between "Hanging" layout and "Focused" layout.

## 4. Polishing Points
- **Soft Shadows:** Dynamic shadows that grow slightly when the card moves forward.
- **Ease Curves:** Use custom cubic-bezier transitions for the "travel" animation to make it feel expensive/cinematic.
