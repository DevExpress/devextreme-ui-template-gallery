import './ChangeProfilePasswordForm.scss';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import notify from 'devextreme/ui/notify';
import { ValidationRule } from 'devextreme/ui/validation_rules';
import Form, { Item, Label } from 'devextreme-react/form';
import { FormPopup } from '../../utils/form-popup/FormPopup';

const saveNewPassword = (): void => {
  notify({ message: 'Password Changed', position: { at: 'bottom center', my: 'bottom center' } }, 'success');
};

export const ChangeProfilePasswordForm = ({ visible }) => {
  const formPopupRef = useRef();
  const confirmField = useRef();
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  // figure out onvisiblechange event emitters

  const confirmPasswordValidators = useMemo((): ValidationRule[] => {
    return [{
      type: 'compare',
      message: 'Passwords do not match',
      comparisonTarget: () => formData.password,
    }];
  }, [formData]);

  const onFieldChanged = useCallback(async () => {
    const formValues = Object.entries(formData);
    setIsSaveDisabled(await (formValues.length != 3 || !!formValues.find(([key, value]) => !value) || !formPopupRef.current?.isValid()));
  }, [formData]);

  return <FormPopup
    ref={formPopupRef}
    titleText='Change Password'
    visible={visible}
    width={360}
    wrapperAttr="{class: 'change-profile-password-popup'}"
    isSaveDisabled='isSaveDisabled'
    onSave={saveNewPassword}
    onVisibleChange={onVisibleChange}
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
