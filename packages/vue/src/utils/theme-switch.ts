import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

const storageKey = 'themeViewer';

export function getCurrentTheme(): 'dark' | 'light' {
  return window.localStorage[storageKey] || 'light';
}

export function switchTheme(themeName?: string) {
  const themePrefix = 'theme-';
  const body = document.querySelector('body');

  if (!body) {
    return;
  }

  themeName = themeName || getCurrentTheme();

  body.className = `${body.className.replace(/\s*theme-((light)|(dark))\s*/, ' ')} ${themePrefix + themeName}`;

  window.localStorage[storageKey] = themeName;
  currentTheme(`material.${themeName}`);
  refreshTheme();
}
