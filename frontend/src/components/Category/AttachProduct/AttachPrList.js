import React from "react";
import AttachItem from "./AttachItem";
import "./AttachPrList.css";
const AttachPrList = (props) => {
  return (
    <div className='attach-product-list'>
      {props.items.map((item, index) => {
        if (index >= 4) return null;
        return <AttachItem col1='col-4' col2='col-8' key={index} item={item} />;
      })}
    </div>
  );
};

export default AttachPrList;
