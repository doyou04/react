import React, {useState, useCallback} from 'react';
import '../../style/Write.scss';
import {AiFillCloseCircle} from 'react-icons/ai';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Write = ({closePop}:{closePop:Function}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  // const getSelectDate= useCallback((date:string) => {
  //   setSelectedDate(date)
  // },[]);


  const closeEvtFn = () => {
    closePop(false);
  }



  return (
    <div className="write_main" >    
        <div className="write_cnt">     
            <AiFillCloseCircle className="write_pop_close" size="35" color="#dfdfdf" onClick={closeEvtFn} />  
            <div className="write_form">
              <div className="write_title">오늘의 할일</div>
              <div className="write_txt_wrap">
                <p className="write_txt_title">날짜</p>
                <DatePicker
                  className="wrtie_datepicker"
                  selected={startDate} 
                  minDate={new Date()}
                  dateFormat={"yyy-MM-dd"}                                                                                                                                                                                                                                               
                  onChange={(date:Date) => setStartDate(date)}
                />
              </div>
            </div>
        </div>    
        <div className="wrtie_bg"></div>                                   
    </div>
  );
}

export default Write;
