
import React, { useState } from 'react';

import Form, { Item as FormItem, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import { Contact } from '../../types/crm-contact';
import { newContact } from '../../shared/constants';
import { FormTextbox, FormPhotoUploader } from '../../components';
import { EmailRule } from 'devextreme-react/validator';
import { useScreenSize } from '../../utils/media-query';

export const ContactNewForm = () => {
  const { isSmallMobileMedia } = useScreenSize();
  const [newContactData, setNewContactData] = useState<Contact>(newContact);
  const colCountByScreen = {
    xs: isSmallMobileMedia ? 1 : 2,
    sm: 2,
    md: 2,
    lg: 2,
  };

  const updateField = (field: string) => (value) => {
    setNewContactData((prevState) => ({ ...prevState, ...{ [field]: value } }));
  };

  return (
    <Form
      className='plain-styled-form'
    >
      <GroupItem>
        <ColCountByScreen xs={1} sm={1} md={1} lg={1} />
        <FormItem>
          <FormPhotoUploader />
        </FormItem>
      </GroupItem>

      <GroupItem colCountByScreen={colCountByScreen}>
        <FormItem>
          <FormTextbox
            label='First Name'
            value={newContactData.firstName}
            isEditing={false}
            onValueChange={updateField('firstName')}
          />
        </FormItem>
        <FormItem>
          <FormTextbox
            label='Last Name'
            value={newContactData.lastName}
            isEditing={false}
            onValueChange={updateField('lastName')}
          />
        </FormItem>
        <FormItem>
          <FormTextbox
            label='Company'
            value={newContactData.company}
            isEditing={false}
            onValueChange={updateField('company')}
          />
        </FormItem>
        <FormItem>
          <FormTextbox
            label='Position'
            value={newContactData.position}
            isEditing={false}
            onValueChange={updateField('position')}
          />
        </FormItem>
      </GroupItem>

      <GroupItem cssClass='contact-fields-group' colCountByScreen={colCountByScreen}>
        <FormItem>
          <FormTextbox
            value={newContactData.manager}
            label='Assigned to'
            isEditing={false}
            onValueChange={updateField('manager')}
          />
        </FormItem>
        <FormItem>
          <FormTextbox
            value={newContactData.phone}
            isEditing={false}
            onValueChange={updateField('phone')}
            icon='tel'
            mask='+1(000)000-0000'
          />
        </FormItem>
        <FormItem>
          <FormTextbox
            value={newContactData.email}
            onValueChange={updateField('email')}
            isEditing={false}
            icon='email'
          >
            <EmailRule />
          </FormTextbox>
        </FormItem>
        <FormItem>
          <FormTextbox
            value={newContactData.address}
            isEditing={false}
            onValueChange={updateField('address')}
            icon='home'
          />
        </FormItem>
      </GroupItem>
    </Form>
  );
};
