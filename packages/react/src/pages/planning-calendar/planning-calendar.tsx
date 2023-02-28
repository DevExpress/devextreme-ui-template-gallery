/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getTasks } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';

import { CalendarList } from '../../components/calendar-list/calendar-list';

// import Accordion from 'devextreme-react/accordion';
import List from 'devextreme-react/list';

import './planning-calendar.scss';

const processTasks = (tasks) => {
  return tasks.map((task) => ({
    text: task.text,
    startDate: task.startDate,
    endDate: task.dueDate
  }));
};

const views = ['week', 'month'];

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
        <CalendarList />
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
