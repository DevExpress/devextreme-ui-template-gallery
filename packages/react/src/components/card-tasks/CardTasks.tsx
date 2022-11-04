import React, { useState, useCallback } from 'react';

import DataGrid, { Selection, RowDragging, Column } from 'devextreme-react/data-grid';

import { RowDraggingReorderEvent } from 'devextreme/ui/data_grid';

import { Task } from '../../shared/types/task';

import './CardTasks.scss';

export const CardTasks = ({ tasks }: { tasks: Task[] }) => {
  const [gridData, setGridData] = useState(tasks.filter((item) => !!item.status && !!item.priority));

  const onReorder = useCallback((e: RowDraggingReorderEvent) => {
    const visibleRows = e.component.getVisibleRows();
    const toIndex = gridData.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = gridData.indexOf(e.itemData);

    gridData.splice(fromIndex, 1);
    gridData.splice(toIndex, 0, e.itemData);

    setGridData(gridData);
  }, [gridData]);

  return (
    <div className='card-tasks'>
      <DataGrid
        dataSource={gridData}
        columnAutoWidth
        selectionFilter={['done', '=', true]}
      >
        <Selection mode='multiple' deferred></Selection>

        <RowDragging
          allowReordering
          onReorder={onReorder}
          showDragIcons
        ></RowDragging>

        <Column
          dataField='text'
          caption='Subject'
          hidingPriority={3}
        ></Column>
        <Column
          dataField='date'
          dataType='date'
          caption='Due Date'
          hidingPriority={1}
        ></Column>
        <Column
          caption='Assigned To'
          dataField='manager'
          hidingPriority={0}
        ></Column>
      </DataGrid>
    </div>
  );
};
