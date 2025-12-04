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

const lessonTypeColors: Record<Lesson['type'], string> = {
  learn: 'bg-blue-100 border-blue-300',
  review: 'bg-purple-100 border-purple-300',
  practice: 'bg-orange-100 border-orange-300',
  game: 'bg-green-100 border-green-300',
  info: 'bg-gray-100 border-gray-300',
  focus: 'bg-pink-100 border-pink-300',
};

export default function LessonCard({ lesson, progress, isLocked, onClick }: LessonCardProps) {
  const isCompleted = progress?.completed ?? false;
  const stars = progress?.stars ?? 0;
  
  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      whileHover={!isLocked ? { scale: 1.05, y: -4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`
        relative w-full aspect-square rounded-xl border-2 p-3
        flex flex-col items-center justify-between
        transition-all duration-200
        ${isLocked 
          ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-60' 
          : lessonTypeColors[lesson.type] + ' cursor-pointer hover:shadow-lg'
        }
        ${isCompleted ? 'ring-2 ring-success ring-offset-2' : ''}
      `}
    >
      {/* Lesson Number */}
      <div className="absolute top-2 left-2 text-lg font-bold text-text/70">
        {lesson.id}
      </div>
      
      {/* Lock Icon */}
      {isLocked && (
        <div className="absolute top-2 right-2">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Completed Checkmark */}
      {isCompleted && !isLocked && (
        <div className="absolute top-2 right-2">
          <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Icon or Keys Display */}
      <div className="flex-1 flex items-center justify-center">
        {lesson.type === 'info' || !lesson.newKeys?.length ? (
          <span className="text-3xl">{lessonTypeIcons[lesson.type]}</span>
        ) : (
          <div className="text-2xl font-mono font-bold text-text">
            {lesson.newKeys.join('')}
          </div>
        )}
      </div>
      
      {/* Stars or Icon indicator */}
      <div className="w-full">
        {isCompleted ? (
          <StarRating stars={stars} size="sm" />
        ) : (
          <span className="text-lg">{lessonTypeIcons[lesson.type]}</span>
        )}
      </div>
      
      {/* Title */}
      <div className="text-xs font-medium text-text/80 truncate w-full text-center mt-1">
        {lesson.subtitle}
      </div>
    </motion.button>
  );
}
