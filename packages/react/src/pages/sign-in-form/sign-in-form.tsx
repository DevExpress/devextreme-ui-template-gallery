import React from 'react';

import { CardAuth, LoginForm } from '../../components';

export const SignInPage = () => {
  return (
    <CardAuth title='Sign In'>
      <LoginForm
        resetLink='/reset-password-form-page'
        createAccountLink='/signup-form-page'
      />
    </CardAuth>
  );
};
