import React, { useState } from 'react';

import classNames from 'classnames';

import From, { Item as ItemForm, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';

import { FormPhoto } from '../form-photo/FormPhoto';
import { ContactStatus } from '../contact-status/ContactStatus';
import { FormTextbox } from '../form-textbox/FormTextbox';

import { Contact } from '../../shared/types/crm-contact';
import { CONTACT_STATUS_LIST } from '../../shared/constants';

const PHOTO_SIZE = 184;

const StatusRender = (text: string) => (
  <>
    <ContactStatus text={text} />
    <TextBox readOnly />
  </>
);

const StatusItem = (text: string) => <ContactStatus text={text} />;

export const ContactFromDetails = ({ data, editing }: { data: Contact, editing: boolean }) => {
  const [formData, setFormData] = useState(data);

  const updateStatus = (status) => {
    setFormData({ ...formData, ...{ status } });
  };
  const updateFirstName = (firstName) => {
    setFormData({ ...formData, ...{ firstName } });
  };
  const updateLastName = (lastName) => {
    setFormData({ ...formData, ...{ lastName } });
  };
  const updatePosition = (position) => {
    setFormData({ ...formData, ...{ position } });
  };
  const updateManager = (manager) => {
    setFormData({ ...formData, ...{ manager } });
  };
  const updateCompany = (company) => {
    setFormData({ ...formData, ...{ company } });
  };
  const updateAddress = (address) => {
    setFormData({ ...formData, ...{ address } });
  };
  const updateCity = (city) => {
    setFormData({ ...formData, ...{ city } });
  };
  const updateState = (state) => {
    setFormData({ ...formData, ...{ state: { stateShort: state } } });
  };
  const updateZipCode = (zipCode) => {
    setFormData({ ...formData, ...{ zipCode } });
  };
  const updatePhone = (phone) => {
    setFormData({ ...formData, ...{ phone } });
  };
  const updateEmail = (email) => {
    setFormData({ ...formData, ...{ email } });
  };

  return (
    <From
      className={classNames({ 'plain-styled-form': true, 'view-mode': !editing })}
      labelMode='floating'
    >
      <GroupItem colCount={2}>
        <ColCountByScreen xs={2}></ColCountByScreen>
        <ItemForm>
          <FormPhoto link={formData.image} size={PHOTO_SIZE}></FormPhoto>
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
              fieldRender={StatusRender}
              itemRender={StatusItem}
              onValueChange={updateStatus}
            />
          </ItemForm>

          <ItemForm>
            <FormTextbox
              label='First Name'
              value={formData.firstName}
              isEditing={!editing}
              onValueChange={updateFirstName}
            ></FormTextbox>
          </ItemForm>

          <ItemForm>
            <FormTextbox
              label='Last Name'
              value={formData.lastName}
              isEditing={!editing}
              onValueChange={updateLastName}
            ></FormTextbox>
          </ItemForm>
        </GroupItem>

        <ItemForm>
          <FormTextbox
            label='Position'
            value={formData.position}
            isEditing={!editing}
            onValueChange={updatePosition}
          ></FormTextbox>
        </ItemForm>

        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Assigned to'
            value={formData.manager}
            isEditing={!editing}
            onValueChange={updateManager}
          ></FormTextbox>
        </ItemForm>

        <ItemForm cssClass='accent' colSpan={2}>
          <FormTextbox
            label='Company'
            value={formData.company}
            isEditing={!editing}
            onValueChange={updateCompany}
          ></FormTextbox>
        </ItemForm>
      </GroupItem>

      <GroupItem colCount={4} caption='Contacts'>
        <ColCountByScreen xs={2}></ColCountByScreen>
        <ItemForm colSpan={4}>
          <FormTextbox
            label='Address'
            value={formData.address}
            isEditing={!editing}
            onValueChange={updateAddress}
          ></FormTextbox>
        </ItemForm>

        <ItemForm colSpan={2}>
          <FormTextbox
            label='City'
            value={formData.city}
            isEditing={!editing}
            onValueChange={updateCity}
          ></FormTextbox>
        </ItemForm>

        <ItemForm>
          <FormTextbox
            label='State'
            value={formData.state.stateShort}
            isEditing={!editing}
            onValueChange={updateState}
          ></FormTextbox>
        </ItemForm>

        <ItemForm>
          <FormTextbox
            label='Zip Code'
            value={formData.zipCode}
            isEditing={!editing}
            validators={[{ type: 'pattern', pattern: /^\d{5}$/, message: 'Zip is invalid' }]}
            onValueChange={updateZipCode}
          ></FormTextbox>
        </ItemForm>
      </GroupItem>

      <GroupItem colCount={2} cssClass='contact-fields-group'>
        <ColCountByScreen xs={2}></ColCountByScreen>
        <ItemForm>
          <FormTextbox
            label='Phone'
            value={formData.phone}
            mask='+1(000)000-0000'
            isEditing={!editing}
            validators={[]}
            onValueChange={updatePhone}
          ></FormTextbox>
          <Button
            className='form-item-button'
            visible={!editing}
            text='Call'
            icon='tel'
            type='default'
            stylingMode='outlined'
          ></Button>
        </ItemForm>

        <ItemForm>
          <FormTextbox
            label='Email'
            value={formData.email}
            isEditing={!editing}
            validators={[{ type: 'email' }]}
            onValueChange={updateEmail}
          ></FormTextbox>
          <Button
            className='form-item-button'
            visible={!editing}
            text='Send Email'
            icon='email'
            type='default'
            stylingMode='outlined'
          ></Button>
        </ItemForm>
      </GroupItem>
    </From>
  );
};
