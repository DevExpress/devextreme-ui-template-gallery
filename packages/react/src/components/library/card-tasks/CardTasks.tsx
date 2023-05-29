import React, { useState, useCallback } from 'react';

import DataGrid, { Selection, RowDragging, Column } from 'devextreme-react/data-grid';

import { withLoadPanel } from '../../../utils/withLoadPanel';

import { Task } from '../../../types/task';

import './CardTasks.scss';

const Grid = ({ tasks }: { tasks: Task[] }) => {
  const [gridData, setGridData] = useState(tasks);

  const onReorder = useCallback((e) => {
    const visibleRows = e.component.getVisibleRows();
    const toIndex = gridData.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = gridData.indexOf(e.itemData);

    setGridData([
      ...gridData.slice(0, fromIndex),
      ...gridData.slice(fromIndex + 1, toIndex + 1),
      e.itemData,
      ...gridData.slice(toIndex + 1)
    ]);
  }, [gridData]);

  return (
    <DataGrid
      className='tasks-grid'
      dataSource={gridData}
      columnAutoWidth
    >
      <Selection mode='multiple' showCheckBoxesMode='always' />

      <RowDragging
        allowReordering
        onReorder={onReorder}
        showDragIcons
      />

      <Column
        dataField='text'
        caption='Subject'
        hidingPriority={3}
      />
      <Column
        dataField='date'
        dataType='date'
        caption='Due Date'
        hidingPriority={1}
      />
      <Column
        caption='Assigned To'
        dataField='manager'
        hidingPriority={0}
      />
    </DataGrid>
  );
};

const GridWithLoadPanel = withLoadPanel(Grid);

export const CardTasks = ({ tasks, isLoading }: { tasks?: Task[], isLoading: boolean }) => {
  return (
    <div className='card-tasks'>
      <GridWithLoadPanel
        tasks={tasks?.filter((item) => !!item.status && !!item.priority)}
        hasData={!!tasks}
        loading={isLoading}
        panelProps={{
          container: '.card-tasks',
          position: { of: '.card-tasks' }
        }}
      />
    </div>
  );
};
