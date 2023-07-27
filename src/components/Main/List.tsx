import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import '../style/List.scss';

interface listDataType {
		id: number;
		title: string;
		text: string;
		date: string;
		timeStart: string;
		timeEnd: string;
		check: boolean;
	
}

const List = () => {
  const [listData, setListData] = useState<listDataType[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchList = async () => {
      try { 
        setError(null);
        setListData([]);
        const response = await axios.get('https://github.com/doyou04/react/blob/main/test.json')
      }catch(e){
        setError(e);
      }
    }
  })

  const todolist = useCallback(() => {
  
  },[checked]) 

  return (
    <div className="list_main">
      <h3>
        <span></span>
        <strong>Today</strong>
      </h3>
      <div className="list_cnt_wrap">
        <div className="list_cnt">
          <p className="list_check">
            <input type="checkbox" id="checkInp" name="checkInp" checked={checked} onChange={() => todolist} />
            <label htmlFor="checkInp"></label>
          </p>
          <div className="list_box">
            <p className="list_sub_text">12:00 ~ 13:00</p>
            <p className="list_title">타이틀</p>
            <p className="list_text">운동하기</p>
          </div>
        </div>
        <div className="list_cnt">
          <p className="list_check">
            <input type="checkbox" id="checkInp" name="checkInp"  />
            <label htmlFor="checkInp"></label>
          </p>
          <div className="list_box">
            <p className="list_sub_text">12:00 ~ 13:00</p>
            <p className="list_title">타이틀</p>
            <p className="list_text">운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
