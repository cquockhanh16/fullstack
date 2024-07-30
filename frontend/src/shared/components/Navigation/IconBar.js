import React from "react";

import "./IconBar.css";

import humburger from "../Images/bars-solid.svg";

const IconBar = (props) => {
  return (
    <div className='icon-bar' onClick={props.onShow}>
      <img src={humburger} alt='' />
    </div>
  );
};

export default IconBar;
