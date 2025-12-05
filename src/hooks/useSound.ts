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

// Generate a realistic typewriter click-clack sound
function playTypewriterClick(volume: number) {
  try {
    const ctx = getAudioContext();
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const now = ctx.currentTime;
    
    // === CLICK (key strike) ===
    // Short burst of filtered noise for the initial "click"
    const clickDuration = 0.015;
    const clickBuffer = ctx.createBuffer(1, ctx.sampleRate * clickDuration, ctx.sampleRate);
    const clickData = clickBuffer.getChannelData(0);
    
    for (let i = 0; i < clickData.length; i++) {
      const t = i / clickData.length;
      // Sharp attack, quick decay
      const envelope = Math.exp(-t * 30);
      clickData[i] = (Math.random() * 2 - 1) * envelope;
    }
    
    const clickSource = ctx.createBufferSource();
    clickSource.buffer = clickBuffer;
    
    // Highpass filter for sharp "click"
    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = 'highpass';
    clickFilter.frequency.value = 1500;
    clickFilter.Q.value = 2;
    
    const clickGain = ctx.createGain();
    clickGain.gain.value = volume * 1.2;
    
    clickSource.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(ctx.destination);
    
    clickSource.start(now);
    clickSource.stop(now + clickDuration);
    
    // === CLACK (key return / bottom out) ===
    // Slightly lower, more resonant sound
    const clackDelay = 0.025; // Small delay after click
    const clackDuration = 0.025;
    const clackBuffer = ctx.createBuffer(1, ctx.sampleRate * clackDuration, ctx.sampleRate);
    const clackData = clackBuffer.getChannelData(0);
    
    for (let i = 0; i < clackData.length; i++) {
      const t = i / clackData.length;
      // Slightly softer envelope for the "clack"
      const envelope = Math.exp(-t * 20);
      clackData[i] = (Math.random() * 2 - 1) * envelope;
    }
    
    const clackSource = ctx.createBufferSource();
    clackSource.buffer = clackBuffer;
    
    // Lower bandpass for more "thunky" clack
    const clackFilter = ctx.createBiquadFilter();
    clackFilter.type = 'bandpass';
    clackFilter.frequency.value = 800;
    clackFilter.Q.value = 3;
    
    const clackGain = ctx.createGain();
    clackGain.gain.value = volume * 0.7;
    
    clackSource.connect(clackFilter);
    clackFilter.connect(clackGain);
    clackGain.connect(ctx.destination);
    
    clackSource.start(now + clackDelay);
    clackSource.stop(now + clackDelay + clackDuration);
    
    // === Optional: Add a subtle resonant "ping" for metallic feel ===
    const pingOsc = ctx.createOscillator();
    pingOsc.type = 'sine';
    pingOsc.frequency.value = 4000 + Math.random() * 500; // Slight variation
    
    const pingGain = ctx.createGain();
    pingGain.gain.setValueAtTime(volume * 0.15, now);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
    
    pingOsc.connect(pingGain);
    pingGain.connect(ctx.destination);
    
    pingOsc.start(now);
    pingOsc.stop(now + 0.02);
    
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
