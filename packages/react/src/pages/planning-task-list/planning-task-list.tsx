import React, { useState, useEffect } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { PlanningGrid, PlanningKanban, PlanningGantt } from '../../components';
import { getTasks } from 'dx-rwa-data';
import './planning-task-list.scss';

const listsData = ['LIST', 'KANBAN BOARD', 'GANTT'];

export default function PlanningTaskList() {
  const [ list, setList ] = useState(listsData[0]);
  const [ index, setIndex ] = useState(0);
  const [ itemVisibility, setItemVisibility ] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
      getTasks()
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    }, []);
  const Component = list === listsData[0] ? PlanningGrid : ( list === listsData[1] ? PlanningKanban : PlanningGantt);

  const tabsOptions = {
    dataSource: listsData,
    selectedIndex: index,
    onItemClick: (e) => {
      setList(e.itemData);
      setIndex(listsData.findIndex(d => d === e.itemData));
      if(e.itemData === listsData[0]) {
        setItemVisibility(true);
      } else {
        setItemVisibility(false);
      }
    }
  }
  return (
    <React.Fragment>
      <Toolbar>
        <Item location="before">
          <span>List</span>
        </Item>
        <Item
          location='before'
          widget='dxTabs'
          options={tabsOptions}
        />
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxButton'
          locateInMenu="auto"
          options={{
            icon:'plus',
            text: 'ADD TASK'
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
            text: 'Refresh'
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
            text: 'Column Chooser'
          }}
        />
        <Item
          visible={itemVisibility}
          location='after'
          locateInMenu="auto"
        >
          <div></div>
        </Item>
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxButton'
          showText="inMenu"
          locateInMenu="auto"
          options={{
            icon: 'exportpdf',
            text: 'Export To PDF'
          }}
        />
        <Item
          visible={itemVisibility}
          location='after'
          widget='dxTextBox'
          locateInMenu="auto"
          options={{
            mode: 'search',
            placeholder: 'Task Search'
          }}
        />
      </Toolbar>
      <Component dataSource={data} />
    </React.Fragment>
)};
