import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import DataGrid from 'devextreme-react/data-grid';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridXSLX } from 'devextreme/excel_exporter';
import LoadPanel from 'devextreme-react/load-panel';

import dxTextBox from 'devextreme/ui/text_box';

import { PlanningGrid, PlanningKanban, PlanningGantt } from '../../components';

import { getTasks, getFilteredTasks } from 'dx-rwa-data';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import './planning-task-list.scss';

const listsData = ['LIST', 'KANBAN BOARD', 'GANTT'];

export const PlanningTaskList = () => {
  const gridRef = useRef<DataGrid>(null);

  const [list, setList] = useState(listsData[0]);
  const [index, setIndex] = useState(0);
  const [gridData, setGridData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then((data) => setGridData(data))
      .catch((error) => console.log(error));
    getFilteredTasks()
      .then((data) => setFilteredData(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if(filteredData.length && gridData.length) {
      setLoading(false);
    }
  }, [filteredData, gridData]);

  const onTabClick = useCallback((e: { itemData: string }) => {
    setList(e.itemData);
    setIndex(listsData.findIndex((d) => d === e.itemData));
  }, []);

  const addDataGridRow = useCallback(() => {
    gridRef.current?.instance.addRow();
  }, []);

  const refresh = useCallback(() => {
    gridRef.current?.instance.refresh();
  }, []);

  const showColumnChooser = useCallback(() => {
    gridRef.current?.instance.showColumnChooser();
  }, []);

  const exportToPDF = useCallback(() => {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: gridRef.current?.instance,
    }).then(() => {
      doc.save('Tasks.pdf');
    });
  }, []);

  const exportToXSLX = useCallback(() => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    exportDataGridXSLX({
      component: gridRef.current?.instance,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
  }, []);

  const search = useCallback((e: { component: dxTextBox }) => {
    gridRef.current?.instance.searchByText(e.component.option('text')!);
  }, []);

  return (
    <div className='view-wrapper-list'>
      <Toolbar className='toolbar-common'>
        <Item location='before'>
          <span className='toolbar-header'>Task</span>
        </Item>
        <Item
          location='before'
          widget='dxTabs'
          options={{
            dataSource: listsData,
            selectedIndex: index,
            onItemClick: onTabClick,
          }}
        />
        <Item
          location='after'
          widget='dxButton'
          locateInMenu='auto'
          cssClass='add-grid-row'
          options={{
            icon: 'plus',
            text: 'ADD TASK',
            type: 'default',
            stylingMode: 'contained',
            onClick: addDataGridRow,
          }}
        />
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          options={{
            icon: 'refresh',
            text: 'Refresh',
            onClick: refresh,
          }}
        />
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          disabled={list !== listsData[0]}
          options={{
            icon: 'columnchooser',
            text: 'Column Chooser',
            onClick: showColumnChooser,
          }}
        />
        <Item location='after' locateInMenu='auto'>
          <div className='separator'></div>
        </Item>
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          disabled={list === listsData[1]}
          options={{
            icon: 'exportpdf',
            text: 'Export To PDF',
            onClick: exportToPDF,
          }}
        />
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          disabled={list !== listsData[0]}
          options={{
            icon: 'exportxlsx',
            text: 'Export To XSLX',
            onClick: exportToXSLX,
          }}
        />
        <Item
          location='after'
          widget='dxTextBox'
          locateInMenu='auto'
          disabled={list !== listsData[0]}
          options={{
            mode: 'search',
            placeholder: 'Task Search',
            onInput: search,
          }}
        />
      </Toolbar>
      {loading && <LoadPanel container='.content' visible position={{ of: '.content' }} />}
      {!loading && list === listsData[0] && <PlanningGrid dataSource={gridData} ref={gridRef} />}
      {!loading && list === listsData[1] && <PlanningKanban dataSource={filteredData} />}
      {!loading && list === listsData[2] && <PlanningGantt dataSource={filteredData} />}
    </div>
  );
};
