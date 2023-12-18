import React, { useState, useRef, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Form, { Item, Label, ButtonItem, ButtonOptions, RequiredRule, EmailRule } from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';

import { resetPassword } from '../../../api/auth';

import './ResetPasswordForm.scss';

const notificationText = "We've sent a link to reset your password. Check your inbox.";

export const ResetPasswordForm = ({ signInLink, buttonLink }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '' });

  const onSubmit = useCallback(
    async(e) => {
      e.preventDefault();
      const { email } = formData.current;
      setLoading(true);

      const result = await resetPassword(email);
      setLoading(false);

      if (result.isOk) {
        navigate(buttonLink);
        notify(notificationText, 'success', 2500);
      } else {
        notify(result.message, 'error', 2000);
      }
    },
    [navigate]
  );

  return (
    <form className='reset-password-form' onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item dataField='email' editorType='dxTextBox' editorOptions={emailEditorOptions}>
          <RequiredRule message='Email is required' />
          <EmailRule message='Email is invalid' />
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions elementAttr={submitButtonAttributes} width='100%' type='default' useSubmitBehavior>
            <span className='dx-button-text'>{loading ? <LoadIndicator width='24px' height='24px' visible /> : 'Reset my password'}</span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
      <div className='login-link'>
        Return to <Link to={signInLink}>Sign In</Link>
      </div>
    </form>
  );
};

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email', value: 'jheart@dx-email.com' };
const submitButtonAttributes = { class: 'submit-button' };
