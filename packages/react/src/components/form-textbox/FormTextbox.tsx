import React from 'react';

import TextBox from 'devextreme-react/text-box';
import Validator from 'devextreme-react/validator';

export const FormTextbox = ({ value, label, isEditing }) => {
  return (
    <TextBox
      label={label}
      value={value}
      readOnly={isEditing}
      elementAttr={{ class: 'form-editor' }}
      inputAttr={{ class: 'form-editor-input' }}
      stylingMode='filled'
    >
      <Validator validationRules={[{ type: 'required' }]}></Validator>
    </TextBox>
  );
};
