# Kids Typing App

A fun and engaging React-based typing tutor application designed specifically for children to learn touch typing, starting with the home row keys.

## Features

- 🎯 **23 Home Row Lessons** - Progressive lessons from basic keys to full home row mastery
- ⌨️ **Interactive Virtual Keyboard** - Visual feedback showing which keys to press
- ✋ **Hand Guides** - Visual finger placement guidance
- ⭐ **Star Rating System** - Earn 1-5 stars based on accuracy
- 🏆 **Points & Badges** - Gamification to keep kids motivated
- 📊 **Progress Tracking** - Track WPM, accuracy, and time spent
- 💾 **Local Storage** - Progress saved automatically
- 🎨 **Kid-Friendly UI** - Colorful, engaging design

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast development & builds
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **React Router** - Navigation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── Dashboard/       # Lesson grid, stats
│   └── Typing/          # Keyboard, text display, hands
├── data/
│   ├── lessons/         # Lesson definitions
│   ├── keyMappings.ts   # Keyboard layout & finger mapping
│   └── achievements.ts  # Badges & achievements
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── store/               # Zustand stores
├── styles/              # Global CSS
└── types/               # TypeScript types
```

## Lesson Types

| Type | Icon | Description |
|------|------|-------------|
| Learn | 📦 | Introduction to new keys |
| Review | 🔍 | Review previously learned keys |
| Practice | ⏱️ | Timed practice sessions |
| Game | 🎮 | Gamified typing challenges |
| Info | 📖 | Educational content |
| Focus | ✋ | Single-hand exercises |

## Home Row Keys

The home row consists of:
- **Left hand**: A S D F G
- **Right hand**: H J K L ;

The F and J keys have tactile bumps to help find home position without looking.

## Performance

- Input latency: <16ms (direct keydown events)
- GPU-accelerated animations
- Code splitting for optimal loading

## License

MIT
