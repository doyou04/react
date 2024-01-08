import React from 'react';
import './style/App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
// import Header from './components/Header';


const App:React.FC = () => {

  return (   
  
  <div className="App">
    <Routes>
      <Route path="/join" element={<Join />} />      
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  </div>
  );
}

export default App;
