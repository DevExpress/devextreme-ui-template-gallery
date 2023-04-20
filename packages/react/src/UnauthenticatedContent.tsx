import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SingleCard } from './layouts';
import { LoginForm, ResetPasswordForm, ChangePasswordForm, CreateAccountForm } from './components';

export const UnauthenticatedContent = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={
          <SingleCard title='Sign In'>
            <LoginForm
              resetLink='/reset-password'
              createAccountLink='/create-account'
            />
          </SingleCard>
        }
      />
      <Route
        path='/create-account'
        element={
          <SingleCard title='Sign Up'>
            <CreateAccountForm
              buttonLink='/login'
              redirectLink='/login'
            />
          </SingleCard>
        }
      />
      <Route
        path='/reset-password'
        element={
          <SingleCard
            title='Reset Password'
            description='Please enter the email address that you used to register, and we will send you a link to reset your password via Email.'>

            <ResetPasswordForm
              signInLink='/login'
              buttonLink='/login'
            />
          </SingleCard>
        }
      />
      <Route
        path='/change-password/:recoveryCode'
        element={
          <SingleCard title='Change Password'>
            <ChangePasswordForm />
          </SingleCard>
        }
      />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  );
};
