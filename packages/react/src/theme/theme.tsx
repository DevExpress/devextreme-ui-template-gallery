import './styles/theme-dx-dark.scss';
import './styles/variables-dark.scss';
import './styles/variables-light.scss';
import './styles/theme-dx-light.scss';
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';

const themeNames = ['dark', 'light'] as const;
const themeStylesSheets = {};
const storageKey = 'themeViewer';

export type Theme = typeof themeNames[number];

export function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

function toArray<T>(arrayLikeObject) {
  return [...arrayLikeObject as unknown as T[]];
}

function getThemeStyleSheets(): CSSStyleSheet[] {
  const themePrefix = 'app-theme-';

  if (Object.keys(themeStylesSheets).length == themeNames.length) {
    return Object.values<CSSStyleSheet>(themeStylesSheets).flat();
  }

  themeNames.forEach((themeName) => {
    if (themeStylesSheets[themeName]) {
      return;
    }

    const themeCssSelector = `.${themePrefix + themeName}`;

    themeStylesSheets[themeName] = toArray<CSSStyleSheet>(document.styleSheets).filter(
      ({ cssRules })=> !!toArray<CSSStyleRule>(cssRules).find(({ selectorText }) => selectorText?.includes(themeCssSelector)));
  });

  return Object.values<CSSStyleSheet>(themeStylesSheets).flat();
}

export function setAppTheme(newTheme?: Theme) {
  const themeName = newTheme || getCurrentTheme();

  const stylesSheets = getThemeStyleSheets();

  stylesSheets.forEach((stylesSheet) => stylesSheet.disabled = !themeStylesSheets[themeName].includes(stylesSheet));

  window.localStorage[storageKey] = themeName;

  currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
  refreshTheme();
}
