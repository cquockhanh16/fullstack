import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsFillBellFill,
  BsBookHalf,
  BsFillDuffleFill,
  BsFillCartFill,
  BsGiftFill,
} from "react-icons/bs";

import Cookies from "js-cookie";

import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

function SideBarAdmin({ openSidebarToggle, OpenSidebar, logoutHandler }) {
  const navigate = useNavigate();
  const logOutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("uid");
    Cookies.remove("isLogin");
    Cookies.remove("isAdmin");
    logoutHandler();
    navigate("/");
  };
  return (
    <aside
      id='sidebar'
      className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href='/admin'>
            <BsGrid1X2Fill className='icon' /> Trang chủ
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/san-pham'>
            <BsFillArchiveFill className='icon' /> Sản phẩm
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/danh-muc'>
            <BsFillGrid3X3GapFill className='icon' /> Danh mục
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/tai-khoan'>
            <BsPeopleFill className='icon' /> Tài khoản
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/don-hang'>
            <BsFillCartFill className='icon' /> Đơn hàng
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/tin-tuc'>
            <BsBookHalf className='icon' /> Tin tức
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/hang-san-xuat'>
            <BsFillDuffleFill className='icon' /> Nhà cung cấp
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href='/admin/khuyen-mai'>
            <BsGiftFill className='icon' /> Khuyến mãi
          </a>
        </li>
        <li className='sidebar-list-item' onClick={logOutHandler}>
          <BsFillGearFill className='icon' /> Đăng xuất
        </li>
      </ul>
    </aside>
  );
}

const mapDispatchToProps = (dispatch) => ({
  logoutHandler: () => dispatch({ type: "LOGOUT", payload: null }),
});

export default connect(null, mapDispatchToProps)(SideBarAdmin);
