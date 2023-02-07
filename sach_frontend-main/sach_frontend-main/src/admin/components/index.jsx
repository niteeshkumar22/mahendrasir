import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Col, Row, message } from "antd";
import { connect } from "react-redux";
import { getAdminInfo, resetToast } from "../../redux/action/common";
// import "./style.css";
import { getCurrentUserDetails } from "../../utils/util";

const AdminOutlet = ({ toastType, toastData, resetToast, getAdminInfo, adminInfo }) => {
  const userDetails = getCurrentUserDetails();
  useEffect(() => {
    if (toastType) {
      showToast();
      resetToast();
    }
  }, [toastType]);

  useEffect(() => {
    getAdminInfo();
  }, []);
  const showToast = () => {
    switch (toastType) {
      case "success":
        message.success(toastData.message);
        break;
      case "error":
        message.error(toastData.message);
        break;
      case "warning":
        message.warning(toastData.message);
        break;
      default:
        break;
    }
  };

  return (
    <div id="main-wrapper">
      <Sidebar userDetails={userDetails} adminInfo={adminInfo}></Sidebar>
      <div className="content-body">
        <Outlet />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { CommonReducer, LoginReducer } = state;
  return {
    toastData: CommonReducer.toastData,
    toastType: CommonReducer.toastType,
    adminInfo: CommonReducer.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminInfo: () => dispatch(getAdminInfo()),
    resetToast: () => dispatch(resetToast()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminOutlet);
