import React, { useEffect } from "react";
import "./ErrorServer.css";
import errorImg from "../../shared/components/Images/500-internal-server-error-concept-illustration_114360-1924.jpg";

const ErrorServer = () => {
  //   useEffect(() => {
  //     alert(
  //       "Trang web đang xảy ra một chút vấn đề, xin lỗi vì sự bất tiện này :(("
  //     );
  //   }, []);
  return (
    <div className='error_server'>
      <div className='container'>
        <div>
          <img src={errorImg} alt='Error 500' />
        </div>
      </div>
    </div>
  );
};

export default ErrorServer;
