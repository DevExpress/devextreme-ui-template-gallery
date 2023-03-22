/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getTasksForScheduler, defaultListDS } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';
import SpeedDialAction from 'devextreme-react/speed-dial-action';

import { CalendarList } from '../../components/calendar-list/calendar-list';
import { SidePanel } from '../../components/side-panel/side-panel';
import { LeftSidePanel } from '../../components/side-panel/left-side-panel';
import { RightSidePanel } from '../../components/side-panel/right-side-panel';
import { SchedulerMonthAgenda, findAllAppointmentsForDay } from '../../components/scheduler-month-agenda/scheduler-month-agenda';
import { TooltipContentTemplate } from '../../components/scheduler-tooltip/scheduler-tooltip';
import Tooltip from 'devextreme-react/tooltip';

import './planning-calendar.scss';
import { ViewType } from 'devextreme/ui/scheduler';
import DataSource from 'devextreme/data/data_source';
import { useScreenSize } from '../../utils/media-query';

const views = ['week', 'month'];
const colors = ['#E1F5FE', '#C8E6C9', '#FFCDD2', '#FFE0B2', '#7b49d3', '#2a7ee4'];

export const PlanningCalendar = () => {
  const { isXSmall, isMedium, isLarge } = useScreenSize();
  const schedulerRef = useRef<Scheduler>(null);
  const tooltipRef = useRef<Tooltip>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<{ data, target }>();
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
    if (isLarge) {
      schedulerRef.current?.instance.repaint();
    }
  }, [rightPanelOpen]);

  const onCurrentViewChange = useCallback((view) => { setCurrentView(view); }, []);

  const onSelectedCalendarsChange = useCallback((seletedCalendars) => {
    const removedResourceFilters = seletedCalendars
      .map((calendar) => calendar.id)
      .map(resource => ['calendarId', '<>', resource]);
    const filters: unknown[] = [];
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

  const createAppointment = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup();
  }, []);

  const onTodayClick = () => {
    setDate(new Date());
  };

  const deleteCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.deleteAppointment(selectedAppointment?.data);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const editCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup(selectedAppointment?.data, false);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const onAppointmentClick = useCallback((e) => {
    if (currentView === 'month') {
      if (!rightPanelOpen) {
        toggleRightPanelOpen();
      }
    }
  }, [currentView, rightPanelOpen]);

  const onAppointmentTooltipShowing = useCallback((e) => {
    e.cancel = true;
    const classList = e.targetElement?.classList || e.targetElement[0]?.classList;

    setSelectedAppointment({ data: e.appointments[0].appointmentData, target: e.targetElement });
    if (currentView === 'month' && isXSmall && !rightPanelOpen) {
      toggleRightPanelOpen();
    }
    else {
      tooltipRef.current?.instance.show();
    }

  }, [currentView, isXSmall, rightPanelOpen]);

  const tooltipPosition = useMemo(() => {
    if (isXSmall) {
      return 'bottom';
    }
    const classList = selectedAppointment?.target?.classList || selectedAppointment?.target?.[0]?.classList;
    return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
  }, [selectedAppointment, rightPanelOpen, isXSmall]);

  const onCellClick = useCallback((e) => {
    if (currentView === 'month' && e.cellData) {
      const cellAppointments = findAllAppointmentsForDay(e.cellData, tasks);
      if (cellAppointments.length > 1 && !rightPanelOpen) {
        setSelectedAppointment({ data: e.cellData, target: null });
        toggleRightPanelOpen();
      }
    }
  }, [currentView, rightPanelOpen, tasks, selectedAppointment]);

  return <div className='view-wrapper-calendar'>
    <div className='panels'>
      <LeftSidePanel>
        <div className='left'>
          <div className='buttons'>
            <Button text='Today' onClick={onTodayClick} />
            <Button text='Create event' type='default' onClick={createAppointment} />
          </div>
          <div className='calendar'>
            <Calendar value={date} onValueChange={onSetDate} />
          </div>
          <CalendarList listDS={listDS} onSelectedCalendarsChange={onSelectedCalendarsChange} />
        </div>
      </LeftSidePanel>
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
          onAppointmentTooltipShowing={onAppointmentTooltipShowing}
          onCellClick={onCellClick}
          adaptivityEnabled={isXSmall}
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
          <SpeedDialAction
            icon='add'
            visible={isXSmall}
            onClick={createAppointment}
          />
        </Scheduler>
        <Tooltip
          ref={tooltipRef}
          target={selectedAppointment?.target}
          showEvent='click'
          position={tooltipPosition}
        // container={schedulerRef.current?.instance.element()}
        >
          <TooltipContentTemplate
            deleteCurrentAppointment={deleteCurrentAppointment}
            editCurrentAppointment={editCurrentAppointment}
            appointmentData={selectedAppointment?.data} />
        </Tooltip>
      </div>
      {currentView === 'month' &&
        <SidePanel
          side='right'
          isOverlapping={false}
          isOpened={rightPanelOpen}
          toggleOpen={toggleRightPanelOpen}
        >
          <SchedulerMonthAgenda
            selectedAppointment={selectedAppointment?.data}
            toggleOpen={toggleRightPanelOpen}
            dataSource={tasks}
            schedulerRef={schedulerRef}
          />
        </SidePanel>
      }
    </div>
  </div>;
};
