import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import DataGrid from 'devextreme-react/data-grid';
import { exportDataGrid } from 'devextreme/pdf_exporter';

import dxTextBox from 'devextreme/ui/text_box';

import { PlanningGrid, PlanningKanban, PlanningGantt } from '../../components';

import { getTasks } from 'dx-rwa-data';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import './planning-task-list.scss';

const listsData = ['LIST', 'KANBAN BOARD', 'GANTT'];

export const PlanningTaskList = () => {
  const gridRef = useRef<DataGrid>(null);

  const [list, setList] = useState(listsData[0]);
  const [index, setIndex] = useState(0);
  const [itemVisibility, setItemVisibility] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getTasks()
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  const Component = useMemo(() => {
    if(list === listsData[0]) {
      return PlanningGrid;
    } else if(list === listsData[1]) {
      return PlanningKanban;
    } else {
      return PlanningGantt;
    }
  }, [list]);
  
  const onTabClick = useCallback((e: { itemData: string }) => {
    setList(e.itemData);
    setIndex(listsData.findIndex((d) => d === e.itemData));
    setItemVisibility(e.itemData === listsData[0]);
  }, []);

  const addDataGridRow = useCallback(() => {
    gridRef.current!.instance.addRow();
  }, []);

  const refresh = useCallback(() => {
    gridRef.current!.instance.refresh();
  }, []);

  const showColumnChooser = useCallback(() => {
    gridRef.current!.instance.showColumnChooser();
  }, []);

  const exportToPDF = useCallback(() => {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: gridRef.current!.instance,
    }).then(() => {
      doc.save('Tasks.pdf');
    });
  }, []);

  const search = useCallback((e: { component: dxTextBox }) => {
      gridRef.current!.instance.searchByText(e.component.option('text')!);
  }, []);

  return (
    <div className='view-wrapper-list'>
      <Toolbar>
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
          visible={itemVisibility}
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
          visible={itemVisibility}
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
          visible={itemVisibility}
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          options={{
            icon: 'columnchooser',
            text: 'Column Chooser',
            onClick: showColumnChooser,
          }}
        />
        <Item visible={itemVisibility} location='after' locateInMenu='auto'>
          <div className='separator'></div>
        </Item>
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu='auto'
          options={{
            icon: 'exportpdf',
            text: 'Export To PDF',
            onClick: exportToPDF,
          }}
        />
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxTextBox'
          locateInMenu='auto'
          options={{
            mode: 'search',
            placeholder: 'Task Search',
            onInput: search,
          }}
        />
      </Toolbar>
      <Component dataSource={data} ref={list === listsData[0] ? gridRef : null} />
    </div>
  );
};
