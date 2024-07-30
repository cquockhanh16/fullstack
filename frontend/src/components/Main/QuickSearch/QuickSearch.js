import React from "react";

import "./QuickSearch.css";

const QuickSearch = (props) => {
  return (
    <div className={`${props.className} quick-seacrh`}>
      <ul className='row justify-content-start'>
        <li className='col-* col-md-2'>Tìm kiếm nhiều</li>
        <li className='col-2 col-md'>
          <a href='/tu-khoa/ipad'>Ipad</a>
        </li>
        <li className='col-2 col-md'>
          <a href='/tu-khoa/laptop'>Laptop</a>
        </li>
        <li className='col-2 col-md'>
          <a href='/tu-khoa/loa-vi-tinh'>Loa vi tính</a>
        </li>
        <li className='col-2 col-md'>
          <a href='/tu-khoa/may-tinh'>Máy tính</a>
        </li>
        <li className='col-2 col-md'>
          <a href='/tu-khoa/tablet'>Tablet</a>
        </li>
        <li className='col-2 col-md'>
          <a href='/tu-khoa/tai-bluetooth'>Tai Bluetooth</a>
        </li>
        <li className='col-2 col-md'>
          <a href='/tu-khoa/dien-thoai'>Điện thoại</a>
        </li>
        <li className='col-2  col-md'>
          <a href='/tu-khoa/op-lung-iphone'>Ốp lương Iphone</a>
        </li>
      </ul>
    </div>
  );
};

export default QuickSearch;
