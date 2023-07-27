import React from 'react';
import './style/App.css';
import Main from './components/Main/Main';
import Header from './components/Header';
// import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      {/* <Test /> */}
    </div>
  );
}

export default App;
