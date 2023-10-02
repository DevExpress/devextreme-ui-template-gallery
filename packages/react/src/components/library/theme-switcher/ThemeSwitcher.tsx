import React, { useCallback, useContext } from 'react';
import Button from 'devextreme-react/button';
import { ThemeContext } from '../../../theme/theme';

export const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeContext);

  const onButtonClick = useCallback(() => {
    themeContext?.switchTheme();
  }, []);

  return <div>
    <Button
      className='theme-button'
      stylingMode='text'
      icon={`${themeContext?.theme !== 'dark' ? 'moon' : 'sun'}`}
      onClick={onButtonClick} />
  </div>;
};
