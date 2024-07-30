import React from "react";
import PostItem from "./PostItem";
import "./Posts.css";
const Posts = (props) => {
  return (
    <div className='posts'>
      {props.items.map((item, index) => {
        return <PostItem col1='col-4' col2='col-8' key={index} item={item} />;
      })}
    </div>
  );
};

export default Posts;
