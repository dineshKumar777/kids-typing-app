import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/settingsStore';

const FONT_SIZES = [
  { value: 'small', label: 'Small', size: 'text-xs' },
  { value: 'normal', label: 'Normal', size: 'text-sm' },
  { value: 'large', label: 'Large', size: 'text-base' },
  { value: 'x-large', label: 'Very Large', size: 'text-lg' },
] as const;

export default function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { settings, updateSettings } = useSettingsStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle accessible mode toggle
  const handleAccessibleMode = (enabled: boolean) => {
    if (enabled) {
      // Enable accessible mode: big fonts, disable keyboard and hands
      updateSettings({
        accessibleMode: true,
        fontSize: 'x-large',
        showKeyboard: false,
        showHands: false,
      });
    } else {
      // Disable accessible mode: restore defaults
      updateSettings({
        accessibleMode: false,
        fontSize: 'normal',
        showKeyboard: true,
        showHands: true,
      });
    }
  };

  // Handle font size change
  const handleFontSize = (size: typeof settings.fontSize) => {
    // If changing font size manually, disable accessible mode
    updateSettings({
      fontSize: size,
      accessibleMode: size === 'x-large' && !settings.showKeyboard && !settings.showHands,
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-100"
        title="Settings"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
          >
            {/* Font Size Selection */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                {FONT_SIZES.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => handleFontSize(font.value)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-1 ${
                      settings.fontSize === font.value
                        ? 'bg-primary-100 text-primary-600'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className={`font-medium ${font.size}`}>A</span>
                    <span className="text-[10px] mt-0.5">{font.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2" />

            {/* Extra Large (Accessible) Toggle */}
            <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">Extra Large (Accessible)</span>
              <button
                onClick={() => handleAccessibleMode(!settings.accessibleMode)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.accessibleMode ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.accessibleMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Block on Error Toggle */}
            <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700">Block on error(s)</span>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <button
                onClick={() => updateSettings({ blockOnError: !settings.blockOnError })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.blockOnError ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.blockOnError ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2" />

            {/* Keyboard Sound Toggle */}
            <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">Keyboard Sound</span>
              <button
                onClick={() => updateSettings({ keyboardSoundEnabled: !settings.keyboardSoundEnabled })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.keyboardSoundEnabled ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.keyboardSoundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Voice Over Toggle */}
            <div className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
              <span className="text-sm font-medium text-gray-700">Voice Over</span>
              <button
                onClick={() => updateSettings({ voiceOverEnabled: !settings.voiceOverEnabled })}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.voiceOverEnabled ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.voiceOverEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2" />

            {/* Show Keyboard Toggle */}
            <div className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${settings.accessibleMode ? 'opacity-50' : ''}`}>
              <span className="text-sm font-medium text-gray-700">Show Keyboard</span>
              <button
                onClick={() => !settings.accessibleMode && updateSettings({ showKeyboard: !settings.showKeyboard })}
                disabled={settings.accessibleMode}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.showKeyboard ? 'bg-primary-500' : 'bg-gray-300'
                } ${settings.accessibleMode ? 'cursor-not-allowed' : ''}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.showKeyboard ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Show Hands Toggle */}
            <div className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 ${settings.accessibleMode ? 'opacity-50' : ''}`}>
              <span className="text-sm font-medium text-gray-700">Show Hands</span>
              <button
                onClick={() => !settings.accessibleMode && updateSettings({ showHands: !settings.showHands })}
                disabled={settings.accessibleMode}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  settings.showHands ? 'bg-primary-500' : 'bg-gray-300'
                } ${settings.accessibleMode ? 'cursor-not-allowed' : ''}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    settings.showHands ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
