import React from 'react';

import { CardAuth, CreateAccountForm } from '../../components';

export const SignUpPage = () => {
  return (
    <CardAuth title='Sign Up'>
      <CreateAccountForm
        redirectLink='/sign-in-form'
        buttonLink='/sign-up-form'
      />
    </CardAuth>
  );
};
