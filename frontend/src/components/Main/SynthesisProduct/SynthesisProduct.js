import React from "react";

import "./SynthesisProduct.css";

const SynthesisProduct = (props) => {
  return (
    <div>
      <ul className='synthesis-product row g-md-0'>
        <li className='col-4 col-md-2 text-center'>
          <a href='/danh-muc/dien-thoai'>Điện thoại</a>
        </li>
        <li className='col-4 col-md-2  text-center'>
          <a href='/danh-muc/tablet'>Máy tính bảng</a>
        </li>
        <li className='col-4 col-md-2  text-center'>
          <a href='/danh-muc/laptop'>Laptop</a>
        </li>
        <li className='col-4 col-md-2  text-center'>
          <a href='/danh-muc/accessory'>Phụ kiện</a>
        </li>
        <li className='col-4 col-md-2  text-center'>
          <a href='/'>Máy đã sử dụng</a>
        </li>
      </ul>
    </div>
  );
};

export default SynthesisProduct;
