import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import DataGrid from 'devextreme-react/data-grid';
import Sortable from 'devextreme-react/sortable';
import Gantt from 'devextreme-react/gantt';
import { exportGantt as exportGanttToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridXSLX } from 'devextreme/excel_exporter';
import LoadPanel from 'devextreme-react/load-panel';

import { TaskListGrid, TaskListKanban, TaskListGantt, FormPopup, TaskFormDetails } from '../../components';

import { newTask as newTaskDefaults } from '../../shared/constants';
import { useScreenSize } from '../../utils/media-query';

import { getTasks, getFilteredTasks } from 'dx-template-gallery-data';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import './planning-task-list.scss';
import Button from 'devextreme-react/button';
import TextBox, { TextBoxTypes } from 'devextreme-react/text-box';
import Tabs from 'devextreme-react/tabs';
import notify from 'devextreme/ui/notify';
import { Task } from '../../types/task';

const listsData = ['List', 'Kanban Board', 'Gantt'];

export const PlanningTaskList = () => {
  const gridRef = useRef<DataGrid>(null);
  const kanbanRef = useRef<Sortable>(null);
  const ganttRef = useRef<Gantt>(null);

  const [listView, kanbanView, ganttView] = listsData;

  const [view, setView] = useState(listView);
  const [index, setIndex] = useState(0);
  const [gridData, setGridData] = useState<Task[]>([]);
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [formTaskInitData, setFormTaskInitData] = useState({ ...newTaskDefaults });
  const [popupVisible, setPopupVisible] = useState(false);

  const { isXSmall } = useScreenSize();

  const isDataGrid = view === listView;
  const isKanban = view === kanbanView;

  let newTaskData = { ...newTaskDefaults };

  const changePopupVisibility = useCallback((isVisible) => {
    setPopupVisible(isVisible);
  }, []);

  useEffect(() => {
    Promise.all([
      getTasks()
        .then((data) => setGridData(data)),
      getFilteredTasks()
        .then((data) => setFilteredData(data))
    ]).catch((error) => console.log(error));
  }, []);

  const onSaveClick = () => {
    notify({
      message: `New task "${newTaskData.text}" saved`,
      position: { at: 'bottom center', my: 'bottom center' }
    },
    'success'
    );

    setFormTaskInitData({ ...newTaskDefaults });
  };

  useEffect(() => {
    if (filteredData.length && gridData.length) {
      setLoading(false);
    }
  }, [filteredData, gridData]);

  const onDataChanged = useCallback((data) => {
    newTaskData = data;
  }, []);

  const onTabClick = useCallback((e: { itemData?: string }) => {
    setView(e.itemData || '');
    setIndex(listsData.findIndex((d) => d === e.itemData));
  }, []);

  const onAddTaskClick = useCallback(() => {
    setFormTaskInitData({ ...newTaskDefaults });
    setPopupVisible(true);
  }, []);

  const refresh = useCallback(() => {
    if (isDataGrid) {
      gridRef.current?.instance.refresh();
    } else if (isKanban) {
      kanbanRef.current?.instance.update();
    } else {
      ganttRef.current?.instance.refresh();
    }
  }, [view]);

  const showColumnChooser = useCallback(() => {
    gridRef.current?.instance.showColumnChooser();
  }, []);

  const exportToPDF = useCallback(() => {
    if (isDataGrid) {
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

  const search = useCallback((e: TextBoxTypes.InputEvent) => {
    gridRef.current?.instance.searchByText(e.component.option('text') ?? '');
  }, []);

  const getTabsWidth = useCallback(() => {
    return isXSmall ? 220 : 'auto';
  }, []);

  return (
    <div className='view-wrapper view-wrapper-task-list list-page'>
      <Toolbar className='toolbar-common theme-dependent'>
        <Item location='before'>
          <span className='toolbar-header'>Tasks</span>
        </Item>
        <Item
          location='before'
          widget='dxTabs'
        >
          <Tabs
            dataSource={listsData}
            width={getTabsWidth()}
            selectedIndex={index}
            scrollByContent
            showNavButtons={false}
            onItemClick={onTabClick}
          />
        </Item>
        <Item
          location='after'
          widget='dxButton'
          locateInMenu='auto'
        >
          <Button
            icon='plus'
            text='Add Task'
            type='default'
            stylingMode='contained'
            onClick={onAddTaskClick}
          />
        </Item>
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
        >
          <Button
            icon='refresh'
            text='Refresh'
            stylingMode='text'
            onClick={refresh}
          />
        </Item>
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          disabled={view !== listView}
        >
          <Button
            icon='columnchooser'
            text='Column Chooser'
            stylingMode='text'
            onClick={showColumnChooser}
          />
        </Item>
        <Item location='after' locateInMenu='auto'>
          <div className='separator' />
        </Item>
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          disabled={isKanban}

        >
          <Button
            icon='exportpdf'
            text='Export To PDF'
            stylingMode='text'
            onClick={exportToPDF}
          />
        </Item>
        <Item
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          disabled={view !== listView}
        >
          <Button
            icon='exportxlsx'
            text='Export To XSLX'
            stylingMode='text'
            onClick={exportToXSLX}
          />
        </Item>
        <Item
          location='after'
          widget='dxTextBox'
          locateInMenu='auto'
          disabled={view !== listView}
        >
          <TextBox
            mode='search'
            placeholder='Task Search'
            onInput={search}
          />
        </Item>
      </Toolbar>
      {loading && <LoadPanel container='.content' showPane={false} visible position={{ of: '.content' }} />}
      {!loading && isDataGrid && <TaskListGrid dataSource={gridData} ref={gridRef} />}
      {!loading && isKanban && <TaskListKanban dataSource={filteredData} ref={kanbanRef} changePopupVisibility={() => changePopupVisibility(!popupVisible)} />}
      {!loading && view === ganttView && <TaskListGantt dataSource={filteredData} ref={ganttRef} />}
      <FormPopup title='New Task' visible={popupVisible} setVisible={changePopupVisibility} onSave={onSaveClick}>
        <TaskFormDetails subjectField data={formTaskInitData} editing onDataChanged={onDataChanged} />
      </FormPopup>
    </div>
  );
};
