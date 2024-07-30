import React from "react";

import qa from "../../shared/components/Images/FAQs-x2.png";

import "./Question.css";

const Question = () => {
  return (
    <div className='question'>
      <div className='container'>
        <h4 className='text-center'>FAQs</h4>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <ul>
              <li>
                <span>Các sản phẩm lỗi được bảo hành trong bao lâu?</span>
              </li>
              <li>
                Tôi có thể hủy hay thay đổi các giao dịch đã thực hiện hay
                không?
              </li>
              <li>
                Tôi nhập sai số điện thoại ( email ) nhận mã, có thể gửi lại cho
                tôi với số điện thoại ( email ) đúng được không?
              </li>
              <li>Trường Hợp Nào Thì Tôi Được Đổi Sản Phẩm?</li>
              <li>
                Trong Trường Hợp Giỏ Hàng Của Tôi Vừa Có Sản Phẩm Được Giao
                Trong 2 Tiếng Vừa Có Sản Phẩm Không Được Giao Trong 2 Tiếng Thì
                Tôi Sẽ Nhận Hàng Khi Nào?
              </li>
            </ul>
          </div>
          <div className='col-12 col-md-6'>
            <img src={qa} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
