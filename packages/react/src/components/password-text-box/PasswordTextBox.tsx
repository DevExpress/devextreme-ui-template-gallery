import React, { useState, forwardRef } from 'react';
import TextBox, { Button } from 'devextreme-react/text-box';
import Validator from 'devextreme-react/validator';

interface PasswordTextBoxProps {
  value: string,
  onValueChange: () => void,
  placeholder?: string,
  stylingMode?: 'outlined' | 'underlined' | 'filled',
  validators?: any[]
}

export const PasswordTextBox = forwardRef(({ value, onValueChange, placeholder, stylingMode, validators }: PasswordTextBoxProps) => {
  const [isPasswordMode, setIsPasswordMode] = useState(true);

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
        icon: 'assets/icons/eye.svg',
        onClick: switchMode
      }}
    />
    <Validator validationRules={
      validators ||
      [{
        type: 'required',
        message: 'Password is required'
      }]}
    />
  </TextBox>;
});

