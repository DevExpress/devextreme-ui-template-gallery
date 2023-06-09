import React, { useState, useEffect, useCallback } from 'react';

import ScrollView from 'devextreme-react/scroll-view';
import Sortable, { SortableTypes } from 'devextreme-react/sortable';
import Button from 'devextreme-react/button';

import { CardMenu } from '../card-menu/CardMenu';
import { TaskKanbanCard } from '../task-kanban-card/TaskKanbanCard';

import { PlanningProps, Task } from '../../../types/task';

import { STATUS_ITEMS } from '../../../shared/constants';

import './TaskListKanban.scss';

const boardMenuItems = [
  { text: 'Add card' },
  { text: 'Copy list' },
  { text: 'Move list' },
];

const reorder = <T, >(items: T[], item: T, fromIndex: number, toIndex: number) => {
  let result = items;
  if (fromIndex >= 0) {
    result = [...result.slice(0, fromIndex), ...result.slice(fromIndex + 1)];
  }

  if (toIndex >= 0) {
    result = [...result.slice(0, toIndex), item, ...result.slice(toIndex)];
  }

  return result;
};

const TaskList = ({
  title,
  index,
  tasks,
  onTaskDragStart,
  onTaskDrop,
  changePopupVisibility,
}: {
  title: string,
  index: number,
  tasks: Task[],
  onTaskDragStart: (e: SortableTypes.DragStartEvent) => void,
  onTaskDrop: (e: SortableTypes.ReorderEvent) => void,
  changePopupVisibility?: () => void,
}) => {

  return (
    <div className='list'>
      <div className='list-title dx-theme-text-color'>
        <span>{title}</span>
        <CardMenu items={boardMenuItems} />
      </div>
      <ScrollView className='scrollable-list' direction='vertical' showScrollbar='always'>
        <Sortable className='sortable-cards' group='cardsGroup' data={index} onDragStart={onTaskDragStart} onReorder={onTaskDrop} onAdd={onTaskDrop}>
          {tasks.map((task) => (
            <TaskKanbanCard key={task.id} task={task} />
          ))}
        </Sortable>
        <div className='add-task'>
          <Button icon='plus' text='Add Task' stylingMode='text' onClick={changePopupVisibility} width='100%' />
        </div>
      </ScrollView>
    </div>
  );
};

export const TaskListKanban = React.forwardRef<Sortable, PlanningProps>(({ dataSource, changePopupVisibility }, ref) => {
  const [lists, setLists] = useState<Task[][]>([]);
  const [statuses, setStatuses] = useState(STATUS_ITEMS);
  useEffect(() => {
    const initialLists: Task[][] = [];
    STATUS_ITEMS.forEach((status) => {
      initialLists.push(dataSource.filter((task) => task.status === status));
    });
    setLists(initialLists);
  }, [dataSource]);
  const onListReorder = useCallback(
    ({ fromIndex, toIndex }: SortableTypes.ReorderEvent) => {
      setLists(reorder(lists, lists[fromIndex], fromIndex, toIndex));
      setStatuses(reorder(statuses, statuses[fromIndex], fromIndex, toIndex));
    },
    [lists, statuses]
  );

  const onTaskDragStart = useCallback(
    (e: SortableTypes.DragStartEvent) => {
      e.itemData = lists[e.fromData][e.fromIndex];
    },
    [lists]
  );

  const onTaskDrop = useCallback(
    (e: SortableTypes.ReorderEvent) => {
      const updatedList = [...lists];
      e.itemData.status = statuses[e.toData];
      updatedList[e.fromData] = reorder(updatedList[e.fromData], e.itemData, e.fromIndex, -1);
      updatedList[e.toData] = reorder(updatedList[e.toData], e.itemData, -1, e.toIndex);

      setLists(updatedList);
    },
    [lists, statuses]
  );

  return (
    <div id='kanban' className='kanban'>
      <ScrollView direction='both' showScrollbar='always'>
        <Sortable ref={ref} itemOrientation='horizontal' handle='.list-title' onReorder={onListReorder}>
          {lists.map((tasks, listIndex) => {
            const status = statuses[listIndex];
            return <TaskList key={status} title={status} index={listIndex} tasks={tasks} onTaskDragStart={onTaskDragStart} onTaskDrop={onTaskDrop} changePopupVisibility={changePopupVisibility} />;
          })}
        </Sortable>
      </ScrollView>
    </div>
  );
});
