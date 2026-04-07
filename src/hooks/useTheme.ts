'use client';

import { useEffect, useState, useCallback } from 'react';

export const lightColors: Record<string, string> = {
  '--color-background': '#FAFAFA',
  '--color-background-secondary': '#F5F5F4',
  '--color-background-tertiary': '#E7E5E4',
  '--color-surface': '#FFFFFF',
  '--color-surface-elevated': '#F5F5F4',
  '--color-text-primary': '#1C1917',
  '--color-text-secondary': '#44403C',
  '--color-text-muted': '#78716C',
  '--color-border': '#E7E5E4',
  '--color-border-hover': '#D6D3D1',
};

export const darkColors: Record<string, string> = {
  '--color-background': '#0f0a05',
  '--color-background-secondary': '#1a1408',
  '--color-background-tertiary': '#251c10',
  '--color-surface': '#1a1408',
  '--color-surface-elevated': '#251c10',
  '--color-text-primary': '#fef3c7',
  '--color-text-secondary': '#d4c4a8',
  '--color-text-muted': '#a8946e',
  '--color-border': '#2d2212',
  '--color-border-hover': '#3d3020',
};

const accentColorMap: Record<string, string> = {
  '#f59e0b': '#b45309',
  '#ef4444': '#b91c1c',
  '#10b981': '#047857',
  '#06b6d4': '#0e7490',
  '#8b5cf6': '#6d28d9',
  '#ec4899': '#be185d',
};

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [accentColor, setAccentColorState] = useState('#f59e0b');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const savedAccent = localStorage.getItem('accentColor');
      setThemeState(savedTheme || 'light');
      setAccentColorState(savedAccent || '#f59e0b');
    } catch {
      // localStorage not available
    }
  }, []);

  const applyTheme = useCallback((newTheme: 'light' | 'dark', newAccent: string) => {
    try {
      localStorage.setItem('theme', newTheme);
      localStorage.setItem('accentColor', newAccent);
    } catch {
      // localStorage not available
    }

    const colors = newTheme === 'dark' ? darkColors : lightColors;
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.style.setProperty('--color-primary', newAccent);
    root.style.setProperty('--color-primary-hover', accentColorMap[newAccent] || '#b45309');
    root.style.setProperty('--color-secondary', '#ea580c');
    root.style.setProperty('--color-secondary-hover', '#f97316');
    root.style.setProperty('--color-accent', newAccent);
  }, []);

  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    applyTheme(newTheme, accentColor);
  }, [accentColor, applyTheme]);

  const setAccentColor = useCallback((newAccent: string) => {
    setAccentColorState(newAccent);
    applyTheme(theme, newAccent);
  }, [theme, applyTheme]);

  return { theme, accentColor, setTheme, setAccentColor };
}