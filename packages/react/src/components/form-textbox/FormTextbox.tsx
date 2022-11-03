import React from 'react';

import TextBox from 'devextreme-react/text-box';
import Validator from 'devextreme-react/validator';

export const FormTextbox = ({
  value, label, isEditing, onValueChange, validationGroup
}: { value: string, label: string, isEditing: boolean, onValueChange: (data) => void, validationGroup: string }) => {
  return (
    <TextBox
      label={label}
      value={value}
      readOnly={isEditing}
      elementAttr={{ class: 'form-editor' }}
      inputAttr={{ class: 'form-editor-input' }}
      stylingMode='filled'
      onValueChange={onValueChange}
    >
      <Validator validationRules={[{ type: 'required' }]} validationGroup={validationGroup}></Validator>
    </TextBox>
  );
};
