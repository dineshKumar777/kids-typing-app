import { memo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TextDisplayProps {
  text: string;
  currentIndex: number;
  errors: number[];
  onCurrentCharPosition?: (position: { x: number; y: number } | null) => void;
}

function TextDisplay({ text, currentIndex, errors, onCurrentCharPosition }: TextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  
  // Set ref for a character
  const setCharRef = useCallback((index: number, el: HTMLSpanElement | null) => {
    if (el) {
      charRefs.current.set(index, el);
    } else {
      charRefs.current.delete(index);
    }
  }, []);
  
  // Report current character position to parent
  useEffect(() => {
    const currentCharEl = charRefs.current.get(currentIndex);
    if (currentCharEl && containerRef.current && onCurrentCharPosition) {
      const charRect = currentCharEl.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate position relative to container
      onCurrentCharPosition({
        x: charRect.left - containerRect.left + charRect.width / 2,
        y: charRect.top - containerRect.top,
      });
    }
  }, [currentIndex, onCurrentCharPosition, text]);
  
  return (
    <div ref={containerRef} className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100 relative">
      <div className="font-mono text-base sm:text-lg lg:text-2xl leading-relaxed tracking-wider text-center">
        {text.split('').map((char, index) => {
          const isTyped = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isError = errors.includes(index);
          const displayChar = char === ' ' ? '\u00A0' : char; // Non-breaking space for visibility
          
          return (
            <span
              key={index}
              ref={(el) => setCharRef(index, el)}
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
            </span>
          );
        })}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-2 sm:mt-3 lg:mt-4 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
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
