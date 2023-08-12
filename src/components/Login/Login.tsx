import React, {useState, useCallback} from 'react';
import '../../style/Login.scss';

const Login = () => {
//   const [selectedDate, setSelectedDate] = useState<string>('2023-07-01');
//   const getSelectDate= useCallback((date:string) => {
//     setSelectedDate(date)
//   },[]);

  return (
    <div className="login_main"> 
      <h1>
        안녕하세요 :)<br/>
        로그인 해주세요.
      </h1>     
      <div className="filed">
        <label htmlFor="id"> 
          <input type="text" id="id" placeholder=' ' />
          <p>ID</p>
        </label>
      </div>
      <div className="filed">
        <label htmlFor="pw">
          <input type="password" id="pw"  placeholder=' '/>
          <p>pw</p>
        </label>
      </div>
      <button>LOGIN</button>
      <div className="go_join">
        <a>회원가입</a>
      </div>
    </div>
  );
}

export default Login;
