import './ChangeProfilePasswordForm.scss';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import notify from 'devextreme/ui/notify';
import { ValidationRule } from 'devextreme/ui/validation_rules';
import Form, { Item, Label } from 'devextreme-react/form';
import { FormPopup } from '../../utils/form-popup/FormPopup';
import { PasswordTextBox } from '../../password-text-box/PasswordTextBox';

interface FormData {
  currentPassword?: string,
  password?: string,
  confirmedPassword?: string
}

const saveNewPassword = (): void => {
  notify({ message: 'Password Changed', position: { at: 'bottom center', my: 'bottom center' } }, 'success');
};

export const ChangeProfilePasswordForm = ({ visible, setVisible }) => {
  const formPopupRef = useRef(null);
  const confirmField = useRef(null);
  const [formData, setFormData] = useState<FormData>({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  // figure out onvisiblechange event emitters

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        !!formValues.find(([_, value]) => !value) ||
        !formPopupRef.current?.isValid()
      );
    }, [formData]);

  const checkConfirm = useCallback(() => {
    confirmField.current?.revalidate();
  }, []);

  const onNewPasswordChange = useCallback(() => {
    checkConfirm();
    onFieldChange();
  }, [checkConfirm, onFieldChange]);

  return <FormPopup
    ref={formPopupRef}
    title='Change Password'
    visible={visible}
    width={360}
    wrapperAttr={{ className: 'change-profile-password-popup' }}
    isSaveDisabled={isSaveDisabled}
    onSave={saveNewPassword}
    setVisible={setVisible}
  >
    <Form id='form' // #form is id?
      labelMode='outside'
      showColonAfterLabel
      labelLocation='top'>
      <Item>
        <Label text='Current Password' />
        <PasswordTextBox
          value={formData['currentPassword']} // double binding
          placeholder='Current Password'
          onValueChange={onFieldChange}
        />
      </Item>

      <Item>
        <div className='h-separator' />
      </Item>

      <Item>
        <Label text='Password' />
        <PasswordTextBox
          value={formData['password']} // double binding
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
          onValueChange={onFieldChange}
        />
      </Item>
    </Form>
  </FormPopup>;
};
