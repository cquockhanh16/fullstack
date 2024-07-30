import React from "react";
import ProductItem from "./ProductItem";

import "./ProductList.css";

const ProductsList = (props) => {
  return (
    <div className={props.row}>
      {props.items.map((item) => {
        return (
          <ProductItem
            key={item.product_id}
            className={`${props.col}`}
            classNameItem={props.classNameItem}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
