/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getTasks } from 'dx-template-gallery-data';
import Calendar from 'devextreme-react/calendar';
import Scheduler, { View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';

import Accordion from 'devextreme-react/accordion';
import CheckBox from 'devextreme-react/check-box';

import './planning-calendar.scss';

const accordionDS = [
  {
    title: 'My Calendars',
    calendarList: ['Johnson', 'Tasks', 'Reminder', 'Contacts']
  },
  {
    title: 'Other Calendars',
    lol: 'add',
    calendarList: ['Holidays']
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

export const accordionItemsRender = (item) => {
  return (<>
    {item.calendarList.map((item, index) => {
      return <div key={index} className='accordion-item'>
        <CheckBox value />
        <span className='item-text'>{item}</span>
      </div>;
    })}
  </>);
};

export const accordionTitleRender = (item) => {
  return <>
    {item.title}
    <div>
      <Button icon='add' stylingMode='contained' />
    </div>
  </>;
};
export const PlanningCalendar = () => {
  const [selectedDay] = useState(0);
  const [tasks, setTasks] = useState(null);
  // useEffect(()=>{
  //   getTasks().then(tasksList => {
  //     console.log(tasksList.filter(task=>task.dueDate !== null && new Date(task.dueDate).getDate() === new Date(task.startDate).getDate())
  //     // .map(task => )
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
        <Accordion
          dataSource={accordionDS}
          multiple
          collapsible
          itemRender={accordionItemsRender}
          itemTitleRender={accordionTitleRender}
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
