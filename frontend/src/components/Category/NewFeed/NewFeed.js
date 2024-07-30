import React from "react";

import Posts from "../../Main/Show/Post/Posts";

import "./NewFeed.css";

const POSTS = [
  {
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/hinh-nen-mate-10-pro-.jpg",
    title: "Trọn bộ hình ảnh Huaewi Mate 10 đẹp 'miễn chê' cho mọi smartphone",
  },
  {
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/Nokia-6-TA-1054-cover.jpg",
    title: "Trọn bộ hình ảnh Huaewi Mate 10 đẹp 'miễn chê' cho mọi smartphone",
  },
  {
    img: "https://mauweb.monamedia.net/thegioididong/wp-content/uploads/2017/12/meizu-note-8-fptshop.jpg",
    title: "Trọn bộ hình ảnh Huaewi Mate 10 đẹp 'miễn chê' cho mọi smartphone",
  },
];

const NewFeed = (props) => {
  return (
    <div className='new-feed mt-5'>
      <h5>BÀI VIẾT MỚI NHẤT</h5>
      <div className='line'></div>
      <Posts items={POSTS} />
    </div>
  );
};

export default NewFeed;
