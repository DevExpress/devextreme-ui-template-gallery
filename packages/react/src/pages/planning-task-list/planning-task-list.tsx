import React, { useState, useEffect, useCallback, useRef } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import DataGrid from 'devextreme-react/data-grid';
import { PlanningGrid, PlanningKanban } from '../../components';
import { getTasks } from 'dx-rwa-data';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import './planning-task-list.scss';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const listsData = ['LIST', 'KANBAN BOARD'];

export default function PlanningTaskList() {
  const gridRef = useRef<DataGrid>();
  const [ list, setList ] = useState(listsData[0]);
  const [ index, setIndex ] = useState(0);
  const [ itemVisibility, setItemVisibility ] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
      getTasks()
        .then((data) => setData(data.filter(d => d.status && d.priority)))
        .catch((error) => console.log(error));
    }, []);
  const Component = list === listsData[0] ? PlanningGrid : PlanningKanban;
  const onTabClick = useCallback((e) => {
    setList(e.itemData);
    setIndex(listsData.findIndex(d => d === e.itemData));
    if(e.itemData === listsData[0]) {
      setItemVisibility(true);
    } else {
      setItemVisibility(false);
    }
  }, []);
  const addDataGridRow = useCallback(() => {
    gridRef.current!.instance.addRow();
  }, [gridRef]);
  const refresh = useCallback(() => {
    gridRef.current!.instance.refresh();
  }, [gridRef]);
  const showColumnChooser = useCallback(() => {
    gridRef.current!.instance.showColumnChooser();
  }, [gridRef]);
  const exportToPDF = useCallback(() => {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: gridRef.current!.instance,
    }).then(() => {
      doc.save('Tasks.pdf');
    });
  }, [gridRef]);
  const search = useCallback((e) => {
    gridRef.current!.instance.searchByText(e.component.option('text'))
  }, [gridRef]);
  return (
    <div className="view-wrapper-list">
      <Toolbar>
        <Item location="before">
          <span className="toolbar-header">Task</span>
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
          locateInMenu="auto"
          cssClass="add-grid-row"
          options={{
            icon:'plus',
            text: 'ADD TASK',
            type: "default",
            stylingMode: "contained",
            onClick: addDataGridRow,
          }}
        />
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxButton'
          showText='inMenu'
          locateInMenu="auto"
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
          showText="inMenu"
          locateInMenu="auto"
          options={{
            icon: 'columnchooser',
            text: 'Column Chooser',
            onClick: showColumnChooser
          }}
        />
        <Item
          visible={itemVisibility}
          location='after'
          locateInMenu="auto"
        >
          <div className="separator"></div>
        </Item>
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxButton'
          showText="inMenu"
          locateInMenu="auto"
          options={{
            icon: 'exportpdf',
            text: 'Export To PDF',
            onClick: exportToPDF
          }}
        />
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxTextBox'
          locateInMenu="auto"
          options={{
            mode: 'search',
            placeholder: 'Task Search',
            onInput: search
          }}
        />
      </Toolbar>
      <Component dataSource={data} forwardedRef={gridRef} />
    </div>
)};
