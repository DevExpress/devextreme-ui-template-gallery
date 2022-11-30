import React, { useState, useEffect, useCallback } from 'react';

import './crm-contact-list.scss';

import { getContacts } from 'dx-template-gallery-data';

import { RowClickEvent } from 'devextreme/ui/data_grid';

import { Contact } from '../../shared/types/crm-contact';

import { FormPopup, ContactNewForm } from '../../components';
import { ContactPanel } from './contact-panel/ContactPanel';
import { ContactDataGrid } from './contact-data-grid/ContactDataGrid';

export const CRMContactList = () => {
  const [gridData, setGridData] = useState<Contact[]>();
  const [isPanelOpened, setPanelOpened] = useState(false);
  const [contactId, setContactId] = useState<number|null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    getContacts()
      .then((data) => {
        setGridData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const changePopupVisibility = () => {
    setPopupVisible(!popupVisible);
  };

  const changePanelOpened = () => {
    setPanelOpened(!isPanelOpened);
    setContactId(null);
  };

  const onAddContactClick = useCallback(() => {
    setPopupVisible(true);
  }, []);

  const onRowClick = useCallback(({ data }: RowClickEvent) => {
    setContactId(data.id);
    setPanelOpened(true);
  }, []);

  return (
    <div className='view crm-contact-list'>
      <div className='view-wrapper'>
        <ContactDataGrid
          data={gridData}
          contactId={contactId}
          onAddContactClick={onAddContactClick}
          onRowClick={onRowClick}
        />
        <ContactPanel contactId={contactId} isOpened={isPanelOpened} changePanelOpened={changePanelOpened} />
        <FormPopup title='New Contact' visible={popupVisible} changeVisibility={changePopupVisibility}>
          <ContactNewForm />
        </FormPopup>
      </div>
    </div>
  );
};
