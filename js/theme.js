// ================================================
// THEME MANAGER - A2S Global Theme
// ================================================
// This script manages theme switching (light/dark mode)
// and should be loaded in the <head> with defer attribute

(function() {
  'use strict';

  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const stored = localStorage.getItem('a2s-theme');
    if (stored) return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('a2s-theme', theme);
  };

  // Initialize theme
  const initTheme = () => {
    const theme = getInitialTheme();
    applyTheme(theme);
  };

  // Theme toggle function
  window.toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = current === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  // Listen to system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('a2s-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  console.log('✨ A2S Theme Manager Initialized');
})();
