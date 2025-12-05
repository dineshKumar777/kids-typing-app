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

## Validated Lesson Content Reference

The following lesson content has been validated against [TypingClub](https://www.edclub.com/sportal/program-3.game) (completed with 5 stars each):

### Home Row Lessons (1-23)

| Lesson | Title | Type | Content |
|--------|-------|------|---------|
| 1 | Introduction to Typing | info | *(no typing content - intro video)* |
| 2 | Keys f & j | learn | `ffffjjjjffffjjjjffjjffjjfjfjjfjf` |
| 3 | Space Bar | learn | `f f j j ff ff jj jj fj jf ff jj` |
| 4 | Review: f & j | review | `ffff jjjj ff jj fff jjj fj fj jjf ffj fff jjj ffj jjf fjfj fffj jjjf ffjj ff jj ffff` |
| 5 | Keys d & k | learn | `ddddkkkkddddkkdkdkdkkdkd` |
| 6 | Review: d & k | review | `dd kk dk dk kd kd ddd kkd ddk dkk kkdd ddkk dddd kkkk ddkk kkdd kdd kddd dk kk` |
| 7 | Practice: d & k | practice | `ffff ddd jjjj kkkk df df jk jk jjj fff ddff jjkk kkdd fdfd jkjk dfjk dfjk kkdd jkjk dfdf dfjj jjfd kkjj dfjk ddkd kkdk` |
| 8 | Play: fjkd | game | *(canvas-based game - Phaser/Pixi.js)* |
| 9 | Keys s & l | learn | `sssslllllsssslllllssllssllslslllsls` |
| 10 | Review: s & l | review | `ll ss ssll slsl lsssl slls lsll ssl llss ssll slsl llsslsll ssl ssll slsl lsll ll` |
| 11 | Practice: s & l | practice | `jj ff kk dd ll ssssd df fj jk kl sdfsk dl ks jf kd lslfl kl js kd jf sdfllk kkj jjf` |
| 12 | Keys a & ; | learn | `aaaa;;;;;aaaa;;;;;aa;;aa;;a;a;;;a;a` |
| 13 | Review: a & ; | review | `aa ;; ;;aa ;a;a a;;;a ;aa; a;aa ;;aaa;; ;;aa ;a;a aa;;a;aa ;;a ;;aa ;a;a` |
| 14 | First 8 Keys | practice | `ask dad all salads fall; lass as all ads add salsa jaff kad; flask lass sad fall alfa jak kaj dad ask` |
| 15 | Play: First 8 Keys | game | *(canvas-based game - Phaser/Pixi.js)* |
| 16 | Home, Sweet Home! | info | *(video lesson - no typing content)* |
| 17 | Home Row: L Hand | focus | `dad dada ad ada adad sad sada dasad fas fasd dada affa fada fasa saf fdds asdf` |
| 18 | Home Row: R Hand | focus | `jk jk jjkk jlkj ;;;; lkjj jj;; lkjj lkjj lk;; jkl; jjkk lkj jjkk lkjj ;;;; llll kkkk jjjj jl jk kj klj lkj kljj kljj` |
| 19 | Keys g & h | learn | `gggghhhhgggghhhhgghhgghhghghghghg` |
| 20 | Review: g & h | review | `gf ggf gf ggf hj hhj hj hhj gfgf hjhj gggf hhhj fghj fgf jhj fgfgf jhjhj ggf hhj gghh ghgh ghfj ggf hhj` |
| 21 | Practice: g & h | practice | `glad glass gag had haha gal hal gaf hah haha gaga glad hala hal hasha shash gl` |
| 22 | Home Row Review | review | `glad dad had half a glass as salad; dad shall ask glass flags had glass ask shall flask had slash jaff` |
| 23 | Play: Home Row | game | *(canvas-based game - Phaser/Pixi.js)* |

> **Note**: Game lessons (8, 15, 23) are canvas-based interactive games in TypingClub using Phaser/Pixi.js and require custom implementation.

## License

MIT
