'use client';
import { useState, type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextType, Theme } from '../@types/types';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextType = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
