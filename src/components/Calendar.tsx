import React from 'react';
import '../style/Calendar.scss';

const Calendar = () => {
  const newDate = new Date();
  const currentYear = new Date(newDate).getFullYear();
  const currentMonth = new Date(newDate).getMonth() + 1;
  const firstDay = new Date(newDate.setDate(1))
  const weekTitles = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const listItems = weekTitles.map((weekTitle:string, i:number) => 
    <li key={i}>{weekTitle}</li>
  )

 

  return (
    <div className="calendar_main">
      <header>
        <h1>2023</h1>
        <h2>7월</h2>
        <ul>{listItems}</ul>
      </header>
    </div>
  );
}

export default Calendar;
