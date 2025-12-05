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
  'small': 8,
  'normal': 6,
  'large': 5,
  'x-large': 4,
};

// Max visible lines
const VISIBLE_LINES = 3;

// Split text into lines with max N words per line
function splitIntoLines(text: string, wordsPerLine: number): string[][] {
  const words = text.split(' ');
  const lines: string[][] = [];
  
  for (let i = 0; i < words.length; i += wordsPerLine) {
    const lineWords = words.slice(i, i + wordsPerLine);
    const lineChars: string[] = [];
    lineWords.forEach((word, wordIdx) => {
      word.split('').forEach(char => lineChars.push(char));
      if (wordIdx < lineWords.length - 1) {
        lineChars.push(' ');
      }
    });
    if (i + wordsPerLine < words.length) {
      lineChars.push(' ');
    }
    lines.push(lineChars);
  }
  
  return lines;
}

// Calculate cumulative character counts per line
function getLineBoundaries(lines: string[][]): number[] {
  const boundaries: number[] = [];
  let total = 0;
  for (const line of lines) {
    total += line.length;
    boundaries.push(total);
  }
  return boundaries;
}

function TextDisplay({ text, currentIndex, errors, wrongKey, onCurrentCharPosition }: TextDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  const { settings } = useSettingsStore();
  
  const wordsPerLine = WORDS_PER_LINE[settings.fontSize] || WORDS_PER_LINE['normal'];
  const lines = useMemo(() => splitIntoLines(text, wordsPerLine), [text, wordsPerLine]);
  const lineBoundaries = useMemo(() => getLineBoundaries(lines), [lines]);
  
  // Find which line the current character is on
  const currentLineIndex = useMemo(() => {
    for (let i = 0; i < lineBoundaries.length; i++) {
      if (currentIndex < lineBoundaries[i]) {
        return i;
      }
    }
    return lines.length - 1;
  }, [currentIndex, lineBoundaries, lines.length]);
  
  // Calculate visible line window (show current line and surrounding context)
  const visibleStartLine = useMemo(() => {
    // Keep current line in the middle when possible, but don't go below 0
    const idealStart = Math.max(0, currentLineIndex - 1);
    // Don't show past the end
    const maxStart = Math.max(0, lines.length - VISIBLE_LINES);
    return Math.min(idealStart, maxStart);
  }, [currentLineIndex, lines.length]);
  
  const visibleLines = useMemo(() => {
    return lines.slice(visibleStartLine, visibleStartLine + VISIBLE_LINES);
  }, [lines, visibleStartLine]);
  
  // Calculate starting char index for visible lines
  const visibleStartCharIndex = useMemo(() => {
    if (visibleStartLine === 0) return 0;
    return lineBoundaries[visibleStartLine - 1];
  }, [visibleStartLine, lineBoundaries]);
  
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
      
      onCurrentCharPosition({
        x: charRect.left - containerRect.left + charRect.width / 2,
        y: charRect.top - containerRect.top,
      });
    }
  }, [currentIndex, onCurrentCharPosition, text]);
  
  const fontSizeClass = FONT_SIZE_CLASSES[settings.fontSize] || FONT_SIZE_CLASSES['normal'];
  
  // Track character index across visible lines
  let charIndex = visibleStartCharIndex;
  
  return (
    <div ref={containerRef} className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100 relative">
      {/* Line indicator */}
      {lines.length > VISIBLE_LINES && (
        <div className="text-xs text-gray-400 mb-3 text-right">
          Line {currentLineIndex + 1} of {lines.length}
        </div>
      )}
      
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={visibleStartLine}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className={`typing-text font-mono ${fontSizeClass} tracking-wide flex flex-col gap-4 sm:gap-6 lg:gap-8`}
          >
            {visibleLines.map((lineChars, lineIdx) => (
              <div key={visibleStartLine + lineIdx} className="flex justify-start flex-wrap gap-x-1">
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
          </motion.div>
        </AnimatePresence>
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
