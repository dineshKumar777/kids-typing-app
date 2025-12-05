import { motion } from 'framer-motion';
import { UserStats } from '../../types';
import { ProgressRing } from '../common';

interface StatsOverviewProps {
  stats: UserStats;
  totalLessons: number;
}

export default function StatsOverview({ stats, totalLessons }: StatsOverviewProps) {
  const progressPercentage = Math.round((stats.lessonsCompleted / totalLessons) * 100);
  
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {/* Progress */}
        <div className="flex items-center gap-4">
          <ProgressRing progress={progressPercentage} size={70} />
          <div>
            <div className="text-sm text-gray-500">Progress</div>
            <div className="text-lg font-bold text-text">
              {stats.lessonsCompleted} / {totalLessons} lessons
            </div>
          </div>
        </div>
        
        {/* Stars */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">⭐</div>
          <div>
            <div className="text-sm text-gray-500">Stars</div>
            <div className="text-xl font-bold text-text">{stats.totalStars}</div>
          </div>
        </div>
        
        {/* Points */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">🏆</div>
          <div>
            <div className="text-sm text-gray-500">Points</div>
            <div className="text-xl font-bold text-text">{stats.totalPoints.toLocaleString()}</div>
          </div>
        </div>
        
        {/* Average WPM */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">⚡</div>
          <div>
            <div className="text-sm text-gray-500">Avg WPM</div>
            <div className="text-xl font-bold text-text">{stats.averageWPM || '-'}</div>
          </div>
        </div>
        
        {/* Time Spent */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">⏱️</div>
          <div>
            <div className="text-sm text-gray-500">Time</div>
            <div className="text-xl font-bold text-text">
              {stats.totalTimeSpent > 0 ? formatTime(stats.totalTimeSpent) : '-'}
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎖️</div>
          <div>
            <div className="text-sm text-gray-500">Badges</div>
            <div className="text-xl font-bold text-text">{stats.badges.length}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
