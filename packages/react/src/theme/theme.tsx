import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const themeNames = ['dark', 'light'] as const;
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

export type Theme = typeof themeNames[number];

function toArray<T>(arrayLikeObject) {
  return [...arrayLikeObject as unknown as T[]];
}

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

function isThemeStyleSheet(styleSheet, theme: Theme) {
  return styleSheet?.href?.includes(`${themePrefix}${theme}`) ||
      !!toArray<CSSStyleRule>(styleSheet.cssRules).find( // for dev mode
        ({ selectorText }) => selectorText?.includes(`.${themePrefix}${theme}`));
}

function switchThemeStyleSheets(enabledTheme: Theme) {
  const disabledTheme = enabledTheme === 'dark' ? 'light' : 'dark';

  return toArray<CSSStyleSheet>(document.styleSheets).forEach((styleSheet) => {
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

  const switchTheme = useCallback(() => {
    setTheme((currentTheme: Theme) => currentTheme === 'dark' ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    isLoaded && setAppTheme(theme);
  }, [theme, isLoaded]);

  return useMemo(()=> ({ theme, switchTheme, isLoaded }), [theme, isLoaded]);
}

export const ThemeContext = React.createContext<ReturnType<typeof useThemeContext> | null>(null);
