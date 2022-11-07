import React from 'react';

import TextBox from 'devextreme-react/text-box';
import Validator from 'devextreme-react/validator';

interface TextboxProps {
  value: string,
  label: string,
  isEditing: boolean,
  onValueChange: (data) => void,
  validationGroup?: string,
  validators?: any[],
  mask?: string,
}

export const FormTextbox = ({ value, label, isEditing, onValueChange, validationGroup, validators, mask = '' }: TextboxProps) => {
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
      <Validator validationRules={validators || [{ type: 'required' }]} validationGroup={validationGroup}></Validator>
    </TextBox>
  );
};
