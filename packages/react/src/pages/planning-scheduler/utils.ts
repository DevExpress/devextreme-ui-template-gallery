import Query from 'devextreme/data/query';

export const findAllAppointmentsForDay = (selectedAppointment, dataSource) => {
  if (!dataSource) {
    return [];
  }
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
