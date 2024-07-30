import React from "react";

import "./Show.css";

import SimpleSlider from "../../../shared/components/UIElements/SildeShow";
import News from "./News";

import b1 from "../../../shared/components/Images/banner-big-ky-nguyen-800-300.jpg";
import b2 from "../../../shared/components/Images/banner-big-oppo-800-300.png";
import b3 from "../../../shared/components/Images/banner-HC-Tra-Gop-800-300.png";
import b4 from "../../../shared/components/Images/banner-iphoneX-800-300.png";

const BANNERS = [
  {
    img: b1,
    title: "Kỷ nguyên màn hình tràn",
  },
  {
    img: b2,
    title: "Oppo F5 màn hình tràn",
  },
  {
    img: b3,
    title: "Trả góp không lãi xuất 0%",
  },
  {
    img: b4,
    title: "Iphone X mở thêm suất đặt trước",
  },
];

const Show = (props) => {
  return (
    <div className='show'>
      <div className='row'>
        <SimpleSlider className='col-12 col-lg-8' items={BANNERS} />
        <News className='col-12 col-lg-4' />
      </div>
    </div>
  );
};

export default Show;
