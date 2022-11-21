import React, { useState } from 'react';

import { ToolbarForm } from '../toolbar-form/ToolbarForm';
import { ContactFromDetails } from './ContactFormDetails';

import { withLoadPanel } from '../../shared/utils/withLoadPanel';

import { Contact } from '../../shared/types/crm-contact';

import ValidationGroup from 'devextreme-react/validation-group';

import './ContactForm.scss';

const ContactFromDetailsWithLoadPanel = withLoadPanel(ContactFromDetails);

export const ContactForm = ({ data }: { data?: Contact }) => {
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  return (
    <div className='contact-form'>
      <ValidationGroup>
        <ToolbarForm toggleEditing={handleEditClick} editing={editing} />
        <ContactFromDetailsWithLoadPanel
          loading={!data}
          data={data}
          editing={editing}
          panelProps={{
            container: '.contact-form',
            position: { of: '.contact-form' },
          }}
        />
      </ValidationGroup>
    </div>
  );
};
