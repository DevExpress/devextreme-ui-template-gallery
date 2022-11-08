import React from 'react';

import TextBox from 'devextreme-react/text-box';
import Validator, { RequiredRule } from 'devextreme-react/validator';

type TextboxProps = {
  value: string,
  label: string,
  isEditing: boolean,
  onValueChange: (data) => void,
  mask?: string,
}

export const FormTextbox = ({ value, label, isEditing, onValueChange, mask = '', children }: React.PropsWithChildren<TextboxProps>) => {
  return (
    <TextBox
      label={label}
      value={value}
      readOnly={isEditing}
      elementAttr={{ class: 'form-editor' }}
      inputAttr={{ class: 'form-editor-input' }}
      stylingMode='filled'
      onValueChange={onValueChange}
      mask={mask}
    >
      <Validator>
        <RequiredRule />
        {children}
      </Validator>
    </TextBox>
  );
};
