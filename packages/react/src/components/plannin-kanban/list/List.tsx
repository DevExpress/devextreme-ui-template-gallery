import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import Sortable from 'devextreme-react/sortable';
import Card from '../card/Card';
import './List.scss';

const List = ({ title, index, tasks, onTaskDragStart, onTaskDrop }) => {
    return <div className="list">
    <div className="list-title dx-theme-text-color">{title}</div>
    <ScrollView
      className="scrollable-list"
      direction="vertical"
      showScrollbar="always">
      <Sortable
        className="sortable-cards"
        group="cardsGroup"
        data={index}
        onDragStart={onTaskDragStart}
        onReorder={onTaskDrop}
        onAdd={onTaskDrop}>
        {tasks.map((task) => <Card key={task.id} task={task} />)}
      </Sortable>
    </ScrollView>
  </div>;
}

export default List;