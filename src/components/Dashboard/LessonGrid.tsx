import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lesson, LessonProgress } from '../../types';
import { isLessonUnlocked } from '../../store/lessonStore';
import LessonCard from './LessonCard';

interface LessonGridProps {
  lessons: Lesson[];
  progress: Record<number, LessonProgress>;
  sectionTitle: string;
  sectionIcon?: string;
}

export default function LessonGrid({ lessons, progress, sectionTitle, sectionIcon = '🏠' }: LessonGridProps) {
  const navigate = useNavigate();
  
  const handleLessonClick = (lesson: Lesson) => {
    const isUnlocked = isLessonUnlocked(lesson.id, progress);
    if (isUnlocked) {
      navigate(`/lesson/${lesson.id}`);
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{sectionIcon}</span>
        <h2 className="text-2xl font-display font-bold text-text">{sectionTitle}</h2>
      </div>
      
      {/* Lesson Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
      >
        {lessons.map((lesson) => {
          const lessonProgress = progress[lesson.id];
          const isLocked = !isLessonUnlocked(lesson.id, progress);
          
          return (
            <motion.div key={lesson.id} variants={item}>
              <LessonCard
                lesson={lesson}
                progress={lessonProgress}
                isLocked={isLocked}
                onClick={() => handleLessonClick(lesson)}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
