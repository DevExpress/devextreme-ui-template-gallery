import './planning-scheduler.scss';

import React, { useState, useMemo } from 'react';
import { defaultCalendarListItems } from 'dx-template-gallery-data';

import Button from 'devextreme-react/button';
import Calendar from 'devextreme-react/calendar';
import Scheduler, { Resource, SchedulerTypes } from 'devextreme-react/scheduler';
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import Tooltip from 'devextreme-react/tooltip';

import { useScreenSize } from '../../utils/media-query';

import { useSchedulerLogic } from './use-scheduler-logic';

import { CalendarList } from '../../components/utils/calendar-list/calendar-list';
import { LeftSidePanel } from '../../components/utils/left-side-panel/left-side-panel';
import { RightSidePanel } from '../../components/utils/right-side-panel/right-side-panel';
import { Agenda } from '../../components/utils/agenda/agenda';
import { TooltipContentTemplate } from '../../components/library/scheduler-tooltip/scheduler-tooltip';

const views: SchedulerTypes.ViewType[] = ['day', 'workWeek', 'month', 'agenda'];
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

export const PlanningScheduler = () => {
  const { isXSmall, isSmall } = useScreenSize();
  const [calendarListItems] = useState(defaultCalendarListItems);

  const {
    agendaItems,
    currentView,
    date,
    rightPanelOpen,
    schedulerRef,
    schedulerCurrentDate,
    selectedAppointment,
    tasks,
    tooltipPosition,
    tooltipRef,
    deleteCurrentAppointment,
    editCurrentAppointment,
    onCurrentViewChange,
    onAppointmentClick,
    onAppointmentTooltipShowing,
    onAppointmentModified,
    onCellClick,
    onSelectedDateChange,
    onSelectedCalendarsChange,
    showAppointmentTooltip,
    showAppointmentCreationForm,
    toggleRightPanelOpen,
  } = useSchedulerLogic();

  const resourcesList = useMemo(() => {
    return calendarListItems
      .reduce((res: CalendarListItem[], calendarList) => { return res.concat(calendarList.items); }, []);
  }, [calendarListItems]);

  return <div className='view-wrapper-calendar'>
    <div className='calendar-content'>
      <LeftSidePanel>
        <div className={isXSmall || isSmall ? 'left-content small' : 'left-content'}>
          <div className='buttons'>
            <Button
              text='Today'
              onClick={onSelectedDateChange}
            />
            <Button
              text='Create event'
              type='default'
              onClick={showAppointmentCreationForm}
            />
          </div>
          <div className='calendar'>
            <Calendar
              value={date}
              onValueChange={onSelectedDateChange}
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
          defaultCurrentView='workWeek'
          dataSource={tasks}
          height='inherit'
          currentDate={schedulerCurrentDate}
          currentView={currentView}
          onCurrentViewChange={onCurrentViewChange}
          onAppointmentAdded={onAppointmentModified}
          onAppointmentClick={onAppointmentClick}
          onAppointmentDeleted={onAppointmentModified}
          onAppointmentFormOpening={onAppointmentFormOpening}
          onAppointmentTooltipShowing={onAppointmentTooltipShowing}
          onCellClick={onCellClick}
          showCurrentTimeIndicator={false}
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
          onClick={showAppointmentCreationForm}
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
            selectedAppointmentData={selectedAppointment?.data} />
        </Tooltip>
      </div>
      <RightSidePanel
        showOpenButton={currentView === 'month'}
        isOpened={rightPanelOpen}
        toggleOpen={toggleRightPanelOpen}
      >
        <Agenda
          selectedAppointmentData={selectedAppointment?.data}
          toggleOpen={toggleRightPanelOpen}
          items={agendaItems}
          resources={resourcesList}
          showAppointmentTooltip={showAppointmentTooltip}
        />
      </RightSidePanel>
    </div>
  </div>;
};
