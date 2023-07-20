import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import '../styles/calendar.css'

const Calendar = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;

    setSelectedDate(formattedDate);
    onDateSelect(formattedDate); // Call the onDateSelect prop with the selected date
  };

  return (
    <div>
      <ReactCalendar
        minDate={new Date()}
        view="month"
        onClickDay={handleDateChange}
        className='REACT-CALENDAR'
      />
    </div>
  );
};

export default Calendar;
