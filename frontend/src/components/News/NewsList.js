import React from "react";
import { Link } from "react-router-dom";
import NewsItem from "./NewsItem";

import "./NewsList.css";

const NewsList = (props) => {
  console.log(props);

  return (
    <div className='news-list'>
      <ul>
        {props.items.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`/tin-tuc/${item.id}`}>
                <NewsItem item={item} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewsList;
