import { memo } from 'react';
import { motion } from 'framer-motion';
import { getFingerForKey, fingerColors } from '../../data/keyMappings';
import { Finger } from '../../types';

interface HandGuideProps {
  activeKey?: string;
  hand: 'left' | 'right';
}

const fingerNames: Record<Finger, string> = {
  leftPinky: 'Pinky',
  leftRing: 'Ring',
  leftMiddle: 'Middle',
  leftIndex: 'Index',
  leftThumb: 'Thumb',
  rightThumb: 'Thumb',
  rightIndex: 'Index',
  rightMiddle: 'Middle',
  rightRing: 'Ring',
  rightPinky: 'Pinky',
};

const leftFingers: Finger[] = ['leftPinky', 'leftRing', 'leftMiddle', 'leftIndex', 'leftThumb'];
const rightFingers: Finger[] = ['rightThumb', 'rightIndex', 'rightMiddle', 'rightRing', 'rightPinky'];

function HandGuide({ activeKey, hand }: HandGuideProps) {
  const activeFinger = activeKey ? getFingerForKey(activeKey) : undefined;
  const fingers = hand === 'left' ? leftFingers : rightFingers;
  const isActiveHand = activeFinger?.startsWith(hand);
  
  // Finger positions for SVG rendering (approximate)
  const fingerPositions = hand === 'left' 
    ? [
        { x: 15, y: 40, height: 35 },   // Pinky
        { x: 30, y: 25, height: 45 },   // Ring
        { x: 47, y: 20, height: 50 },   // Middle
        { x: 64, y: 28, height: 42 },   // Index
        { x: 78, y: 60, height: 25 },   // Thumb
      ]
    : [
        { x: 22, y: 60, height: 25 },   // Thumb
        { x: 36, y: 28, height: 42 },   // Index
        { x: 53, y: 20, height: 50 },   // Middle
        { x: 70, y: 25, height: 45 },   // Ring
        { x: 85, y: 40, height: 35 },   // Pinky
      ];
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-medium text-gray-600 mb-2">
        {hand === 'left' ? 'Left Hand' : 'Right Hand'}
      </div>
      
      <svg 
        viewBox="0 0 100 100" 
        className="w-32 h-32"
      >
        {/* Palm */}
        <ellipse
          cx="50"
          cy="75"
          rx="35"
          ry="20"
          fill="#fde8d8"
          stroke="#d4a574"
          strokeWidth="1"
        />
        
        {/* Fingers */}
        {fingers.map((finger, index) => {
          const pos = fingerPositions[index];
          const isActive = activeFinger === finger;
          const color = fingerColors[finger];
          
          return (
            <motion.g key={finger}>
              {/* Finger shape */}
              <motion.rect
                x={pos.x - 6}
                y={pos.y}
                width={12}
                height={pos.height}
                rx={6}
                fill={isActive ? color : '#fde8d8'}
                stroke={isActive ? color : '#d4a574'}
                strokeWidth={isActive ? 2 : 1}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
              
              {/* Active indicator */}
              {isActive && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y + 10}
                  r={4}
                  fill="white"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                />
              )}
            </motion.g>
          );
        })}
      </svg>
      
      {/* Active finger label */}
      {isActiveHand && activeFinger && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium mt-1 px-3 py-1 rounded-full"
          style={{ backgroundColor: fingerColors[activeFinger], color: 'white' }}
        >
          {fingerNames[activeFinger]}
        </motion.div>
      )}
    </div>
  );
}

export default memo(HandGuide);
