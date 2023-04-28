import './PicturedItemSelectBox.scss';
import React from 'react';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';

const fieldRender = (data) => {
  return <div
    className='pictured-item-select-field'>
    <img alt={data.name}
      className='pictured-item-image'
      src='data:image/png;base64,{{data.image}}'
    />
    <TextBox
      hoverStateEnabled={false}
      inputAttr={{ class: 'pictured-item-editor-input' }}
      readOnly
      value={data.name}
    />
  </div>;
};

const ItemRender = (data) => {
  return <div>
    <img alt='data.name'
      className='pictured-item-image'
      height='20px'
      src='data:image/png;base64,{{data.image}}' />
    {data.name}
  </div>;
};

export const PicturedItemSelectBox = ({ value, label = '', items = [], onValueChange }) => {
  return <SelectBox
    className='pictured-item-select-box'
    value={value}
    onValueChange={onValueChange}
    label={label}
    items={items}
    itemRender={ItemRender}
    valueExpr='name'
    stylingMode='outlined'
    labelMode='hidden'
    width='100%'
    fieldTemplate={fieldRender}
    dropDownOptions={{ wrapperAttr: { class: 'pictured-item-select-box-dropdown' } }}
  />;
};
