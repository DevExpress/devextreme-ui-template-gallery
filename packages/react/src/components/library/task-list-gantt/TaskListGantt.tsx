import React from 'react';

import Gantt, { Tasks, Column, Toolbar, ToolbarItem, Validation, Editing } from 'devextreme-react/gantt';

import { PlanningProps } from '../../../types/task';

import './TaskListGantt.scss';

export const TaskListGantt = React.forwardRef<Gantt, PlanningProps>(({ dataSource }, ref) => {
  return (
    <div className='gantt'>
      <Gantt ref={ref} taskListWidth={500} scaleType='weeks' height={700}>
        <Tasks dataSource={dataSource} startExpr='startDate' endExpr='dueDate' titleExpr='text' />
        <Column dataField='text' caption='Subject' width={300} />
        <Column dataField='startDate' caption='Start Date' dataType='date' sortOrder='asc' />
        <Column dataField='dueDate' caption='Due Date' dataType='date' />

        <Toolbar>
          <ToolbarItem name='undo' />
          <ToolbarItem name='redo' />
          <ToolbarItem name='separator' />
          <ToolbarItem name='collapseAll' />
          <ToolbarItem name='expandAll' />
          <ToolbarItem name='separator' />
          <ToolbarItem name='addTask' />
          <ToolbarItem name='deleteTask' />
          <ToolbarItem name='separator' />
          <ToolbarItem name='zoomIn' />
          <ToolbarItem name='zoomOut' />
        </Toolbar>

        <Validation autoUpdateParentTasks />
        <Editing enabled />
      </Gantt>
    </div>
  );
});
