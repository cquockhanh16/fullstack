import React from "react";
import ReactDOM from "react-dom";
import "./Overlay.css"; // File CSS cho overlay

const Overlay = (props) => {
  const content = (
    <div className='overlay' onClick={props.onCancel}>
      {props.children}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default Overlay;
