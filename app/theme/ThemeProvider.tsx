import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark' | 'system';

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}>({
  theme: 'system',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('system');

  useEffect(() => {
    AsyncStorage.getItem('theme').then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored);
      }
    });
  }, []);

  const setTheme = (mode: ThemeType) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
