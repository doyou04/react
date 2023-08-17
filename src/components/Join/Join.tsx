import React, {useState, useCallback} from 'react';
import axios from 'axios';
import classnames from 'classnames';
import '../../style/Join.scss';
import { useNavigate } from "react-router-dom";

const Join = () => {
 
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [inpValidate, setInpValidate] = useState<boolean[]>([false,false,false]);
  const navigate = useNavigate();

  const setValidate = useCallback((title:string, value:string) => {
    let newInpValidate = [...inpValidate];

    switch(title) {
      case 'none':
                  
        break;
      case 'name': 
        if(value.length <= 1){
          newInpValidate[0] = true;
          setInpValidate(newInpValidate);          
        }else{          
          newInpValidate[0] = false;
          setInpValidate(newInpValidate);    
        }
        setName(value);
        break; 
      case 'email':
        let regex1 = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);

        if(!value || !regex1.test(value)){
          newInpValidate[1] = true;
          setInpValidate(newInpValidate);  
        }else{
          newInpValidate[1] = false;
          setInpValidate(newInpValidate);  
        }
        setEmail(value);
        break;
      case 'password':
        let regex2 = new RegExp( /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/); // 숫자,영문자,특수문자 1개씩 이상, 총 8~15자리

        if(!value || !regex2.test(value)){
          newInpValidate[2] = true;
          setInpValidate(newInpValidate);  
        }else{
          newInpValidate[2] = false;
          setInpValidate(newInpValidate); 
        }
        setPassword(value);
        break;
    }
  },[inpValidate])

  const register = useCallback(async () => {
    if(inpValidate){
      alert(`가입 정보를 입력해 주세요.`);
      setValidate('name', '');
      setValidate('email', '');
      setValidate('password', '');
      return false;
    }
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        name: name,
        email: email,
        password: password,
      });

      alert(`가입이 되었습니다.`);
      navigate('/login', { replace: true });
    }catch(error){
      console.log(error);
    }
  },[name, email, password, navigate, inpValidate]);



  return (
    <div className="join_main">      
     <h1>
        안녕하세요 :)<br/>
        회원가입 해주세요.
      </h1>     
      <div className="filed">
        <label htmlFor="name"> 
          <input type="name" className={classnames({error:inpValidate[0]})} id="name" placeholder='이름' maxLength={10} value={name} onChange={(e:any) => setValidate('name', e.target.value)} />
        </label>
        {
          inpValidate[0] &&
          <p >* 1자 이상 입력해 주세요.</p>
        }
      </div>
      <div className="filed">
        <label htmlFor="email"> 
          <input type="text" className={classnames({error:inpValidate[1]})} id="email"  placeholder='이메일' value={email} onChange={(e:any) => setValidate('email', e.target.value)} />
        </label>  
        {
          inpValidate[1] &&
          <p>* 이메일 형식에 맞게 입력해 주세요.</p>
        }
      </div>
      <div className="filed">
        <label htmlFor="pw1"> 
          <input type="password" className={classnames({error:inpValidate[2]})} id="pw1" placeholder='비밀번호' value={password} onChange={(e:any) => setValidate('password', e.target.value)} />
        </label>
        {
          inpValidate[2] &&
          <p>* 영문숫자 특수문자 조합 8 ~ 15자리로 입력해 주세요.</p>
        }
      </div>
      <button onClick={register}>JOIN</button>
    </div>
  );
}

export default Join;
