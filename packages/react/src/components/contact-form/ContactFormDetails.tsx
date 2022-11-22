import React, { useState } from 'react';

import classNames from 'classnames';

import From, { Item as ItemForm, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
import Validator, { PatternRule, EmailRule } from 'devextreme-react/validator';
import NumberBox from 'devextreme-react/number-box';

import { FormPhoto } from '../form-photo/FormPhoto';
import { ContactStatus } from '../contact-status/ContactStatus';
import { FormTextbox } from '../form-textbox/FormTextbox';

import { Contact } from '../../shared/types/crm-contact';
import { CONTACT_STATUS_LIST } from '../../shared/constants';

const PHOTO_SIZE = 184;

const statusRender = (text: string) => (
  <div className='status-editor-field'>
    <ContactStatus text={text} showText={false} />
    <TextBox
      className={`status-contact status-${text.toLowerCase()}`}
      inputAttr={{ class: 'status-editor-input' }}
      readOnly
      text={text}
      hoverStateEnabled={false}
    />
  </div>
);

const statusItemRender = (text: string) => <ContactStatus text={text} />;

export const ContactFromDetails = ({ data, editing }: { data: Contact, editing: boolean }) => {
  const [formData, setFormData] = useState(data);

  const updateField = (field: string) => (value) => {
    if(field === 'state') {
      setFormData({ ...formData, ...{ [field]: { stateShort: value } } });
    } else {
      setFormData({ ...formData, ...{ [field]: value } });
    }
  };

  return (
    <From
      className={classNames({ 'plain-styled-form': true, 'view-mode': !editing })}
      labelMode='floating'
    >
      <GroupItem colCount={2}>
        <ColCountByScreen xs={2} />
        <ItemForm>
          <FormPhoto link={formData.image} size={PHOTO_SIZE} />
        </ItemForm>

        <GroupItem>
          <ItemForm>
            <SelectBox
              label='Status'
              value={formData.status}
              readOnly={!editing}
              stylingMode='filled'
              items={CONTACT_STATUS_LIST}
              width='100%'
              fieldRender={statusRender}
              itemRender={statusItemRender}
              onValueChange={updateField('status')}
            />
          </ItemForm>

          <ItemForm>
            <FormTextbox
              label='First Name'
              value={formData.firstName}
              isEditing={!editing}
              onValueChange={updateField('firstName')}
            />
          </ItemForm>

          <ItemForm>
            <FormTextbox
              label='Last Name'
              value={formData.lastName}
              isEditing={!editing}
              onValueChange={updateField('lastName')}
            />
          </ItemForm>
        </GroupItem>

        <ItemForm>
          <FormTextbox
            label='Position'
            value={formData.position}
            isEditing={!editing}
            onValueChange={updateField('position')}
          />
        </ItemForm>

        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Assigned to'
            value={formData.manager}
            isEditing={!editing}
            onValueChange={updateField('manager')}
          />
        </ItemForm>

        <ItemForm cssClass='accent' colSpan={2}>
          <FormTextbox
            label='Company'
            value={formData.company}
            isEditing={!editing}
            onValueChange={updateField('company')}
          />
        </ItemForm>
      </GroupItem>

      <GroupItem colCount={4} caption='Contacts'>
        <ColCountByScreen xs={2} />
        <ItemForm colSpan={4}>
          <FormTextbox
            label='Address'
            value={formData.address}
            isEditing={!editing}
            onValueChange={updateField('address')}
          />
        </ItemForm>

        <ItemForm colSpan={2}>
          <FormTextbox
            label='City'
            value={formData.city}
            isEditing={!editing}
            onValueChange={updateField('city')}
          />
        </ItemForm>

        <ItemForm>
          <FormTextbox
            label='State'
            value={formData.state.stateShort}
            isEditing={!editing}
            onValueChange={updateField('state')}
          />
        </ItemForm>

        <ItemForm>
          <NumberBox
            label='Zip Code'
            value={formData.zipCode}
            readOnly={!editing}
            elementAttr={{ class: 'form-editor' }}
            inputAttr={{ class: 'form-editor-input' }}
            stylingMode='filled'
            onValueChange={updateField('zipCode')}
          >
            <Validator>
              <PatternRule
                pattern='/^\d{5}$/'
                message='Zip is invalid'
              />
            </Validator>
          </NumberBox>
        </ItemForm>
      </GroupItem>

      <GroupItem colCount={2} cssClass='contact-fields-group'>
        <ColCountByScreen xs={2} />
        <ItemForm>
          <FormTextbox
            label='Phone'
            value={formData.phone}
            mask='+1(000)000-0000'
            isEditing={!editing}
            onValueChange={updateField('phone')}
          />
          <Button
            className='form-item-button'
            visible={!editing}
            text='Call'
            icon='tel'
            type='default'
            stylingMode='outlined'
          />
        </ItemForm>

        <ItemForm>
          <FormTextbox
            label='Email'
            value={formData.email}
            isEditing={!editing}
            onValueChange={updateField('email')}
          >
            <EmailRule />
          </FormTextbox>
          <Button
            className='form-item-button'
            visible={!editing}
            text='Send Email'
            icon='email'
            type='default'
            stylingMode='outlined'
          />
        </ItemForm>
      </GroupItem>
    </From>
  );
};
