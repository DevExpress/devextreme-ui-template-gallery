import React from 'react';

import Button from 'devextreme-react/button';

import './LoginOauth.scss';

export const LoginOauth = () => {
  return (
    <div className='oauth-button-container'>
      <p>or</p>
      <Button width='100%' icon='icons/google-logo.svg' text='Login with Google' />
      <Button width='100%' icon='icons/microsoft-logo.svg' text='Login with Microsoft' />
    </div>
  );
};
