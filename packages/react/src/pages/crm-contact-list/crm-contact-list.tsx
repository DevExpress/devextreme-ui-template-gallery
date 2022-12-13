import React, { useState, useEffect, useCallback, useRef } from 'react';

import './crm-contact-list.scss';

import { getContacts } from 'dx-template-gallery-data';
import DataGrid from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import { RowClickEvent } from 'devextreme/ui/data_grid';

import { Contact } from '../../types/crm-contact';

import { FormPopup, ContactNewForm, ContactPanel, ContactDataGrid } from '../../components';

export const CRMContactList = () => {
  const [gridDataSource, setGridDataSource] = useState<DataSource<Contact[], string>>();
  const [isPanelOpened, setPanelOpened] = useState(false);
  const [contactId, setContactId] = useState<number>(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const gridRef = useRef<DataGrid>(null);

  useEffect(() => {
    setGridDataSource(new DataSource({
      key: 'id',
      load: () => getContacts(),
    }));
  }, []);

  const changePopupVisibility = () => {
    setPopupVisible(!popupVisible);
  };

  const changePanelOpened = () => {
    setPanelOpened(!isPanelOpened);
    gridRef.current?.instance.option('focusedRowIndex', -1);
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
          dataSource={gridDataSource}
          gridRef={gridRef}
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
