import './PicturedItemSelectBox.scss';
import React from 'react';
import SelectBox, { FieldAddons } from 'devextreme-react/select-box';

interface PictureItemSelectBoxProps {
  value: string;
  label?: string;
  items?: Record<string, string>[];
  onValueChange?: (value) => void;
}

const displayExpr = (data?: Record<string, string> | string) => {
  if (!data) return '';

  return typeof data === 'string' ? data : data.name;
};

const fieldBeforeRender = (data?: Record<string, string>) => data
  ? (
    <img
      alt={data.name}
      className='pictured-item-image'
      src={`data:image/png;base64,${data.image}`}
    />
  )
  : null;

const ItemRender = (data) => {
  return (
    <>
      <img
        alt={data.name}
        className='pictured-item-image'
        height='20px'
        src={`data:image/png;base64,${data.image}`}
      />
      {data.name}
    </>
  );
};

export const PicturedItemSelectBox = ({
  value,
  label = '',
  items = [],
  onValueChange,
}: PictureItemSelectBoxProps) => {
  return (
    <SelectBox
      className='pictured-item-select-box'
      value={value}
      onValueChange={onValueChange}
      label={label}
      items={items}
      itemRender={ItemRender}
      valueExpr='name'
      displayExpr={displayExpr}
      stylingMode='filled'
      labelMode='hidden'
      width='100%'
      dropDownOptions={{
        wrapperAttr: { class: 'pictured-item-select-box-dropdown' },
      }}
    >
      <FieldAddons beforeRender={fieldBeforeRender} />
    </SelectBox>
  );
};
