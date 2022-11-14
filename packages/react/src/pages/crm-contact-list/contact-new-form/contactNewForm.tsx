
import React from 'react';

import Form, { Item as FormItem, ColCountByScreen } from 'devextreme-react/form';
import { newContact } from '../../../shared/types/crm-contact';
import { FormTextbox, FormPhotoUploader } from '../../../components';

export const ContactNewForm = () => {
  const validationGroup = 'contactNewValidationGroup';

  const updateField = (field: string) => (value) => {
    return { ...newContact, ...{ [field]: value } };
  };

  return (
    <Form
      labelMode='floating'
      className='plain-styled-form'
      validationGroup={validationGroup}
    >
      <FormItem itemType='group'>
        <ColCountByScreen xs={1} sm={1} md={1} lg={1}></ColCountByScreen>
        <FormItem>
          <FormPhotoUploader />
        </FormItem>
      </FormItem>

      <FormItem itemType='group'>
        <ColCountByScreen xs={1} sm={1} md={2} lg={2}></ColCountByScreen>
        <FormItem>
          <FormTextbox
            label='First Name'
            value={newContact.firstName}
            isEditing={false}
            onValueChange={updateField('firstName')}
            // validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
        <FormItem>
          <FormTextbox
            label='Last Name'
            value={newContact.lastName}
            isEditing={false}
            onValueChange={updateField('lastName')}
            // validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
      </FormItem>

      <FormItem itemType='group'>
        <ColCountByScreen xs={1} sm={1} md={2} lg={2}></ColCountByScreen>
        <FormItem>
          <FormTextbox
            label='Company'
            value={newContact.company}
            isEditing={false}
            onValueChange={updateField('company')}
            // validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
        <FormItem>
          <FormTextbox
            label='Position'
            value={newContact.position}
            isEditing={false}
            onValueChange={updateField('position')}
            // validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
      </FormItem>

      <FormItem itemType='group' cssClass='contact-fields-group'>
        <ColCountByScreen xs={1} sm={1} md={2} lg={2}></ColCountByScreen>
        <FormItem>
          <FormTextbox
            value={newContact.manager}
            label='Assigned to'
            isEditing={false}
            onValueChange={updateField('manager')}
            // validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
        <FormItem>
          <FormTextbox
            value={newContact.phone}
            isEditing={false}
            onValueChange={updateField('phone')}
            icon='tel'
            mask='+1(000)000-0000'
            // validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
        <FormItem>
          <FormTextbox
            value={newContact.email}
            onValueChange={updateField('email')}
            isEditing={false}
            icon='email'
            //  validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
        <FormItem>
          <FormTextbox
            value={newContact.address}
            isEditing={false}
            onValueChange={updateField('address')}
            icon='home'
            // validationGroup={validationGroup}
          ></FormTextbox>
        </FormItem>
      </FormItem>
    </Form>
  );
};
