import React, { useContext } from 'react';

import Button, { ButtonTypes } from 'devextreme-react/button';

import { ThemeContext } from '../../../theme/theme';

import './LoginOauth.scss';

function getButtonStylingMode(theme: string | undefined): ButtonTypes.ButtonStyle {
  return theme === 'dark' ? 'outlined' : 'contained';
}

export const LoginOauth = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <div className='oauth-button-container'>
      <p>or</p>
      <Button width='100%' icon='icons/google-logo.svg' text='Login with Google' stylingMode={getButtonStylingMode(themeContext?.theme)} />
      <Button width='100%' icon='icons/microsoft-logo.svg' text='Login with Microsoft' stylingMode={getButtonStylingMode(themeContext?.theme)} />
    </div>
  );
};
