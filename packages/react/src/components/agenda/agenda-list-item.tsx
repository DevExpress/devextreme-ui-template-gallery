import './agenda-list-item.scss';
import React from 'react';
import { Duration } from 'luxon';

const getFormatedDuration = ({ startDate, endDate }) => {
  return Duration.fromMillis(endDate - startDate)
    .rescale()
    .toFormat("h'h' m'm'");
};

const TimeContent = ({ appointment }) => {
  const start = appointment.startDate.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  return <div className='time'>
    <div className='start'>{start}</div>
    <div className='duration'>{getFormatedDuration(appointment)}</div>
  </div>;
};

export const AgendaListItem = ({ item, resources }) => {
  return <div className='agenda-list-item'>
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
};
