import './theme-dark';
import './theme-light';
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';

export type Theme = 'dark' | 'light';
const storageKey = 'themeViewer';
const themeMarker = 'theme-';

export function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

function getThemeStyleSheets() {
  return [...document.styleSheets as unknown as CSSStyleSheet[]]
    .filter((styleSheet) => styleSheet?.href?.includes(themeMarker));
}

export function setAppTheme(themeName?: Theme) {
  themeName = themeName || getCurrentTheme();

  const enabledStyleSheet: CSSStyleSheet[] = [];
  getThemeStyleSheets().forEach((styleSheet) => {
    if (styleSheet?.href?.includes(`${themeMarker}${themeName}`)) {
      enabledStyleSheet.push(styleSheet);
    } else {
      styleSheet.disabled = true;
    }
  });

  enabledStyleSheet.forEach((styleSheet) => {
    styleSheet.disabled = false;
  });

  window.localStorage[storageKey] = themeName;
  currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
  refreshTheme();
}
