import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { useNavigate } from 'react-router-dom';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import DataGrid from 'devextreme-react/data-grid';
import Sortable from 'devextreme-react/sortable';
import Gantt from 'devextreme-react/gantt';
import { exportGantt as exportGanttToPdf } from 'devextreme/pdf_exporter';
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
  const kanbanRef = useRef<Sortable>(null);
  const ganttRef = useRef<Gantt>(null);

  const navigate = useNavigate();

  const [listView, kanbanView, ganttView] = listsData;

  const [view, setView] = useState(listView);
  const [index, setIndex] = useState(0);
  const [gridData, setGridData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const isDataGrid = view === listView;
  const isKanban = view === kanbanView;

  useEffect(() => {
    Promise.all([
      getTasks()
        .then((data) => setGridData(data)),
      getFilteredTasks()
        .then((data) => setFilteredData(data))
    ]).catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if(filteredData.length && gridData.length) {
      setLoading(false);
    }
  }, [filteredData, gridData]);

  const onTabClick = useCallback((e: { itemData: string }) => {
    setView(e.itemData);
    setIndex(listsData.findIndex((d) => d === e.itemData));
  }, []);

  const addTask = useCallback(() => {
    if(isDataGrid) {
      gridRef.current?.instance.addRow();
    } else {
      navigate('/planning-task-details');
    }
  }, [view]);

  const refresh = useCallback(() => {
    if(isDataGrid) {
      gridRef.current?.instance.refresh();
    } else if(isKanban) {
      kanbanRef.current?.instance.update();
    } else {
      ganttRef.current?.instance.refresh();
    }
  }, [view]);

  const showColumnChooser = useCallback(() => {
    gridRef.current?.instance.showColumnChooser();
  }, []);

  const exportToPDF = useCallback(() => {
    if(isDataGrid) {
      const doc = new jsPDF();
      exportDataGrid({
        jsPDFDocument: doc,
        component: gridRef.current?.instance,
      }).then(() => {
        doc.save('Tasks.pdf');
      });
    } else {
      exportGanttToPdf(
        {
          component: ganttRef.current?.instance,
          createDocumentMethod: (args) => new jsPDF(args),
        },
      ).then((doc) => doc.save('gantt.pdf'));
    }
  }, [view]);

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
          options={{
            icon: 'plus',
            text: 'ADD TASK',
            type: 'default',
            stylingMode: 'contained',
            onClick: addTask,
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
          disabled={view !== listView}
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
          disabled={isKanban}
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
          disabled={view !== listView}
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
          disabled={view !== listView}
          options={{
            mode: 'search',
            placeholder: 'Task Search',
            onInput: search,
          }}
        />
      </Toolbar>
      {loading && <LoadPanel container='.content' visible position={{ of: '.content' }} />}
      {!loading && isDataGrid && <PlanningGrid dataSource={gridData} ref={gridRef} />}
      {!loading && isKanban && <PlanningKanban dataSource={filteredData} ref={kanbanRef} />}
      {!loading && view === ganttView && <PlanningGantt dataSource={filteredData} ref={ganttRef} />}
    </div>
  );
};
