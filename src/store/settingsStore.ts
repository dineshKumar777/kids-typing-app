import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings } from '../types';

interface SettingsStore {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  soundEnabled: true,
  keyboardSoundEnabled: true,
  voiceOverEnabled: false,
  showHands: true,
  showKeyboard: true,
  theme: 'light',
  fontSize: 'medium',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      
      updateSettings: (updates: Partial<AppSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },
      
      resetSettings: () => {
        set({ settings: defaultSettings });
      },
    }),
    {
      name: 'kids-typing-settings',
    }
  )
);
