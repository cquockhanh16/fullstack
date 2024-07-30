import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const {
    product_id,
    product_name,
    product_image_url,
    product_price,
    Promotion,
    categories_id,
    quantity,
  } = props.item;
  let discount_value = Promotion ? +Promotion.discount_value : 0;
  return (
    <div className={`${+quantity === 0 ? "disabled" : ""} ${props.className} `}>
      <Link to={`/san-pham/${categories_id}/${product_id}`}>
        <div className={`product-item ${props.classNameItem}`}>
          <div className='product-item__img'>
            <img
              src={`http://localhost:2000/uploads/` + product_image_url}
              alt=''
            />
          </div>
          <p className='product-item__name'>{product_name}</p>
          <div className='product-item__price'>
            <span className={` ${discount_value && "price"}`}>
              {(+product_price).toLocaleString()} đ
            </span>
            {discount_value !== 0 && (
              <span className='discount'>
                {(+(
                  (1 - discount_value / 100) *
                  product_price
                ).toFixed()).toLocaleString()}{" "}
                đ
              </span>
            )}
          </div>
          {discount_value !== 0 && (
            <div className='nof_dis'>-{+discount_value}%</div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
