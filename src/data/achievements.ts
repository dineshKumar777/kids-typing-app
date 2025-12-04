import { Badge } from '../types';

export const badges: Badge[] = [
  // Completion badges
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first typing lesson',
    icon: '👶',
    requirement: { type: 'lessons_completed', count: 1 },
  },
  {
    id: 'home_row_hero',
    name: 'Home Row Hero',
    description: 'Complete all home row lessons',
    icon: '🏠',
    requirement: { type: 'lessons_completed', count: 23, section: 'homeRow' },
  },
  {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: '📚',
    requirement: { type: 'lessons_completed', count: 10 },
  },
  
  // Accuracy badges
  {
    id: 'accuracy_ace',
    name: 'Accuracy Ace',
    description: 'Get 100% accuracy on 5 lessons',
    icon: '🎯',
    requirement: { type: 'accuracy', value: 100, count: 5 },
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 95%+ accuracy on 10 lessons',
    icon: '✨',
    requirement: { type: 'accuracy', value: 95, count: 10 },
  },
  
  // Speed badges
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Achieve 20 WPM',
    icon: '⚡',
    requirement: { type: 'wpm', value: 20 },
  },
  {
    id: 'lightning_fast',
    name: 'Lightning Fast',
    description: 'Achieve 30 WPM',
    icon: '🚀',
    requirement: { type: 'wpm', value: 30 },
  },
  
  // Streak badges
  {
    id: 'streak_starter',
    name: 'Streak Starter',
    description: 'Get 25 correct keys in a row',
    icon: '🔥',
    requirement: { type: 'streak', count: 25 },
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Get 50 correct keys in a row',
    icon: '💫',
    requirement: { type: 'streak', count: 50 },
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Get 100 correct keys in a row',
    icon: '🌟',
    requirement: { type: 'streak', count: 100 },
  },
  
  // Points badges
  {
    id: 'point_collector',
    name: 'Point Collector',
    description: 'Earn 5,000 points',
    icon: '🪙',
    requirement: { type: 'points', value: 5000 },
  },
  {
    id: 'point_hoarder',
    name: 'Point Hoarder',
    description: 'Earn 25,000 points',
    icon: '💰',
    requirement: { type: 'points', value: 25000 },
  },
  
  // Star badges
  {
    id: 'star_collector',
    name: 'Star Collector',
    description: 'Collect 25 stars',
    icon: '⭐',
    requirement: { type: 'stars', count: 25 },
  },
  {
    id: 'superstar',
    name: 'Superstar',
    description: 'Collect 50 stars',
    icon: '🌠',
    requirement: { type: 'stars', count: 50 },
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return badges.find(badge => badge.id === id);
}
