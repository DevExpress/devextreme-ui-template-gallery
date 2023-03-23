import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const themes = ['light', 'dark'] as const;
const storageKey = 'app-theme';
const themePrefix = 'app-theme-';

const prefixes = ['./styles/theme-dx-', './styles/variables-'];

const loadStylesImports = async() => {
  await Promise.all([
    ...prefixes.flatMap((prefix) => [
      import(/* webpackChunkName: "app-theme-dark" */ `${prefix}dark.scss`),
      import(/* webpackChunkName: "app-theme-light" */ `${prefix}light.scss`)
    ]),
  ]);
};

export type Theme = typeof themes[number];

function getNextTheme(theme?: Theme) {
  const index = !theme ? 0 : (themes.indexOf(theme) + 1);
  return themes[
    themes.length === index ? 0 : index
  ];
}

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || getNextTheme();
}

function isThemeStyleSheet(styleSheet, theme: Theme) {
  const themeMarker = `${themePrefix}${theme}`;
  // eslint-disable-next-line no-undef
  return process.env.NODE_ENV === 'production' ?
    styleSheet?.href?.includes(`${themeMarker}`)
    : -1 !== [0, -1].findIndex(
      (i) => Array.from<CSSStyleRule>(styleSheet.cssRules).at(i)?.selectorText?.includes(`.${themeMarker}`)
    );
}

function switchThemeStyleSheets(enabledTheme: Theme) {
  const disabledTheme = getNextTheme(enabledTheme);

  return Array.from<CSSStyleSheet>(document.styleSheets).forEach((styleSheet) => {
    styleSheet.disabled = isThemeStyleSheet(styleSheet, disabledTheme);
  });
}

async function setAppTheme(newTheme?: Theme) {
  const themeName = newTheme || getCurrentTheme();

  switchThemeStyleSheets(themeName);

  window.localStorage[storageKey] = themeName;

  currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
  refreshTheme();
}

export function useThemeContext() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadStylesImports().then(() => {
      setIsLoaded(true);
    });
  }, []);

  const switchTheme = useCallback(() => setTheme((currentTheme: Theme) => getNextTheme(currentTheme)), []);

  useEffect(() => {
    isLoaded && setAppTheme(theme);
  }, [theme, isLoaded]);

  return useMemo(()=> ({ theme, switchTheme, isLoaded }), [theme, isLoaded]);
}

export const ThemeContext = React.createContext<ReturnType<typeof useThemeContext> | null>(null);
