import React from 'react';

import { CardAuth, CreateAccountForm } from '../../components';

export const SignUpPage = () => {
  return (
    <CardAuth title='Create Account'>
      <CreateAccountForm redirectLink='/signin-form-page' buttonLink='/signup-form-page' />
    </CardAuth>
  );
};
