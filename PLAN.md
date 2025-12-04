# Kids Typing App - Home Row Learning Plan

## 📋 Overview

A React-based typing tutor application designed specifically for children to learn touch typing, starting with the home row keys. The app should be **fast, responsive, and engaging** with visual feedback, progress tracking, and gamification elements.

---

## 🎯 Core Features

### 1. **Lesson System (Home Row Focus)**

The home row consists of: `A S D F G H J K L ;`

#### Lesson Progression (23 Lessons for Home Row):

| # | Lesson Name | Keys | Type | Description |
|---|-------------|------|------|-------------|
| 1 | Introduction to Typing | - | Video/Info | Proper posture, hand placement |
| 2 | Keys f & j | `f j` | Learn | Index fingers, home position markers |
| 3 | Space Bar | `space` | Learn | Thumb usage |
| 4 | Review: f & j | `f j space` | Review | Practice combining |
| 5 | Keys d & k | `d k` | Learn | Middle fingers |
| 6 | Review: d & k | `d k f j` | Review | Combine with previous |
| 7 | Practice: d & k | `d k f j` | Practice | Timed practice |
| 8 | Play: fjkd | `f j k d` | Game | Fun typing game |
| 9 | Keys s & l | `s l` | Learn | Ring fingers |
| 10 | Review: s & l | `s l d k f j` | Review | All learned keys |
| 11 | Practice: s & l | `s l d k f j` | Practice | Timed drills |
| 12 | Keys a & ; | `a ;` | Learn | Pinky fingers |
| 13 | Review: a & ; | `a ; s l d k f j` | Review | Full home row (no g h) |
| 14 | First 8 Keys | `a s d f j k l ;` | Learn | Summary lesson |
| 15 | Play: First 8 Keys | all | Game | Typing game |
| 16 | Home, Sweet Home! | all | Learn | Returning to home position |
| 17 | Home Row: Left Hand | `a s d f g` | Focus | Left hand only |
| 18 | Home Row: Right Hand | `h j k l ;` | Focus | Right hand only |
| 19 | Keys g & h | `g h` | Learn | Index fingers stretch |
| 20 | Review: g & h | `g h` + all | Review | Complete home row |
| 21 | Practice: g & h | all | Practice | Full row practice |
| 22 | Home Row Review | all | Review | Comprehensive review |
| 23 | Play: Home Row | all | Game | Final game challenge |

---

### 2. **Lesson Types**

| Type | Icon | Description |
|------|------|-------------|
| **Learn** | 📦 (box opening) | Introduction to new keys |
| **Review** | 🔍 (magnifier) | Review previously learned keys |
| **Practice** | ⏱️ (timer) | Timed practice sessions |
| **Game/Play** | 🎮 (character in box) | Gamified typing challenges |
| **Info** | 🧘 (posture) | Educational content |
| **Focus** | ✋ (hand) | Single-hand exercises |

---

### 3. **Typing Interface Components**

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]  Home  Stats  Badges  Course ▼           [Settings]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐     │
│     │                                                     │     │
│     │              "START TYPING" Button                  │     │
│     │                                                     │     │
│     └─────────────────────────────────────────────────────┘     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│     ffff  jjjj  ff  jj  fff  jjj  fj  fj  jjf                  │
│                                                                 │
│     ffj  fff  jjj  ffj  jjf  fjfj  fffj  jjjf                  │
│                                                                 │
│     ffjj  ff  jj  ffff                                          │
│            ↑                                                    │
│         cursor                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐     │
│     │  ~ 1 2 3 4 5 6 7 8 9 0 - = [BACK]                   │     │
│     │  [TAB] q w e r t y u i o p [ ] \                    │     │
│     │  [CAPS] a s d [F] g h [J] k l ; ' [ENTER]           │     │
│     │  [SHIFT] z x c v b n m , . / [SHIFT]                │     │
│     │  [CTRL] [OPT] [      SPACE      ] [OPT]             │     │
│     └─────────────────────────────────────────────────────┘     │
│                                                                 │
│                    ┌─────────┐ ┌─────────┐                      │
│                    │  LEFT   │ │  RIGHT  │                      │
│                    │  HAND   │ │  HAND   │                      │
│                    └─────────┘ └─────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4. **Visual Feedback System**

