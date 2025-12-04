import { motion } from 'framer-motion';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
}

export default function StarRating({ 
  stars, 
  maxStars = 5, 
  size = 'md',
  showAnimation = false 
}: StarRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < stars;
        
        return (
          <motion.svg
            key={index}
            initial={showAnimation ? { scale: 0, rotate: -180 } : false}
            animate={showAnimation ? { scale: 1, rotate: 0 } : false}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
            className={`${sizes[size]} ${isFilled ? 'text-secondary-500' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        );
      })}
    </div>
  );
}
