import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('darkMode');
      if (darkMode !== null) {
        setIsDarkMode(JSON.parse(darkMode));
      }
    } catch (error) {
      console.log('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.log('Error saving theme preference:', error);
    }
  };

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#ffffff',
      surface: isDarkMode ? '#1e1e1e' : '#f5f5f5',
      card: isDarkMode ? '#2d2d2d' : '#ffffff',
      primary: '#4A90E2',
      primaryDark: isDarkMode ? '#5BA0F2' : '#4A90E2',
      text: isDarkMode ? '#ffffff' : '#000000',
      textSecondary: isDarkMode ? '#cccccc' : '#666666',
      border: isDarkMode ? '#404040' : '#e0e0e0',
      borderLight: isDarkMode ? '#333333' : '#f0f0f0',
      shadow: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      lightGray: isDarkMode ? '#404040' : '#f8f8f8',
    },
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
