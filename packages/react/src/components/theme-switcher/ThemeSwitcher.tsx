import React, { useEffect, useState } from 'react';
import Button from 'devextreme-react/button';
import { currentTheme as currentVizTheme, refreshTheme } from 'devextreme/viz/themes';

type Theme = 'dark'| 'light';

const stylesSheetsByThemes = {};
const storageKey = 'themeViewer';

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

async function getThemeStyleSheets(themeName: Theme) {
  const themePrefix = 'app-theme-';

  if (stylesSheetsByThemes[themeName]) {
    return stylesSheetsByThemes[themeName];
  }
  const themeCssSelector = `:root, .${themePrefix + themeName}`;
  const themeCssSelectorRegExp = new RegExp(themeCssSelector);

  const themeStyleSheets = [...document.styleSheets as unknown as CSSStyleSheet[]]
    .filter(({ rules })=> !![...rules as unknown as any[]]
      .find((rule) => rule.selectorText?.startsWith(themeCssSelector)));

  themeStyleSheets.forEach((styleSheet) => {
    [...styleSheet.cssRules as unknown as CSSStyleRule[]].forEach((rule) => {

      if (rule.selectorText?.startsWith(themeCssSelector)) {
        rule.selectorText = rule.selectorText.replace(themeCssSelectorRegExp, '');
      }
    });
  });

  stylesSheetsByThemes[themeName] = themeStyleSheets;

  return themeStyleSheets;
}

export async function switchTheme(themeName?: Theme) {
  const previousTheme = themeName == 'dark' ? 'light' : 'dark';

  themeName = themeName || getCurrentTheme();

  const stylesSheets = await getThemeStyleSheets(themeName);

  stylesSheets.forEach((stylesSheet) => stylesSheet.disabled = false);

  const previousStylesSheets = await getThemeStyleSheets(previousTheme);

  previousStylesSheets.forEach((stylesSheet) => stylesSheet.disabled = true);

  window.localStorage[storageKey] = themeName;

  currentVizTheme(`material.${themeName}`);
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
