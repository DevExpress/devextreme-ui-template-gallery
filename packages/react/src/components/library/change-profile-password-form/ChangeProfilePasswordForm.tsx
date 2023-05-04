import './ChangeProfilePasswordForm.scss';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import notify from 'devextreme/ui/notify';
import { ValidationRule } from 'devextreme/ui/validation_rules';
import Form, { Item, Label } from 'devextreme-react/form';
import Validator from 'devextreme-react/validator';
import { FormPopup } from '../../utils/form-popup/FormPopup';
import { PasswordTextBox } from '../password-text-box/PasswordTextBox';
import { ValidationGroup } from 'devextreme-react';

interface FormData {
  currentPassword?: string,
  password?: string,
  confirmedPassword?: string
}

const saveNewPassword = (): void => {
  notify({ message: 'Password Changed', position: { at: 'bottom center', my: 'bottom center' } }, 'success');
};

export const ChangeProfilePasswordForm = ({ visible, setVisible }) => {
  const validationGroup = useRef<ValidationGroup>(null);
  const confirmField = useRef<Validator>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const confirmPasswordValidators = useMemo((): ValidationRule[] => {
    return [{
      type: 'compare',
      message: 'Passwords do not match',
      comparisonTarget: () => formData.password,
    }];
  }, [formData]);

  const onFieldChange = useCallback(
    () => {
      const formValues = Object.entries(formData);
      setIsSaveDisabled(
        formValues.length != 3 ||
        !!formValues.find(([, value]) => !value) ||
        !validationGroup.current?.instance.validate().isValid
      );
    }, [formData]);

  const checkConfirm = useCallback(() => {
    confirmField.current?.instance.validate();
  }, []);

  const onCurrentPasswordChange = useCallback((value) => {
    setFormData({
      ...formData,
      currentPassword: value
    });

    onFieldChange();
  }, []);

  const onConfirmPasswordChange = useCallback((value) => {
    setFormData({
      ...formData,
      confirmedPassword: value
    });

    onFieldChange();
  }, []);

  const onNewPasswordChange = useCallback((value) => {
    setFormData({
      ...formData,
      password: value
    });

    checkConfirm();
    onFieldChange();
  }, [checkConfirm, onFieldChange]);

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
          value={formData['currentPassword']}
          placeholder='Current Password'
          onValueChange={onCurrentPasswordChange}
        />
      </Item>

      <Item>
        <div className='h-separator' />
      </Item>

      <Item>
        <Label text='Password' />
        <PasswordTextBox
          value={formData['password']}
          placeholder='Password'
          onValueChange={onNewPasswordChange}
        />
      </Item>

      <Item>
        <Label text='Confirm Password' />
        <PasswordTextBox
          ref={confirmField}
          value={formData['confirmedPassword']}
          placeholder='Confirm Password'
          validators={confirmPasswordValidators}
          onValueChange={onConfirmPasswordChange}
        />
      </Item>
    </Form>
  </FormPopup>;
};
