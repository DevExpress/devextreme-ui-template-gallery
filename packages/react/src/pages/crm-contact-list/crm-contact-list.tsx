import React, { useState, useEffect, useRef, useCallback } from 'react';

import './crm-contact-list.scss';

import DataGrid, {
  Sorting, Selection, HeaderFilter, Scrolling, SearchPanel,
  ColumnChooser, Export, Column, Toolbar, Item
} from 'devextreme-react/data-grid';
import Button from 'devextreme-react/button';
import DropDownButton from 'devextreme-react/drop-down-button';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import LoadPanel from 'devextreme-react/load-panel';

import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import { ColumnCellTemplateData, RowClickEvent } from 'devextreme/ui/data_grid';

import { ContactStatus } from '../../components';

import { getContacts } from 'dx-template-gallery-data';

import { ContactStatus as ContactStatusType } from '../../shared/types/crm-contact';
import { CONTACT_STATUS_LIST } from '../../shared/constants';

import { ContactPanel } from './contact-panel/contactPanel';

type FilterContactStatus = ContactStatusType | 'All';

const cellNameRender = (cell: ColumnCellTemplateData) => (
  <div className='name-template'>
    <div>{cell.data.name}</div>
    <div className='position'>{cell.data.position}</div>
  </div>
);

const fieldRender = (text: string) => (
  <>
    <ContactStatus text={text} />
    <TextBox readOnly />
  </>
);

const editCellStatusRender = () => (
  <SelectBox className='cell-info' dataSource={CONTACT_STATUS_LIST} itemRender={ContactStatus} fieldRender={fieldRender} />
);

const cellPhoneRender = (cell: ColumnCellTemplateData) => (
  String(cell.data.phone).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3')
);

const filterStatusList = ['All', ...CONTACT_STATUS_LIST];

export const CRMContactList = () => {
  const [status, setStatus] = useState(filterStatusList[0]);
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setPanelOpen] = useState(false);
  const [contactId, setContactId] = useState(null);

  const grid = useRef<DataGrid>(null);

  useEffect(() => {
    getContacts()
      .then((data) => {
        setGridData(data);
        if (data.length) {
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const filterByStatus = useCallback((e: SelectionChangedEvent) => {
    const { item: status }: { item: FilterContactStatus } = e;

    if (status === 'All') {
      grid.current?.instance.clearFilter();
    } else {
      grid.current?.instance.filter(['status', '=', status]);
    }

    setStatus(status);
  }, []);

  const addRow = useCallback(() => {
    grid.current?.instance.addRow();
  }, []);

  const changePanelOpen = useCallback(() => {
    setPanelOpen(!isOpen);
  }, [isOpen]);

  const refresh = useCallback(() => {
    grid.current?.instance.refresh();
  }, []);

  const rowClick = useCallback((e: RowClickEvent) => {
    const { data } = e;

    setContactId(data.id);
    changePanelOpen();
  }, []);

  return (
    <div className='view crm-contact-list'>
      {!loading ? (
        <div className='view-wrapper'>
          <DataGrid
            className='grid'
            noDataText=''
            dataSource={gridData}
            allowColumnReordering
            ref={grid}
          >
            <SearchPanel visible placeholder='Contact Search' />
            <ColumnChooser enabled />
            <Export enabled allowExportSelectedData formats={['xlsx', 'pdf']} />
            <Selection selectAllMode='allPages' showCheckBoxesMode='always' mode='multiple' />
            <HeaderFilter visible />
            <Sorting mode='multiple' />
            <Scrolling mode='virtual' />
            <Toolbar>
              <Item location='before'>
                <div className='grid-header'>Contacts</div>
              </Item>
              <Item location='before' locateInMenu='auto'>
                <DropDownButton dataSource={filterStatusList} stylingMode='text' width={160} selectedItemKey={status} useSelectMode onSelectionChanged={filterByStatus} />
              </Item>
              <Item location='after' locateInMenu='auto'>
                <Button icon='plus' text='Add Contact' type='default' stylingMode='contained' onClick={addRow} />
              </Item>
              <Item location='after' locateInMenu='auto' showText='inMenu' widget='dxButton'>
                <Button icon='refresh' text='Refresh' stylingMode='text' onClick={refresh} />
              </Item>
              <Item location='after' locateInMenu='auto'>
                <div className='separator' />
              </Item>
              <Item name='exportButton' />
              <Item location='after' locateInMenu='auto'>
                <div className='separator' />
              </Item>
              <Item name='columnChooserButton' locateInMenu='auto' />
              <Item name='searchPanel' locateInMenu='auto' />
            </Toolbar>
            <Column dataField='name' caption='Name' sortOrder='asc' hidingPriority={5} minWidth={150} cellRender={cellNameRender} />
            <Column dataField='company' caption='Company' hidingPriority={5} minWidth={150} />
            <Column dataField='status' caption='Status' dataType='string' hidingPriority={3} minWidth={100} cellRender={ContactStatus} editCellRender={editCellStatusRender} />
            <Column dataField='assignedTo' caption='Assigned to' hidingPriority={4} />
            <Column dataField='phone' caption='Phone' hidingPriority={2} cellRender={cellPhoneRender} />
            <Column dataField='email' caption='Email' hidingPriority={1} />
          </DataGrid>
          {contactId && <ContactPanel contactId={contactId} isOpen={isOpen} changePanelOpen={changePanelOpen} />}
        </div>
      ) : (
        <LoadPanel visible />
      )}
    </div>
  );
};
