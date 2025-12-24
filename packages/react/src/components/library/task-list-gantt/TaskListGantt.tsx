import React from 'react';

import { Gantt, GanttRef, Tasks, Column, Toolbar, Item, Validation, Editing } from 'devextreme-react/gantt';

import { PlanningProps } from '../../../types/task';

import './TaskListGantt.scss';

const toolbarItemOptions = {
  undo: { icon: 'revert' },
  redo: { icon: 'redo' },
  collapseAll: { icon: 'arrowdown' },
  expandAll: { icon: 'arrowup' },
  addTask: { icon: 'add' },
  deleteTask: { icon: 'trash' },
  zoomIn: { icon: 'zoominoutline' },
  zoomOut: { icon: 'zoomoutoutline' },
};

export const TaskListGantt = React.forwardRef<GanttRef, PlanningProps>(({ dataSource }, ref) => {
/* eslint-disable  @typescript-eslint/no-explicit-any */
  return (
    <div className='gantt'>
      <Gantt ref={ref} taskListWidth={500} scaleType='weeks' height={700}>
        <Tasks dataSource={dataSource} keyExpr='taskId' startExpr='startDate' endExpr='dueDate' titleExpr='text' />
        <Column dataField='text' caption='Subject' width={300} />
        <Column dataField='startDate' caption='Start Date' dataType='date' sortOrder='asc' />
        <Column dataField='dueDate' caption='Due Date' dataType='date' />

        <Toolbar>
          <Item name='undo' options={toolbarItemOptions.undo} />
          <Item name='redo' options={toolbarItemOptions.redo} />
          <Item name={'separator' as any} />
          <Item name='collapseAll' options={toolbarItemOptions.collapseAll} />
          <Item name='expandAll' options={toolbarItemOptions.expandAll} />
          <Item name={'separator' as any} />
          <Item name='addTask' options={toolbarItemOptions.addTask} />
          <Item name='deleteTask' options={toolbarItemOptions.deleteTask} />
          <Item name={'separator' as any} />
          <Item name='zoomIn' options={toolbarItemOptions.zoomIn} />
          <Item name='zoomOut' options={toolbarItemOptions.zoomOut} />
        </Toolbar>

        <Validation autoUpdateParentTasks />
        <Editing enabled />
      </Gantt>
    </div>
  );
});
