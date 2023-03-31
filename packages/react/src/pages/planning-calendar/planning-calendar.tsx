/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getTasksForScheduler, defaultCalendarListItems } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import Tooltip from 'devextreme-react/tooltip';

import { ViewType } from 'devextreme/ui/scheduler';
import DataSource from 'devextreme/data/data_source';
import Query from 'devextreme/data/query';
import { useScreenSize } from '../../utils/media-query';

import { CalendarList } from '../../components/calendar-list/calendar-list';
import { LeftSidePanel } from '../../components/side-panel/left-side-panel';
import { RightSidePanel } from '../../components/side-panel/right-side-panel';
import { SchedulerMonthAgenda } from '../../components/scheduler-month-agenda/scheduler-month-agenda';
import { TooltipContentTemplate } from '../../components/scheduler-tooltip/scheduler-tooltip';

import './planning-calendar.scss';

const views: ViewType[] = ['day', 'week', 'month', 'agenda'];

export const findAllAppointmentsForDay = (selectedAppointment, dataSource) => {
  const appointments = dataSource.items();
  if (appointments.length === 0 || !selectedAppointment) {
    return [];
  }
  return Query(appointments)
    .filter((appointment) => {
      return appointment.startDate.getDate() === selectedAppointment.startDate.getDate()
        && appointment.startDate.getMonth() === selectedAppointment.startDate.getMonth();
    })
    .toArray();
};

const isAppointmentCollectorClicked = (e) => {
  return e.targetElement?.[0]?.classList.contains('dx-scheduler-appointment-collector');
};
export const PlanningCalendar = () => {
  const { isXSmall, isSmall, isMedium, isLarge } = useScreenSize();
  const schedulerRef = useRef<Scheduler>(null);
  const tooltipRef = useRef<Tooltip>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<{ data, target }>();
  const [tasks, setTasks] = useState<DataSource>();
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [calendarListItems, setCalendarListItems] = useState(defaultCalendarListItems);
  const [agendaItems, setAgendaItems] = useState<any[]>();

  const resourcesList = useMemo(() => {
    return calendarListItems
      .reduce((res: string[], calendarList) => { return res.concat(calendarList.items); }, []);
  }, [calendarListItems]);

  useEffect(() => {
    getTasksForScheduler().then(tasksList => {
      setTasks(new DataSource(tasksList));
    });
  }, []);
  useEffect(() => {
    if (tasks) {
      setAgendaItems(findAllAppointmentsForDay({ startDate: date }, tasks));
    }
  }, [tasks]);

  const onSetDate = useCallback((e) => { setDate(e); }, []);

  const toggleRightPanelOpen = useCallback(() => {
    setRightPanelOpen(!rightPanelOpen);
    if (isLarge) {
      schedulerRef.current?.instance.repaint();
    }
  }, [rightPanelOpen]);

  const onCurrentViewChange = useCallback((view) => { setCurrentView(view); }, []);

  const onSelectedCalendarsChange = useCallback((seletedCalendars) => {
    const removedResourceFilters = seletedCalendars
      .map((calendar) => calendar.id);

    tasks?.filter((task) => {
      return !removedResourceFilters.includes(task.calendarId);
    });

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
        const appointmentData = e.appointmentData;
        setSelectedAppointment({ data: appointmentData, target: e.targetElement });
        setAgendaItems(findAllAppointmentsForDay(appointmentData, tasks));
        toggleRightPanelOpen();
      }
    }
  }, [currentView, rightPanelOpen]);

  const onAppointmentTooltipShowing = useCallback((e) => {
    e.cancel = true;
    const appointmentData = e.appointments[0].appointmentData;

    setSelectedAppointment({ data: appointmentData, target: e.targetElement });

    if (currentView === 'month' || isAppointmentCollectorClicked(e)) {
      setAgendaItems(findAllAppointmentsForDay(appointmentData, tasks));
    }
    if ((currentView === 'month' && isXSmall ||
      isAppointmentCollectorClicked(e)) &&
      !rightPanelOpen) {
      toggleRightPanelOpen();
    }
    else {
      tooltipRef.current?.instance.show();
    }

  }, [currentView, isXSmall, rightPanelOpen, tasks]);

  const onCellModified = useCallback((e) => {
    if (e.appointmentData.startDate.toDateString() === selectedAppointment?.data.startDate.toDateString()) {
      setAgendaItems(findAllAppointmentsForDay(e.appointmentData, tasks));
    }
  }, [selectedAppointment, tasks]);

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
      if (cellAppointments.length > 1) {
        setSelectedAppointment({ data: e.cellData, target: null });
        setAgendaItems(cellAppointments);
        if (!rightPanelOpen) {
          toggleRightPanelOpen();
        }
      }
    }
  }, [currentView, rightPanelOpen, tasks, selectedAppointment]);

  return <div className='view-wrapper-calendar'>
    <div className='panels'>
      <LeftSidePanel>
        <div className={isXSmall || isSmall ? 'left small' : 'left'}>
          <div className='buttons'>
            <Button text='Today' onClick={onTodayClick} />
            <Button text='Create event' type='default' onClick={createAppointment} />
          </div>
          <div className='calendar'>
            <Calendar value={date} onValueChange={onSetDate} />
          </div>
          <CalendarList calendarItems={calendarListItems} onSelectedCalendarsChange={onSelectedCalendarsChange} />
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
          onAppointmentAdded={onCellModified}
          onAppointmentDeleted={onCellModified}
          onAppointmentTooltipShowing={onAppointmentTooltipShowing}
          onCellClick={onCellClick}
          adaptivityEnabled={isXSmall}
          views={views}
        >
          <Resource
            dataSource={resourcesList}
            fieldExpr='calendarId'
            label='Calendar'
          />
        </Scheduler>
        <SpeedDialAction
          icon='add'
          visible={isXSmall}
          onClick={createAppointment}
        />
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
      <RightSidePanel
        showOpenButton={currentView === 'month'}
        isOpened={rightPanelOpen}
        toggleOpen={toggleRightPanelOpen}
      >
        <SchedulerMonthAgenda
          selectedAppointment={selectedAppointment?.data}
          toggleOpen={toggleRightPanelOpen}
          items={agendaItems}
          resources={resourcesList}
          schedulerRef={schedulerRef}
        />
      </RightSidePanel>
    </div>
  </div>;
};
