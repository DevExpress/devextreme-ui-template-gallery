import React from 'react';

import Gantt, { Tasks, Column, Toolbar, Item, Validation, Editing } from 'devextreme-react/gantt';

import { PlanningProps } from '../../../types/task';

import './TaskListGantt.scss';

export const TaskListGantt = React.forwardRef<Gantt, PlanningProps>(({ dataSource }, ref) => {
/* eslint-disable  @typescript-eslint/no-explicit-any */
  return (
    <div className='gantt'>
      <Gantt ref={ref} taskListWidth={500} scaleType='weeks' height={700}>
        <Tasks dataSource={dataSource} startExpr='startDate' endExpr='dueDate' titleExpr='text' />
        <Column dataField='text' caption='Subject' width={300} />
        <Column dataField='startDate' caption='Start Date' dataType='date' sortOrder='asc' />
        <Column dataField='dueDate' caption='Due Date' dataType='date' />

        <Toolbar>
          <Item name='undo' />
          <Item name='redo' />
          <Item name={'separator' as any} />
          <Item name='collapseAll' />
          <Item name='expandAll' />
          <Item name={'separator' as any} />
          <Item name='addTask' />
          <Item name='deleteTask' />
          <Item name={'separator' as any} />
          <Item name='zoomIn' />
          <Item name='zoomOut' />
        </Toolbar>

        <Validation autoUpdateParentTasks />
        <Editing enabled />
      </Gantt>
    </div>
  );
});
