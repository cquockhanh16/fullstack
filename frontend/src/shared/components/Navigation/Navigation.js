import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";

import { NavLink, Link } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";

import CartItem from "./CartItem";

import "./Navigation.css";

import user from "../Images/right-to-bracket-solid.svg";
import imgPhone from "../Images/smartphone-1-24x24.png";
import imgTablet from "../Images/tablet-outline-in-horizontal-position-1-24x24.png";
import imgLaptop from "../Images/laptop-2-24x24.png";
import imgAccessory from "../Images/headset-1-24x24.png";
import imgOldProduct from "../Images/television-1-24x24.png";
import imgDiscuss from "../Images/gift-1-24x24.png";
import imgPaper from "../Images/folded-newspaper-1-24x24.png";
import imgQnA from "../Images/discuss-issue-1-24x24.png";
import cart from "../Images/cart2.png";

const Navigation = (props) => {
  const { isLogin, uid } = props;
  const { sendRequest } = useHttpClient();
  let prs = props.products || [];
  const [avatar, setAvatar] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const savedCart = Cookies.get("cart");

    if (savedCart) {
      props.setCart(JSON.parse(savedCart));
    }
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:2000/api/v1/avatar",
          "GET",
          null,
          {
            Authorization: `Beare ${token}`,
          }
        );
        setAvatar(res.avatar);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token, sendRequest]);
  const count =
    prs.reduce((total, p) => {
      return total + p.count;
    }, 0) || 0;
  const totalPrice =
    prs.reduce((total, p) => {
      return total + p.count * p.product_price;
    }, 0) || 0;
  const logoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.remove("uid");
    Cookies.remove("isLogin");
    Cookies.remove("isAdmin");
    props.logoutHandler();
  };
  return (
    <div className='navv'>
      <div className=' d-none d-lg-block'>
        <ul className='row'>
          <li className={`nav-item col`}>
            <NavLink to='/danh-muc/dien-thoai' activeclassName='active'>
              <div>
                <img src={imgPhone} alt='' />
              </div>
              <span className='d-lg-block d-none'>ĐIỆN THOẠI</span>
            </NavLink>
          </li>
          <li className={`nav-item col`}>
            <NavLink to='/danh-muc/tablet' activeclassName='active'>
              <div>
                <img src={imgTablet} alt='' />
              </div>
              <span className='d-lg-block d-none'>TABLET</span>
            </NavLink>
          </li>
          <li className={`nav-item col `}>
            <NavLink activeclassName='active' to='/danh-muc/laptop'>
              <div>
                <img src={imgLaptop} alt='' />
              </div>
              <span className='d-lg-block d-none'>LAPTOP</span>
            </NavLink>
          </li>
          <li className={`nav-item col `}>
            <NavLink activeclassName='active' to='/danh-muc/phu-kien'>
              <div>
                <img src={imgAccessory} alt='' />
              </div>
              <span className='d-lg-block d-none'>PHỤ KIỆN</span>
            </NavLink>
          </li>

          <li className={`nav-item col `}>
            <NavLink activeclassName='active' to='/danh-muc/cu-gia-re'>
              <div>
                <img src={imgOldProduct} alt='' />
              </div>
              <span className='d-lg-block d-none'>CŨ GIÁ RẺ</span>
            </NavLink>
          </li>
          <li className={`nav-item col `}>
            <NavLink activeclassName='active' to='/danh-muc/khuyen-mai'>
              <div>
                <img src={imgDiscuss} alt='' />
              </div>
              <span className='d-lg-block d-none'>KHUYẾN MÃI</span>
            </NavLink>
          </li>
          <li className={`nav-item col `}>
            <NavLink activeclassName='active' to='/category/tin-tuc'>
              <div>
                <img src={imgPaper} alt='' />
              </div>
              <span className='d-lg-block d-none'>CÔNG NGHỆ</span>
            </NavLink>
          </li>
          <li className={`nav-item col `}>
            <NavLink activeclassName='active' to='/hoi-dap'>
              <div>
                <img src={imgQnA} alt='' />
              </div>
              <span className='d-lg-block d-none'>HỎI ĐÁP</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='cart'>
        <div>
          <Link to='/gio-hang'>
            <p className='d-lg-flex d-none'>GIỎ HÀNG</p>
            <span>
              <img src={cart} alt='' />
            </span>
          </Link>
          <div className='cart-item'>
            {count === 0 ? (
              <p className='text-center'>Chưa có sản phẩm trong giỏ hàng</p>
            ) : (
              <>
                <ul className='px-2'>
                  {prs.map((p, index) => {
                    return (
                      <li key={index}>
                        <CartItem item={p} />
                      </li>
                    );
                  })}
                </ul>
                <p className='text-center m-2'>
                  <span className='text-secondary'>Tổng cộng:</span>{" "}
                  {totalPrice.toLocaleString()} đ
                </p>
                <hr></hr>
                <div className='text-center mb-2'>
                  <Link to='/gio-hang'>
                    <button className='btn btn-success w-100'>
                      Xem giỏ hàng
                    </button>
                  </Link>
                </div>
                <div className='text-center'>
                  <Link to='/thanh-toan'>
                    <button className='btn btn-primary w-100'>
                      Thanh toán
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='amount'>{count}</div>
      </div>
      <div className='d-none d-lg-block user'>
        <div>
          {isLogin && uid ? (
            <div className='user_login'>
              <Link to='/thong-tin'>
                <img
                  src={`${
                    avatar
                      ? "http://localhost:2000/uploads/" + avatar
                      : "https://freesvg.org/img/abstract-user-flat-4.png"
                  }`}
                  alt='Đăng nhập'
                />
              </Link>
            </div>
          ) : (
            <Link to={"/dang-nhap"} className='login'>
              Đăng nhập
            </Link>
          )}
        </div>
        {isLogin && uid && (
          <>
            <div className='user_action'>
              <div>
                <Link to={"/don-hang"}>Danh sách đơn hàng</Link>
              </div>
              <div>
                <button onClick={logoutHandler}>Đăng xuất</button>
                <img src={user} alt='' />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
  uid: state.uid,
  isLogin: state.isLogin,
});

const mapDispatchToProps = (dispatch) => ({
  logoutHandler: () => dispatch({ type: "LOGOUT", payload: null }),
  setCart: (items) => dispatch({ type: "SET_CART", payload: items }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
