import React from "react";
import "./NewsItem.css";

const NewsItem = (props) => {
  console.log(props);
  const { title, description, img, date, id } = props.item;
  return (
    <div className={`news-item ${props.className}`}>
      <div className='news-item__img'>
        <img alt='' src={`${img}`} />
      </div>
      <h5>
        <b>{title}</b>
      </h5>
      <p className='m-1'>{date}</p>
      <p className='news-item__des'>{description}</p>
    </div>
  );
};

export default NewsItem;
