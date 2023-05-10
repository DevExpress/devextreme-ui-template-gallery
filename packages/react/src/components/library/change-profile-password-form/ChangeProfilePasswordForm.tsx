import './ChangeProfilePasswordForm.scss';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import notify from 'devextreme/ui/notify';
import { ValidationRule } from 'devextreme/ui/validation_rules';
import Form, { Item, Label } from 'devextreme-react/form';
import Validator from 'devextreme-react/validator';
import { FormPopup } from '../../utils/form-popup/FormPopup';
import { PasswordTextBox } from '../password-text-box/PasswordTextBox';
import { ValidationGroup } from 'devextreme-react';
import { ValidatedEvent } from 'devextreme/ui/validator';

const saveNewPassword = (): void => {
  notify({ message: 'Password Changed', position: { at: 'bottom center', my: 'bottom center' } }, 'success');
};

export const ChangeProfilePasswordForm = ({ visible, setVisible }) => {
  const validationGroup = useRef<ValidationGroup>(null);
  const confirmField = useRef<Validator>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [confirmedPasswordValid, setConfirmedPasswordValid] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const confirmPasswordValidators = useMemo((): ValidationRule[] => {
    return [{
      type: 'compare',
      message: 'Passwords do not match',
      comparisonTarget: () => newPassword,
    }];
  }, [newPassword]);

  useEffect(() => {
    const formValues = [currentPassword, newPassword, confirmedPassword];
    const validity = [currentPasswordValid, newPasswordValid, confirmedPasswordValid];

    setIsSaveDisabled(
      formValues.some((value) => !value) ||
      validity.some((value) => !value)
    );
  }, [
    currentPassword,
    newPassword,
    confirmedPassword,
    currentPasswordValid,
    newPasswordValid,
    confirmedPasswordValid,
    validationGroup
  ]);

  const checkConfirm = useCallback(() => {
    confirmField.current?.instance.validate();
  }, []);

  const onCurrentPasswordValidated = useCallback((e: ValidatedEvent) => {
    setCurrentPasswordValid(!!e.isValid);
  }, []);

  const onCurrentPasswordChange = useCallback((value) => {
    setCurrentPassword(value);
  }, []);

  const onConfirmedPasswordValidated = useCallback((e: ValidatedEvent) => {
    setConfirmedPasswordValid(!!e.isValid);
  }, []);

  const onConfirmPasswordChange = useCallback((value) => {
    setConfirmedPassword(value);
  }, []);

  const onNewPasswordValidated = useCallback((e: ValidatedEvent) => {
    setNewPasswordValid(!!e.isValid);
  }, []);

  const onNewPasswordChange = useCallback((value) => {
    setNewPassword(value);

    checkConfirm();
  }, [checkConfirm]);

  return <FormPopup
    validationGroup={validationGroup}
    title='Change Password'
    visible={visible}
    width={360}
    wrapperAttr={{ class: 'change-profile-password-popup' }}
    isSaveDisabled={isSaveDisabled}
    onSave={saveNewPassword}
    setVisible={setVisible}
  >
    <Form id='form'
      labelMode='outside'
      showColonAfterLabel
      labelLocation='top'>
      <Item>
        <Label text='Current Password' />
        <PasswordTextBox
          value={currentPassword}
          placeholder='Current Password'
          onValueChange={onCurrentPasswordChange}
          onValueValidated={onCurrentPasswordValidated}
        />
      </Item>

      <Item>
        <div className='h-separator' />
      </Item>

      <Item>
        <Label text='Password' />
        <PasswordTextBox
          value={newPassword}
          placeholder='Password'
          onValueChange={onNewPasswordChange}
          onValueValidated={onNewPasswordValidated}
        />
      </Item>

      <Item>
        <Label text='Confirm Password' />
        <PasswordTextBox
          ref={confirmField}
          value={confirmedPassword}
          placeholder='Confirm Password'
          validators={confirmPasswordValidators}
          onValueChange={onConfirmPasswordChange}
          onValueValidated={onConfirmedPasswordValidated}
        />
      </Item>
    </Form>
  </FormPopup>;
};
