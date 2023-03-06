import React, { useEffect, useState } from 'react';
import Button from 'devextreme-react/button';
import { getCurrentTheme, setAppTheme } from '../../theme/theme';
import type { Theme } from '../../theme/theme';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme());

  const onClickButton = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setAppTheme(theme);
  }, [theme]);

  return <div>
    <Button icon={`icons/${theme !== 'dark' ? 'moon' : 'sun'}.svg`}
      onClick={onClickButton} />
  </div>;
};
