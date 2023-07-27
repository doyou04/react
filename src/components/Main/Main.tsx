import React from 'react';
import '../../style/Main.scss';
 import Calendar from './Calendar';
import List from './List';

const Main = () => {

  return (
    <div className="main">      
      <Calendar />
      <List />
    </div>
  );
}

export default Main;
