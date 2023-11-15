import React from 'react';
import Button from 'devextreme-react/button';
import './scheduler-tooltip.scss';

export const TooltipContentTemplate = ({ selectedAppointmentData, deleteCurrentAppointment, editCurrentAppointment }) => {
  if (!selectedAppointmentData || !selectedAppointmentData.endDate) {
    return null;
  }
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const dateOptions = {
    ...timeOptions,
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  };
  const timeString = `${selectedAppointmentData.startDate.toLocaleString(undefined, dateOptions)} - ${selectedAppointmentData.endDate.toLocaleTimeString(undefined, timeOptions)}`;

  return (<div className='appointment-tooltip'>
    <div className='title'>{selectedAppointmentData.text}</div>
    <div className='content'>
      <div className='date'>
        <Button icon='clock'
          stylingMode='text'
          focusStateEnabled={false}
          activeStateEnabled={false}
          hoverStateEnabled={false}
        />
        {timeString}
      </div>
      {selectedAppointmentData.description &&
        <div className='description'>
          <Button
            icon='textdocument'
            stylingMode='text'
            focusStateEnabled={false}
            activeStateEnabled={false}
            hoverStateEnabled={false}
          />
          {selectedAppointmentData.description}
        </div>
      }
    </div>
    <div className='buttons'>
      <Button
        className='button-danger'
        text='Delete'
        type='danger'
        stylingMode='text'
        onClick={deleteCurrentAppointment}
      />
      <Button
        className='button-success'
        text='Edit'
        type='success'
        stylingMode='text'
        onClick={editCurrentAppointment}
      />
    </div>
  </div>);
};
