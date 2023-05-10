import React, { useState, forwardRef, useMemo } from 'react';
import TextBox, { Button } from 'devextreme-react/text-box';
import Validator from 'devextreme-react/validator';
import { ValidationRule } from 'devextreme/ui/validation_rules';

interface PasswordTextBoxProps {
  value?: string,
  onValueChange: (value) => void,
  placeholder?: string,
  stylingMode?: 'outlined' | 'underlined' | 'filled',
  validators?: ValidationRule[]
}

export const PasswordTextBox = forwardRef<Validator, PasswordTextBoxProps>(({ value = '', onValueChange, placeholder, stylingMode = 'outlined', validators }, ref) => {
  const [isPasswordMode, setIsPasswordMode] = useState(true);

  const validationRules = useMemo<ValidationRule[] | undefined>(() =>
    validators || [{
      type: 'required',
      message: 'Password is required'
    }],
  [validators]);

  const switchMode = () => {
    setIsPasswordMode(!isPasswordMode);
  };

  return <TextBox value={value}
    stylingMode={stylingMode}
    valueChangeEvent='keyup input change'
    placeholder={placeholder}
    mode={isPasswordMode ? 'password' : 'text'}
    onValueChange={onValueChange}
  >
    <Button
      name='today'
      location='after'
      options={{
        visible: value?.length > 0,
        icon: 'icons/eye.svg',
        onClick: switchMode
      }}
    />
    <Validator ref={ref} validationRules={validationRules} />
  </TextBox>;
});

