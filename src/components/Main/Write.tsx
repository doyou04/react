import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import DatePicker from "react-datepicker";
import '../../style/Write.scss';
import "react-datepicker/dist/react-datepicker.css";

const Write = ({closePop}:{closePop:Function}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const closeEvtFn = () => {
    closePop(false);
  }

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [])

  return (
    <div className="write_main" >    
      <div className="write_cnt">     
          <AiFillCloseCircle className="write_pop_close" size="35" color="#02cbcb" onClick={closeEvtFn} />  
          <div className="write_form">
            <div className="write_title">To Do</div>
            <div className="write_txt_wrap">
              <p className="write_txt_title">Date</p>
              <DatePicker
                className="wrtie_datepicker"
                selected={startDate} 
                minDate={new Date()}
                dateFormat={"yyy-MM-dd"}                 
                onChange={(date:Date) => setStartDate(date)}
              />
            </div> 
            <div className="write_txt_wrap">
              <p className="write_txt_title">Time</p>
              <div className="write_time">
                <input type="text"/>
                <span>~</span>
                <input type="text" />
              </div>
            </div> 
            <div className="write_txt_wrap">
              <p className="write_txt_title">Title</p>
              <input type="text" className="write_title_input" />
            </div>
            <div className="write_txt_wrap">
              <p className="write_txt_title">Content</p>
              <textarea className="write_textarea" />
            </div>
            <input type="submit" value="Submit" className="submitBtn"/>
          </div>
      </div>    
      <div className="wrtie_bg"></div>                                   
    </div>
  );
}

export default Write;
