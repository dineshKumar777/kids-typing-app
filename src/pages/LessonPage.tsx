import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonById, allLessons } from '../data/lessons/homeRow';
import { useUserStore } from '../store/lessonStore';
import { useSettingsStore } from '../store/settingsStore';
import { useTyping, useKeyboardInput } from '../hooks';
import { Keyboard, TextDisplay, HandGuide, LessonComplete } from '../components/Typing';
import { Button, Modal } from '../components/common';

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const lesson = getLessonById(Number(lessonId));
  
  const { completeLession } = useUserStore();
  const { settings } = useSettingsStore();
  
  const [showComplete, setShowComplete] = useState(false);
  const [completionStats, setCompletionStats] = useState({
    stars: 0,
    wpm: 0,
    accuracy: 0,
    timeSpent: 0,
    points: 0,
  });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [currentCharPosition, setCurrentCharPosition] = useState<{ x: number; y: number } | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Get current text
  const currentText = lesson?.texts[currentTextIndex] || '';
  
  // Typing hook
  const {
    currentIndex,
    errors,
    isStarted,
    wpm,
    accuracy,
    streak,
    currentKey,
    handleKeyPress,
    pause: pauseTyping,
    resume: resumeTyping,
    reset: resetTyping,
  } = useTyping({
    text: currentText,
    onComplete: (stats) => {
      // Calculate stars
      let stars = 1;
      if (stats.accuracy >= 95) stars = 5;
      else if (stats.accuracy >= 90) stars = 4;
      else if (stats.accuracy >= 85) stars = 3;
      else if (stats.accuracy >= 80) stars = 2;
      
      // Calculate points
      const basePoints = 100;
      const accuracyBonus = Math.floor(stats.accuracy * 5);
      const wpmBonus = Math.floor(stats.wpm * 10);
      const starBonus = stars * 50;
      const totalPoints = basePoints + accuracyBonus + wpmBonus + starBonus;
      
      setCompletionStats({
        stars,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        timeSpent: stats.totalTime,
        points: totalPoints,
      });
      
      // Save progress
      if (lesson) {
        completeLession(lesson.id, stats.wpm, stats.accuracy, stats.totalTime);
      }
      
      setShowComplete(true);
    },
  });
  
  // Keyboard input hook
  useKeyboardInput({
    onKeyPress: (key) => {
      // Resume typing if was idle/paused
      if (isIdle) {
        resumeTyping();
      }
      
      // Reset idle state on any keypress
      setIsIdle(false);
      
      // Clear existing timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      
      // Set new idle timer (show after 5 seconds of inactivity - longer for kids)
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
        pauseTyping(); // Pause metrics calculation when idle
      }, 5000);
      
      handleKeyPress(key);
    },
    enabled: !showComplete && !!lesson,
    allowedKeys: lesson?.keys,
  });
  
  // Cleanup idle timer
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);
  
  // Reset idle state when lesson changes or completes
  useEffect(() => {
    setIsIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
  }, [lessonId, showComplete]);
  
  // Handle retry
  const handleRetry = useCallback(() => {
    setShowComplete(false);
    setIsIdle(false);
    resetTyping();
  }, [resetTyping]);
  
  // Handle next lesson
  const handleNext = useCallback(() => {
    if (!lesson) return;
    const nextLesson = allLessons.find(l => l.id === lesson.id + 1);
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
      setShowComplete(false);
      setCurrentTextIndex(0);
      setIsIdle(false);
    } else {
      navigate('/');
    }
  }, [lesson, navigate]);
  
  // Reset when lesson changes
  useEffect(() => {
    resetTyping();
    setCurrentTextIndex(0);
    setShowComplete(false);
    setIsIdle(false);
  }, [lessonId, resetTyping]);
  
  // Check if lesson exists
  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-display font-bold text-text mb-4">
            Lesson not found
          </h1>
          <Button onClick={() => navigate('/')}>
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }
  
  const hasNextLesson = allLessons.some(l => l.id === lesson.id + 1);
  
  return (
    <div className="min-h-screen bg-background typing-active">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-text transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            
            <div className="text-center">
              <h1 className="text-base sm:text-lg lg:text-xl font-display font-bold text-text">
                Lesson {lesson.id}: {lesson.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">{lesson.subtitle}</p>
            </div>
            
            <button
              onClick={handleRetry}
              className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-text transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restart
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4 lg:py-8">
        {/* Info Lesson */}
        {lesson.type === 'info' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="text-center mb-8">
              <span className="text-6xl">📖</span>
            </div>
            <div className="space-y-4 text-lg text-center text-gray-700">
              {lesson.texts.map((text: string, index: number) => (
                <p key={index}>{text}</p>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button onClick={handleNext} size="lg">
                {hasNextLesson ? 'Continue to Next Lesson →' : 'Back to Home'}
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Typing Lesson */}
        {lesson.type !== 'info' && (
          <>
            {/* Initial Start Typing banner - shows before user starts */}
            <AnimatePresence>
              {!isStarted && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="fixed left-0 top-24 sm:top-28 z-20"
                >
                  <div className="bg-primary-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-r-xl shadow-lg">
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wide">Start</div>
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wide">Typing</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Text Display with idle indicator */}
            <div className="mb-4 sm:mb-6 lg:mb-8 relative">
              {/* Idle indicator - positioned above current character */}
              <AnimatePresence>
                {isStarted && isIdle && currentKey && currentCharPosition && (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="absolute z-10 pointer-events-none"
                    style={{
                      left: `${currentCharPosition.x - 20}px`,
                      top: `${currentCharPosition.y - 45}px`,
                    }}
                  >
                    <div className="relative">
                      <div className="bg-primary-500 text-white px-3 py-1.5 rounded-sm shadow-lg flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                        <span>Start Typing</span>
                        <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">
                          {currentKey === ' ' ? '␣' : currentKey}
                        </span>
                      </div>
                      {/* Arrow pointing down to the character */}
                      <div className="absolute left-[20px] -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary-500" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <TextDisplay
                text={currentText}
                currentIndex={currentIndex}
                errors={errors}
                onCurrentCharPosition={setCurrentCharPosition}
              />
            </div>
            
            {/* Keyboard with side stats */}
            {settings.showKeyboard && (
              <div className="flex items-start justify-center gap-4 lg:gap-6">
                {/* Keyboard */}
                <div className="flex-shrink-0">
                  <Keyboard
                    highlightKey={currentKey}
                    showFingerColors={true}
                  />
                </div>
                
                {/* Side Stats */}
                <div className="hidden sm:flex flex-col gap-3 min-w-[80px] lg:min-w-[100px]">
                  <div className="bg-white rounded-lg p-2 lg:p-3 shadow-sm border border-gray-100 text-center">
                    <div className="text-xs text-gray-500">Speed</div>
                    <div className="text-lg lg:text-xl font-bold text-primary-600">{wpm}<span className="text-xs text-gray-400 ml-0.5">WPM</span></div>
                  </div>
                  <div className="bg-white rounded-lg p-2 lg:p-3 shadow-sm border border-gray-100 text-center">
                    <div className="text-xs text-gray-500">Accuracy</div>
                    <div className={`text-lg lg:text-xl font-bold ${accuracy >= 90 ? 'text-success' : accuracy >= 70 ? 'text-secondary-600' : 'text-error'}`}>
                      {accuracy}%
                    </div>
                  </div>
                  {streak >= 3 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white rounded-lg p-2 lg:p-3 shadow-sm border border-gray-100 text-center"
                    >
                      <div className="text-xs text-gray-500">Streak</div>
                      <div className="text-lg lg:text-xl font-bold text-secondary-600">{streak} 🔥</div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
            
            {/* Mobile Stats - only show on small screens */}
            <div className="sm:hidden mt-3 flex justify-center gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500">Speed</div>
                <div className="text-base font-bold text-primary-600">{wpm} WPM</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Accuracy</div>
                <div className={`text-base font-bold ${accuracy >= 90 ? 'text-success' : 'text-error'}`}>{accuracy}%</div>
              </div>
            </div>
            
            {/* Hand Guides */}
            {settings.showHands && (
              <div className="flex justify-center gap-6 sm:gap-8 lg:gap-12 mt-4">
                <HandGuide hand="left" activeKey={currentKey} />
                <HandGuide hand="right" activeKey={currentKey} />
              </div>
            )}
          </>
        )}
      </main>
      
      {/* Completion Modal */}
      <Modal
        isOpen={showComplete}
        onClose={() => setShowComplete(false)}
        showCloseButton={false}
      >
        <LessonComplete
          stars={completionStats.stars}
          wpm={completionStats.wpm}
          accuracy={completionStats.accuracy}
          timeSpent={completionStats.timeSpent}
          points={completionStats.points}
          onRetry={handleRetry}
          onNext={handleNext}
          hasNext={hasNextLesson}
        />
      </Modal>
    </div>
  );
}
