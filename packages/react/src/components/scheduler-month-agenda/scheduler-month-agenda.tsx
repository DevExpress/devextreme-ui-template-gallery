/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './scheduler-month-agenda.scss';
import Query from 'devextreme/data/query';
import List from 'devextreme-react/list';
import { getTasksForScheduler } from 'dx-template-gallery-data';
import Button from 'devextreme-react/button';

const findAllAppointmentsForDay = (selectedAppointment, tasks) => {
  if (tasks.length === 0 || !selectedAppointment) {
    return [];
  }
  return Query(tasks)
    .filter((appointment) => {
      return appointment.startDate.getDate() === selectedAppointment.startDate.getDate()
        && appointment.startDate.getMonth() === selectedAppointment.startDate.getMonth();
    })
    .toArray();
};
const formatTime = (appointment) => {
  const start = `${appointment.startDate.getHours()}:${appointment.startDate.getMinutes()}`;
  const duration = appointment.endDate - appointment.startDate;
  const durationHours = Math.floor(duration / (60 * 60 * 1000));
  const durationMinutes = Math.floor((duration % (60 * 60 * 1000)) / 60000);
  return <div>
    <div>{start}</div>
    <div>{durationHours > 0 && `${durationHours} h`}</div>
    <div>{durationMinutes > 0 && `${durationMinutes} m`}</div>
  </div>;
};
const renderListItem = (item) => {
  return <div>
    <div className='time'>
      {formatTime(item)}
    </div>
    <div className='description'>
      {item.text}
    </div>
  </div>;
};

export const SchedulerMonthAgenda = ({ selectedAppointment = { startDate: new Date() }, toggleOpen }) => {
  const [tasks, setTasks] = useState([]);
  const appointmentList = findAllAppointmentsForDay(selectedAppointment, tasks);
  useEffect(() => {
    getTasksForScheduler().then(res => { setTasks(res); });
  }, []);
  return <div className='agenda'>
    <div className='agenda-header'>
      {selectedAppointment.startDate.toDateString()}
      <Button icon='showpanel' onClick={toggleOpen} />
    </div>
    <List dataSource={appointmentList} itemRender={renderListItem} />
  </div>;
};
