import React, { useEffect, useState } from 'react';
import Button from 'devextreme-react/button';
import { currentTheme, refreshTheme } from 'devextreme/viz/themes';
import './ThemeSwitcher.scss';

type Theme = 'dark'| 'light';

const storageKey = 'themeViewer';

function getCurrentTheme(): Theme {
  return window.localStorage[storageKey] || 'light';
}

function switchTheme(themeName?: Theme) {
  const themePrefix = 'theme-';
  const body = document.querySelector('body');

  if (!body) {
    return;
  }

  themeName = themeName || getCurrentTheme();

  body.className = `${body.className.replace(/\s*theme-((light)|(dark))\s*/, ' ')} ${themePrefix + themeName}`;

  window.localStorage[storageKey] = themeName;

  currentTheme(`material.${themeName}`);
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

  return <Button className='theme-button'
    icon={`icons/${theme !== 'dark' ? 'moon' : 'sun'}.svg`}
    onClick={onClickButton} />;
};
