import { memo, useRef, useEffect, useCallback, useMemo } from 'react';
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
  'small': 'text-base sm:text-lg lg:text-xl',
  'normal': 'text-xl sm:text-2xl lg:text-3xl',
  'large': 'text-2xl sm:text-3xl lg:text-5xl',
  'x-large': 'text-4xl sm:text-5xl lg:text-7xl',
};

// Words per line based on font size
const WORDS_PER_LINE = {
  'small': 6,
  'normal': 5,
  'large': 4,
  'x-large': 3,
};

// Split text into lines with max N words per line
function splitIntoLines(text: string, wordsPerLine: number): string[][] {
  const words = text.split(' ');
  const lines: string[][] = [];
  
  for (let i = 0; i < words.length; i += wordsPerLine) {
    const lineWords = words.slice(i, i + wordsPerLine);
    // Join with space and split back to chars, but keep track of spaces
    const lineChars: string[] = [];
    lineWords.forEach((word, wordIdx) => {
      word.split('').forEach(char => lineChars.push(char));
      // Add space after word (except last word in line)
      if (wordIdx < lineWords.length - 1) {
        lineChars.push(' ');
      }
    });
    // Add space at end if not the last line and original had space
    if (i + wordsPerLine < words.length) {
      lineChars.push(' ');
    }
    lines.push(lineChars);
  }
  
  return lines;
}

function TextDisplay({ text, currentIndex, errors, wrongKey, onCurrentCharPosition }: TextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  const { settings } = useSettingsStore();
  
  const wordsPerLine = WORDS_PER_LINE[settings.fontSize] || WORDS_PER_LINE['normal'];
  const lines = useMemo(() => splitIntoLines(text, wordsPerLine), [text, wordsPerLine]);
  
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
  
  // Track character index across all lines
  let charIndex = 0;
  
  return (
    <div ref={containerRef} className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100 relative">
      <div className={`typing-text font-mono ${fontSizeClass} tracking-wide text-center flex flex-col gap-6 sm:gap-8 lg:gap-10`}>
        {lines.map((lineChars, lineIdx) => (
          <div key={lineIdx} className="flex justify-center gap-1">
            {lineChars.map((char) => {
              const index = charIndex++;
              const isTyped = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isError = errors.includes(index);
              const displayChar = char === ' ' ? '\u00A0' : char;
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
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 sm:mt-6 lg:mt-8 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
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
