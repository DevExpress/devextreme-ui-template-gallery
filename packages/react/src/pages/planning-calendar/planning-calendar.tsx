import './planning-calendar.scss';

import React, { useState, useMemo } from 'react';
import { defaultCalendarListItems } from 'dx-template-gallery-data';

import Button from 'devextreme-react/button';
import Calendar from 'devextreme-react/calendar';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import SpeedDialAction from 'devextreme-react/speed-dial-action';
import Tooltip from 'devextreme-react/tooltip';

import { ViewType } from 'devextreme/ui/scheduler';
import { useScreenSize } from '../../utils/media-query';

import { useSchedulerLogic } from './use-scheduler-logic';

import { CalendarList } from '../../components/calendar-list/calendar-list';
import { LeftSidePanel } from '../../components/side-panel/left-side-panel';
import { RightSidePanel } from '../../components/side-panel/right-side-panel';
import { Agenda } from '../../components/agenda/agenda';
import { TooltipContentTemplate } from '../../components/scheduler-tooltip/scheduler-tooltip';

const views: ViewType[] = ['day', 'workWeek', 'month', 'agenda'];
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
  const [calendarListItems] = useState(defaultCalendarListItems);
  const {
    agendaItems,
    currentView,
    date,
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
    onAppointmentModified,
    onCellClick,
    onSelectedDateChange,
    onSelectedCalendarsChange,
    showAppointmentTooltip,
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
              onClick={createAppointment}
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
          currentDate={date}
          currentView={currentView}
          onCurrentViewChange={onCurrentViewChange}
          onAppointmentAdded={onAppointmentModified}
          onAppointmentClick={onAppointmentClick}
          onAppointmentDeleted={onAppointmentModified}
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
        {selectedAppointment?.target &&
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
        }
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
