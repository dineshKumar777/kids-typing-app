import { useState, useCallback, useRef, useEffect } from 'react';
import { Keystroke } from '../types';

interface UseTypingOptions {
  text: string;
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
  wpm: number;
  accuracy: number;
  streak: number;
  timeElapsed: number;
  currentKey: string | undefined;
  handleKeyPress: (key: string) => void;
  reset: () => void;
}

export function useTyping({ text, onComplete, onKeystroke }: UseTypingOptions): UseTypingReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  const startTimeRef = useRef<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  // Timer effect
  useEffect(() => {
    if (isStarted && !isComplete) {
      timerRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isComplete]);
  
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
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
      setCurrentIndex(prev => prev + 1);
      
      // Check if complete
      if (currentIndex + 1 >= text.length) {
        setIsComplete(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        
        const finalTimeElapsed = startTimeRef.current 
          ? Math.floor((Date.now() - startTimeRef.current) / 1000)
          : 0;
        
        const words = text.length / 5;
        const minutes = finalTimeElapsed / 60;
        const finalWpm = Math.round(words / minutes) || 0;
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
      setErrors(prev => [...prev, currentIndex]);
      // Still advance on error (to match typing tutor behavior)
      setCurrentIndex(prev => prev + 1);
      
      // Check if complete even with error
      if (currentIndex + 1 >= text.length) {
        setIsComplete(true);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    }
  }, [currentIndex, text, isComplete, isStarted, errors, onComplete, onKeystroke]);
  
  // Reset function
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setErrors([]);
    setIsComplete(false);
    setIsStarted(false);
    setStreak(0);
    setMaxStreak(0);
    setTimeElapsed(0);
    startTimeRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);
  
  return {
    currentIndex,
    errors,
    isComplete,
    isStarted,
    wpm: wpm(),
    accuracy: accuracy(),
    streak,
    timeElapsed,
    currentKey,
    handleKeyPress,
    reset,
  };
}
