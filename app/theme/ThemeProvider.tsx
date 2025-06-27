import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeType = 'light' | 'dark' | 'system';

const lightColors = {
  background: '#fff',
  text: '#222',
  card: '#f5f5f5',
  border: '#ddd',
  primary: '#007AFF',
  secondary: '#666',
  input: '#fafafa',
};

const darkColors = {
  background: '#18181b',
  text: '#fff',
  card: '#23232a',
  border: '#333',
  primary: '#4f8cff',
  secondary: '#b3b3b3',
  input: '#23232a',
};

export const ThemeContext = createContext<{
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: typeof lightColors;
}>({
  theme: 'system',
  setTheme: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('system');
  const [colors, setColors] = useState(lightColors);

  useEffect(() => {
    AsyncStorage.getItem('theme').then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored);
      }
    });
  }, []);

  useEffect(() => {
    const system = Appearance.getColorScheme();
    const resolved = theme === 'system' ? system : theme;
    setColors(resolved === 'dark' ? darkColors : lightColors);
  }, [theme]);

  const setTheme = (mode: ThemeType) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
