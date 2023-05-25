import React from 'react';

import { CardAuth, ResetPasswordForm } from '../../components';

export const ResetPasswordPage = () => {
  return (
    <CardAuth
      title='Reset Password'
      description='Please enter the email address that you used to register, and we will send you a link to reset your password via Email.'
    >
      <ResetPasswordForm
        signInLink='/sign-in-form'
        buttonLink='/reset-password-form'
      />
    </CardAuth>
  );
};
