import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import Button from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import { Task } from '../../../shared/types/task';
import Card from '../card/Card';
import { DragStartEvent, ReorderEvent } from 'devextreme/ui/sortable';
import './List.scss';

const onMoreBtnClick = () => {
  notify('Option board event');
};

const onAddTaskBtnClick = () => {
  notify('Add task event');
};

const List = ({
  title,
  index,
  tasks,
  onTaskDragStart,
  onTaskDrop,
}: {
  title: string;
  index: number;
  tasks: Task[];
  onTaskDragStart: (e: DragStartEvent) => void;
  onTaskDrop: (e: ReorderEvent) => void;
}) => {
  return (
    <div className='list'>
      <div className='list-title dx-theme-text-color'>
        <span>{title}</span>
        <Button icon='more' onClick={onMoreBtnClick}></Button>
      </div>
      <ScrollView className='scrollable-list' direction='vertical' showScrollbar='always'>
        <Sortable className='sortable-cards' group='cardsGroup' data={index} onDragStart={onTaskDragStart} onReorder={onTaskDrop} onAdd={onTaskDrop}>
          {tasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </Sortable>
        <div className='add-task'>
          <Button icon='plus' text='Add Task' stylingMode='text' onClick={onAddTaskBtnClick} />
        </div>
      </ScrollView>
    </div>
  );
};

export default List;
