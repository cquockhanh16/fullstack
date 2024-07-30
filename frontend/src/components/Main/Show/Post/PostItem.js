import React from "react";

import "./PostItem.css";

const PostItem = (props) => {
  const { img, title } = props.item;
  return (
    <div className='row post-item'>
      <div className={props.col1}>
        <img src={img} alt='' />
      </div>
      <p className={props.col2}>{title}</p>
    </div>
  );
};
export default PostItem;
