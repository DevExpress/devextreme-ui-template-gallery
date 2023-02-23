import React, { useEffect, useState } from 'react';
import Button from 'devextreme-react/button';
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';

const themeNames = ['dark', 'light'] as const;
const themeStylesSheets = {};
const storageKey = 'themeViewer';

type Theme = typeof themeNames[number];

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

function getThemeStyleSheets() {
  const themePrefix = 'app-theme-';

  if (Object.keys(themeStylesSheets).length == themeNames.length) {
    return themeNames.flatMap((theme) => themeStylesSheets[theme]);
  }

  themeNames.forEach((themeName) => {
    if (themeStylesSheets[themeName]) {
      return;
    }

    const themeCssSelector = `.${themePrefix + themeName}`;
    const themeCssSelectorRegExp = new RegExp(`(${themeCssSelector})|(:root\\s+)`, 'g');

    const themeStyleSheets = [...document.styleSheets as unknown as CSSStyleSheet[]]
      .filter(({ rules })=> !![...rules as unknown as CSSStyleRule[]]
        .find((rule) => rule.selectorText?.includes(themeCssSelector)));

    themeStyleSheets.forEach((styleSheet) => {
      [...styleSheet.cssRules as unknown as CSSStyleRule[]].forEach((rule) => {
        rule.selectorText = rule.selectorText?.replace(themeCssSelectorRegExp, '');
      });
    });

    themeStylesSheets[themeName] = themeStyleSheets;
  });

  return themeNames.flatMap((theme) => themeStylesSheets[theme]);
}

export async function switchTheme(newTheme?: Theme) {
  const themeName = newTheme || getCurrentTheme();

  const stylesSheets = getThemeStyleSheets();

  stylesSheets.forEach((stylesSheet) => stylesSheet.disabled = !themeStylesSheets[themeName].includes(stylesSheet));

  window.localStorage[storageKey] = themeName;

  currentVizTheme(currentVizTheme().replace(/\.[a-z]+\.compact$/, `.${themeName}.compact`));
  refreshTheme();
}

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(getCurrentTheme());

  const onClickButton = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    switchTheme(theme);
  }, [theme]);

  return <div>
    <Button className='theme-button'
      icon={`icons/${theme !== 'dark' ? 'moon' : 'sun'}.svg`}
      onClick={onClickButton} />
  </div>;
};
