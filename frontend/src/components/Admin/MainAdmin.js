import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

import { connect } from "react-redux";

import "./MainAdmin.css";
import SideBarAdmin from "./SideBarAdmin";
import HeaderAdmin from "./HeaderAdmin";

const MainAdmin = (props) => {
  const isAdmin = props.isAdmin || false;
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className='body'>
      <div className='grid-container'>
        <HeaderAdmin OpenSidebar={OpenSidebar} />
        <SideBarAdmin
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAdmin: state.isAdmin,
});

export default connect(mapStateToProps, null)(MainAdmin);
