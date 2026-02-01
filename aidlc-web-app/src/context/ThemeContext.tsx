'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ColorTheme, ThemeContextValue } from '@/types';
import { loadTheme, saveTheme, loadColorTheme, saveColorTheme } from '@/lib/storage';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('sunset');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load themes from localStorage on mount
    const savedTheme = loadTheme();
    const savedColorTheme = loadColorTheme();
    setTheme(savedTheme);
    setColorThemeState(savedColorTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply dark/light mode to document
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }

    // Save to localStorage
    saveTheme(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;

    // Apply color theme to document
    const root = document.documentElement;
    // Remove all color theme classes
    root.classList.remove('theme-sunset', 'theme-matrix', 'theme-ocean', 'theme-mono');
    // Add current color theme class
    root.classList.add(`theme-${colorTheme}`);

    // Save to localStorage
    saveColorTheme(colorTheme);
  }, [colorTheme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setColorTheme = (newColorTheme: ColorTheme) => {
    setColorThemeState(newColorTheme);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
