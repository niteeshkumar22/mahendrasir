import { message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../commons/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { resetToast, showPopup } from "../redux/action/common";
import ShareEventPopup from "./components/ShareEventPopup";
import { getUserCategoryData } from "../redux/action/user/category";
import SachLoader from "../commons/Loader";
import isEmpty from "lodash/isEmpty";
import { Modal as Modal2 } from "react-bootstrap";
import "./style.css";
import { logoutSessionForPasswordChange } from "../utils/util";
import { useNavigate } from "react-router-dom";
import { UserRoutes } from "../routes";

/*************** User Scripts *************/
// import "../static/user/vendor/jquery/jquery.min.js";
// import "../static/common/vendor/bootstrap/js/bootstrap.bundle.min.js";
// import "../static/user/vendor/owlCarousel/js/owl.carousel.min.js";
/*********************** */

const baseDashboard = (props) => {
  const { toastType, toastData, resetToast, commonData, showPopup, getUserCategoryData, isLoading, categoryData } = props;

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (toastType) {
      showToast();
      resetToast();
    }
  }, [toastType]);

  useEffect(() => {
    if (isEmpty(categoryData)) {
      getUserCategoryData();
    }
  }, []);
  const renderLoginPopup = () => {
    return (
      <Modal className="w-100" centered visible={true} onCancel={() => showPopup(null)} footer={null}>
        {" "}
        <Login {...props} />{" "}
      </Modal>
    );
  };
  const renderShareEventPopup = () => {
    return <ShareEventPopup popupData={commonData?.popupData} />;
  };
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
      case "password":
        message.success("Password Changed Successfully!");
        setShow(true);
        break;
      default:
        break;
    }
  };
  if (isLoading || isEmpty(categoryData)) {
    return <SachLoader />;
  }
  return (
    <>
      <Header categoryData={categoryData} getUserCategoryData={getUserCategoryData} />
      <main className="main-content">
        <Outlet />
        {commonData?.popupType != "" && commonData?.popupType === "shareEvent" && renderShareEventPopup()}
        {commonData?.popupType != "" && (commonData?.popupType === "login" || commonData?.popupType === "signUp") && renderLoginPopup()}
      </main>
      <Footer />

      <Modal2 show={show} centered className="sach-modal" backdrop="static" keyboard={false}>
        <div className="px-md-5 text-center mt-5">
          <img src={require("../static/user/img/icons/success-tick.svg").default} alt="Successfully" />
          <div className="modal-heading text-center my-4">
            <h1>
              <div>Password</div>
              <div>Successfully Changed!</div>
            </h1>
            <span>Please login again using your updated credentials</span>
          </div>

          <div className="my-3 text-center">
            <a href="#" className="btn-sach bg-sach-dark justify-content-center w-100" onClick={() => logoutSessionForPasswordChange(navigate)}>
              <span className="py-1">Login Now</span>
            </a>
          </div>
        </div>
      </Modal2>

      <div className="cookiesPolicy">
        <img src={require("../static/user/img/icons/cookies.svg").default} alt="cookie" />
        <div className="cookieContent">
          <span>We are providing you this sweet experience by using cookies.</span>
          <div>
            <Link to={UserRoutes.COOKIE_POLICY}>Cookies Policy</Link>
            <Link to="" className="ms-4">
              Decline
            </Link>
          </div>
        </div>
        <div>
          <button className="btn btn-sach bg-sach">
            <span>Okay, I Accept</span>
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { UserHomePageReducer, CommonReducer } = state;
  const { isLoading, categoryData } = UserHomePageReducer;
  return {
    ...state,
    isLoading,
    categoryData,
    commonData: state?.CommonReducer,
    toastData: CommonReducer.toastData,
    toastType: CommonReducer.toastType,
    passwordType: CommonReducer.passwordType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    getUserCategoryData: (data) => dispatch(getUserCategoryData(data)),
    resetToast: () => dispatch(resetToast()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(baseDashboard);
