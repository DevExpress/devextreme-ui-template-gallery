import React from 'react';

import { CardAuth, CreateAccountForm } from '../../components';

export const SignUpPage = () => {
  return (
    <CardAuth title='Sign Up'>
      <CreateAccountForm
        redirectLink='/signin-form-page'
        buttonLink='/signup-form-page'
      />
    </CardAuth>
  );
};
