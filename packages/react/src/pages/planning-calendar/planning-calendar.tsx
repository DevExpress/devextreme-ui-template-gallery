/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, patchTasksForScheduler } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';
import List from 'devextreme-react/list';

import { CalendarList } from '../../components/calendar-list/calendar-list';
import { SidePanel } from '../../components/side-panel/side-panel';

import './planning-calendar.scss';

const views = ['week', 'month'];

export const PlanningCalendar = () => {
  const [selectedDay] = useState(0);
  const [tasks, setTasks] = useState(null);
  const [date, setDate] = useState(new Date());
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  useEffect(() => {
    getTasks().then(tasksList => {
      // console.log(patchTasksForScheduler(tasksList));
      setTasks(patchTasksForScheduler(tasksList));
    });
  }, []);
  const onSetDate = useCallback((e) => { setDate(e); }, []);
  const toggleLeftPanelOpen = useCallback(() => {
    setLeftPanelOpen(!leftPanelOpen);
  }, [leftPanelOpen]);

  const toggleRightPanelOpen = useCallback(() => {
    setRightPanelOpen(!rightPanelOpen);
  }, [rightPanelOpen]);

  return <div className='view-wrapper-calendar'>
    <div className='panels'>
      <SidePanel
        side='left'
        isOpened={leftPanelOpen}
        toggleOpen={toggleLeftPanelOpen}
      >
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
      </SidePanel>
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
      <SidePanel
        side='right'
        isOverlapping={false}
        isOpened={rightPanelOpen}
        toggleOpen={toggleRightPanelOpen}
      >
        <div>Its a new panel</div>
      </SidePanel>
    </div>
  </div>;
};
