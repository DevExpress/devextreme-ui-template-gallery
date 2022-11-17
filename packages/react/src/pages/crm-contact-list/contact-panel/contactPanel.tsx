
import React, { useEffect, useState, useCallback } from 'react';

import './contactPanel.scss';

import { getContact } from 'dx-template-gallery-data';
import { Contact } from '../../../shared/types/crm-contact';
import { withLoadPanel } from '../../../shared/utils/withLoadPanel';

import { ContactPanelDetails } from './contactPanelDetails';

const ContactPanelWithLoadPanel = withLoadPanel(ContactPanelDetails);

export const ContactPanel = ({ contactId, isOpen, changePanelOpen } : { contactId: number, isOpen: boolean, changePanelOpen:()=> void }) => {

  const [data, setData] = useState<Contact>();

  const loadData = useCallback(() => {
    getContact(contactId)
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, [contactId]);

  const onDataChanged = useCallback(data => {
    setData(data);
  }, []);

  useEffect(() => {
    if(contactId) {
      loadData();
    }
  }, [loadData]);

  return (
    <ContactPanelWithLoadPanel
      loading={!data}
      contact={data}
      isOpen={isOpen}
      onDataChanged={onDataChanged}
      changePanelOpen={changePanelOpen}
      panelProps={{
        position: { of: '.panel' },
        container: '.panel'
      }}
    />
  );
};