#### Key Highlighting:
- **Next key to press**: Highlighted in blue/cyan
- **Correct key pressed**: Brief green flash
- **Wrong key pressed**: Red flash + shake animation
- **Home row keys**: Subtle highlight to show home position

#### Finger Guide:
- Visual hand diagram showing which finger to use
- Animated finger movement guide
- Color-coded fingers matching keyboard keys

#### Progress Indicators:
- Real-time accuracy percentage
- Words per minute (WPM) counter
- Character progress bar
- Streak counter for consecutive correct keys

---

### 5. **Gamification & Rewards**

#### Star Rating (per lesson):
- ⭐ = Completed
- ⭐⭐ = Good accuracy (>80%)
- ⭐⭐⭐ = Excellent accuracy (>90%)
- ⭐⭐⭐⭐ = Perfect accuracy (>95%)
- ⭐⭐⭐⭐⭐ = Perfect + Speed bonus

#### Badges:
- "Home Row Hero" - Complete all home row lessons
- "Speed Demon" - Achieve 20 WPM
- "Accuracy Ace" - 100% accuracy on 5 lessons
- "Practice Makes Perfect" - Complete 10 practice sessions
- "Streak Master" - 50 correct keys in a row

#### Points System:
- Correct key: +10 points
- Streak bonus: +5 per consecutive correct
- Speed bonus: +100 for exceeding target WPM
- Perfect lesson: +500 bonus

---

## 🎨 UI/UX Design

### Color Scheme (Kid-Friendly):
```
Primary:     #4ECDC4 (Teal/Cyan)
Secondary:   #FFE66D (Yellow)
Success:     #7CB342 (Green)
Error:       #FF6B6B (Coral Red)
Background:  #F7F9FC (Light Gray-Blue)
Text:        #2C3E50 (Dark Blue-Gray)
```

### Typography:
- **Headers**: "Fredoka One" or "Bubblegum Sans" (playful)
- **Body/Typing**: "Roboto Mono" or "Fira Code" (monospace for alignment)

### Animations:
- Smooth key press animations (spring physics)
- Celebratory confetti on lesson completion
- Character/mascot reactions to progress
- Subtle bounce effects on buttons

---

## 📐 Component Architecture

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   │
│   ├── Dashboard/
│   │   ├── LessonGrid.tsx
│   │   ├── LessonCard.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatsOverview.tsx
│   │
│   ├── Typing/
│   │   ├── TypingArea.tsx
│   │   ├── TextDisplay.tsx
│   │   ├── Keyboard.tsx
│   │   ├── KeyboardKey.tsx
│   │   ├── HandGuide.tsx
│   │   └── TypingStats.tsx
│   │
│   ├── Feedback/
│   │   ├── StarRating.tsx
│   │   ├── LessonComplete.tsx
│   │   ├── Confetti.tsx
│   │   └── StreakIndicator.tsx
│   │
│   └── Common/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Badge.tsx
│       └── ProgressRing.tsx
│
├── hooks/
│   ├── useTyping.ts          # Core typing logic
│   ├── useKeyboardInput.ts   # Keyboard event handling
│   ├── useTimer.ts           # Lesson timing
│   ├── useProgress.ts        # Progress tracking
│   └── useSound.ts           # Sound effects
│
├── store/
│   ├── lessonStore.ts        # Lesson state (Zustand)
│   ├── userStore.ts          # User progress
│   └── settingsStore.ts      # App settings
│
├── data/
│   ├── lessons/
│   │   └── homeRow.ts        # Home row lesson definitions
│   ├── keyMappings.ts        # Key to finger mappings
│   └── achievements.ts       # Badges & achievements
│
├── utils/
│   ├── textGenerator.ts      # Generate practice text
│   ├── statsCalculator.ts    # WPM, accuracy calculations
│   └── fingerMapping.ts      # Which finger for which key
│
├── types/
│   └── index.ts              # TypeScript interfaces
│
└── styles/
    └── globals.css           # Global styles & CSS variables
