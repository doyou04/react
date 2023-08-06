import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import '../../style/List.scss';
import classnames from 'classnames';
import { BiTime, } from 'react-icons/bi';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Write from './Write';

const List = ({selectedDate}:{selectedDate:string}) => {
  interface listDataType {
    id: number;
    title: string;
    text: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    check: boolean;
  }
  const currentDay:number = new Date().getDate()
  const [listData, setListData] = useState<listDataType[]>([]);
  const [popup, setPopup] = useState<boolean>(false);
  const day:number = new Date(selectedDate).getDay();

  // 리스트 데이터 가져오기
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get('test.json');

        setListData([]);
        setListData(response.data);
      }catch(error){}
     
    }
    fetchList();

  },[])

  // 레이어 팝업 열기(등록 리스트)
  const popupEvt = () => {
    setPopup(true)
  }

  // 레이어 팝업 닫기(등록 리스트)
  const closePop = useCallback((payload:boolean) => {
    setPopup(payload)
  },[popup]);

  // 리스트 체크 
  const checkList = useCallback((id:number, check:boolean) => {
    let newList = [...listData]
    let idx = newList.findIndex(data => data.id === id);
    
    newList[idx].check = !check;
    setListData(newList)
  },[listData]);

  // 리스트 색 랜덤
  const randomColor = useCallback(() => {
    return Math.floor(Math.random() * 5);
  },[]); 
 
  // list 삭제
  const deleteListbox = useCallback((id:number) => {
    let newList = [...listData]
    let idx = newList.findIndex(data => data.id === id);

    newList.splice(idx,1)
    setListData(newList)
  },[listData]);
  
  return (
    <div className="list_main">
      <div className="list_title_wrap">
        <h3>
          <strong>
            {selectedDate.split("-")[2] === currentDay.toString() ? 'Today' : selectedDate.split("-")[2]}          
          </strong>
          <span>
            {(day === 0 && 'Sunday') || (day === 1 && 'Monday') || (day === 2 && 'Tuesday') || (day === 3 && 'Wednesday') || (day === 4 && 'Thursday') || (day === 5 && 'Friday') || (day === 6 && 'Saturday')}
          </span>
        </h3>
        <p onClick={popupEvt}><BsFillPlusCircleFill size="20" color="#02cbcb"/></p>
      </div>
      <div className="list_cnt_wrap">
        {
          listData.map((data, i) => {
            let a =  randomColor();
            return(
              <div className="list_cnt" key={data.id}>
                <p className="list_check">
                  <input type="checkbox" id={`checkInp${data.id}`} name={`checkInp${data.id}`} checked={data.check} onChange={() => checkList(data.id, data.check)}/>
                  <label htmlFor={`checkInp${data.id}`}></label>
                </p>
                <div className={classnames('list_box', `list_box_color${ a}`, {checked: data.check})}>
                  <AiOutlineClose className="list_box_close" size="15" color="#fff" onClick={() => deleteListbox(data.id)}/>
                  <div className="list_sub_text">
                    <BiTime className="list_time_icon" size="13" color="#fff" />
                    <p>{data.timeStart} ~ {data.timeEnd}</p>
                  </div>
                  <p className="list_title">{data.title}</p>
                  <p className="list_text">{data.text}</p>
                </div>
              </div>
            )
         })
        }
      </div>
      { popup && <Write closePop={closePop}/> }
    </div>
  );
}

export default List;
