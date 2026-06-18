import './StatusSelectBox.scss';
import React from 'react';
import SelectBox, { FieldAddons } from 'devextreme-react/select-box';
import type { EditorStyle, LabelMode } from 'devextreme-react/common';
import { ContactStatus } from '../../utils/contact-status/ContactStatus';
import { CONTACT_STATUS_LIST } from '../../../shared/constants';

interface StatusSelectBoxProps {
  value: string;
  readOnly?: boolean;
  stylingMode?: EditorStyle;
  labelMode?: LabelMode | undefined;
  onValueChange: (value) => void;
}

const FieldBeforeRender = (data?: string) => data
  ? (
    <ContactStatus
      text={data}
      contentClass='status-indicator'
    />
  )
  : null;

const ItemRender = (item) => {
  return (
    <div>
      <ContactStatus text={item} />
    </div>
  );
};

export const StatusSelectBox = ({
  value,
  readOnly,
  stylingMode,
  labelMode,
  onValueChange,
}: StatusSelectBoxProps) => {
  return (
    <SelectBox
      className='status-select-box'
      label='Status'
      value={value}
      items={CONTACT_STATUS_LIST}
      onValueChange={onValueChange}
      itemRender={ItemRender}
      readOnly={readOnly}
      stylingMode={stylingMode}
      labelMode={labelMode}
      width='100%'
      placeholder=''
      displayExpr={() => ''}
    >
      <FieldAddons beforeRender={FieldBeforeRender} />
    </SelectBox>
  );
};
