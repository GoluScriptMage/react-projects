import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../config';
import { useLocalStorage } from '../hooks';

// Create theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or use default
  const [theme, setThemeInStorage] = useLocalStorage('theme', THEMES.DEFAULT);
  const [currentTheme, setCurrentTheme] = useState(theme);
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    setThemeInStorage(currentTheme);
  }, [currentTheme, setThemeInStorage]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => 
      prevTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    );
  };
  
  // Set specific theme
  const setTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setCurrentTheme(newTheme);
    }
  };
  
  // Context value
  const value = {
    theme: currentTheme,
    toggleTheme,
    setTheme,
    themes: THEMES,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
