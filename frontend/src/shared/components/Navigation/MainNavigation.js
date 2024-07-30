import React, { useState } from "react";
import MainHeader from "./MainHeader";
import Navigation from "./Navigation";
import Banner from "./Banner";
import IconBar from "./IconBar";
import SideBar from "./SideBar";
import Overlay from "../UIElements/Overlay";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const showSideBarHandler = () => {
    setShowSideBar((prev) => !prev);
  };
  return (
    <MainHeader>
      {showSideBar && <Overlay onCancel={showSideBarHandler} />}
      {showSideBar && <SideBar onCancel={showSideBarHandler} />}
      <div className='main-navigation row'>
        <div className='d-block d-lg-none col-4'>
          <IconBar onShow={showSideBarHandler} />
        </div>
        <div className='col-lg-4 col-4 '>
          <Banner />
        </div>
        <div className='col-lg-8 col-4'>
          <Navigation />
        </div>
      </div>
    </MainHeader>
  );
};

export default MainNavigation;
