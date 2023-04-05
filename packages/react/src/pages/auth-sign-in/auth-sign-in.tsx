import React, { useState, useEffect, useCallback, useRef } from 'react';

import './auth-sign-in.scss';

import { FormPopup, ContactNewForm, ContactPanel } from '../../components';

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

const dropDownOptions = { width: 'auto' };
const exportFormats = ['xlsx', 'pdf'];

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

  const changePopupVisibility = useCallback(() => {
    setPopupVisible(!popupVisible);
  }, [popupVisible]);

  const changePanelOpened = useCallback(() => {
    setPanelOpened(!isPanelOpened);
    gridRef.current?.instance.option('focusedRowIndex', -1);
  }, [isPanelOpened]);

  const onAddContactClick = useCallback(() => {
    setPopupVisible(true);
  }, []);

  const onRowClick = useCallback(({ data }: RowClickEvent) => {
    setContactId(data.id);
    setPanelOpened(true);
  }, []);

  const [status, setStatus] = useState(filterStatusList[0]);

  const filterByStatus = useCallback((e: SelectionChangedEvent) => {
    const { item: status }: { item: FilterContactStatus } = e;
    if (status === 'All') {
      gridRef.current?.instance.clearFilter();
    } else {
      gridRef.current?.instance.filter(['status', '=', status]);
    }

    setStatus(status);
  }, []);

  const refresh = useCallback(() => {
    gridRef.current?.instance.refresh();
  }, []);

  return ((
    <app-card-auth title="Sign In">
      <app-login-form
        resetLink="/reset-password-form-page"
        createAccountLink="/signup-form-page"
      ></app-login-form>
    </app-card-auth>
  );
};
