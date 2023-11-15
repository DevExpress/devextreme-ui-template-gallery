import React, { useState, forwardRef, useMemo, useCallback } from 'react';
import TextBox, { Button } from 'devextreme-react/text-box';
import { ValidationRule, ButtonStyle } from 'devextreme-react/common';
import Validator, { ValidatorTypes } from 'devextreme-react/validator';

interface PasswordTextBoxProps {
  value?: string,
  onValueChange: (value) => void,
  placeholder?: string,
  stylingMode?: 'outlined' | 'underlined' | 'filled',
  validators?: ValidationRule[],
  onValueValidated?: (e: ValidatorTypes.ValidatedEvent) => void;
}

export const PasswordTextBox = forwardRef<Validator, PasswordTextBoxProps>(({
  value = '',
  onValueChange,
  placeholder,
  stylingMode = 'filled',
  validators,
  onValueValidated
}, ref) => {
  const [isPasswordMode, setIsPasswordMode] = useState(true);
  const buttonStylingMode: ButtonStyle = 'text';

  const validationRules = useMemo<ValidationRule[] | undefined>(() =>
    validators || [{
      type: 'required',
      message: 'Password is required'
    }],
  [validators]);

  const switchMode = useCallback(() => {
    setIsPasswordMode(!isPasswordMode);
  }, [isPasswordMode]);

  const buttonOptions = useMemo(() =>
    ({
      visible: value?.length > 0,
      icon: isPasswordMode ? 'eyeopen' : 'eyeclose',
      hoverStateEnabled: false,
      activeStateEnabled: false,
      stylingMode: buttonStylingMode,
      onClick: switchMode
    }),
  [value, switchMode]);

  return <TextBox
    value={value}
    stylingMode={stylingMode}
    valueChangeEvent='keyup input change'
    placeholder={placeholder}
    mode={isPasswordMode ? 'password' : 'text'}
    onValueChange={onValueChange}
  >
    <Button
      name='today'
      location='after'
      options={buttonOptions}
    />
    <Validator ref={ref} validationRules={validationRules} onValidated={onValueValidated} />
  </TextBox>;
});

