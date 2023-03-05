/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, patchTasksForScheduler } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';

import { CalendarList } from '../../components/calendar-list/calendar-list';

// import Accordion from 'devextreme-react/accordion';
import List from 'devextreme-react/list';

import './planning-calendar.scss';

const views = ['week', 'month'];

export const PlanningCalendar = () => {
  const [selectedDay] = useState(0);
  const [tasks, setTasks] = useState(null);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    getTasks().then(tasksList => {
      setTasks(patchTasksForScheduler(tasksList));
    });
  }, []);
  const onSetDate = useCallback((e) => { setDate(e); }, []);

  return <div className='view-wrapper-calendar'>
    <div className='panels'>
      <div className='left'>
        <div className='buttons'>
          <Button text='Today' />
          <Button text='Create event' type='default' />
        </div>
        <div className='calendar'>
          <Calendar value={date} onValueChange={onSetDate} />
        </div>
        <CalendarList />
      </div>
      <div className='right'>
        <Scheduler
          defaultCurrentView='week'
          dataSource={tasks}
          height='inherit'
          currentDate={date}
        >
          <View type='day' />
          <View type='week' />
          <View type='month' />
          <View type='agenda' />
        </Scheduler>
      </div>
    </div>
  </div>;
};
