import { motion } from 'framer-motion';
import { Lesson, LessonProgress } from '../../types';
import { StarRating } from '../common';

interface LessonCardProps {
  lesson: Lesson;
  progress?: LessonProgress;
  isLocked: boolean;
  onClick: () => void;
}

const lessonTypeIcons: Record<Lesson['type'], string> = {
  learn: '📦',
  review: '🔍',
  practice: '⏱️',
  game: '🎮',
  info: '📖',
  focus: '✋',
};

const lessonTypeColors: Record<Lesson['type'], { bg: string; border: string; accent: string }> = {
  learn: { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-500' },
  review: { bg: 'bg-purple-50', border: 'border-purple-200', accent: 'bg-purple-500' },
  practice: { bg: 'bg-orange-50', border: 'border-orange-200', accent: 'bg-orange-500' },
  game: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'bg-emerald-500' },
  info: { bg: 'bg-slate-50', border: 'border-slate-200', accent: 'bg-slate-500' },
  focus: { bg: 'bg-pink-50', border: 'border-pink-200', accent: 'bg-pink-500' },
};

export default function LessonCard({ lesson, progress, isLocked, onClick }: LessonCardProps) {
  const isCompleted = progress?.completed ?? false;
  const stars = progress?.stars ?? 0;
  const isFullyCompleted = isCompleted && stars >= 3;
  const needsRetry = isCompleted && stars < 3;
  const colors = lessonTypeColors[lesson.type];
  
  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      whileHover={!isLocked ? { scale: 1.03, y: -2 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`
        relative w-full rounded-2xl overflow-hidden
        flex flex-col
        transition-all duration-200 shadow-sm
        ${isLocked 
          ? 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-50' 
          : `${colors.bg} border-2 ${colors.border} cursor-pointer hover:shadow-md`
        }
        ${isFullyCompleted ? 'ring-2 ring-green-400 ring-offset-2' : ''}
        ${needsRetry ? 'ring-2 ring-amber-400 ring-offset-2' : ''}
      `}
    >
      {/* Top Section - Main Content */}
      <div className="flex-1 p-3 pb-2 flex flex-col items-center justify-center min-h-[100px]">
        {/* Lesson Number Badge */}
        <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${isLocked ? 'bg-gray-400' : colors.accent}`}>
          {lesson.id}
        </div>
        
        {/* Status Icon - Top Right */}
        <div className="absolute top-2 right-2">
          {isLocked && (
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {isFullyCompleted && (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {needsRetry && (
            <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-sm" title="Get 3 stars to unlock next!">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Main Icon or Keys */}
        <div className="mt-2">
          {lesson.type === 'info' || !lesson.newKeys?.length ? (
            <span className="text-4xl">{lessonTypeIcons[lesson.type]}</span>
          ) : (
            <div className="text-3xl font-mono font-bold text-gray-700 tracking-wider">
              {lesson.newKeys.join('')}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Section - Title & Stars */}
      <div className="bg-white/80 backdrop-blur-sm px-3 py-2 border-t border-gray-100">
        {/* Stars Row */}
        {isCompleted && (
          <div className="flex justify-center mb-1">
            <StarRating stars={stars} size="sm" />
          </div>
        )}
        {!isCompleted && !isLocked && (
          <div className="flex justify-center mb-1">
            <span className="text-sm">{lessonTypeIcons[lesson.type]}</span>
          </div>
        )}
        
        {/* Title */}
        <div className="text-xs font-semibold text-gray-600 truncate text-center">
          {lesson.subtitle}
        </div>
      </div>
    </motion.button>
  );
}