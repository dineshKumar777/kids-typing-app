import { useEffect, useCallback, useRef } from 'react';

interface UseKeyboardInputOptions {
  onKeyPress: (key: string) => void;
  enabled?: boolean;
  allowedKeys?: string[];
}

export function useKeyboardInput({ 
  onKeyPress, 
  enabled = true,
  allowedKeys 
}: UseKeyboardInputOptions) {
  const onKeyPressRef = useRef(onKeyPress);
  
  // Keep callback ref updated
  useEffect(() => {
    onKeyPressRef.current = onKeyPress;
  }, [onKeyPress]);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore if not enabled
    if (!enabled) return;
    
    // Ignore modifier keys alone
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].includes(event.key)) {
      return;
    }
    
    // Prevent default for space to avoid page scrolling
    if (event.key === ' ') {
      event.preventDefault();
    }
    
    // Get the actual character
    let key = event.key;
    
    // Handle special cases
    if (key === 'Enter') {
      key = '\n';
    }
    
    // Filter by allowed keys if specified
    if (allowedKeys && !allowedKeys.includes(key.toLowerCase()) && key !== ' ') {
      return;
    }
    
    // Call the handler with minimal delay
    onKeyPressRef.current(key);
  }, [enabled, allowedKeys]);
  
  useEffect(() => {
    // Use capture phase for faster response
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [handleKeyDown]);
}
