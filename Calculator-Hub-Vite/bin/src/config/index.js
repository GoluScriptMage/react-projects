/**
 * Application configuration
 * Environment-specific settings and feature flags
 */

// Feature flags for gradual feature rollout
export const FEATURES = {
  ENHANCED_CALCULATOR: true,
  MISSING_FLAVORS: true,
  RADAR_CHARTS: false,
  SHARE_RESULTS: true,
  AUDIO_EFFECTS: false,
};

// Calculator configuration
export const CALCULATOR_CONFIG = {
  MIN_QUESTIONS: 6,  // Minimum questions to show per calculator
  MAX_QUESTIONS: 12, // Maximum questions to show per calculator
  SAVE_RESULTS: true,
  MAX_SAVED_RESULTS: 10,
};

// Styling configuration
export const THEMES = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light',
};

// API configuration (if applicable)
export const API = {
  BASE_URL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  TIMEOUT: 5000,
};

export default {
  FEATURES,
  CALCULATOR_CONFIG,
  THEMES,
  API,
};
