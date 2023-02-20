import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

const storageKey = 'themeViewer';

export function getCurrentTheme(): 'dark' | 'light' {
  return window.localStorage[storageKey] || 'light';
}

export function switchTheme(themeName?: string) {
  const themeMarker = 'theme-';

  themeName = themeName || getCurrentTheme();

  [...document.styleSheets]
    .filter((styleSheet) => styleSheet?.href?.includes(themeMarker))
    .forEach((styleSheet) => {
      styleSheet.disabled = !styleSheet?.href?.includes(`${themeMarker}${themeName}`);
    });

  window.localStorage[storageKey] = themeName;
  currentTheme(`material.${themeName}`);
  refreshTheme();
}
