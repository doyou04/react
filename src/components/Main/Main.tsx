import React, {useState, useCallback} from 'react';
import '../../style/Main.scss';
 import Calendar from './Calendar';
import List from './List';

const Main = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2023-07-01');
  const getSelectDate= useCallback((date:string) => {
    setSelectedDate(date)
  },[]);

  return (
    <div className="main">      
      <Calendar getSelectDate={getSelectDate}/>
      <List selectedDate={selectedDate}/>
    </div>
  );
}

export default Main;
