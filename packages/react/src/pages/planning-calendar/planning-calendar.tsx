import './planning-calendar.scss';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getTasksForScheduler, defaultCalendarListItems } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
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
import { Agenda } from '../../components/agenda/agenda';
import { TooltipContentTemplate } from '../../components/scheduler-tooltip/scheduler-tooltip';

const views: ViewType[] = ['day', 'week', 'month', 'agenda'];
interface CalendarListItem {
  id: number,
  text: string,
  color: string,
  checkboxColor: string,
}

const findAllAppointmentsForDay = (selectedAppointment, dataSource) => {
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

const onAppointmentFormOpening = (e) => {
  const editor = e.form.getEditor('calendarId');
  if (e.appointmentData.calendarId === undefined) {
    editor.option('value', 0);
  }
};

export const PlanningCalendar = () => {
  const { isXSmall, isSmall, isLarge } = useScreenSize();
  const schedulerRef = useRef<Scheduler>(null);
  const tooltipRef = useRef<Tooltip>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<{ data, target }>();
  const [tasks, setTasks] = useState<DataSource>();
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [calendarListItems] = useState(defaultCalendarListItems);
  const [agendaItems, setAgendaItems] = useState<{ startDate: Date }[]>();

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

  const onTodayClick = () => {
    setDate(new Date());
  };

  const resourcesList = useMemo(() => {
    return calendarListItems
      .reduce((res: CalendarListItem[], calendarList) => { return res.concat(calendarList.items); }, []);
  }, [calendarListItems]);

  const tooltipPosition = useMemo(() => {
    if (isXSmall) {
      return 'bottom';
    }
    const classList = selectedAppointment?.target?.classList || selectedAppointment?.target?.[0]?.classList;
    return classList?.contains('dx-list') && rightPanelOpen ? 'left' : 'top';
  }, [selectedAppointment, rightPanelOpen, isXSmall]);

  const onSetDate = useCallback((e) => { setDate(e); }, [setDate]);

  const toggleRightPanelOpen = useCallback(() => {
    setRightPanelOpen(!rightPanelOpen);
    if (isLarge) {
      schedulerRef.current?.instance.repaint();
    }
  }, [rightPanelOpen]);

  const onCurrentViewChange = useCallback((view) => { setCurrentView(view); }, [setCurrentView]);

  const onSelectedCalendarsChange = useCallback((seletedCalendars) => {
    const removedResourceFilters = seletedCalendars
      .map((calendar) => calendar.id);

    tasks?.filter((task) => {
      return !removedResourceFilters.includes(task.calendarId);
    });

    tasks?.load().then(() => { updateAgenda(selectedAppointment?.data); });
  }, [tasks, selectedAppointment]);

  const createAppointment = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup();
  }, [schedulerRef]);

  const deleteCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.deleteAppointment(selectedAppointment?.data);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const editCurrentAppointment = useCallback(() => {
    schedulerRef.current?.instance.showAppointmentPopup(selectedAppointment?.data, false);
    tooltipRef.current?.instance.hide();
  }, [selectedAppointment]);

  const updateAgenda = useCallback((appointmentData) => {
    setAgendaItems(findAllAppointmentsForDay(appointmentData, tasks));
  }, [tasks]);

  const onAppointmentClick = useCallback((e) => {
    if (currentView === 'month' && !rightPanelOpen) {
      const appointmentData = e.appointmentData;
      setSelectedAppointment({ data: appointmentData, target: e.targetElement });
      updateAgenda(appointmentData);
      toggleRightPanelOpen();
    }
  }, [currentView, rightPanelOpen, updateAgenda]);

  const onAppointmentTooltipShowing = useCallback((e) => {
    e.cancel = true;
    const appointmentData = e.appointments[0].appointmentData;

    const isAppointmentCollectorClicked = (e) => {
      return e.targetElement?.[0]?.classList.contains('dx-scheduler-appointment-collector');
    };

    setSelectedAppointment({ data: appointmentData, target: e.targetElement });

    if (currentView === 'month' || isAppointmentCollectorClicked(e)) {
      updateAgenda(appointmentData);
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
      updateAgenda(e.appointmentData);
    }
  }, [selectedAppointment, tasks]);

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

  const showAppointmentTooltip = useCallback((e) => {
    schedulerRef.current?.instance.showAppointmentTooltip(e.itemData, e.element);
  }, [schedulerRef]);

  return <div className='view-wrapper-calendar'>
    <div className='content'>
      <LeftSidePanel>
        <div className={isXSmall || isSmall ? 'left-content small' : 'left-content'}>
          <div className='buttons'>
            <Button
              text='Today'
              onClick={onTodayClick}
            />
            <Button
              text='Create event'
              type='default'
              onClick={createAppointment}
            />
          </div>
          <div className='calendar'>
            <Calendar
              value={date}
              onValueChange={onSetDate}
            />
          </div>
          <CalendarList
            calendarItems={calendarListItems}
            onSelectedCalendarsChange={onSelectedCalendarsChange}
          />
        </div>
      </LeftSidePanel>
      <div className='main-content'>
        <Scheduler
          ref={schedulerRef}
          adaptivityEnabled={isXSmall}
          allDayPanelMode='hidden'
          defaultCurrentView='week'
          dataSource={tasks}
          height='inherit'
          currentDate={date}
          currentView={currentView}
          onCurrentViewChange={onCurrentViewChange}
          onAppointmentAdded={onCellModified}
          onAppointmentClick={onAppointmentClick}
          onAppointmentDeleted={onCellModified}
          onAppointmentFormOpening={onAppointmentFormOpening}
          onAppointmentTooltipShowing={onAppointmentTooltipShowing}
          onCellClick={onCellClick}
          startDayHour={4}
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
        <Agenda
          selectedAppointment={selectedAppointment?.data}
          toggleOpen={toggleRightPanelOpen}
          items={agendaItems}
          resources={resourcesList}
          showAppointmentTooltip={showAppointmentTooltip}
        />
      </RightSidePanel>
    </div>
  </div>;
};
