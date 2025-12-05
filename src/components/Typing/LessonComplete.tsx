import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, StarRating } from '../common';

interface LessonCompleteProps {
  stars: number;
  wpm: number;
  accuracy: number;
  timeSpent: number;
  points: number;
  onRetry: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export default function LessonComplete({
  stars,
  wpm,
  accuracy,
  timeSpent,
  points,
  onRetry,
  onNext,
  hasNext,
}: LessonCompleteProps) {
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && hasNext) {
        e.preventDefault();
        onNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        onRetry();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasNext, onNext, onRetry]);
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      {/* Celebration */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="text-5xl sm:text-6xl mb-3 sm:mb-4"
      >
        🎉
      </motion.div>
      
      <h2 className="text-2xl sm:text-3xl font-display font-bold text-text mb-2">
        {stars >= 4 ? 'Amazing!' : stars >= 3 ? 'Great Job!' : stars >= 2 ? 'Good Work!' : 'Keep Practicing!'}
      </h2>
      
      {/* Stars */}
      <div className="flex justify-center mb-6">
        <StarRating stars={stars} size="lg" showAnimation />
      </div>
      
      {/* Stats */}
      <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <div className="text-xs sm:text-sm text-gray-500">Speed</div>
            <div className="text-lg sm:text-xl font-bold text-primary-600">{wpm} WPM</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-500">Accuracy</div>
            <div className={`text-lg sm:text-xl font-bold ${accuracy >= 90 ? 'text-success' : accuracy >= 70 ? 'text-secondary-600' : 'text-error'}`}>
              {accuracy}%
            </div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-500">Time</div>
            <div className="text-lg sm:text-xl font-bold text-text">{formatTime(timeSpent)}</div>
          </div>
          <div>
            <div className="text-xs sm:text-sm text-gray-500">Points</div>
            <div className="text-lg sm:text-xl font-bold text-secondary-600">+{points}</div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <Button variant="ghost" onClick={onRetry}>
          🔄 Try Again
        </Button>
        {hasNext && (
          <Button variant="primary" onClick={onNext}>
            Next Lesson →
          </Button>
        )}
      </div>
      
      {/* Keyboard hints */}
      <div className="mt-4 text-xs text-gray-400">
        <span className="mr-4">⎵ Space to retry</span>
        {hasNext && <span>↵ Enter for next lesson</span>}
      </div>
    </motion.div>
  );
}
