import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { keyMap } from '../../data/keyMappings';
import { useKeyboardInput, useSound } from '../../hooks';
import { useSettingsStore } from '../../store/settingsStore';
import Keyboard from './Keyboard';
import HandGuide from './HandGuide';

interface NewKeyIntroductionProps {
  newKeys: string[];
  lessonKeys: string[];
  practiceText: string;
  onComplete: (stats: { wpm: number; accuracy: number; totalTime: number }) => void;
}

type IntroPhase = 'key-intro' | 'good-job' | 'practice';

// Get finger name in a kid-friendly way
function getFingerName(key: string): string {
  const keyInfo = keyMap.get(key.toLowerCase());
  if (!keyInfo) return 'finger';
  
  const fingerMap: Record<string, string> = {
    leftPinky: 'left pinky finger',
    leftRing: 'left ring finger',
    leftMiddle: 'left middle finger',
    leftIndex: 'left index finger',
    leftThumb: 'left thumb',
    rightThumb: 'right thumb',
    rightIndex: 'right index finger',
    rightMiddle: 'right middle finger',
    rightRing: 'right ring finger',
    rightPinky: 'right pinky finger',
  };
  
  return fingerMap[keyInfo.finger] || 'finger';
}

export default function NewKeyIntroduction({ newKeys, lessonKeys, practiceText, onComplete }: NewKeyIntroductionProps) {
  const [phase, setPhase] = useState<IntroPhase>('key-intro');
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [errors, setErrors] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null);
  const [showKeyFeedback, setShowKeyFeedback] = useState(false);
  const [wrongKeyFeedback, setWrongKeyFeedback] = useState(false);
  const [wrongKeyPressed, setWrongKeyPressed] = useState<string | null>(null);
  
  const { settings } = useSettingsStore();
  const { playKeySound, speakKey } = useSound({ enabled: true });
  
  const currentNewKey = newKeys[currentKeyIndex];
  const currentPracticeChar = practiceText[practiceIndex];
  
  // Sliding window of 6 keys
  const WINDOW_SIZE = 6;
  const currentWindowStart = useMemo(() => {
    // Calculate which window we're in based on practiceIndex
    return Math.floor(practiceIndex / WINDOW_SIZE) * WINDOW_SIZE;
  }, [practiceIndex]);
  
  const visibleChars = useMemo(() => {
    return practiceText.slice(currentWindowStart, currentWindowStart + WINDOW_SIZE).split('');
  }, [practiceText, currentWindowStart]);
  
  // Calculate required presses for each key introduction (3 presses to move on)
  const requiredPresses = 3;
  
  // Handle key intro phase
  const handleKeyIntroPress = useCallback((key: string) => {
    if (phase !== 'key-intro') return;
    
    if (key.toLowerCase() === currentNewKey.toLowerCase()) {
      if (settings.keyboardSoundEnabled) {
        playKeySound();
      }
      
      // Show visual feedback
      setLastPressedKey(key);
      setShowKeyFeedback(true);
      setTimeout(() => setShowKeyFeedback(false), 300);
      
      const newCount = keyPressCount + 1;
      setKeyPressCount(newCount);
      
      if (newCount >= requiredPresses) {
        // Move to next key or transition phase
        if (currentKeyIndex < newKeys.length - 1) {
          setCurrentKeyIndex(prev => prev + 1);
          setKeyPressCount(0);
        } else {
          // All keys introduced, show good job
          setPhase('good-job');
        }
      }
    }
  }, [phase, currentNewKey, keyPressCount, currentKeyIndex, newKeys.length, settings.keyboardSoundEnabled, playKeySound]);
  
  // Handle practice phase
  const handlePracticePress = useCallback((key: string) => {
    if (phase !== 'practice') return;
    
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    if (settings.keyboardSoundEnabled) {
      playKeySound();
    }
    
    if (key.toLowerCase() === currentPracticeChar?.toLowerCase()) {
      // Correct key
      setWrongKeyFeedback(false);
      setWrongKeyPressed(null);
      
      const nextIndex = practiceIndex + 1;
      setPracticeIndex(nextIndex);
      
      // Speak next key
      if (settings.voiceOverEnabled && practiceText[nextIndex]) {
        speakKey(practiceText[nextIndex]);
      }
      
      // Check if complete
      if (nextIndex >= practiceText.length) {
        const totalTime = startTime ? (Date.now() - startTime) / 1000 : 0;
        const totalChars = practiceText.length;
        const errorCount = errors.length;
        const accuracy = Math.round(((totalChars - errorCount) / totalChars) * 100);
        const wpm = totalTime > 0 ? Math.round((totalChars / 5) / (totalTime / 60)) : 0;
        
        onComplete({ wpm, accuracy, totalTime });
      }
    } else {
      // Wrong key - show feedback
      setWrongKeyFeedback(true);
      setWrongKeyPressed(key);
      setTimeout(() => {
        setWrongKeyFeedback(false);
        setWrongKeyPressed(null);
      }, 500);
      
      if (!errors.includes(practiceIndex)) {
        setErrors(prev => [...prev, practiceIndex]);
      }
    }
  }, [phase, currentPracticeChar, practiceIndex, practiceText, startTime, errors, settings, playKeySound, speakKey, onComplete]);
  
  // Combined key handler
  useKeyboardInput({
    onKeyPress: (key) => {
      if (phase === 'key-intro') {
        handleKeyIntroPress(key);
      } else if (phase === 'practice') {
        handlePracticePress(key);
      } else if (phase === 'good-job' && (key === 'Enter' || key === '\n')) {
        handleContinueToPractice();
      }
    },
    enabled: true,
    allowedKeys: phase === 'key-intro' ? [currentNewKey] : phase === 'good-job' ? ['Enter', '\n'] : lessonKeys,
  });
  
  // Auto-advance from good-job phase after animation
  const handleContinueToPractice = useCallback(() => {
    setPhase('practice');
    if (settings.voiceOverEnabled && practiceText[0]) {
      setTimeout(() => speakKey(practiceText[0]), 300);
    }
  }, [settings.voiceOverEnabled, practiceText, speakKey]);
  
  // Key Introduction Phase
  if (phase === 'key-intro') {
    return (
      <motion.div
        key={`intro-${currentKeyIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center py-8 px-4"
      >
        <div className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          New Key Introduction
        </div>
        
        <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 text-center mb-6">
          Type the{' '}
          <motion.span 
            className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary-500 text-white rounded-lg font-bold text-2xl sm:text-3xl mx-2 shadow-lg"
            animate={showKeyFeedback ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            {currentNewKey === ' ' ? '␣' : currentNewKey}
          </motion.span>{' '}
          key using your {getFingerName(currentNewKey)}.
        </div>
        
        {/* Progress dots with feedback animation */}
        <div className="flex gap-2 mb-4">
          {Array.from({ length: requiredPresses }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${i < keyPressCount ? 'bg-primary-500' : 'bg-gray-300'}`}
              animate={i === keyPressCount - 1 && showKeyFeedback ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
        
        {/* Key progress indicator */}
        <div className="text-sm text-gray-500 mb-6">
          Key {currentKeyIndex + 1} of {newKeys.length}
        </div>
        
        {/* Keyboard */}
        {settings.showKeyboard && (
          <div className="mb-6">
            <Keyboard
              highlightKey={currentNewKey}
              pressedKey={showKeyFeedback ? lastPressedKey || undefined : undefined}
              showFingerColors={true}
            />
          </div>
        )}
        
        {/* Hand Guides */}
        {settings.showHands && (
          <div className="flex justify-center gap-6 sm:gap-8 lg:gap-12">
            <HandGuide hand="left" activeKey={currentNewKey} />
            <HandGuide hand="right" activeKey={currentNewKey} />
          </div>
        )}
      </motion.div>
    );
  }
  
  // Good Job Transition Phase
  if (phase === 'good-job') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 px-4"
      >
        {/* Checkmark Circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="relative mb-6"
        >
          {/* Outer ring */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 flex items-center justify-center">
            {/* Inner circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-success flex items-center justify-center"
            >
              {/* Checkmark */}
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Good Job Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl sm:text-3xl font-display font-bold text-gray-700 uppercase tracking-wider mb-6"
        >
          Good Job!
        </motion.h2>
        
        {/* Next Practice Preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <p className="text-lg text-gray-600 mb-4">Next we will practice</p>
          <div className="flex gap-3 justify-center mb-8">
            {newKeys.map((key, index) => (
              <div
                key={index}
                className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-mono text-gray-700 bg-white"
              >
                {key === ' ' ? '␣' : key}
              </div>
            ))}
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleContinueToPractice}
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Start Practice →
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }
  
  // Practice Phase - Sliding window of 6 keys
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-8 px-4"
    >
      {/* Window indicator */}
      <div className="text-xs text-gray-400 mb-4">
        Set {Math.floor(practiceIndex / WINDOW_SIZE) + 1} of {Math.ceil(practiceText.length / WINDOW_SIZE)}
      </div>

      {/* Character Boxes - Sliding Window */}
      <div className="relative mb-8 min-h-[100px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentWindowStart}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center gap-3 sm:gap-4 lg:gap-5"
          >
            {visibleChars.map((char, windowIndex) => {
              const absoluteIndex = currentWindowStart + windowIndex;
              const isTyped = absoluteIndex < practiceIndex;
              const isCurrent = absoluteIndex === practiceIndex;
              const isError = errors.includes(absoluteIndex);
              const displayChar = char === ' ' ? '␣' : char;
              const showWrongKey = isCurrent && wrongKeyFeedback;
              
              return (
                <motion.div
                  key={absoluteIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: showWrongKey ? [0, -5, 5, -5, 5, 0] : 0,
                  }}
                  transition={{ 
                    delay: windowIndex * 0.05,
                    x: { duration: 0.4 }
                  }}
                  className="relative"
                >
                  <div
                    className={`
                      w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20
                      border-3 rounded-xl
                      flex items-center justify-center
                      text-2xl sm:text-3xl lg:text-4xl font-mono font-medium
                      transition-all duration-200
                      ${isTyped && !isError ? 'bg-green-50 border-green-300 text-green-500' : ''}
                      ${isTyped && isError ? 'bg-red-50 border-red-300 text-red-400' : ''}
                      ${isCurrent && !showWrongKey ? 'border-primary-400 text-gray-700 bg-white shadow-lg ring-2 ring-primary-200' : ''}
                      ${isCurrent && showWrongKey ? 'border-red-500 text-red-500 bg-red-50 shadow-lg' : ''}
                      ${!isTyped && !isCurrent ? 'border-gray-200 text-gray-500 bg-white' : ''}
                    `}
                    style={{ borderWidth: '3px' }}
                  >
                    {/* Show wrong key overlay */}
                    {showWrongKey && wrongKeyPressed ? (
                      <motion.span
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-red-500"
                      >
                        {wrongKeyPressed === ' ' ? '␣' : wrongKeyPressed}
                      </motion.span>
                    ) : (
                      displayChar
                    )}
                  </div>
                  
                  {/* Current indicator underline */}
                  {isCurrent && !showWrongKey && (
                    <motion.div
                      layoutId="cursor"
                      className="absolute -bottom-2 left-2 right-2 h-1.5 bg-primary-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                    />
                  )}
                  
                  {/* Error indicator */}
                  {isCurrent && showWrongKey && (
                    <motion.div
                      className="absolute -bottom-2 left-2 right-2 h-1.5 bg-red-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Expected key hint when wrong - fixed height to prevent layout shift */}
      <div className="h-8 mb-4 flex items-center justify-center">
        <AnimatePresence>
          {wrongKeyFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm flex items-center gap-2"
            >
              <span>Expected:</span>
              <span className="font-mono font-bold text-lg px-2 py-1 bg-red-100 rounded">
                {currentPracticeChar === ' ' ? '␣' : currentPracticeChar}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Progress */}
      <div className="w-full max-w-md mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(practiceIndex / practiceText.length) * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="text-center text-sm text-gray-500 mt-2">
          {practiceIndex} / {practiceText.length}
        </div>
      </div>
      
      {/* Keyboard */}
      {settings.showKeyboard && (
        <div className="mb-6">
          <Keyboard
            highlightKey={currentPracticeChar}
            pressedKey={undefined}
            showFingerColors={true}
          />
        </div>
      )}
      
      {/* Hand Guides */}
      {settings.showHands && (
        <div className="flex justify-center gap-6 sm:gap-8 lg:gap-12">
          <HandGuide hand="left" activeKey={currentPracticeChar} />
          <HandGuide hand="right" activeKey={currentPracticeChar} />
        </div>
      )}
    </motion.div>
  );
}
