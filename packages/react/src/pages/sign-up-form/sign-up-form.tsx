import React from 'react';

import { CardAuth, CreateAccountForm } from '../../components';

export const SignUpPage = () => {
  return (
    <CardAuth title='Register'>
      <CreateAccountForm
        redirectLink='/sign-in-form'
        buttonLink='/register-form'
      />
    </CardAuth>
  );
};
