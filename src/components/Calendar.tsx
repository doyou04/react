import React, {useCallback, useEffect,  useState} from 'react';
import '../style/Calendar.scss';
import classnames from 'classnames';

const Calendar = () => {
  const newDate:Date = new Date();
  const currentYear:number = new Date().getFullYear();
  const currentMonth:number = new Date().getMonth() + 1;
  const currentDay:number = new Date().getDate()
  // 요일
  const weekTitles:string[]= ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const listItems = weekTitles.map((weekTitle:string, i:number) => 
    <li key={`weekTitles${i}`} className={classnames({sunday: i === 0, saturday: i === 6})}>{weekTitle}</li>
  )
  //선택 연도, 달, 일
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  // 선택 달 마지막 날짜(일)
  const selectLastDate:number = new Date(selectedYear, selectedMonth, 0).getDate()
  // 현재 달 첫날 Mon Jul 24 2023 00:00:00 GMT+0900
  const currentfirstDay:Date = new Date(newDate.setDate(1))
  // 지난 달 마지막날 Mon Jul 24 2023 00:00:00 GMT+0900
  const pastFinalDay:Date = new Date(newDate.setDate(0))
  // 달 이전 버튼
  const ActionMonthLeft = useCallback(() => {
    if(selectedMonth === 1){
      setSelectedMonth(12)
      setSelectedYear(selectedYear - 1)
    }else{
      setSelectedMonth(selectedMonth - 1)
    }
    setSelectedDay(0)
  },[selectedMonth])
  // 달 다음 버튼
  const ActionMonthRight =  useCallback(() => {
    if(selectedMonth === 12){
      setSelectedYear(selectedYear + 1)
      setSelectedMonth(1)
    }else{
      setSelectedMonth(selectedMonth + 1)
    }
     setSelectedDay(0)
  },[selectedMonth])
  // 선택한 날짜
  const selectActive = (i:number):void=>  {
    setSelectedDay(i)
  }
  // 선택 달 cell
  const returnDay = useCallback(() => {
    // 선택 달 첫째날 요일 0~6 (일~토)
    let dayArr:number[] = [];

    for(const nowDay of weekTitles){
      const day:number = new Date(selectedYear, selectedMonth-1, 1).getDay()
      if(weekTitles[day] === nowDay){
        for(let i=0; i<selectLastDate; i++){
          dayArr.push(i+1)
        }
      }else{
        dayArr.push(0)
      }
    }
    return dayArr;
  },[selectLastDate,selectedYear,selectedMonth])
 
 
  return (
    <div className="calendar_main">
      <header>
        <h1>{selectedYear}</h1>
        <h2>
          {selectedMonth}월
          <span className="arrow_left" onClick={ActionMonthLeft}>❮</span>
          <span className="arrow_right" onClick={ActionMonthRight}>❯</span>
        </h2>  
      </header>
      <ul>{listItems}</ul>
      <div className="calendar_cnt">
         {
          returnDay().map((value:number, index:number) => {
            return(
              value > 0 ?
              <div key={`id_${value}`}
              className={classnames(
                {today: currentYear === selectedYear && currentMonth === selectedMonth && currentDay === value},
                {selectActive: value === selectedDay }
              )}
              onClick={() => selectActive(value)}>{value}</div>:<div className="box_date"></div>
            )
          })
          
         }
      </div>
    </div>
  );
}

export default Calendar;
