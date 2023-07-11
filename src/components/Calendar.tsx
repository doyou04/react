import React from 'react';
import '../style/Calendar.scss';

const Calendar = () => {
  const weekTitles = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const listItems = weekTitles.map((weekTitle:string, i:number) => 
    <li key={i}>{weekTitle}</li>
  )

  return (
    <div className="calendar_main">
      <header>
        <ul>{listItems}</ul>
      </header>
    </div>
  );
}

export default Calendar;
