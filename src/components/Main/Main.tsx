import React, {useState, useEffect, useCallback} from 'react';
import '../../style/Main.scss';
import axios from 'axios';
import Calendar from './Calendar';
import List from './List';
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2023-07-01');
  const navigate = useNavigate();  
  const getSelectDate= useCallback((date:string) => {
    setSelectedDate(date)
  },[]);

  useEffect( ()=> {
    const isAuth = async() => {
     try { 
        const {data}  = await axios.get(`http://localhost:5000/api/users/auth`);

        if(!data.isAuth){
          navigate('/', { replace: true });
        }

     }catch(error){
       console.log(error)
     }
    }
    isAuth();
 },[]);  

  return (
    <div className="main">      
      <Calendar getSelectDate={getSelectDate}/>
      <List selectedDate={selectedDate}/>
    </div>
  );
}

export default Main;
