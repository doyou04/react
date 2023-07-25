import React, {useCallback, useState} from 'react';
import '../style/Calendar.scss';
import classnames from 'classnames';

const Calendar = () => {
  const newDate:Date = new Date();
  const currentYear:number = new Date().getFullYear();
  const currentMonth:number = new Date().getMonth() + 1;
  const currentDay:number = new Date().getDate()
  // 요일
  const weekTitles:string[]= ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const listItems = weekTitles.map((weekTitle:string, i:number) => 
    <li key={i} className={classnames({sunday: i === 0, saturday: i === 6})}>{weekTitle}</li>
  )
  //선택 연도, 달, 일
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  const [active, setActive ] = useState<boolean>();
  // 현재달 첫째날 요일 0~6 (일~토)
  const day:number = new Date(selectedYear, selectedMonth-1, 1).getDay()
  // 현재 달 마지막 날짜(일)
  const currentLastDate:number = new Date(selectedYear, selectedMonth, 0).getDate()
  // 현재 달 첫날 Mon Jul 24 2023 00:00:00 GMT+0900
  const currentfirstDay:Date = new Date(newDate.setDate(1))
  // 지난 달 마지막날 Mon Jul 24 2023 00:00:00 GMT+0900
  const pastFinalDay:Date = new Date(newDate.setDate(0))
  // 년 이전 버튼
  const ActionYearLeft = ():void => {
    setSelectedYear(selectedYear - 1)
  }
  // 년 다음 버튼
  const ActionYearRight = ():void => {
    setSelectedYear(selectedYear + 1)
  }
 
  const returnDay = useCallback(() => {
    let dayArr = []

    for(const nowDay of weekTitles){
      if(weekTitles[day] === nowDay){
        for(let i=0; i<currentLastDate; i++){
          dayArr.push(
            <div key={i+1}
            className={classnames({today: currentYear === selectedYear && currentMonth === selectedMonth && currentDay === i + 1},{select:currentYear === selectedYear && currentMonth === selectedMonth && selectedDay === i+1 ? true: false})}
            onClick={() => selectActive(i)}>{i+1}</div>
          )
        }
      }else{
        dayArr.push(
          <div className="box_date"></div>
        )
      }
    }
    return dayArr;
  },[selectedYear, selectedMonth, currentLastDate])
 
  const selectActive = (i:number):void => {
    // setActive([])
    setSelectedDay(i+1)
  }


  return (
    <div className="calendar_main">
      <header>
        <h1>
          <span className="arrow_left" onClick={ActionYearLeft}>❮</span>
          {selectedYear} 
          <span className="arrow_right" onClick={ActionYearRight}>❯</span>
        </h1>
        <h2>{selectedMonth}월</h2>
      </header>
      <ul>{listItems}</ul>
      <div className="calendar_cnt">
         {returnDay()}
      </div>
    </div>
  );
}

export default Calendar;
