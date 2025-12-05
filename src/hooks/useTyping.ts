import { useState, useCallback, useRef, useEffect } from 'react';
import { Keystroke } from '../types';

interface UseTypingOptions {
  text: string;
  blockOnError?: boolean;
  onComplete?: (stats: TypingStats) => void;
  onKeystroke?: (keystroke: Keystroke) => void;
}

interface TypingStats {
  wpm: number;
  accuracy: number;
  totalTime: number;
  correctKeys: number;
  totalKeys: number;
  errors: number[];
}

interface UseTypingReturn {
  currentIndex: number;
  errors: number[];
  isComplete: boolean;
  isStarted: boolean;
  isPaused: boolean;
  isBlockedOnError: boolean;
  wrongKey: string | null;
  wpm: number;
  accuracy: number;
  streak: number;
  timeElapsed: number;
  currentKey: string | undefined;
  handleKeyPress: (key: string) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTyping({ text, blockOnError = false, onComplete, onKeystroke }: UseTypingOptions): UseTypingReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBlockedOnError, setIsBlockedOnError] = useState(false);
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  
  const startTimeRef = useRef<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0); // Track total paused time
  const pauseStartRef = useRef<number | null>(null); // When pause started
  const wrongKeyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Timer to clear wrong key
  
  // Timer effect
  useEffect(() => {
    if (isStarted && !isComplete && !isPaused) {
      timerRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          const totalElapsed = Date.now() - startTimeRef.current - pausedTimeRef.current;
          setTimeElapsed(Math.floor(totalElapsed / 1000));
        }
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isComplete, isPaused]);
  
  // Pause function
  const pause = useCallback(() => {
    if (!isPaused && isStarted && !isComplete) {
      setIsPaused(true);
      pauseStartRef.current = Date.now();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isPaused, isStarted, isComplete]);
  
  // Resume function
  const resume = useCallback(() => {
    if (isPaused && pauseStartRef.current) {
      pausedTimeRef.current += Date.now() - pauseStartRef.current;
      pauseStartRef.current = null;
      setIsPaused(false);
    }
  }, [isPaused]);
  
  // Calculate WPM (words per minute)
  const wpm = useCallback(() => {
    if (!isStarted || timeElapsed === 0) return 0;
    const words = currentIndex / 5; // Standard: 5 characters = 1 word
    const minutes = timeElapsed / 60;
    return Math.round(words / minutes) || 0;
  }, [currentIndex, timeElapsed, isStarted]);
  
  // Calculate accuracy
  const accuracy = useCallback(() => {
    if (currentIndex === 0) return 100;
    const correctKeys = currentIndex - errors.length;
    return Math.round((correctKeys / currentIndex) * 100);
  }, [currentIndex, errors.length]);
  
  // Get current key to type
  const currentKey = text[currentIndex];
  
  // Handle key press
  const handleKeyPress = useCallback((key: string) => {
    if (isComplete) return;
    
    // Start timer on first keypress
    if (!isStarted) {
      setIsStarted(true);
      startTimeRef.current = Date.now();
    }
    
    const expected = text[currentIndex];
    const isCorrect = key === expected;
    
    // Create keystroke record
    const keystroke: Keystroke = {
      expected,
      actual: key,
      timestamp: Date.now(),
      correct: isCorrect,
    };
    
    onKeystroke?.(keystroke);
    
    if (isCorrect) {
      setStreak(prev => prev + 1);
      setCurrentIndex(prev => prev + 1);
      setIsBlockedOnError(false); // Clear blocked state on correct key
      setWrongKey(null); // Clear wrong key display
      
      // Check if complete
      if (currentIndex + 1 >= text.length) {
        setIsComplete(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        const finalTimeElapsed = startTimeRef.current 
          ? Math.max(1, Math.floor((Date.now() - startTimeRef.current - pausedTimeRef.current) / 1000))
          : 1; // Minimum 1 second to avoid division by zero
        
        const words = text.length / 5;
        const minutes = finalTimeElapsed / 60;
        const finalWpm = Math.round(words / minutes);
        const finalAccuracy = Math.round(((text.length - errors.length) / text.length) * 100);
        
        onComplete?.({
          wpm: finalWpm,
          accuracy: finalAccuracy,
          totalTime: finalTimeElapsed,
          correctKeys: text.length - errors.length,
          totalKeys: text.length,
          errors,
        });
      }
    } else {
      setStreak(0);
      setIsBlockedOnError(true);
      
      // Clear any existing wrong key timer
      if (wrongKeyTimerRef.current) {
        clearTimeout(wrongKeyTimerRef.current);
      }
      
      // Show wrong key and auto-hide after 500ms
      setWrongKey(key);
      wrongKeyTimerRef.current = setTimeout(() => {
        setWrongKey(null);
      }, 500);
      
      // Only record error once per position (avoid duplicate errors when blocked)
      if (!errors.includes(currentIndex)) {
        setErrors(prev => [...prev, currentIndex]);
      }
      
      // If blockOnError is enabled, don't advance - user must type correct key
      if (blockOnError) {
        // Don't advance, stay on current character
        return;
      }
      
      // Otherwise, advance on error (original behavior)
      setCurrentIndex(prev => prev + 1);
      
      // Check if complete even with error
      if (currentIndex + 1 >= text.length) {
        setIsComplete(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        // Calculate final stats and call onComplete
        const finalTimeElapsed = startTimeRef.current 
          ? Math.max(1, Math.floor((Date.now() - startTimeRef.current - pausedTimeRef.current) / 1000))
          : 1; // Minimum 1 second to avoid division by zero
        
        const words = text.length / 5;
        const minutes = finalTimeElapsed / 60;
        const finalWpm = Math.round(words / minutes);
        // Account for this final error in the count
        const finalErrors = errors.length + 1;
        const finalAccuracy = Math.round(((text.length - finalErrors) / text.length) * 100);
        
        onComplete?.({
          wpm: finalWpm,
          accuracy: finalAccuracy,
          totalTime: finalTimeElapsed,
          correctKeys: text.length - finalErrors,
          totalKeys: text.length,
          errors: [...errors, currentIndex],
        });
      }
    }
  }, [currentIndex, text, isComplete, isStarted, errors, blockOnError, onComplete, onKeystroke]);
  
  // Reset function
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setErrors([]);
    setIsComplete(false);
    setIsStarted(false);
    setIsPaused(false);
    setIsBlockedOnError(false);
    setWrongKey(null);
    setStreak(0);
    setTimeElapsed(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    pauseStartRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (wrongKeyTimerRef.current) {
      clearTimeout(wrongKeyTimerRef.current);
    }
  }, []);
  
  return {
    currentIndex,
    errors,
    isComplete,
    isStarted,
    isPaused,
    isBlockedOnError,
    wrongKey,
    wpm: wpm(),
    accuracy: accuracy(),
    streak,
    timeElapsed,
    currentKey,
    handleKeyPress,
    pause,
    resume,
    reset,
  };
}
