import { memo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/settingsStore';

interface TextDisplayProps {
  text: string;
  currentIndex: number;
  errors: number[];
  wrongKey?: string | null;
  onCurrentCharPosition?: (position: { x: number; y: number } | null) => void;
}

const FONT_SIZE_CLASSES = {
  'small': 'text-sm sm:text-base lg:text-lg',
  'normal': 'text-base sm:text-lg lg:text-2xl',
  'large': 'text-xl sm:text-2xl lg:text-4xl',
  'x-large': 'text-4xl sm:text-5xl lg:text-7xl',
};

function TextDisplay({ text, currentIndex, errors, wrongKey, onCurrentCharPosition }: TextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  const { settings } = useSettingsStore();
  
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
  
  const fontSizeClass = FONT_SIZE_CLASSES[settings.fontSize] || FONT_SIZE_CLASSES['normal'];
  
  return (
    <div ref={containerRef} className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-100 relative">
      <div className={`font-mono ${fontSizeClass} leading-relaxed tracking-wider text-center`}>
        {text.split('').map((char, index) => {
          const isTyped = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isError = errors.includes(index);
          const displayChar = char === ' ' ? '\u00A0' : char; // Non-breaking space for visibility
          const showWrongKey = isCurrent && wrongKey;
          const wrongDisplayChar = wrongKey === ' ' ? '␣' : wrongKey;
          
          return (
            <span
              key={index}
              ref={(el) => setCharRef(index, el)}
              className={`
                relative inline-block
                ${isTyped && !isError ? 'text-success' : ''}
                ${isTyped && isError ? 'text-error bg-red-100 rounded' : ''}
                ${isCurrent && !showWrongKey ? 'text-primary-600' : ''}
                ${isCurrent && showWrongKey ? 'text-gray-300' : ''}
                ${!isTyped && !isCurrent ? 'text-gray-400' : ''}
              `}
            >
              {displayChar}
              {/* Wrong key overlay */}
              <AnimatePresence>
                {showWrongKey && (
                  <motion.span
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center text-error font-bold"
                  >
                    {wrongDisplayChar}
                  </motion.span>
                )}
              </AnimatePresence>
              {/* Cursor indicator */}
              {isCurrent && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`absolute -bottom-1 left-0 w-full h-0.5 ${showWrongKey ? 'bg-error' : 'bg-primary-500'}`}
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
