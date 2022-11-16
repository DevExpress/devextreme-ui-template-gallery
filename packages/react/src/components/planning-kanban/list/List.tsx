import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import Button from 'devextreme-react/button';
import Menu from 'devextreme-react/menu';
import { DragStartEvent, ReorderEvent } from 'devextreme/ui/sortable';

import { Task } from '../../../shared/types/task';

import { Card } from '../card/Card';

import './List.scss';

const boardMenuItems = [{
  icon: 'more',
  items: [
    { text: 'Add card' },
    { text: 'Copy list' },
    { text: 'Move list' },
  ],
},
];

export const List = ({
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
  onTaskDragStart: (e: DragStartEvent) => void,
  onTaskDrop: (e: ReorderEvent) => void,
  changePopupVisibility?: () => void,
}) => {

  return (
    <div className='list'>
      <div className='list-title dx-theme-text-color'>
        <span>{title}</span>
        <Menu items={boardMenuItems} />
      </div>
      <ScrollView className='scrollable-list' direction='vertical' showScrollbar='always'>
        <Sortable className='sortable-cards' group='cardsGroup' data={index} onDragStart={onTaskDragStart} onReorder={onTaskDrop} onAdd={onTaskDrop}>
          {tasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Sortable>
        <div className='add-task'>
          <Button icon='plus' text='Add Task' stylingMode='text' onClick={changePopupVisibility} />
        </div>
      </ScrollView>
    </div>
  );
};
