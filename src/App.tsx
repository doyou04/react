import React, {useEffect} from 'react';
import './style/App.css';
import Main from './components/Main/Main';
import Header from './components/Header';
import axios from 'axios';
// import Test from './components/Test';

function App() {
  const sendRequest = async() => {
    const response = await axios.get('http://localhost:8080');

  }

  useEffect(() => {
    sendRequest()
  })

  return (
    <div className="App">
      <Header />
      <Main />
      {/* <Test /> */}
    </div>
  );
}

export default App;
