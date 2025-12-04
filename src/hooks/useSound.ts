import { useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';

// Sound effects URLs (using simple base64 encoded sounds for small file size)
// In production, these would be actual audio files
const SOUNDS = {
  keyPress: 'data:audio/wav;base64,UklGRl9vT19teleGF2ZWZtdCAQAAAAABAAEARAAEACAAIAAgAEAA',
  correct: 'data:audio/wav;base64,UklGRl9vT19teleGF2ZWZtdCAQAAAAABAAEARAAEACAAIAAgAEAA',
  error: 'data:audio/wav;base64,UklGRl9vT19teleGF2ZWZtdCAQAAAAABAAEARAAEACAAIAAgAEAA',
  complete: 'data:audio/wav;base64,UklGRl9vT19teleGF2ZWZtdCAQAAAAABAAEARAAEACAAIAAgAEAA',
  star: 'data:audio/wav;base64,UklGRl9vT19teleGF2ZWZtdCAQAAAAABAAEARAAEACAAIAAgAEAA',
};

type SoundName = keyof typeof SOUNDS;

interface UseSoundOptions {
  enabled?: boolean;
  volume?: number;
}

interface UseSoundReturn {
  playSound: (name: SoundName) => void;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
}

export function useSound({ enabled = true, volume = 0.5 }: UseSoundOptions = {}): UseSoundReturn {
  const soundsRef = useRef<Map<SoundName, Howl>>(new Map());
  const enabledRef = useRef(enabled);
  const volumeRef = useRef(volume);
  
  // Initialize sounds
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([name, src]) => {
      const howl = new Howl({
        src: [src],
        volume: volumeRef.current,
        preload: true,
      });
      soundsRef.current.set(name as SoundName, howl);
    });
    
    return () => {
      soundsRef.current.forEach(howl => howl.unload());
      soundsRef.current.clear();
    };
  }, []);
  
  // Update enabled state
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);
  
  // Update volume
  useEffect(() => {
    volumeRef.current = volume;
    soundsRef.current.forEach(howl => howl.volume(volume));
  }, [volume]);
  
  const playSound = useCallback((name: SoundName) => {
    if (!enabledRef.current) return;
    
    const howl = soundsRef.current.get(name);
    if (howl) {
      howl.play();
    }
  }, []);
  
  const setEnabled = useCallback((newEnabled: boolean) => {
    enabledRef.current = newEnabled;
  }, []);
  
  const setVolume = useCallback((newVolume: number) => {
    volumeRef.current = newVolume;
    soundsRef.current.forEach(howl => howl.volume(newVolume));
  }, []);
  
  return {
    playSound,
    setEnabled,
    setVolume,
  };
}
