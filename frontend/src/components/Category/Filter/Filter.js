import React, { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import "./Filter.css";

const Filter = (props) => {
  let { items } = props;
  const [range, setRange] = useState([...props.ranges]); // Mảng chứa giá trị của 2 đầu mút

  const handleChange = (newValue) => {
    if (newValue[0] > newValue[1]) {
      newValue[0] = newValue[1];
    } else if (newValue[1] < newValue[0]) {
      newValue[1] = newValue[0];
    }
    setRange(newValue);
  };
  const selectItemByPriceHandler = () => {
    items = items.filter((item) => {
      return (
        (1 -
          (item.Promotion !== null ? item.Promotion.discount_value / 100 : 0)) *
          item.product_price >=
          range[0] &&
        (1 -
          (item.Promotion !== null ? item.Promotion.discount_value / 100 : 0)) *
          item.product_price <=
          range[1]
      );
    });
    props.filterItemByPrice(items);
  };
  return (
    <div className='filter'>
      <h5>LỌC THEO GIÁ</h5>
      <div className='line'></div>
      <div className='range'>
        <Slider
          min={props.ranges[0]}
          max={props.ranges[1]}
          step={500}
          range
          defaultValue={range}
          onChange={handleChange}></Slider>
        <div className='d-flex align-items-center justify-content-between mt-2 flex-column-md'>
          <button
            className='btn btn-primary'
            onClick={selectItemByPriceHandler}>
            Lọc
          </button>
          <p className='m-0'>
            Giá:{"  "}
            <b>
              {range[0].toLocaleString()} đ - {range[1].toLocaleString()} đ
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Filter;