```

---

## 🔧 Technical Stack

| Category | Choice | Reason |
|----------|--------|--------|
| **Framework** | React 18 + Vite | Fast HMR, optimized builds |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS | Rapid styling, responsive |
| **State** | Zustand | Simple, fast, minimal boilerplate |
| **Animation** | Framer Motion | Smooth, spring animations |
| **Sound** | Howler.js | Reliable audio playback |
| **Storage** | localStorage | Persist progress offline |
| **Testing** | Vitest + RTL | Fast unit/component tests |

---

## ⚡ Performance Considerations

1. **Input Latency**: 
   - Use `keydown` event directly (not through React state)
   - Debounce visual updates, not input handling
   - Target <16ms response time

2. **Rendering Optimization**:
   - Memoize keyboard component (keys don't change)
   - Virtual list for long text passages
   - CSS transforms for animations (GPU accelerated)

3. **Bundle Size**:
   - Code split by route (dashboard vs typing)
   - Tree shake unused components
   - Lazy load sound effects

---

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Simplified keyboard, larger text |
| Tablet (640-1024px) | Full keyboard, side-by-side hands |
| Desktop (>1024px) | Full experience with all features |

---

## 🗂️ Data Structures

### Lesson Definition:
```typescript
interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  type: 'learn' | 'review' | 'practice' | 'game' | 'info';
  keys: string[];           // Keys used in this lesson
  newKeys?: string[];       // Newly introduced keys
  texts: string[];          // Practice texts
  targetWPM?: number;
  minAccuracy?: number;
  unlockRequirement?: number; // Lesson ID required to unlock
}
```

### User Progress:
```typescript
interface UserProgress {
  lessonId: number;
  completed: boolean;
  stars: number;           // 0-5
  bestWPM: number;
  bestAccuracy: number;
  attempts: number;
  totalTimeSpent: number;  // seconds
}
```

### Typing Session:
```typescript
interface TypingSession {
  lessonId: number;
  text: string;
  currentIndex: number;
  errors: number[];        // Indices where errors occurred
  startTime: number;
  keystrokes: Keystroke[];
}

