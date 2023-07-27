import React, {useCallback, useState, useMemo} from 'react';
import '../style/Calendar.scss';
import classnames from 'classnames';

const Calendar = () => {
  interface weekType  {
    text: string;
    id: number;
  }
  const newDate:Date = new Date();
  const currentYear:number = newDate.getFullYear();
  const currentMonth:number = newDate.getMonth() + 1;
  const currentDay:number = newDate.getDate()
  const weekTitles:weekType[]= useMemo(() => [{text:'Sun',id:0},{text:'Mon',id:1},{text:'Tue',id:2},{text:'Wed',id:3},{text:'Thu',id:4},{text:'Fri',id:5},{text:'Sat',id:6}],[]) // 요일
  //선택 연도, 달, 일
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const selectLastDate:number = new Date(selectedYear, selectedMonth, 0).getDate() // 선택 달 마지막 날짜(일)

  // 선택한 날짜 표시
  const selectActive = (i:number):void=>  {
    setSelectedDay(i)
  }
  // 달 이전 버튼
  const ActionMonthLeft = useCallback(() => {
    if(selectedMonth === 1){
      setSelectedMonth(12)
      setSelectedYear(selectedYear - 1)
    }else{
      setSelectedMonth(selectedMonth - 1)
    }
    setSelectedDay(0)
  },[selectedMonth, selectedYear])
  // 달 다음 버튼
  const ActionMonthRight =  useCallback(() => {
    if(selectedMonth === 12){
      setSelectedYear(selectedYear + 1)
      setSelectedMonth(1)
    }else{
      setSelectedMonth(selectedMonth + 1)
    }
     setSelectedDay(0)
  },[selectedMonth,selectedYear])
  // 선택 달 cell
  const returnDay = useCallback(() => {
    // 선택 달 첫째날 요일 0~6 (일~토)
    let dayArr:number[] = [];

    for(const nowDay of weekTitles){
      const day:number = new Date(selectedYear, selectedMonth-1, 1).getDay()
      if(weekTitles[day].text === nowDay.text){
        for(let i=0; i<selectLastDate; i++){
          dayArr.push(i+1)
        }
      }else{
        dayArr.push(0)
      }
    }
    return dayArr;
  },[weekTitles,selectLastDate,selectedYear,selectedMonth])
 
  return (
    <div className="calendar_main">
      <header>
        <h1>{selectedYear}</h1>
        <h2>
          <p className="month_text">
           {(selectedMonth === 1 && 'JANUARY') || (selectedMonth === 2 && 'FEBRUARY') || (selectedMonth === 3 && 'MARCH') || 
            (selectedMonth === 4 && 'APRIL') || (selectedMonth === 5 && 'MAY') || (selectedMonth === 6 && 'JUNE') || 
            (selectedMonth === 7 && 'JULY') || (selectedMonth === 8 && 'AUGUST') ||  (selectedMonth === 9 && 'SEPTEMBER') || 
            (selectedMonth === 10 && 'OCTOBER') || (selectedMonth === 11 && 'NOVEMBER') || (selectedMonth === 12 && 'DECEMBER')}
          </p>
          <p className="arrow_right" onClick={ActionMonthRight}>❯</p>
          <p className="arrow_left" onClick={ActionMonthLeft}>❮</p>
        </h2>  
      </header>
      <ul >
        {
          weekTitles.map((weekTitle:weekType, i:number) => 
            <li key={weekTitle.id.toString()} className={classnames({sunday: i === 0, saturday: i === 6})}>{weekTitle.text}</li>
          )
        }
      </ul>
      <div className="calendar_cnt">
         {
          returnDay().map((value:number, i:number) => {
            return(
              value > 0 ?
              <div key={`id_${i}`}
              className={classnames('box_date',
                {today: currentYear === selectedYear && currentMonth === selectedMonth && currentDay === value},
                {selectActive: value === selectedDay }
              )}
              onClick={() => selectActive(value)}>{value}</div>:<div key={`id_${i}`}></div>
            )
          })
         }
      </div>
    </div>
  );
}

export default Calendar;
