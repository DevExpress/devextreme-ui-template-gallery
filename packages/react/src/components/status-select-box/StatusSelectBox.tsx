import './StatusSelectBox.scss';
import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import { ContactStatus } from '../utils/contact-status/ContactStatus';

export const StatusSelectBox = () => {
  return <SelectBox
    label="Status"
    value="value"
    onValueChange={onValueChange}
    items={items}
    readOnly={readOnly}
    stylingMode="stylingMode"
    labelMode={labelMode}
    width="100%"
    fieldTemplate="field"
  >
    <div
      // * dxTemplate="let data of 'field'"
      className="status-editor-field" >
      <ContactStatus className="status-indicator"
        value={data}
        showText={false}
      />
      <TextBox
        className="status-{{data | lowercase}}"
        value={data}
        hoverStateEnabled={false}
        inputAttr={{ class: 'status-input status-editor-input' }}
        readOnly
      />
    </div >
    <div
      // * dxTemplate="let data of 'item'" >
      <ContactStatus value={data} />
  </div >
</dx - select - box >
}