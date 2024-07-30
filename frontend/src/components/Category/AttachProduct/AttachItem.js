import React from "react";
import { Link } from "react-router-dom";

import "./AttachItem.css";

const AttachItem = (props) => {
  const {
    product_name,
    product_price,
    product_image_url,
    Promotion,
    product_id,
    categories_id,
  } = props.item;

  return (
    <Link to={`/san-pham/${categories_id}/${product_id}`}>
      <div className='attach-item'>
        <div className='row '>
          <div className='col-3'>
            <img
              src={"http://localhost:2000/uploads/" + product_image_url}
              alt=''
            />
          </div>
          <div className='col-9'>
            <p>{product_name}</p>
            <span className={` ${Promotion && "price"}`}>
              {(+product_price).toLocaleString()} đ
            </span>
            {Promotion !== null && (
              <span className='discount'>
                {(+(
                  ((100 - Promotion.discount_value) / 100) *
                  product_price
                ).toFixed()).toLocaleString()}{" "}
                đ
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default AttachItem;
