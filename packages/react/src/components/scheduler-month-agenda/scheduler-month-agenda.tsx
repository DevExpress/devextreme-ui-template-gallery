/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import './scheduler-month-agenda.scss';
import Query from 'devextreme/data/query';
import List from 'devextreme-react/list';
import { getTasksForScheduler } from 'dx-template-gallery-data';

const findAllAppointmentsForDay = (selectedAppointment, tasks) => {
  if (tasks.length === 0 || !selectedAppointment) {
    return [];
  }
  return Query(tasks)
    .filter((appointment) => {
      return appointment.startDate.getDate() === selectedAppointment.startDate.getDate();
    })
    .toArray();
};

export const SchedulerMonthAgenda = ({ selectedAppointment }) => {
  const [tasks, setTasks] = useState([]);
  const appointmentList = findAllAppointmentsForDay(selectedAppointment, tasks);
  useEffect(() => {
    getTasksForScheduler().then(res => { setTasks(res); });
  }, []);
  return <div><List dataSource={appointmentList} /></div>;
};
