import { memo } from 'react';
import { motion } from 'framer-motion';

interface TypingStatsProps {
  wpm: number;
  accuracy: number;
  streak: number;
  timeElapsed: number;
  isActive: boolean;
}

function TypingStats({ wpm, accuracy, streak, timeElapsed, isActive }: TypingStatsProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 bg-white rounded-xl p-2 sm:p-3 lg:p-4 shadow-sm border border-gray-100"
    >
      {/* WPM */}
      <div className="text-center">
        <div className="text-xs sm:text-sm text-gray-500 font-medium">WPM</div>
        <motion.div 
          key={wpm}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600"
        >
          {wpm}
        </motion.div>
      </div>
      
      {/* Divider */}
      <div className="h-8 sm:h-10 w-px bg-gray-200" />
      
      {/* Accuracy */}
      <div className="text-center">
        <div className="text-xs sm:text-sm text-gray-500 font-medium">Accuracy</div>
        <motion.div 
          key={accuracy}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-lg sm:text-xl lg:text-2xl font-bold ${
            accuracy >= 90 ? 'text-success' : 
            accuracy >= 70 ? 'text-secondary-600' : 
            'text-error'
          }`}
        >
          {accuracy}%
        </motion.div>
      </div>
      
      {/* Divider */}
      <div className="h-8 sm:h-10 w-px bg-gray-200" />
      
      {/* Streak */}
      <div className="text-center">
        <div className="text-xs sm:text-sm text-gray-500 font-medium">Streak</div>
        <div className="flex items-center gap-1">
          <motion.span 
            key={streak}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-600"
          >
            {streak}
          </motion.span>
          {streak >= 5 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xl"
            >
              🔥
            </motion.span>
          )}
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-8 sm:h-10 w-px bg-gray-200" />
      
      {/* Time */}
      <div className="text-center">
        <div className="text-xs sm:text-sm text-gray-500 font-medium">Time</div>
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-text">
          {formatTime(timeElapsed)}
        </div>
      </div>
      
      {/* Activity indicator */}
      {isActive && (
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-success"
        />
      )}
    </motion.div>
  );
}

export default memo(TypingStats);
