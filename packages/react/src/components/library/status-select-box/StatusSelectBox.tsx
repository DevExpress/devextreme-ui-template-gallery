import './StatusSelectBox.scss';
import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import type { EditorStyle, LabelMode } from 'devextreme-react/common';
import { ContactStatus } from '../../utils/contact-status/ContactStatus';
import { CONTACT_STATUS_LIST } from '../../../shared/constants';

interface StatusSelectBoxProps {
  value: string,
  readOnly?: boolean,
  stylingMode?: EditorStyle,
  labelMode?: LabelMode | undefined,
  onValueChange: (value) => void,
}

const FieldRender = (data) => {
  return <div className='status-editor-field'>
    <ContactStatus
      text={data}
      showText={false}
      contentClass='status-indicator'
    />
    <TextBox
      className={`status-${data?.toLowerCase()}`}
      value={data}
      hoverStateEnabled={false}
      inputAttr={{ class: 'status-input', statusEditorInput: '' }}
      readOnly
    />
  </div>;
};

const ItemRender = (item) => {
  return <div>
    <ContactStatus text={item} />
  </div>;
};

export const StatusSelectBox = ({
  value,
  readOnly,
  stylingMode,
  labelMode,
  onValueChange
}: StatusSelectBoxProps) => {
  return <SelectBox
    label='Status'
    value={value}
    items={CONTACT_STATUS_LIST}
    onValueChange={onValueChange}
    itemRender={ItemRender}
    readOnly={readOnly}
    stylingMode={stylingMode}
    labelMode={labelMode}
    width='100%'
    fieldRender={FieldRender}
  />;
};
