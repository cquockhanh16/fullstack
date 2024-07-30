import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ProductPortfolio.css";

const ProductPortfolio = (props) => {
  const { category } = props;
  return (
    <div className='product-portfolio'>
      <h5>DANH MỤC SẢN PHẨM</h5>
      <div></div>
      <ul>
        <li className={`${category === "dien-thoai" && "active-port"}`}>
          <Link to='/danh-muc/dien-thoai'>Điện thoại</Link>
        </li>
        <li className={`${category === "tablet" && "active-port"}`}>
          <Link to='/danh-muc/tablet'>Tablet</Link>
        </li>
        <li className={`${category === "laptop" && "active-port"}`}>
          <Link to='/danh-muc/laptop'>Laptop</Link>
        </li>
        <li className={`${category === "phu-kien" && "active-port"}`}>
          <Link to='/danh-muc/phu-kien'>Phụ kiện</Link>
        </li>
        <li className={`${category === "cu-gia-re" && "active-port"}`}>
          <Link to='/danh-muc/cu-gia-re'>Cũ giá rẻ</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProductPortfolio;
