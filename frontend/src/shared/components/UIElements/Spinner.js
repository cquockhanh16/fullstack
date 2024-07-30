import React from "react";
import "./Spinner.css";
import Overlay from "./Overlay";

const Spinner = () => {
  return (
    <>
      <Overlay>
        <div className='loader'></div>
      </Overlay>
    </>
  );
};

export default Spinner;
