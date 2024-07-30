import React from "react";
import { connect } from "react-redux";
import "./CartItem.css";
const CartItem = (props) => {
  const { item } = props;
  const removeProductToCartHandler = () => {
    props.removeToCart({ id: item.product_id });
  };
  return (
    <div className='row border p-1 py-2'>
      <div className='col-2 p-0'>
        <img
          className='cart-item__img'
          src={"http://localhost:2000/uploads/" + item.product_image_url}
          alt=''
        />
      </div>
      <div className='col-8'>
        <span className='cart-item__name'>{item.product_name}</span>
        <br />
        <span className='cart-item__price'>
          {item.count} x {item.product_price.toLocaleString()}
        </span>
      </div>
      <div className='col-2'>
        <button
          onClick={removeProductToCartHandler}
          className=' cart-item__btn'>
          x
        </button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
