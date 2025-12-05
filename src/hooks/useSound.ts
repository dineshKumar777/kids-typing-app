import { useCallback, useRef, useEffect } from 'react';

export type SoundName = 'keyPress' | 'correct' | 'error' | 'complete' | 'star';

interface UseSoundOptions {
  enabled?: boolean;
  volume?: number;
}

interface UseSoundReturn {
  playSound: (name: SoundName) => void;
  playKeySound: () => void;
  speakKey: (key: string) => void;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
}

// Create audio context lazily to avoid issues with autoplay policies
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

// Generate a typewriter click sound using noise
function playTypewriterClick(volume: number) {
  try {
    const ctx = getAudioContext();
    
    // Resume context if suspended (needed for some browsers)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const now = ctx.currentTime;
    const duration = 0.06; // Short click duration
    
    // Create noise buffer for the click
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill with noise that decays quickly (typewriter sound)
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (bufferSize * 0.1)); // Fast exponential decay
      data[i] = (Math.random() * 2 - 1) * decay;
    }
    
    // Create buffer source
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Create a bandpass filter for more realistic typewriter sound
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 2000; // Center frequency
    bandpass.Q.value = 1.5; // Narrower band for more "clicky" sound
    
    // Create highpass to remove low rumble
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 500;
    
    // Gain node for volume control
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(volume * 0.8, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    // Connect: noise -> highpass -> bandpass -> gain -> output
    noiseSource.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noiseSource.start(now);
    noiseSource.stop(now + duration);
  } catch {
    // Audio not supported, fail silently
  }
}

// Generate a simple beep sound for other effects
function playBeep(frequency: number, duration: number, volume: number, type: OscillatorType = 'sine') {
  try {
    const ctx = getAudioContext();
    
    // Resume context if suspended (needed for some browsers)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    // Attack and decay for a nicer sound
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  } catch {
    // Audio not supported, fail silently
  }
}

// Sound configurations
const SOUND_CONFIG = {
  keyPress: { frequency: 800, duration: 0.05, type: 'square' as OscillatorType },
  correct: { frequency: 880, duration: 0.08, type: 'sine' as OscillatorType },
  error: { frequency: 200, duration: 0.15, type: 'sawtooth' as OscillatorType },
  complete: { frequency: 523, duration: 0.3, type: 'sine' as OscillatorType },
  star: { frequency: 1047, duration: 0.2, type: 'sine' as OscillatorType },
};

export function useSound({ enabled = true, volume = 0.3 }: UseSoundOptions = {}): UseSoundReturn {
  const enabledRef = useRef(enabled);
  const volumeRef = useRef(volume);
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);
  
  // Update enabled state
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);
  
  // Update volume
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  
  const playSound = useCallback((name: SoundName) => {
    if (!enabledRef.current) return;
    
    const config = SOUND_CONFIG[name];
    if (config) {
      playBeep(config.frequency, config.duration, volumeRef.current, config.type);
    }
  }, []);
  
  // Typewriter click sound for key presses
  const playKeySound = useCallback(() => {
    if (!enabledRef.current) return;
    playTypewriterClick(volumeRef.current);
  }, []);
  
  // Speak a key using speech synthesis
  const speakKey = useCallback((key: string) => {
    if (!speechSynthRef.current) return;
    
    // Cancel any ongoing speech
    speechSynthRef.current.cancel();
    
    // Map special keys to spoken words
    let textToSpeak = key;
    if (key === ' ') textToSpeak = 'space';
    else if (key === '.') textToSpeak = 'period';
    else if (key === ',') textToSpeak = 'comma';
    else if (key === ';') textToSpeak = 'semicolon';
    else if (key === "'") textToSpeak = 'apostrophe';
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.2;
    utterance.pitch = 1.1;
    utterance.volume = volumeRef.current;
    
    speechSynthRef.current.speak(utterance);
  }, []);
  
  const setEnabled = useCallback((newEnabled: boolean) => {
    enabledRef.current = newEnabled;
  }, []);
  
  const setVolume = useCallback((newVolume: number) => {
    volumeRef.current = newVolume;
  }, []);
  
  return {
    playSound,
    playKeySound,
    speakKey,
    setEnabled,
    setVolume,
  };
}
