import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import '../../style/List.scss';


const List = () => {
  interface listDataType {
    id: number;
    title: string;
    text: string;
    date: string;
    timeStart: string;
    timeEnd: string;
    check: boolean;
  }
  const [listData, setListData] = useState<listDataType[]>([])

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get('test.json');

        setListData([]);
        setListData(response.data)
      }catch(error){}
     
    }
    fetchList()
  },[])

  const todolist = useCallback((id:number, check:boolean) => {
    let newList = [...listData]

    newList[id-1].check = !check;
    setListData(newList)
    console.log(listData)
  },[listData]) 
 

  return (
    <div className="list_main">
      <h3>
        <span></span>
        <strong>Today</strong>
      </h3>
      <div className="list_cnt_wrap">
        {
          listData.map((data) => {
            return(
              <div className="list_cnt" key={data.id}>
                <p className="list_check">
                  {/* <input type="checkbox" id="checkInp" name="checkInp" checked={checked} onChange={() => todolist} /> */}
                  <input type="checkbox" id={`checkInp${data.id}`} name={`checkInp${data.id}`} checked={data.check} onChange={() => todolist(data.id, data.check)}/>
                  <label htmlFor={`checkInp${data.id}`}></label>
                </p>
                <div className="list_box">
                  <p className="list_sub_text">{data.timeStart} ~ {data.timeEnd}</p>
                  <p className="list_title">{data.title}</p>
                  <p className="list_text">{data.text}</p>
                </div>
              </div>
            )
         })
        }
        {/* <div className="list_cnt">
          <p className="list_check">
            <input type="checkbox" id="checkInp" name="checkInp"  />
            <label htmlFor="checkInp"></label>
          </p>
          <div className="list_box">
            <p className="list_sub_text">12:00 ~ 13:00</p>
            <p className="list_title">타이틀</p>
            <p className="list_text">운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기운동하기</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default List;