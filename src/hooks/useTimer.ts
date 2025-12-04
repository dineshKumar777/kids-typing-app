import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerOptions {
  autoStart?: boolean;
  onTick?: (elapsed: number) => void;
}

interface UseTimerReturn {
  elapsed: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  stop: () => void;
}

export function useTimer({ autoStart = false, onTick }: UseTimerOptions = {}): UseTimerReturn {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  const tick = useCallback(() => {
    if (startTimeRef.current) {
      const newElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsed(newElapsed);
      onTick?.(newElapsed);
    }
  }, [onTick]);
  
  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now() - elapsed * 1000;
      setIsRunning(true);
    }
  }, [isRunning, elapsed]);
  
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  const reset = useCallback(() => {
    setElapsed(0);
    setIsRunning(false);
    startTimeRef.current = null;
  }, []);
  
  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);
  
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(tick, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, tick]);
  
  return {
    elapsed,
    isRunning,
    start,
    pause,
    reset,
    stop,
  };
}
