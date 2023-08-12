import React, { useEffect } from 'react';
import './style/App.css';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Join from './components/Join/Join';
import Header from './components/Header';
import axios from 'axios';
// import Test from './components/Test';

function App() {
  // const sendRequest = async() => {
  //   const response = await axios.get('http://localhost:8080/');

  //     console.log(response)
  // }

  // useEffect(() => {
  //   sendRequest()
  // })

  return (
    <div className="App">
      <Join />
      {/* <Login /> */}
       {/* <Header /> */}
      {/* <Main />  */}
      {/* <Test /> */}
    </div>
  );
}

export default App;
