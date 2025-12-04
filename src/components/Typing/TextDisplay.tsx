import { memo } from 'react';
import { motion } from 'framer-motion';

interface TextDisplayProps {
  text: string;
  currentIndex: number;
  errors: number[];
}

function TextDisplay({ text, currentIndex, errors }: TextDisplayProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="font-mono text-2xl leading-relaxed tracking-wider text-center">
        {text.split('').map((char, index) => {
          const isTyped = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isError = errors.includes(index);
          const displayChar = char === ' ' ? '\u00A0' : char; // Non-breaking space for visibility
          
          return (
            <motion.span
              key={index}
              initial={isCurrent ? { scale: 1 } : false}
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.7 }}
              className={`
                relative inline-block
                ${isTyped && !isError ? 'text-success' : ''}
                ${isTyped && isError ? 'text-error bg-red-100 rounded' : ''}
                ${isCurrent ? 'text-primary-600' : ''}
                ${!isTyped && !isCurrent ? 'text-gray-400' : ''}
              `}
            >
              {displayChar}
              {/* Cursor indicator */}
              {isCurrent && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500"
                />
              )}
            </motion.span>
          );
        })}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / text.length) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

export default memo(TextDisplay);
