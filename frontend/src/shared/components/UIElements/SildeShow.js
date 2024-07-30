import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlideShow.css";

function SimpleSlider(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className={`slider-container ${props.className}`}>
      <Slider {...settings}>
        {props.items.map((element) => {
          return (
            <div className='slide' key={element.img}>
              <img src={element.img} alt='' />
              <p>{element.title}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SimpleSlider;
