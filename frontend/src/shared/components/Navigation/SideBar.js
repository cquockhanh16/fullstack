import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import "./SideBar.css";

import imgPhone from "../Images/smartphone-1-24x24.png";
import imgTablet from "../Images/tablet-outline-in-horizontal-position-1-24x24.png";
import imgLaptop from "../Images/laptop-2-24x24.png";
import imgAccessory from "../Images/headset-1-24x24.png";
import imgOldProduct from "../Images/television-1-24x24.png";
import imgDiscuss from "../Images/gift-1-24x24.png";
import imgPaper from "../Images/folded-newspaper-1-24x24.png";
import imgQnA from "../Images/discuss-issue-1-24x24.png";
import search from "../Images/search-icon.webp";
import user from "../Images/right-to-bracket-solid.svg";

const SideBar = (props) => {
  const { isLogin } = props;
  const navigate = useNavigate();
  const searchRef = useRef();
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (itemName) => {
    setActiveItem(itemName); // Khi được nhấp vào, đặt activeItem thành tên của mục được nhấp
  };
  const searchHandler = () => {
    const search = searchRef.current.value.trim();
    navigate(`/search/${search}`);
  };
  const logoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("uid");
    Cookies.remove("isLogin");
    Cookies.remove("isAdmin");
    props.logoutHandler();
  };
  return (
    <div>
      <div className='side-bar'>
        <div className='search'>
          <input type='text' placeholder='Tìm kiếm' ref={searchRef} />
          <button onClick={searchHandler}>
            <img src={search} alt='' />
          </button>
        </div>
        <ul>
          <li>
            <a href='/danh-muc/dien-thoai'>
              <div>
                <img src={imgPhone} alt='' />
              </div>
              <span>ĐIỆN THOẠI</span>
            </a>
          </li>
          <li>
            <a href='/danh-muc/tablet'>
              <div>
                <img src={imgTablet} alt='' />
              </div>
              <span>TABLET</span>
            </a>
          </li>
          <li>
            <a href='/danh-muc/laptop'>
              <div>
                <img src={imgLaptop} alt='' />
              </div>
              <span>LAPTOP</span>
            </a>
          </li>
          <li>
            <a href='/danh-muc/phu-kien'>
              <div>
                <img src={imgAccessory} alt='' />
              </div>
              <span>PHỤ KIỆN</span>
            </a>
          </li>

          <li>
            {" "}
            <a href='/danh-muc/dien-thoai'>
              <div>
                <img src={imgOldProduct} alt='' />
              </div>
              <span>CŨ GIÁ RẺ</span>
            </a>
          </li>
          <li>
            {" "}
            <a href='/danh-muc/khuyen-mai'>
              <div>
                <img src={imgDiscuss} alt='' />
              </div>
              <span>KHUYẾN MÃI</span>
            </a>
          </li>
          <li>
            {" "}
            <a href='/category/tin-tuc'>
              <div>
                <img src={imgPaper} alt='' />
              </div>
              <span>CÔNG NGHỆ</span>
            </a>
          </li>
          <li>
            <a href='/hoi-dap'>
              <div>
                <img src={imgQnA} alt='' />
              </div>
              <span>HỎI ĐÁP</span>
            </a>
          </li>
        </ul>
        <span>
          {!isLogin ? (
            <a href='/dang-nhap'>
              <img src={user} alt='' /> Đăng nhập
            </a>
          ) : (
            <>
              <p>
                <a href='/don-hang'>Danh sách đơn hàng</a>
              </p>
              <p>
                <a href='/thong-tin'>Thông tin tài khoản</a>
              </p>
              <p>
                <a href='/' onClick={logoutHandler}>
                  <img src={user} alt='' style={{}} /> Đăng xuất
                </a>
              </p>
            </>
          )}
        </span>
      </div>
      <div className='close' onClick={props.onCancel}>
        x
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogin: state.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  logoutHandler: () => dispatch({ type: "LOGOUT", payload: null }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
