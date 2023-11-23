import React, { useState, useRef, useCallback, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { LoginOauth } from '../login-oauth/LoginOauth';
import Button, { ButtonTypes } from 'devextreme-react/button';
import Form, { Item, Label, ButtonItem, ButtonOptions, RequiredRule, EmailRule } from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';

import { useAuth } from '../../../contexts/auth';
import { ThemeContext } from '../../../theme/theme';

import './LoginForm.scss';

function getButtonStylingMode(theme: string | undefined): ButtonTypes.ButtonStyle {
  return theme === 'dark' ? 'outlined' : 'contained';
}

export const LoginForm = ({ resetLink, createAccountLink }) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '' });
  const themeContext = useContext(ThemeContext);

  const onSubmit = useCallback(
    async(e) => {
      e.preventDefault();
      const { email, password } = formData.current;
      setLoading(true);

      const result = await signIn(email, password);
      if (result.isOk) {
        navigate('/');
      } else {
        setLoading(false);
        notify(result.message, 'error', 2000);
      }
    },
    [signIn]
  );

  const onCreateAccountClick = useCallback(() => {
    navigate(createAccountLink);
  }, [navigate]);

  return (
    <form className='login-form' onSubmit={onSubmit}>
      <Form
        formData={formData.current}
        disabled={loading}
        showColonAfterLabel
        showRequiredMark={false}
      >
        <Item dataField='email' editorType='dxTextBox' editorOptions={emailEditorOptions}>
          <RequiredRule message='Email is required' />
          <EmailRule message='Email is invalid' />
          <Label visible={false} />
        </Item>
        <Item dataField='password' editorType='dxTextBox' editorOptions={passwordEditorOptions}>
          <RequiredRule message='Password is required' />
          <Label visible={false} />
        </Item>
        <Item dataField='rememberMe' editorType='dxCheckBox' editorOptions={rememberMeEditorOptions}>
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions width='100%' type='default' useSubmitBehavior>
            <span className='dx-button-text'>{loading ? <LoadIndicator width='24px' height='24px' visible /> : 'Sign In'}</span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
      <div className='reset-link'>
        <Link to={resetLink}>Forgot password?</Link>
      </div>

      <Button
        className='btn-create-account'
        text='Create an account'
        width='100%'
        onClick={onCreateAccountClick}
        stylingMode={getButtonStylingMode(themeContext?.theme)}
      />

      <LoginOauth />
    </form>
  );
};

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email', value: 'jheart@dx-email.com' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Password', mode: 'password', value: 'password' };
const rememberMeEditorOptions = { text: 'Remember me', elementAttr: { class: 'form-text' } };
