import React, {useState, useCallback} from 'react';
import axios from 'axios';
import '../../style/Login.scss';
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const goLogin = async() => {
    try { 
      const {data} = await axios.post('http://localhost:5000/api/users/login', {
        email: email,
        password: password
      })

      if(data.loginSuccess){
        navigate('/main', { replace: true });
      }else{
        alert(data.message);
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="login_main"> 
      <h1>
        안녕하세요 :)<br/>
        로그인 해주세요.
      </h1>     
      <div className="filed">
        <label htmlFor="email"> 
          <input type="text" id="email" value={email} placeholder=' ' onChange={(e) => setEmail(e.target.value)} />
          <p>EMAIL</p>
        </label>
      </div>
      <div className="filed">
        <label htmlFor="pw">
          <input type="password" id="pw" value={password}  placeholder=' ' onChange={(e) => setPassword(e.target.value)} />
          <p>PASSWORD</p>
        </label>
      </div>
      <button onClick={goLogin}>LOGIN</button>
      <Link to="/join" className="go_join_btn">회원가입</Link>
    </div>
  );
}

export default Login;
