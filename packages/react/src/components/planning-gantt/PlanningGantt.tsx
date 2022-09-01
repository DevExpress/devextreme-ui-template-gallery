import React, { useState, useEffect } from 'react';
import LoadPanel from 'devextreme-react/load-panel';
import { PlanningProps } from '../../shared/types/task';
import Gantt, { Tasks, Column, Toolbar, Item, Validation, Editing } from 'devextreme-react/gantt';
import './PlanningGantt.scss';

export const PlanningGantt = ({ dataSource }: PlanningProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (dataSource.length !== 0) {
      setLoading(false);
    }
  }, [dataSource]);

  return loading ? (
    <LoadPanel container='.content' visible position={{ of: '.content' }} />
  ) : (
    <Gantt taskListWidth={500} scaleType='weeks' height={700}>
      <Tasks dataSource={dataSource} startExpr='startDate' endExpr='dueDate' titleExpr='text' />
      <Column dataField='text' caption='Subject' width={300} />
      <Column dataField='startDate' caption='Start Date' dataType='date' />
      <Column dataField='dueDate' caption='Due Date' dataType='date' />

      <Toolbar>
        <Item name='undo' />
        <Item name='redo' />
        <Item name='separator' />
        <Item name='collapseAll' />
        <Item name='expandAll' />
        <Item name='separator' />
        <Item name='addTask' />
        <Item name='deleteTask' />
        <Item name='separator' />
        <Item name='zoomIn' />
        <Item name='zoomOut' />
      </Toolbar>

      <Validation autoUpdateParentTasks />
      <Editing enabled />
    </Gantt>
  );
};