interface Keystroke {
  expected: string;
  actual: string;
  timestamp: number;
  correct: boolean;
}
```

---

## 🎮 Practice Text Examples (Home Row)

### Lesson 2 (f & j):
```
ffff jjjj ff jj fff jjj fj fj jjf
ffj fff jjj ffj jjf fjfj fffj jjjf
ffjj ff jj ffff
```

### Lesson 5 (d & k):
```
dd kk ddd kkk dk kd dkdk
fj dk fjdk dkfj fdk jkd
djf kjf dkfj fkdj
```

### Lesson 14 (First 8 Keys):
```
ask lad fad sad lass fall
salad flask add dad
all fall sad ask
```

### Lesson 22 (Full Home Row):
```
flash gash jag hall glad
shag gall lash half
shall flag dash hash
```

---

## 🚀 MVP Scope (Phase 1)

### Must Have:
- [x] Lesson dashboard with 23 home row lessons
- [x] Core typing interface with text display
- [x] Virtual keyboard with highlighting
- [x] Basic accuracy & WPM tracking
- [x] Star rating system
- [x] Progress saving (localStorage)
- [x] Lesson locking/unlocking

### Nice to Have (Phase 2):
- [ ] Hand guide animation
- [ ] Sound effects
- [ ] Badges & achievements
- [ ] Custom themes
- [ ] Parent dashboard
- [ ] More key rows (top row, bottom row)

---

## 📊 Mockup Wireframes

### Dashboard View:
```
┌────────────────────────────────────────────────────────────────────┐
│  🎹 TypingKids    Home   Stats   Badges         ⚙️  Settings      │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  📊 2% progress  |  ⭐ 36 stars  |  🏆 15,858 points               │
│                                                                    │
│  ═══════════════════════════════════════════════════════════════   │
│                                                                    │
│  🏠 Home Row                                                       │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│  │   1    │ │   2    │ │   3    │ │   4    │ │   5    │ │   6    ││
│  │  📦    │ │  fj    │ │  fj    │ │  fj    │ │  dk    │ │  dk    ││
│  │  ✓     │ │  ✓     │ │  ✓     │ │ ⭐⭐⭐⭐ │ │  🔒    │ │  🔒    ││
│  │ Intro  │ │Keys f&j│ │ Space  │ │Review  │ │Keys d&k│ │Review  ││
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘│
│                                                                    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│  │   7    │ │   8    │ │   9    │ │  10    │ │  11    │ │  12    ││
│  │  ⏱️    │ │  🎮    │ │  sl    │ │  sl    │ │  ⏱️    │ │  a;    ││
│  │  🔒    │ │  🔒    │ │  🔒    │ │  🔒    │ │  🔒    │ │  🔒    ││
│  │Practice│ │ Play   │ │Keys s&l│ │Review  │ │Practice│ │Keys a&;││
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘│
│                                                                    │
│  ... more lessons ...                                              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Typing View:
```
┌────────────────────────────────────────────────────────────────────┐
│  ← Back          Lesson 2: Keys f & j          ⟳ Restart          │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │                    🟢 START TYPING                           │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ════════════════════════════════════════════════════════════════  │
│                                                                    │
│       f f f f   j j j j   f f   j j   f f f   j j j              │
│       ▲                                                           │
│       █ cursor                                                     │
│                                                                    │
│       f f j   f f f   j j j   f f j   j j f   f j f j            │
│                                                                    │
│  ════════════════════════════════════════════════════════════════  │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │   `  1  2  3  4  5  6  7  8  9  0  -  =  ⌫                  │  │
│  │   ⇥  Q  W  E  R  T  Y  U  I  O  P  [  ]  \                  │  │
│  │   ⇪  A  S  D 🔵F  G  H  J  K  L  ;  '  ⏎                    │  │
│  │   ⇧   Z  X  C  V  B  N  M  ,  .  /    ⇧                     │  │
│  │   ⌃   ⌥        ␣ SPACE ␣           ⌥   ⌃                    │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│       🖐️ Left Hand                    🖐️ Right Hand                │
│       ┌─────────┐                    ┌─────────┐                   │
│       │ ☝️ F key│                    │         │                   │
│       └─────────┘                    └─────────┘                   │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│   WPM: 0   |   Accuracy: 100%   |   Progress: ████░░░░░░ 40%      │
└────────────────────────────────────────────────────────────────────┘
```

### Lesson Complete Modal:
```
┌─────────────────────────────────────────┐
│                                         │
│         🎉 GREAT JOB! 🎉                │
│                                         │
│         ⭐ ⭐ ⭐ ⭐ ☆                    │
│                                         │
│    ┌─────────────────────────────┐      │
│    │  WPM:        25            │      │
│    │  Accuracy:   94%           │      │
│    │  Time:       1:23          │      │
│    │  Points:     +1,250        │      │
│    └─────────────────────────────┘      │
│                                         │
│    🏆 New Badge: "First Steps"          │
│                                         │
│   ┌─────────────┐  ┌─────────────┐      │
│   │   Retry     │  │    Next     │      │
│   └─────────────┘  └─────────────┘      │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔜 Next Steps

1. **Setup Project**: Initialize Vite + React + TypeScript
2. **Create Components**: Build UI components following architecture
3. **Implement Core Logic**: Typing engine, progress tracking
4. **Style & Polish**: Tailwind styling, animations
5. **Test & Iterate**: User testing with kids, gather feedback

---

*Document created: December 4, 2025*
*Version: 1.0 - Home Row Focus*
