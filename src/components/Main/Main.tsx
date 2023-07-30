import React, {useState, useCallback, useMemo} from 'react';
import '../../style/Main.scss';
 import Calendar from './Calendar';
import List from './List';

const Main = () => {
  interface weekType  {
    text: string;
    id: number;
  }
  const newDate:Date = new Date();
  const currentYear:number = newDate.getFullYear();
  const currentMonth:number = newDate.getMonth() + 1;
  const currentDay:number = newDate.getDate()
  const weekTitles:weekType[]= useMemo(() => [{text:'Sun',id:0},{text:'Mon',id:1},{text:'Tue',id:2},{text:'Wed',id:3},{text:'Thu',id:4},{text:'Fri',id:5},{text:'Sat',id:6}],[]) // 요일

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const getSelectMonth = (month:number):void => {
    setSelectedMonth(month)
  }
  return (
    <div className="main">      
      <Calendar 
        currentYear={currentYear} 
        currentMonth={currentMonth}
        currentDay={currentDay}
        weekTitles={weekTitles}
        getSelectMonth={getSelectMonth}
      />
      <List 
        
      />
    </div>
  );
}

export default Main;
