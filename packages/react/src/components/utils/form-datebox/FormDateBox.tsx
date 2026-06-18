import DateBox from 'devextreme-react/date-box';

export const FormDateBox = ({
  value,
  readOnly,
  label,
  onValueChange,
}) => {
  return (
    <DateBox
      value={value}
      readOnly={readOnly}
      label={label}
      elementAttr={{ class: 'form-editor' }}
      inputAttr={{ class: 'form-editor-input' }}
      stylingMode='filled'
      valueChangeEvent='keyup input change'
      placeholder='MM/dd/y'
      displayFormat='MM/dd/y'
      onValueChange={onValueChange}
    />
  );
};
