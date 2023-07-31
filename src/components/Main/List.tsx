import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import '../../style/List.scss';
import classnames from 'classnames';

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
   
  },[listData]) 
 

  return (
    <div className="list_main">
      <h3>
        <span>
          {selectedDate.split("-")[2] === currentDay.toString() ? 'Today' : selectedDate.split("-")[2]}          
        </span>
        {/* <strong>Today</strong> */}
      </h3>
      <div className="list_cnt_wrap">
        {
          listData.map((data) => {
            return(
              <div className="list_cnt" key={data.id}>
                <p className="list_check">
                  <input type="checkbox" id={`checkInp${data.id}`} name={`checkInp${data.id}`} checked={data.check} onChange={() => todolist(data.id, data.check)}/>
                  <label htmlFor={`checkInp${data.id}`}></label>
                </p>
                <div className={classnames('list_box', {checked: data.check})}>
                  <p className="list_sub_text">{data.timeStart} ~ {data.timeEnd}</p>
                  <p className="list_title">{data.title}</p>
                  <p className="list_text">{data.text}</p>
                </div>
              </div>
            )
         })
        }
      </div>
    </div>
  );
}

export default List;
