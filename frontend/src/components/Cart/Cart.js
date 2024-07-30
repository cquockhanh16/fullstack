import React from "react";
import { connect } from "react-redux";

import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const products = props.products || [];
  console.log(products);
  const totalPrice =
    products.reduce((total, p) => {
      return total + p.count * p.product_price;
    }, 0) || 0;
  const removeProductToCartHandler = (id) => {
    props.removeToCart({ id });
  };
  const incrementProductHandler = (id) => {
    console.log(id);
    props.incrementProduct({ id });
  };
  const decrementProductHandler = (id) => {
    console.log(id);
    props.decrementProduct({ id });
  };
  return (
    <div className='cart-page'>
      <div className='container'>
        {products.length === 0 ? (
          <div className='text-center'>
            <p>Chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to='/'>
              <button className='btn btn-primary'>
                Quay trờ lại trang chủ
              </button>
            </Link>
          </div>
        ) : (
          <div className='row'>
            <div className='col-lg-7 col-12'>
              <div className='row'>
                <div className='col-6 cart-page__header'>SẢN PHẨM</div>
                <div className='col-2 cart-page__header'>GIÁ</div>
                <div className='col-2 cart-page__header'>SỐ LƯỢNG</div>
                <div className='col-2 cart-page__header'>TỔNG CỘNG</div>
              </div>
              <hr></hr>
              {products.map((item) => {
                return (
                  <div className='cart-page__item'>
                    <div className='row align-items-center'>
                      <div className='col-6 d-flex align-items-center gap-2'>
                        <span>
                          <button
                            className='btn__delete'
                            onClick={() =>
                              removeProductToCartHandler(item.product_id)
                            }>
                            x
                          </button>
                        </span>
                        <span>
                          <img
                            src={
                              "http://localhost:2000/uploads/" +
                              item.product_image_url
                            }
                            alt=''
                          />
                        </span>
                        <span className='cart-page__item-name'>
                          <p>{item.product_name}</p>
                        </span>
                      </div>
                      <div className='col-2 cart-page__item-price'>
                        {item.product_price.toLocaleString()} đ
                      </div>
                      <div className='col-2 '>
                        <span className='cart-page__group-btn'>
                          <button
                            onClick={() =>
                              decrementProductHandler(item.product_id)
                            }>
                            -
                          </button>{" "}
                          {item.count}{" "}
                          <button
                            onClick={() =>
                              incrementProductHandler(item.product_id)
                            }>
                            +
                          </button>
                        </span>
                      </div>
                      <div className='col-2 cart-page__item-price'>
                        {(item.product_price * item.count).toLocaleString()} đ
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
              <div>
                <Link to='/'>
                  <button className='btn btn-outline-warning'>
                    TIẾP TỤC XEM GIỎ HÀNG
                  </button>
                </Link>
              </div>
            </div>
            <div className='col-lg-5 col-12'>
              <p className='cart-page__header'>TỔNG SỐ LƯỢNG</p>
              <hr></hr>
              <div>
                <span>Tổng cộng</span>
                <span className='cart-page__cnt'>
                  {totalPrice.toLocaleString()} đ
                </span>
              </div>
              <hr />
              <div>
                <span>Giao hàng</span>
                <span className='cart-page__cnt'>Miễn phí giao hàng</span>
              </div>
              <hr></hr>
              <div className='text-center'>
                <Link to='/thanh-toan'>
                  <button className='btn btn-primary w-100'>
                    TIẾN HÀNG THANH TOÁN
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch) => ({
  removeToCart: (productId) =>
    dispatch({ type: "REMOVE_PRODUCT", payload: productId }),
  incrementProduct: (productId) => {
    dispatch({ type: "INCREMENT", payload: productId });
  },
  decrementProduct: (productId) => {
    dispatch({ type: "DECREMENT", payload: productId });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
