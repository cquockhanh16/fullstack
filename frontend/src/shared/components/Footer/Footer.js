import React, { useState } from "react";

import "./Footer.css";

import boCongThuong from "../Images/bo-cong-thuong.png";
import fb from "../Images/fb1.png";
import ytb from "../Images/ytb.webp";
import arrow_b from "../Images/arrow-bottom1.png";
import arrow_t from "../Images/arrow-top1.jpg";

export const Footer = () => {
  const [showMoreFooter, setShowMoreFooter] = useState(false);
  const clickShowMoreFooter = () => {
    setShowMoreFooter((prev) => !prev);
  };
  return (
    <footer className='footer'>
      <div className='footer-con'>
        <div className='container'>
          <div className='row '>
            <ul className='col-6 col-md-3'>
              <li>
                <a href='/'>Tìm hiểu về mua trả góp</a>
              </li>
              <li>
                <a href='/'>Chính sách bảo hành</a>
              </li>
              <li>
                <a href='/'>Chính sách đổi trả</a>
              </li>
              <li
                onClick={clickShowMoreFooter}
                className={`footer-ctrl ${showMoreFooter && "active"}`}>
                <div className='arrow'>
                  <img src={arrow_b} alt='' />
                </div>
                <p>Xem thêm</p>
              </li>
              {showMoreFooter && (
                <>
                  <li>
                    <a href='/'>Hướng dẫn mua online</a>
                  </li>
                  <li>
                    <a href='/'>Chính sách bảo hành</a>
                  </li>
                  <li>
                    <a href='/'>In hóa đơn điện tử</a>
                  </li>
                  <li>
                    <a href='/'>Quy chế hoạt động</a>
                  </li>
                  <li>
                    <a href='/'>Nội quy cửa hàng</a>
                  </li>
                  <li>
                    <a href='/'>Chất lượng phục vụ</a>
                  </li>
                </>
              )}
            </ul>
            <ul className='col-6 col-md-3'>
              <li>
                <a href='/'>Giới thiệu công ty</a>
              </li>
              <li>
                <a href='/'>Tuyển dụng</a>
              </li>
              <li>
                <a href='/'>Gửi góp ý, khiếu nại</a>
              </li>
              <li>
                <a href='/'>Tìm kiếm siêu thị</a>
              </li>
            </ul>

            <ul className='col-6 col-md-3'>
              <li>
                Gọi mua hàng <b>0977062264</b>
              </li>
              <li>
                Gọi khiếu nại <b>0977062264</b>
              </li>
              <li>
                Gọi bảo hành <b>0977062264</b>
              </li>
              <li>
                Hỗ trợ kỹ thuật <b>0977062264</b>
              </li>
              <li>
                <img src={boCongThuong} alt='' />
              </li>
            </ul>
            <ul className='col-6 col-md-3 social'>
              <li>
                <a href='https://www.youtube.com/watch?v=SKUlt_c_ouw'>
                  <img className='fb' src={fb} alt='' />
                </a>
                <a href='https://www.youtube.com/watch?v=SKUlt_c_ouw'>
                  <img className='ytb' src={ytb} alt='' />
                </a>
              </li>
              <li>Website cùng công ty</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='copyright'>
        <p>© All rights reserved. Thiết kế website TTCN</p>
      </div>
    </footer>
  );
};

export default Footer;
