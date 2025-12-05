import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LessonProgress, UserStats, TypingSession, Keystroke } from '../types';
import { allLessons } from '../data/lessons/homeRow';

interface LessonStore {
  // Current lesson state
  currentLessonId: number | null;
  session: TypingSession | null;
  
  // Actions
  startLesson: (lessonId: number) => void;
  endLesson: () => void;
  updateSession: (updates: Partial<TypingSession>) => void;
  addKeystroke: (keystroke: Keystroke) => void;
  resetSession: () => void;
}

export const useLessonStore = create<LessonStore>((set, get) => ({
  currentLessonId: null,
  session: null,
  
  startLesson: (lessonId: number) => {
    const lesson = allLessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    // Get a random text from the lesson
    const text = lesson.texts[Math.floor(Math.random() * lesson.texts.length)];
    
    set({
      currentLessonId: lessonId,
      session: {
        lessonId,
        text,
        currentIndex: 0,
        errors: [],
        startTime: null,
        endTime: null,
        keystrokes: [],
        isComplete: false,
        isPaused: false,
      },
    });
  },
  
  endLesson: () => {
    const { session } = get();
    if (session) {
      set({
        session: {
          ...session,
          endTime: Date.now(),
          isComplete: true,
        },
      });
    }
  },
  
  updateSession: (updates: Partial<TypingSession>) => {
    const { session } = get();
    if (session) {
      set({ session: { ...session, ...updates } });
    }
  },
  
  addKeystroke: (keystroke: Keystroke) => {
    const { session } = get();
    if (session) {
      const newErrors = keystroke.correct 
        ? session.errors 
        : [...session.errors, session.currentIndex];
      
      set({
        session: {
          ...session,
          keystrokes: [...session.keystrokes, keystroke],
          currentIndex: session.currentIndex + 1,
          errors: newErrors,
          startTime: session.startTime ?? Date.now(),
        },
      });
    }
  },
  
  resetSession: () => {
    const { currentLessonId } = get();
    if (currentLessonId) {
      get().startLesson(currentLessonId);
    }
  },
}));

interface UserStore {
  // User progress
  progress: Record<number, LessonProgress>;
  stats: UserStats;
  
  // Actions
  updateLessonProgress: (lessonId: number, progress: Partial<LessonProgress>) => void;
  completeLession: (lessonId: number, wpm: number, accuracy: number, timeSpent: number) => void;
  addPoints: (points: number) => void;
  earnBadge: (badgeId: string) => void;
  resetProgress: () => void;
}

const initialStats: UserStats = {
  totalPoints: 0,
  totalStars: 0,
  lessonsCompleted: 0,
  totalTimeSpent: 0,
  averageWPM: 0,
  averageAccuracy: 0,
  currentStreak: 0,
  longestStreak: 0,
  badges: [],
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      progress: {},
      stats: initialStats,
      
      updateLessonProgress: (lessonId: number, updates: Partial<LessonProgress>) => {
        const { progress } = get();
        const existing = progress[lessonId] || {
          lessonId,
          completed: false,
          stars: 0,
          bestWPM: 0,
          bestAccuracy: 0,
          attempts: 0,
          totalTimeSpent: 0,
        };
        
        set({
          progress: {
            ...progress,
            [lessonId]: { ...existing, ...updates },
          },
        });
      },
      
      completeLession: (lessonId: number, wpm: number, accuracy: number, timeSpent: number) => {
        const { progress, stats } = get();
        const existing = progress[lessonId];
        const isFirstCompletion = !existing?.completed;
        
        // Calculate stars based on accuracy
        let stars = 1;
        if (accuracy >= 95) stars = 5;
        else if (accuracy >= 90) stars = 4;
        else if (accuracy >= 85) stars = 3;
        else if (accuracy >= 80) stars = 2;
        
        // Calculate points
        const basePoints = 100;
        const accuracyBonus = Math.floor(accuracy * 5);
        const wpmBonus = Math.floor(wpm * 10);
        const starBonus = stars * 50;
        const totalPoints = basePoints + accuracyBonus + wpmBonus + starBonus;
        
        const newProgress: LessonProgress = {
          lessonId,
          completed: true,
          stars: Math.max(existing?.stars || 0, stars),
          bestWPM: Math.max(existing?.bestWPM || 0, wpm),
          bestAccuracy: Math.max(existing?.bestAccuracy || 0, accuracy),
          attempts: (existing?.attempts || 0) + 1,
          totalTimeSpent: (existing?.totalTimeSpent || 0) + timeSpent,
          lastAttempt: new Date().toISOString(),
        };
        
        // Update stats
        const completedLessons = Object.values(progress).filter(p => p.completed).length + (isFirstCompletion ? 1 : 0);
        const allWPMs = Object.values(progress).map(p => p.bestWPM).filter(w => w > 0);
        const allAccuracies = Object.values(progress).map(p => p.bestAccuracy).filter(a => a > 0);
        
        set({
          progress: {
            ...progress,
            [lessonId]: newProgress,
          },
          stats: {
            ...stats,
            totalPoints: stats.totalPoints + totalPoints,
            totalStars: stats.totalStars + (stars > (existing?.stars || 0) ? stars - (existing?.stars || 0) : 0),
            lessonsCompleted: completedLessons,
            totalTimeSpent: stats.totalTimeSpent + timeSpent,
            averageWPM: allWPMs.length > 0 ? Math.round(allWPMs.reduce((a, b) => a + b, 0) / allWPMs.length) : 0,
            averageAccuracy: allAccuracies.length > 0 ? Math.round(allAccuracies.reduce((a, b) => a + b, 0) / allAccuracies.length) : 0,
          },
        });
      },
      
      addPoints: (points: number) => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            totalPoints: stats.totalPoints + points,
          },
        });
      },
      
      earnBadge: (badgeId: string) => {
        const { stats } = get();
        if (!stats.badges.includes(badgeId)) {
          set({
            stats: {
              ...stats,
              badges: [...stats.badges, badgeId],
            },
          });
        }
      },
      
      resetProgress: () => {
        set({
          progress: {},
          stats: initialStats,
        });
      },
    }),
    {
      name: 'kids-typing-user-progress',
    }
  )
);

// Helper function to check if a lesson is unlocked
// Requires at least 3 stars on the previous lesson to unlock the next one
export function isLessonUnlocked(lessonId: number, progress: Record<number, LessonProgress>): boolean {
  const lesson = allLessons.find(l => l.id === lessonId);
  if (!lesson) return false;
  
  // First lesson is always unlocked
  if (!lesson.unlockRequirement) return true;
  
  // Check if required lesson is completed with at least 3 stars
  const requiredProgress = progress[lesson.unlockRequirement];
  return requiredProgress?.completed && requiredProgress?.stars >= 3;
}
