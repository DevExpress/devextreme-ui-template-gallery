/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { Duration } from 'luxon';
import './scheduler-month-agenda.scss';
import List from 'devextreme-react/list';
import Button from 'devextreme-react/button';
import { useScreenSize } from '../../utils/media-query';

const getDurationString = (appointment) => {
  const duration = Duration.fromMillis(appointment.endDate - appointment.startDate).rescale();
  return duration.toFormat("h'h' m'm'");
};

const TimeContent = ({ appointment }) => {
  const start = appointment.startDate?.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  return <div className='time'>
    <div className='start'>{start}</div>
    <div className='duration'>{getDurationString(appointment)}</div>
  </div>;
};

export const SchedulerMonthAgenda = ({ selectedAppointment = { startDate: new Date() }, toggleOpen, resources, items, schedulerRef }) => {
  const { isLarge } = useScreenSize();
  const showAppointmentPopup = useCallback((e) => {
    schedulerRef.current?.instance.showAppointmentTooltip(e.itemData, e.element);
  }, [schedulerRef]);

  const renderListItem = useCallback((item) => {
    return <div className='list-item'>
      <div className='time'>
        <TimeContent appointment={item} />
      </div>
      <div className='description'>
        <div className='description-title'>
          {item.text}
        </div>
        <div className='description-resource'>
          {resources[item.calendarId]?.text}
        </div>
      </div>
    </div>;
  }, [resources]);

  return <div className='agenda'>
    <div className='agenda-header'>
      <div className='date'>
        {selectedAppointment.startDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
      </div>
      <Button icon={isLarge ? 'showpanel' : 'close'} onClick={toggleOpen} />
    </div>
    <List dataSource={items} itemRender={renderListItem} onItemClick={showAppointmentPopup} />
  </div>;
};
