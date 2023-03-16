/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './scheduler-month-agenda.scss';
import Query from 'devextreme/data/query';
import List from 'devextreme-react/list';
import { getTasksForScheduler } from 'dx-template-gallery-data';
import Button from 'devextreme-react/button';

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
const formatTime = (appointment) => {
  const start = appointment.startDate.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  const duration = appointment.endDate - appointment.startDate;
  const durationHours = Math.floor(duration / (60 * 60 * 1000));
  const durationMinutes = Math.floor((duration % (60 * 60 * 1000)) / 60000);
  let durationStr = '';
  if (durationHours > 0 && durationMinutes > 0) {
    durationStr = `${durationHours}:${durationMinutes} m`;
  }
  else if (durationHours > 0) {
    durationStr = `${durationHours} h`;
  }
  else {
    durationStr = `${durationMinutes} m`;
  }
  return <div className='time'>
    <div className='start'>{start}</div>
    <div className='duration'>{durationStr}</div>
  </div>;
};
const renderListItem = (item) => {
  return <div className='list-item'>
    <div className='time'>
      {formatTime(item)}
    </div>
    <div className='description'>
      {item.text}
    </div>
  </div>;
};

export const SchedulerMonthAgenda = ({ selectedAppointment = { startDate: new Date() }, toggleOpen, dataSource, schedulerRef }) => {
  const appointmentList = findAllAppointmentsForDay(selectedAppointment, dataSource);

  return <div className='agenda'>
    <div className='agenda-header'>
      <div className='date'>
        {selectedAppointment.startDate.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
      </div>
      <Button icon='showpanel' onClick={toggleOpen} />
    </div>
    <List dataSource={appointmentList} itemRender={renderListItem} onItemClick={(e) => { schedulerRef.current?.instance.showAppointmentTooltip(e.itemData, e.itemElement, e.itemData); }} />
  </div>;
};
