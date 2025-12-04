import { KeyInfo, Finger } from '../types';

// Finger color mapping for visual feedback
export const fingerColors: Record<Finger, string> = {
  leftPinky: '#FF6B6B',    // Red
  leftRing: '#FFE66D',     // Yellow
  leftMiddle: '#7CB342',   // Green
  leftIndex: '#4ECDC4',    // Teal
  leftThumb: '#9E9E9E',    // Gray
  rightThumb: '#9E9E9E',   // Gray
  rightIndex: '#4ECDC4',   // Teal
  rightMiddle: '#7CB342',  // Green
  rightRing: '#FFE66D',    // Yellow
  rightPinky: '#FF6B6B',   // Red
};

// Complete keyboard layout with finger assignments
export const keyboardLayout: KeyInfo[][] = [
  // Number row
  [
    { key: '`', displayKey: '`', finger: 'leftPinky', row: 'number' },
    { key: '1', finger: 'leftPinky', row: 'number' },
    { key: '2', finger: 'leftRing', row: 'number' },
    { key: '3', finger: 'leftMiddle', row: 'number' },
    { key: '4', finger: 'leftIndex', row: 'number' },
    { key: '5', finger: 'leftIndex', row: 'number' },
    { key: '6', finger: 'rightIndex', row: 'number' },
    { key: '7', finger: 'rightIndex', row: 'number' },
    { key: '8', finger: 'rightMiddle', row: 'number' },
    { key: '9', finger: 'rightRing', row: 'number' },
    { key: '0', finger: 'rightPinky', row: 'number' },
    { key: '-', finger: 'rightPinky', row: 'number' },
    { key: '=', finger: 'rightPinky', row: 'number' },
    { key: 'Backspace', displayKey: '⌫', finger: 'rightPinky', row: 'number', width: 2 },
  ],
  // Top row
  [
    { key: 'Tab', displayKey: '⇥', finger: 'leftPinky', row: 'top', width: 1.5 },
    { key: 'q', finger: 'leftPinky', row: 'top' },
    { key: 'w', finger: 'leftRing', row: 'top' },
    { key: 'e', finger: 'leftMiddle', row: 'top' },
    { key: 'r', finger: 'leftIndex', row: 'top' },
    { key: 't', finger: 'leftIndex', row: 'top' },
    { key: 'y', finger: 'rightIndex', row: 'top' },
    { key: 'u', finger: 'rightIndex', row: 'top' },
    { key: 'i', finger: 'rightMiddle', row: 'top' },
    { key: 'o', finger: 'rightRing', row: 'top' },
    { key: 'p', finger: 'rightPinky', row: 'top' },
    { key: '[', finger: 'rightPinky', row: 'top' },
    { key: ']', finger: 'rightPinky', row: 'top' },
    { key: '\\', finger: 'rightPinky', row: 'top', width: 1.5 },
  ],
  // Home row
  [
    { key: 'CapsLock', displayKey: '⇪', finger: 'leftPinky', row: 'home', width: 1.75 },
    { key: 'a', finger: 'leftPinky', row: 'home', isHomeKey: true },
    { key: 's', finger: 'leftRing', row: 'home', isHomeKey: true },
    { key: 'd', finger: 'leftMiddle', row: 'home', isHomeKey: true },
    { key: 'f', finger: 'leftIndex', row: 'home', isHomeKey: true },
    { key: 'g', finger: 'leftIndex', row: 'home' },
    { key: 'h', finger: 'rightIndex', row: 'home' },
    { key: 'j', finger: 'rightIndex', row: 'home', isHomeKey: true },
    { key: 'k', finger: 'rightMiddle', row: 'home', isHomeKey: true },
    { key: 'l', finger: 'rightRing', row: 'home', isHomeKey: true },
    { key: ';', finger: 'rightPinky', row: 'home', isHomeKey: true },
    { key: "'", finger: 'rightPinky', row: 'home' },
    { key: 'Enter', displayKey: '⏎', finger: 'rightPinky', row: 'home', width: 2.25 },
  ],
  // Bottom row
  [
    { key: 'Shift', displayKey: '⇧', finger: 'leftPinky', row: 'bottom', width: 2.25 },
    { key: 'z', finger: 'leftPinky', row: 'bottom' },
    { key: 'x', finger: 'leftRing', row: 'bottom' },
    { key: 'c', finger: 'leftMiddle', row: 'bottom' },
    { key: 'v', finger: 'leftIndex', row: 'bottom' },
    { key: 'b', finger: 'leftIndex', row: 'bottom' },
    { key: 'n', finger: 'rightIndex', row: 'bottom' },
    { key: 'm', finger: 'rightIndex', row: 'bottom' },
    { key: ',', finger: 'rightMiddle', row: 'bottom' },
    { key: '.', finger: 'rightRing', row: 'bottom' },
    { key: '/', finger: 'rightPinky', row: 'bottom' },
    { key: 'ShiftRight', displayKey: '⇧', finger: 'rightPinky', row: 'bottom', width: 2.75 },
  ],
  // Space row
  [
    { key: 'Control', displayKey: '⌃', finger: 'leftPinky', row: 'space', width: 1.25 },
    { key: 'Alt', displayKey: '⌥', finger: 'leftThumb', row: 'space', width: 1.25 },
    { key: 'Meta', displayKey: '⌘', finger: 'leftThumb', row: 'space', width: 1.25 },
    { key: ' ', displayKey: 'space', finger: 'leftThumb', row: 'space', width: 6.25 },
    { key: 'MetaRight', displayKey: '⌘', finger: 'rightThumb', row: 'space', width: 1.25 },
    { key: 'AltRight', displayKey: '⌥', finger: 'rightThumb', row: 'space', width: 1.25 },
    { key: 'ControlRight', displayKey: '⌃', finger: 'rightPinky', row: 'space', width: 1.25 },
  ],
];

// Create a flat map for quick key lookup
export const keyMap: Map<string, KeyInfo> = new Map();
keyboardLayout.flat().forEach(keyInfo => {
  keyMap.set(keyInfo.key.toLowerCase(), keyInfo);
});

// Get finger for a specific key
export function getFingerForKey(key: string): Finger | undefined {
  const keyInfo = keyMap.get(key.toLowerCase());
  return keyInfo?.finger;
}

// Get all keys for a specific finger
export function getKeysForFinger(finger: Finger): string[] {
  return keyboardLayout.flat()
    .filter(k => k.finger === finger)
    .map(k => k.key);
}

// Home row keys
export const homeRowKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'];

// Home position keys (where fingers rest)
export const homePositionKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
