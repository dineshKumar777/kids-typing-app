import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { keyboardLayout, fingerColors, keyMap } from '../../data/keyMappings';
import { KeyInfo } from '../../types';

interface KeyboardProps {
  highlightKey?: string;
  pressedKey?: string;
  isError?: boolean;
  showFingerColors?: boolean;
}

interface KeyProps {
  keyInfo: KeyInfo;
  isHighlighted: boolean;
  isPressed: boolean;
  isError: boolean;
  showFingerColors: boolean;
  baseSize: number;
}

const Key = memo(function Key({ keyInfo, isHighlighted, isPressed, isError, showFingerColors, baseSize }: KeyProps) {
  const width = (keyInfo.width || 1) * baseSize + (keyInfo.width ? (keyInfo.width - 1) * 4 : 0);
  
  const displayText = keyInfo.displayKey || keyInfo.key.toUpperCase();
  const fingerColor = showFingerColors ? fingerColors[keyInfo.finger] : undefined;
  
  return (
    <motion.div
      animate={
        isError
          ? { x: [-2, 2, -2, 2, 0], backgroundColor: '#FF6B6B' }
          : isPressed
          ? { scale: 0.95, backgroundColor: '#7CB342' }
          : isHighlighted
          ? { scale: 1.05 }
          : { scale: 1 }
      }
      transition={{ duration: 0.1 }}
      className={`
        relative flex items-center justify-center
        rounded-lg font-mono text-sm font-medium
        border-2 border-b-4 transition-all duration-100
        ${isHighlighted 
          ? 'bg-primary-400 border-primary-500 text-white shadow-lg' 
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        }
        ${keyInfo.isHomeKey ? 'ring-2 ring-secondary-300 ring-inset' : ''}
      `}
      style={{
        width: `${width}px`,
        height: `${baseSize}px`,
        backgroundColor: isError ? '#FF6B6B' : isPressed ? '#7CB342' : isHighlighted ? '#4ECDC4' : undefined,
      }}
    >
      {/* Finger color indicator */}
      {showFingerColors && !isHighlighted && (
        <div 
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full opacity-50"
          style={{ backgroundColor: fingerColor }}
        />
      )}
      
      {/* Key text */}
      <span className={`${displayText.length > 2 ? 'text-xs' : 'text-sm'}`}>
        {displayText}
      </span>
      
      {/* Home key bump indicator for F and J */}
      {(keyInfo.key === 'f' || keyInfo.key === 'j') && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-gray-400 rounded" />
      )}
    </motion.div>
  );
});

function Keyboard({ highlightKey, pressedKey, isError = false, showFingerColors = true }: KeyboardProps) {
  const normalizedHighlight = highlightKey?.toLowerCase();
  const normalizedPressed = pressedKey?.toLowerCase();
  
  // Responsive base size for keys
  const getBaseSize = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 24; // mobile
      if (window.innerWidth < 768) return 28; // small tablet
      if (window.innerWidth < 1024) return 32; // iPad
    }
    return 44; // desktop
  };
  
  const [baseSize, setBaseSize] = React.useState(getBaseSize);
  
  React.useEffect(() => {
    const handleResize = () => setBaseSize(getBaseSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="bg-gray-100 rounded-2xl p-2 sm:p-3 lg:p-4 shadow-inner">
      <div className="flex flex-col gap-0.5 sm:gap-1 items-center">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0.5 sm:gap-1">
            {row.map((keyInfo) => {
              const keyLower = keyInfo.key.toLowerCase();
              const isHighlighted = normalizedHighlight === keyLower || 
                (normalizedHighlight === ' ' && keyInfo.key === ' ');
              const isPressed = normalizedPressed === keyLower ||
                (normalizedPressed === ' ' && keyInfo.key === ' ');
              
              return (
                <Key
                  key={keyInfo.key}
                  keyInfo={keyInfo}
                  isHighlighted={isHighlighted}
                  isPressed={isPressed}
                  isError={isError && isHighlighted}
                  showFingerColors={showFingerColors}
                  baseSize={baseSize}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Keyboard);

// Export key lookup for other components
export { keyMap };
