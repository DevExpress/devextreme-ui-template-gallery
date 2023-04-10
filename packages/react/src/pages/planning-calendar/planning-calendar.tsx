import './planning-calendar.scss';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getTasksForScheduler, defaultCalendarListItems } from 'dx-template-gallery-data';

import Calendar from 'devextreme-react/calendar';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import Button from 'devextreme-react/button';
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import Tooltip from 'devextreme-react/tooltip';

import { ViewType } from 'devextreme/ui/scheduler';
import DataSource from 'devextreme/data/data_source';
import { useScreenSize } from '../../utils/media-query';

import { findAllAppointmentsForDay } from './utils';
import { useSchedulerLogic } from './use-scheduler-logic';

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

const onAppointmentFormOpening = (e) => {
  const editor = e.form.getEditor('calendarId');
  if (e.appointmentData.calendarId === undefined) {
    editor.option('value', 0);
  }
};

export const PlanningCalendar = () => {
  const { isXSmall, isSmall } = useScreenSize();

  const [date, setDate] = useState(new Date());
  const [calendarListItems] = useState(defaultCalendarListItems);
  const {
    agendaItems,
    currentView,
    rightPanelOpen,
    schedulerRef,
    selectedAppointment,
    tasks,
    tooltipPosition,
    tooltipRef,
    createAppointment,
    deleteCurrentAppointment,
    editCurrentAppointment,
    onCurrentViewChange,
    onAppointmentClick,
    onAppointmentTooltipShowing,
    onCellModified,
    onCellClick,
    updateAgenda,
    setAgendaItems,
    setTasks,
    toggleRightPanelOpen,
  } = useSchedulerLogic();

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

  const onSetDate = useCallback((e) => { setDate(e); }, [setDate]);

  const onSelectedCalendarsChange = useCallback((seletedCalendars) => {
    const removedResourceFilters = seletedCalendars
      .map((calendar) => calendar.id);

    tasks?.filter((task) => {
      return !removedResourceFilters.includes(task.calendarId);
    });

    tasks?.load().then(() => { updateAgenda(selectedAppointment?.data); });
  }, [tasks, selectedAppointment]);

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
