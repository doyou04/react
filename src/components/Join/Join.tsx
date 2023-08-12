import React, {useState, useCallback} from 'react';
import axios from 'axios';
import '../../style/Join.scss';

const Join = () => {
 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');


  const register = useCallback(async () => {
    try {
      await axios.post('http://localhost:8080/api/register', {
        email: email,
        password: password,
        password2: password2
      });

      console.log(email)

    }catch(error){

    }
  },[email, password, password2]);



  return (
    <div className="join_main">      
     <h1>
        안녕하세요 :)<br/>
        회원가입 해주세요.
      </h1>     
      <div className="filed">
        <label htmlFor="email"> 
          <input type="text" id="email"  placeholder='이메일' value={email} onChange={(e:any) => setEmail(e.target.value)} />
        </label>
      </div>
      <div className="filed">
        <label htmlFor="pw1"> 
          <input type="password" id="pw1" placeholder='비밀번호' value={password} onChange={(e:any) => setPassword(e.target.value)} />
        </label>
      </div>
      <div className="filed">
        <label htmlFor="pw2"> 
          <input type="password" id="pw2" placeholder='비밀번호 재확인' value={password2} onChange={(e:any) => setPassword2(e.target.value)} />
        </label>
      </div>
      <button onClick={register}>JOIN</button>
    </div>
  );
}

export default Join;
