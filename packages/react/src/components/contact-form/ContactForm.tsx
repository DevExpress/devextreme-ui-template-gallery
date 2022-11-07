import React, { useState, useCallback } from 'react';

import { ToolbarForm } from '../toolbar-form/ToolbarForm';
import { ContactFromDetails } from './ContactFormDetails';

import { withLoadPanel } from '../../shared/utils/withLoadPanel';

import { Contact } from '../../shared/types/crm-contact';

import './ContactForm.scss';

const ContactFromDetailsWithLoadPanel = withLoadPanel(ContactFromDetails);

export const ContactForm = ({ data }: { data?: Contact }) => {
  const [editing, setEditing] = useState(false);

  const handleEditClick = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  return (
    <div className='contact-form'>
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
    </div>
  );
};
