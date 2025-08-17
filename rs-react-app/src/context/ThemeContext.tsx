'use client';
import { createContext } from 'react';
import type { ThemeContextType } from '../@types/types';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
