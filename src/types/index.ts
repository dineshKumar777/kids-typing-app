// Lesson Types
export type LessonType = 'learn' | 'review' | 'practice' | 'game' | 'info' | 'focus';

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  type: LessonType;
  keys: string[];
  newKeys?: string[];
  texts: string[];
  targetWPM?: number;
  minAccuracy?: number;
  unlockRequirement?: number;
  section: 'homeRow' | 'topRow' | 'bottomRow' | 'numbers';
}

// User Progress
export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  stars: number; // 0-5
  bestWPM: number;
  bestAccuracy: number;
  attempts: number;
  totalTimeSpent: number; // seconds
  lastAttempt?: string; // ISO date string
}

export interface UserStats {
  totalPoints: number;
  totalStars: number;
  lessonsCompleted: number;
  totalTimeSpent: number;
  averageWPM: number;
  averageAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  badges: string[];
}

// Typing Session
export interface Keystroke {
  expected: string;
  actual: string;
  timestamp: number;
  correct: boolean;
}

export interface TypingSession {
  lessonId: number;
  text: string;
  currentIndex: number;
  errors: number[];
  startTime: number | null;
  endTime: number | null;
  keystrokes: Keystroke[];
  isComplete: boolean;
  isPaused: boolean;
}

// Keyboard Types
export type Finger = 'leftPinky' | 'leftRing' | 'leftMiddle' | 'leftIndex' | 'leftThumb' | 
                     'rightThumb' | 'rightIndex' | 'rightMiddle' | 'rightRing' | 'rightPinky';

export interface KeyInfo {
  key: string;
  displayKey?: string;
  finger: Finger;
  row: 'number' | 'top' | 'home' | 'bottom' | 'space';
  isHomeKey?: boolean;
  width?: number; // relative width, 1 = normal key
}

// App Settings
export interface AppSettings {
  soundEnabled: boolean;
  keyboardSoundEnabled: boolean;
  voiceOverEnabled: boolean;
  showHands: boolean;
  showKeyboard: boolean;
  theme: 'light' | 'dark';
  fontSize: 'small' | 'normal' | 'large' | 'x-large';
  accessibleMode: boolean;
}

// Badge/Achievement Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: BadgeRequirement;
  earned?: boolean;
  earnedAt?: string;
}

export type BadgeRequirement = 
  | { type: 'lessons_completed'; count: number; section?: string }
  | { type: 'accuracy'; value: number; count: number }
  | { type: 'wpm'; value: number }
  | { type: 'streak'; count: number }
  | { type: 'points'; value: number }
  | { type: 'stars'; count: number };
