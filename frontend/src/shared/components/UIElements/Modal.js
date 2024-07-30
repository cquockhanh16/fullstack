import React from "react";
import Overlay from "./Overlay";
import "./Modal.css";

const Modal = (props) => {
  return (
    <>
      <div
        className={`my_modal ${props.error ? "error" : ""}`}
        style={{ width: `${props.width}px` }}>
        <h3>{props.title}</h3>
        <hr></hr>
        <p>{props.message}</p>
        <div>{props.children}</div>
        <hr></hr>
        <div className='text-end'>{props.action}</div>
      </div>
      <Overlay onCancel={props.onCancel}></Overlay>
    </>
  );
};

export default Modal;
