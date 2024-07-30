import React from "react";
import Posts from "./Post/Posts";
import "./News.css";

import p1 from "../../../shared/components/Images/hinh-nen-mate-10-pro-.jpg";

import p2 from "../../../shared/components/Images/Nokia-6-TA-1054-cover.jpg";

import p3 from "../../../shared/components/Images/meizu-note-8-fptshop.jpg";

import b1 from "../../../shared/components/Images/banner-sam-samsung.png";

import b2 from "../../../shared/components/Images/banner-Sony-Big-195-75.png";

const POSTS = [
  {
    img: p1,
    title: "Trọn bộ hình ảnh Huaewi Mate 10 đẹp 'miễn chê' cho mọi smartphone",
  },
  {
    img: p2,
    title: "Trọn bộ hình ảnh Huaewi Mate 10 đẹp 'miễn chê' cho mọi smartphone",
  },
  {
    img: p3,
    title: "Trọn bộ hình ảnh Huaewi Mate 10 đẹp 'miễn chê' cho mọi smartphone",
  },
];

const News = (props) => {
  return (
    <div className={`news ${props.className}`}>
      <div className='news-ctrl'>
        <span>TIN CÔNG NGHỆ</span>
        <span>Đọc thêm</span>
      </div>
      <Posts items={POSTS} />

      <div className='row new-banner'>
        <div className='col-6'>
          <img src={b1} alt='' />
        </div>
        <div className='col-6'>
          <img src={b2} alt='' />
        </div>
      </div>
    </div>
  );
};

export default News;
