import React, { useState } from 'react';
import './planning-calendar.scss';
export const PlanningCalendar = () => {
  const [selectedDay] = useState(0);
  return <>
    <div>PlaceHolder Today is: {selectedDay} day</div>
  </>;
};
