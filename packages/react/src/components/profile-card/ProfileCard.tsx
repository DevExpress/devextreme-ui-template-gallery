import './ProfileCard.scss';
import React, { useRef } from 'react';
import Form, { Item, Label, ValidationRule } from 'devextreme-react/form';
import { StatusSelectBox } from '../status-select-box/StatusSelectBox';
import { PicturedItemSelectBox } from '../pictured-item-select-box/PicturedItemSelectBox';
import { useScreenSize, getSizeQualifier } from '../../utils/media-query';

interface ProfileCardItem {
  dataField: any,
  editorType: any,
  colSpan: number,
  label: string,
  validators: any[],
}

interface ProfileCardProps {
  items: ProfileCardItem[],
  colCount: number,
  title: string,
  cardData: any,
  onDataChanged: (cardData: any) => void,
}

const SwitchComponent = ({ item, cardData, onFieldChange }) => {
  switch (item.dataField) {
    case 'status': {
      return <StatusSelectBox
        labelMode='hidden'
        value={cardData[item.dataField]}
        onValueChange={onFieldChange(item.dataField)}
      />;
    }
    case 'supervisor': {
      return <PicturedItemSelectBox
        label={item.label}
        value={cardData[item.dataField]}
        items={item.itemsList}
        onValueChange={onFieldChange(item.dataField)}
      />;
    }
    case 'default': {
      return null;
    }
  }
  return null;
};

export const ProfileCard = ({
  items = [],
  colCount = 2,
  title = '',
  cardData,
  onDataChanged,
  children
}: React.PropsWithChildren<ProfileCardProps>) => {
  const { isXSmall } = useScreenSize();
  const formRef = useRef<Form>(null);
  const onFieldChange = (fieldName) => (value) => {
    const isValid = formRef.current?.instance.validate().isValid;

    if (!isValid) {
      return;
    }

    if (fieldName) {
      cardData[fieldName] = value;
    }

    onDataChanged(cardData);
  };

  return <div className='panel'>
    <div className='title-text panel-header'>
      {title}
    </div>
    <div className='form-container'>
      {children}
      <Form
        ref={formRef}
        formData={cardData}
        showColonAfterLabel
        colCount={isXSmall ? 2 : colCount}
        screenByWidth={getSizeQualifier}
        labelLocation='top'
        labelMode='outside'
        onFieldDataChanged={onFieldChange}
      >
        {items.map((item, index) => (
          <Item key={index}
            dataField={item.dataField}
            editorType={item.editorType}
            // editorOptions = {assign | apply:{stylingMode: 'outlined'}: item.editorOptions}
            colSpan={item.colSpan}>
            {item.label && <Label text={item.label} />}
            {item.validators.map((rule, index) =>
              <ValidationRule
                key={index}
                type={rule.type}
              />)
            }
            <SwitchComponent item={item} cardData={cardData} onFieldChange={onFieldChange} />
          </Item>
        ))}
      </Form>
    </div>
  </div>;
};
