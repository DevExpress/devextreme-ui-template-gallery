import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';
import { current as getCurrentDXTheme } from 'devextreme/ui/themes';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Static imports for Vite - SCSS files must be imported at build time
import './styles/theme-dx-dark.scss';
import './styles/theme-dx-light.scss';
import './styles/variables-dark.scss';
import './styles/variables-light.scss';

const themes = ['light', 'dark'] as const;
const storageKey = 'app-theme';
const themePrefix = 'app-theme-';

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
  if(import.meta.env.PROD) {
    return styleSheet?.href?.includes(`${themeMarker}`);
  } else {
    const rules = Array.from<CSSStyleRule>(styleSheet.cssRules);
    return !!rules.find((rule) => rule?.selectorText?.includes(`.${themeMarker}`));
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

  const regexTheme = new RegExp(`\\.(${themes.join('|')})`, 'g');
  currentVizTheme(currentVizTheme().replace(regexTheme, `.${themeName}`));
  refreshTheme();
}

function toggleTheme(currentTheme: Theme): Theme {
  const newTheme = getNextTheme(currentTheme);
  window.localStorage[storageKey] = newTheme;
  return newTheme;
}

export function useThemeContext() {
  const [theme, setTheme] = useState(getCurrentTheme());

  const switchTheme = useCallback(() => setTheme((currentTheme: Theme) => toggleTheme(currentTheme)), []);

  const isFluent = useCallback((): boolean => {
    return getCurrentDXTheme().includes('fluent');
  }, []);

  useEffect(() => {
    setAppTheme(theme);
  }, [theme]);

  return useMemo(()=> ({ theme, switchTheme, isLoaded: true, isFluent }), [theme, isFluent]);
}

export const ThemeContext = React.createContext<ReturnType<typeof useThemeContext> | null>(null);
