import './StatusSelectBox.scss';
import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import type { EditorStyle, LabelMode } from 'devextreme/common';
import { ContactStatus } from '../utils/contact-status/ContactStatus';

interface StatusSelectBoxProps {
  value: any,
  items?: any[],
  readOnly?: boolean,
  stylingMode?: EditorStyle,
  labelMode?: LabelMode,
  onValueChange: () => void,
}

const FieldRender = (data) => {
  return <div className='status-editor-field'>
    <ContactStatus
      value={data}
      text='indicator'
      showText={false}
    />
    <TextBox
      className='status-{{data | lowercase}}'
      value={data}
      hoverStateEnabled={false}
      inputAttr={{ class: 'status-input status-editor-input' }}
      readOnly
    />
  </div>;
};

const ItemRender = (item) => {
  return <div>
    <ContactStatus value={item} />
  </div>;
};

export const StatusSelectBox = ({
  value,
  items = [],
  readOnly,
  stylingMode = 'outlined',
  labelMode = 'floating',
  onValueChange
}: StatusSelectBoxProps) => {
  return <SelectBox
    label='Status'
    value={value}
    onValueChange={onValueChange}
    items={items}
    itemRender={ItemRender}
    readOnly={readOnly}
    stylingMode={stylingMode}
    labelMode={labelMode}
    width='100%'
    fieldRender={FieldRender}
  />;
};
