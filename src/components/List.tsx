import React, {useCallback, useEffect, useState} from 'react';
import '../style/List.scss';

const List = () => {

  

  return (
    <div className="list_main">
      <ul>
        <li className="">
          <p className="list_sub_text">12:00 ~ 13:00</p>
          <p className="list_title">타이틀</p>
          <p className="list_text">운동하기</p>
        </li>
        <li className="">
          <p className="list_sub_text">01:00 ~ 05:00</p>
          <p className="list_title">타이틀</p>
          <p className="list_text">내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용</p>
        </li>
      </ul>
    </div>
  );
}

export default List;
