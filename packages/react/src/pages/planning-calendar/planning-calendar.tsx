/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getTasksForScheduler, defaultListDS } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';
import List from 'devextreme-react/list';

import { CalendarList } from '../../components/calendar-list/calendar-list';
import { SidePanel } from '../../components/side-panel/side-panel';
import { SchedulerMonthAgenda } from '../../components/scheduler-month-agenda/scheduler-month-agenda';

import './planning-calendar.scss';
import { ViewType } from 'devextreme/ui/scheduler';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { useScreenSize } from '../../utils/media-query';

const views = ['week', 'month'];
const colors = ['#E1F5FE', '#C8E6C9', '#FFCDD2', '#FFE0B2', '#7b49d3', '#2a7ee4'];

export const PlanningCalendar = () => {
  const { isMedium, isLarge } = useScreenSize();
  const schedulerRef = useRef<Scheduler>(null);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [tasks, setTasks] = useState<DataSource>();
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [listDS, setListDS] = useState(defaultListDS);

  const resourcesList = useMemo(() => {
    return listDS
      .reduce((res: string[], calendarList) => { return res.concat(calendarList.items); }, []);
  }, [listDS]);

  useEffect(() => {
    getTasksForScheduler().then(tasksList => {
      setTasks(new DataSource(tasksList));
    });
  }, []);

  const onSetDate = useCallback((e) => { setDate(e); }, []);
  const toggleLeftPanelOpen = useCallback(() => {
    setLeftPanelOpen(!leftPanelOpen);
  }, [leftPanelOpen]);

  const toggleRightPanelOpen = useCallback(() => {
    setRightPanelOpen(!rightPanelOpen);
    if (isMedium || isLarge) {
      schedulerRef.current?.instance.repaint();
    }
  }, [rightPanelOpen]);

  const onCurrentViewChange = useCallback((view) => { setCurrentView(view); }, []);

  const onAppointmentClick = useCallback((e) => {
    if (currentView === 'month') {
      e.event.stopImmediatePropagation();
      setSelectedAppointment(e.appointmentData);
      if (!rightPanelOpen) {
        toggleRightPanelOpen();
      }
    }
  }, [currentView, rightPanelOpen]);

  const onSelectedCalendarsChange = useCallback((seletedCalendars) => {
    const removedResourceFilters = seletedCalendars
      .map((calendar) => calendar.id)
      .map(resource => ['calendarId', '<>', resource]);
    const filters: any[] = [];
    // refactor to predicate logic
    removedResourceFilters.forEach(filter => {
      filters.push(filter, 'and');
    });
    filters.pop();
    if (filters.length > 0) {
      tasks?.filter(filters);
    }
    else { tasks?.filter(null); }

    tasks?.load();
  }, [tasks]);

  const renderAppointmentTooltip = useCallback(({ appointmentData, targetedAppointmentData, isButtonClicked }) => {
    const timeString = `${targetedAppointmentData.startDate.toLocaleString()} - ${targetedAppointmentData.endDate.toLocaleTimeString()}`;
    const deleteCurrentAppointment = (e) => {
      e.event.stopPropagation();
      schedulerRef.current?.instance.deleteAppointment(appointmentData);
    };
    return (<div className='appointment-tooltip'>
      <div className='title'>{targetedAppointmentData.text}</div>
      <div className='content'>
        <div className='date'>
          <Button icon='clock' />
          {timeString}
        </div>
        <div className='description'>
          <Button icon='textdocument' />
          {targetedAppointmentData.description}
        </div>
      </div>
      <div className='buttons'>
        <Button text='Delete' type='danger' onClick={deleteCurrentAppointment} />
        <Button text='Edit' type='success' />
      </div>
    </div>);
  }, []);

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
          <CalendarList listDS={listDS} onSelectedCalendarsChange={onSelectedCalendarsChange} />
        </div>
      </SidePanel>
      <div className='right'>
        <Scheduler
          allDayPanelMode='hidden'
          ref={schedulerRef}
          defaultCurrentView='week'
          dataSource={tasks}
          height='inherit'
          currentDate={date}
          currentView={currentView}
          onCurrentViewChange={onCurrentViewChange}
          onAppointmentClick={onAppointmentClick}
          appointmentTooltipRender={renderAppointmentTooltip}
        >
          <Resource
            dataSource={resourcesList}
            fieldExpr='calendarId'
            label='Calendar'
          />
          <View type='day' />
          <View type='week' />
          <View type='month' />
          <View type='agenda' />
        </Scheduler>
      </div>
      {currentView === 'month' &&
        <SidePanel
          side='right'
          isOverlapping={false}
          isOpened={rightPanelOpen}
          toggleOpen={toggleRightPanelOpen}
        >
          <SchedulerMonthAgenda
            selectedAppointment={selectedAppointment}
            toggleOpen={toggleRightPanelOpen}
            dataSource={tasks}
          />
        </SidePanel>
      }
    </div>
  </div>;
};
