'use client';
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeManager = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return null;
};
