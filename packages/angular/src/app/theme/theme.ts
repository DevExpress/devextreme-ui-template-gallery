import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';

export type Theme = 'dark'| 'light';

const storageKey = 'themeViewer';
const themeMarker = 'theme-';

export function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

function getThemeStyleSheets() {
  return   [...(document.styleSheets as unknown as any[])]
    .filter((styleSheet) => styleSheet?.href?.includes(themeMarker));
}

export function setAppTheme(themeName?: Theme) {
  themeName = themeName || getCurrentTheme();

  getThemeStyleSheets().forEach((styleSheet) => {
    styleSheet.disabled = !styleSheet?.href?.includes(`${themeMarker}${themeName}`);
  });

  window.localStorage[storageKey] = themeName;

  currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
  refreshTheme();
}
