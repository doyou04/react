import React, {useCallback, useState} from 'react';
import '../style/Calendar.scss';

const Calendar = () => {
  const newDate:Date = new Date();
  const currentYear:number = new Date().getFullYear();
  const currentMonth:number = new Date().getMonth() + 1;
  const currentDay:number = new Date().getDate()
  // 요일
  const weekTitles:string[]= ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const listItems = weekTitles.map((weekTitle:string, i:number) => 
    <li key={i}>{weekTitle}</li>
  )
  //선택 연도, 달, 일
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  // 현재 날짜 Mon Jul 24 2023 00:00:00 GMT+0900
  const currentLastDate:Date = new Date(selectedYear, selectedMonth-1, selectedDay)
  // 현재 달 첫날 Mon Jul 24 2023 00:00:00 GMT+0900
  const currentfirstDay:Date = new Date(newDate.setDate(1))
  // 지난 달 마지막날 Mon Jul 24 2023 00:00:00 GMT+0900
  const pastFinalDay:Date = new Date(newDate.setDate(0))

  console.log(selectedDay)
  //  console.log(firstDay)

  return (
    <div className="calendar_main">
      <header>
        {/* <h1>{currentYear}</h1>
        <h2>{currentMonth}월</h2>
         */}
      </header>
      {/* <ul>{listItems}</ul> */}
      <div className="calendar_cnt">

      </div>
    </div>
  );
}

export default Calendar;
