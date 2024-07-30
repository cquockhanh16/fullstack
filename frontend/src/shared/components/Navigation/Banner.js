import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./Banner.css";

import search from "../Images/search-icon.webp";
import banner from "../Images/banner.png";
import { Link } from "react-router-dom";

const Banner = (props) => {
  const searchRef = useRef();
  const navigate = useNavigate();

  const searchHandler = () => {
    const cnt = searchRef.current.value;
    navigate(`/search/${cnt.trim()}`);
  };
  return (
    <div className={`banner ${props.className}`}>
      <div className='logo'>
        <Link to='/'>
          <img src={banner} alt='' />
        </Link>
      </div>
      <div className='search d-none d-lg-flex'>
        <input type='text' placeholder='Tìm kiếm' ref={searchRef} />
        <button onClick={searchHandler}>
          <img src={search} alt='' />
        </button>
      </div>
    </div>
  );
};

export default Banner;
