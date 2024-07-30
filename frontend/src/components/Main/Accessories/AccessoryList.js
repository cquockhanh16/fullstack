import React from "react";
import ProductItem from "../Products/ProductItem";

import "./AccessoryList.css";

const AccessoryList = (props) => {
  return (
    <div className='accessory'>
      <div className='nav-accessory row'>
        <h4 className='col-12 col-md-2'>PHỤ KIỆN GIÁ RẺ</h4>
        <div className='col col-md'>
          <ul className='row g-1'>
            <li className='col-6 col-md text-center'>
              <a href='/danh-muc/phu-kien/bao-da-op-lung-dan-man-hinh'>
                Bao da - Ốp lưng - Dán màn hình
              </a>
            </li>
            <li className='col-6 col-md text-center'>
              <a href='/danh-muc/phu-kien/may-nghe-nhac'>Máy nghe nhạc</a>
            </li>
            <li className='col-6 col-md text-center'>
              <a href='/danh-muc/phu-kien/phu-kien-am-thanh'>
                Phụ kiện âm thanh
              </a>
            </li>
            <li className='col-6 col-md text-center'>
              <a href='/danh-muc/phu-kien/loa'>Loa</a>
            </li>
            <li className='col-6 col-md text-center'>
              <a href='/danh-muc/phu-kien/tai-nghe'>Tai nghe</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={` ${props.row} `}>
        {props.items.map((item) => {
          return (
            <ProductItem key={item.id} className={props.col} item={item} />
          );
        })}
      </div>
    </div>
  );
};

export default AccessoryList;
