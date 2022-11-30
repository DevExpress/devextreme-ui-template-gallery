import React, { useCallback, useRef, useState } from 'react';
import { jsPDF as JsPdf } from 'jspdf';

import DataGrid, {
  Sorting, Selection, HeaderFilter, Scrolling, SearchPanel,
  ColumnChooser, Export, Column, Toolbar, Item
} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import TextBox from 'devextreme-react/text-box';
import Button from 'devextreme-react/button';
import DropDownButton from 'devextreme-react/drop-down-button';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';

import { saveAs } from 'file-saver-es';
import { Workbook } from 'exceljs';

import { ColumnCellTemplateData } from 'devextreme/ui/data_grid';
import { SelectionChangedEvent } from 'devextreme/ui/drop_down_button';
import { ExportingEvent, RowClickEvent } from 'devextreme/ui/data_grid';

import { ContactStatus as ContactStatusType, Contact } from '../../../shared/types/crm-contact';
import { CONTACT_STATUS_LIST } from '../../../shared/constants';

import { ContactStatus } from '../../../components';

type FilterContactStatus = ContactStatusType | 'All';

const filterStatusList = ['All', ...CONTACT_STATUS_LIST];

const cellNameRender = (cell: ColumnCellTemplateData) => (
  <div className='name-template'>
    <div>{cell.data.name}</div>
    <div className='position'>{cell.data.position}</div>
  </div>
);

const editCellStatusRender = () => (
  <SelectBox className='cell-info' dataSource={CONTACT_STATUS_LIST} itemRender={ContactStatus} fieldRender={fieldRender} />
);

const cellPhoneRender = (cell: ColumnCellTemplateData) => (
  String(cell.data.phone).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3')
);

const fieldRender = (text: string) => (
  <>
    <ContactStatus text={text} />
    <TextBox readOnly />
  </>
);

const onExporting = (e: ExportingEvent) => {
  if (e.format === 'pdf') {
    const doc = new JsPdf();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('Contacts.pdf');
    });
  } else {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Contacts');

    exportDataGridToXLSX({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Contacts.xlsx');
      });
    });
    e.cancel = true;
  }
};

export const ContactDataGrid = React.memo(({
  data, onRowClick, onAddContactClick
}: { data?: Contact[], onAddContactClick: () => void, onRowClick: (e: RowClickEvent) => void}) => {
  const [status, setStatus] = useState(filterStatusList[0]);
  const grid = useRef<DataGrid>(null);

  const filterByStatus = useCallback((e: SelectionChangedEvent) => {
    const { item: status }: { item: FilterContactStatus } = e;
    if (status === 'All') {
      grid.current?.instance.clearFilter();
    } else {
      grid.current?.instance.filter(['status', '=', status]);
    }

    setStatus(status);
  }, []);

  const refresh = useCallback(() => {
    grid.current?.instance.refresh();
  }, []);

  return (
    <DataGrid
      className='grid'
      noDataText=''
      dataSource={data}
      onRowClick={onRowClick}
      onExporting={onExporting}
      allowColumnReordering
      ref={grid}
    >
      <SearchPanel visible placeholder='Contact Search' />
      <ColumnChooser enabled />
      <Export enabled allowExportSelectedData formats={['xlsx', 'pdf']} />
      <Selection
        selectAllMode='allPages'
        showCheckBoxesMode='always'
        mode='multiple'
      />
      <HeaderFilter visible />
      <Sorting mode='multiple' />
      <Scrolling mode='virtual' />
      <Toolbar>
        <Item location='before'>
          <div className='grid-header'>Contacts</div>
        </Item>
        <Item location='before' locateInMenu='auto'>
          <DropDownButton
            dataSource={filterStatusList}
            stylingMode='text'
            selectedItemKey={status}
            dropDownOptions={{ width: 'auto' }}
            useSelectMode
            onSelectionChanged={filterByStatus}
          />
        </Item>
        <Item location='after' locateInMenu='auto'>
          <Button
            icon='plus'
            text='Add Contact'
            type='default'
            stylingMode='contained'
            onClick={onAddContactClick}
          />
        </Item>
        <Item
          location='after'
          locateInMenu='auto'
          showText='inMenu'
          widget='dxButton'
        >
          <Button
            icon='refresh'
            text='Refresh'
            stylingMode='text'
            onClick={refresh}
          />
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
      <Column
        dataField='name'
        caption='Name'
        sortOrder='asc'
        hidingPriority={5}
        minWidth={150}
        cellRender={cellNameRender}
      />
      <Column
        dataField='company'
        caption='Company'
        hidingPriority={5}
        minWidth={150}
      />
      <Column
        dataField='status'
        caption='Status'
        dataType='string'
        hidingPriority={3}
        minWidth={100}
        cellRender={ContactStatus}
        editCellRender={editCellStatusRender}
      />
      <Column dataField='assignedTo' caption='Assigned to' hidingPriority={4} />
      <Column
        dataField='phone'
        caption='Phone'
        hidingPriority={2}
        cellRender={cellPhoneRender}
      />
      <Column dataField='email' caption='Email' hidingPriority={1} />
    </DataGrid>
  );
});
