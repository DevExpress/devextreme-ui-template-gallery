import './ProfileCard.scss';
import React, { useRef, useMemo } from 'react';
import { Form, FormRef, Item, Label, ValidationRule as ValidationRuleComponent, FormTypes } from 'devextreme-react/form';
import { StatusSelectBox } from '../status-select-box/StatusSelectBox';
import { PicturedItemSelectBox } from '../pictured-item-select-box/PicturedItemSelectBox';
import { useScreenSize, getSizeQualifier } from '../../../utils/media-query';
import { ValidationRule } from 'devextreme-react/common';

export interface ProfileCardItem {
  dataField?: string,
  editorType?: FormTypes.FormItemComponent,
  editorOptions?: Record<string, string | string[] | Date | undefined>,
  colSpan?: number,
  label?: string,
  validators?: ValidationRule[],
  itemsList?: Record<string, string>[],
}

interface ProfileCardProps {
  items: ProfileCardItem[],
  colCount?: number,
  title: string,
  cardData: Record<string, string>,
  onDataChanged: (cardData: Record<string, string>) => void,
  wrapperCssClass?: string;
}

const commonEditorOptions = {
  stylingMode: 'filled',
  valueChangeEvent: 'input',
};

export const ProfileCard = ({
  items = [],
  colCount = 2,
  title = '',
  cardData,
  onDataChanged,
  children,
  wrapperCssClass,
}: React.PropsWithChildren<ProfileCardProps>) => {
  const { isXSmall } = useScreenSize();
  const formRef = useRef<FormRef>(null);
  const onFieldChange = (fieldName) => (value) => {
    const isValid = formRef.current?.instance().validate().isValid;

    if (!isValid) {
      return;
    }

    if (fieldName) {
      cardData = { ...cardData, [fieldName]: value };
    }

    onDataChanged(cardData);
  };
  const onFormFieldChange = (e: FormTypes.FieldDataChangedEvent) => onFieldChange(e.dataField)(e.value);
  const itemsWithCommonOptions = useMemo(() => items.map((item) => {
    item.editorOptions = { ...commonEditorOptions, ...item.editorOptions };
    return item;
  }), [items]);

  const renderItems = useMemo(() => itemsWithCommonOptions.map((item, index) => (
    <Item key={index}
      dataField={item.dataField}
      editorType={item.editorType}
      editorOptions={item.editorOptions}
      colSpan={item.colSpan}>
      {item.label && <Label text={item.label} />}
      {item.validators?.map((rule, index) =>
        <ValidationRuleComponent
          key={index}
          type={rule.type}
        />)
      }
      {item.dataField === 'status' &&
        <StatusSelectBox
          labelMode='hidden'
          stylingMode='filled'
          value={cardData[item.dataField]}
          onValueChange={onFieldChange(item.dataField)}
        />
      }
      {item.dataField === 'supervisor' &&
        <PicturedItemSelectBox
          label={item.label}
          value={cardData[item.dataField]}
          items={item.itemsList}
          onValueChange={onFieldChange(item.dataField)}
        />
      }
    </Item>
  )), [items, onFieldChange, cardData]);

  return (
    <div className={wrapperCssClass}>
      <div className='profile-card-panel'>
        <div className='title-text profile-card-panel-header'>
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
            onFieldDataChanged={onFormFieldChange}
          >
            {renderItems}
          </Form>
        </div>
      </div>
    </div>
  );
};
