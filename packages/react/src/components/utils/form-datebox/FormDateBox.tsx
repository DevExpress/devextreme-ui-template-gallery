import React from 'react';

import DateBox from 'devextreme-react/date-box';
import Validator, { RequiredRule } from 'devextreme-react/validator';

export const FormDateBox = ({
  value,
  readOnly,
  name,
  label,
  onValueChange
}) => {
  return (
    <DateBox
      value={value}
      readOnly={readOnly}
      name={name}
      label={label}
      inputAttr={{ class: 'form-editor-input' }}
      stylingMode='filled'
      placeholder='MM/dd/y'
      displayFormat='MM/dd/y'
      onValueChange={onValueChange}
    >
      <Validator>
        <RequiredRule />
      </Validator>
    </DateBox>
  );
};
