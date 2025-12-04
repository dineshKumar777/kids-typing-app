import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonById, allLessons } from '../data/lessons/homeRow';
import { useLessonStore, useUserStore } from '../store/lessonStore';
import { useSettingsStore } from '../store/settingsStore';
import { useTyping, useKeyboardInput } from '../hooks';
import { Keyboard, TextDisplay, HandGuide, TypingStats, LessonComplete } from '../components/Typing';
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
  
  // Get current text
  const currentText = lesson?.texts[currentTextIndex] || '';
  
  // Typing hook
  const {
    currentIndex,
    errors,
    isComplete,
    isStarted,
    wpm,
    accuracy,
    streak,
    timeElapsed,
    currentKey,
    handleKeyPress,
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
    onKeyPress: handleKeyPress,
    enabled: !showComplete && !!lesson,
    allowedKeys: lesson?.keys,
  });
  
  // Handle retry
  const handleRetry = useCallback(() => {
    setShowComplete(false);
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
    } else {
      navigate('/');
    }
  }, [lesson, navigate]);
  
  // Handle next text in lesson
  const handleNextText = useCallback(() => {
    if (lesson && currentTextIndex < lesson.texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      resetTyping();
    }
  }, [lesson, currentTextIndex, resetTyping]);
  
  // Reset when lesson changes
  useEffect(() => {
    resetTyping();
    setCurrentTextIndex(0);
    setShowComplete(false);
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
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-500 hover:text-text transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            
            <div className="text-center">
              <h1 className="text-xl font-display font-bold text-text">
                Lesson {lesson.id}: {lesson.title}
              </h1>
              <p className="text-sm text-gray-500">{lesson.subtitle}</p>
            </div>
            
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 text-gray-500 hover:text-text transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Restart
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
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
              {lesson.texts.map((text, index) => (
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
            {/* Start Prompt */}
            <AnimatePresence>
              {!isStarted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-primary-500 text-white rounded-xl p-6 mb-6 text-center"
                >
                  <div className="text-xl font-display font-bold mb-2">
                    🎯 Ready to Type!
                  </div>
                  <p className="text-primary-100">
                    Focus on the keys: <span className="font-mono font-bold">{lesson.keys.join(' ')}</span>
                  </p>
                  <p className="text-sm text-primary-200 mt-2">
                    Start typing when you're ready...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Text Display */}
            <div className="mb-6">
              <TextDisplay
                text={currentText}
                currentIndex={currentIndex}
                errors={errors}
              />
            </div>
            
            {/* Stats */}
            <div className="mb-6">
              <TypingStats
                wpm={wpm}
                accuracy={accuracy}
                streak={streak}
                timeElapsed={timeElapsed}
                isActive={isStarted && !isComplete}
              />
            </div>
            
            {/* Keyboard */}
            {settings.showKeyboard && (
              <div className="mb-6">
                <Keyboard
                  highlightKey={currentKey}
                  showFingerColors={true}
                />
              </div>
            )}
            
            {/* Hand Guides */}
            {settings.showHands && (
              <div className="flex justify-center gap-12">
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
