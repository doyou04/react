import React from 'react';
import '../style/Main.scss';
import Calendar from './Calendar';

const Main = () => {
  return (
    <div className="main">
      <header className="main_header">
        <h1>2023</h1>
        <h2>7월</h2>
      </header>
      <Calendar />
    </div>
  );
}

export default Main;
