import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const loadStylesImports = () => {
  const prefix = './styles/app-theme-';

  return Promise.all([
    import(/* webpackChunkName: "app-theme-dark" */ `${prefix}dark.scss`),
    import(/* webpackChunkName: "app-theme-light" */ `${prefix}light.scss`)
  ]);
};

const themes = ['light', 'dark'] as const;
const storageKey = 'app-theme';
const themePrefix = 'theme-';

export type Theme = typeof themes[number];

function getNextTheme(theme?: Theme) {
  return themes[themes.indexOf(theme as Theme) + 1] || themes[0];
}

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || getNextTheme();
}

function isThemeStyleSheet(styleSheet, theme: Theme) {
  const themeMarker = `${themePrefix}${theme}`;

  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === 'production') {
    return styleSheet?.href?.includes(`${themeMarker}`);
  } else {
    return !![...styleSheet.cssRules].pop()?.selectorText?.includes(`.${themeMarker}`);
  }
}

function switchThemeStyleSheets(enabledTheme: Theme) {
  const disabledTheme = getNextTheme(enabledTheme);

  Array.from<CSSStyleSheet>(document.styleSheets).forEach((styleSheet) => {
    styleSheet.disabled = isThemeStyleSheet(styleSheet, disabledTheme);
  });
}

async function setAppTheme(newTheme?: Theme) {
  const themeName = newTheme || getCurrentTheme();

  switchThemeStyleSheets(themeName);

  const themeClasses = themes.map((name) => themePrefix + name);
  document.body.classList.remove(...themeClasses);
  document.body.classList.add(`theme-${themeName}`);

  currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
  refreshTheme();
}

function toggleTeme(currentTheme: Theme): Theme {
  const newTheme = getNextTheme(currentTheme);
  window.localStorage[storageKey] = newTheme;
  return newTheme;
}

export function useThemeContext() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadStylesImports().then(() => {
      setIsLoaded(true);
    });
  }, []);

  const switchTheme = useCallback(() => setTheme((currentTheme: Theme) => toggleTeme(currentTheme)), []);

  useEffect(() => {
    isLoaded && setAppTheme(theme);
  }, [theme, isLoaded]);

  return useMemo(()=> ({ theme, switchTheme, isLoaded }), [theme, isLoaded]);
}

export const ThemeContext = React.createContext<ReturnType<typeof useThemeContext> | null>(null);
