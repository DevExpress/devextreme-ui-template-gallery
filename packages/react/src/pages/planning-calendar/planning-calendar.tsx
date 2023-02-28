/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getTasks } from 'dx-template-gallery-data';
import Calendar from 'devextreme-react/calendar';
import Scheduler, { View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';

// import Accordion from 'devextreme-react/accordion';
import List from 'devextreme-react/list';
import CheckBox from 'devextreme-react/check-box';

import './planning-calendar.scss';

const listDS = [
  {
    key: 'My calendars',
    items: ['Brett Johnson', 'Tasks', 'Reminder', 'Contacts']
  },
  {
    key: 'Other calendars',
    items: ['Holidays']
  }
];
const processTasks = (tasks) => {
  return tasks.map((task) => ({
    text: task.text,
    startDate: task.startDate,
    endDate: task.dueDate
  }));
};

const views = ['week', 'month'];

export const listItemsRender = (item) => {
  return (
    <div className='list-item'>
      <CheckBox />
      <span className='list-item-text'>{item.text}</span>
    </div>
  );
};

export const listTitleRender = (item) => {
  return <div className='list-header'>
    {item.key}
    <Button icon='add' stylingMode='contained' />
  </div>;
};
export const PlanningCalendar = () => {
  const [selectedDay] = useState(0);
  const [tasks, setTasks] = useState(null);
  // useEffect(() => {
  //   getTasks().then(tasksList => {
  //     console.log(tasksList
  //       // .map(task => )
  //     );
  //     setTasks(processTasks(tasksList));
  //   });
  // }, []);
  return <div className='view-wrapper-calendar'>
    <div className='panels'>
      <div className='left'>
        <div className='buttons'>
          <Button text='Today' />
          <Button text='Create event' type='default' />
        </div>
        <div className='calendar'>
          <Calendar />
        </div>
        {/* <Accordion
          dataSource={accordionDS}
          multiple
          collapsible
          itemRender={accordionItemsRender}
          itemTitleRender={accordionTitleRender}
        // hoverStateEnabled={false}
        // focusStateEnabled={false}
        /> */}
        <List
          dataSource={listDS}
          groupRender={listTitleRender}
          itemRender={listItemsRender}
          grouped
          collapsibleGroups
          scrollingEnabled={false}
          // showSelectionControls
          activeStateEnabled={false}
        />
      </div>
      <div className='right'>
        <Scheduler
          defaultCurrentView='week'
          dataSource={tasks}
          height='inherit'
        >
          <View type='day' />
          <View type='week' />
          <View type='month' />
        </Scheduler>
      </div>
    </div>
  </div>;
};
