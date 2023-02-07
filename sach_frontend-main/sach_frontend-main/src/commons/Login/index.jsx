import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { submitLogin, resetLoginData } from "../../redux/action/login";
import { generateOTPCall, verifyOTPCall, submitBasicInfo, resetSignUpData } from "../../redux/action/signup";
import { showPopup } from "../../redux/action/common";
import { Link, useNavigate } from "react-router-dom";
import SachImage from "../../static/admin/img/sach.svg";
import SachLoader from "../Loader";
import { checkAuthentication, checkValidUsername } from "../../utils/util";
import SignUpPage from "../SignUpPage";
import "./style.css";

const Login = (props) => {
  const { onLoginSubmit, loginDetails, allowSignUp = true, commonData, showPopup, resetLoginData } = props;
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isUserEmpty, setIsUserEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [isUsernameValid, setValidUsername] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (checkAuthentication()) {
      navigate("/");
      return;
    }
    resetLoginData();
  }, []);

  const toggleHover = () => setHovered(!hovered);

  const onUsernameChange = (user) => {
    if (user != "") {
      // if (user != "" && checkValidUsername(user)) {
      setValidUsername(true);
      setIsUserEmpty(false);
    } else {
      setValidUsername(false);
    }
    if (loginDetails.isLoginFailed) {
      resetLoginData();
    }
    setUsername(user);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      onClickLogin();
    }
  };
  const onPasswordChange = (password) => {
    if (password != "") {
      setIsPasswordEmpty(false);
    }
    if (loginDetails.isLoginFailed) {
      resetLoginData();
    }
    setPassword(password);
  };

  const onClickLogin = () => {
    let redirectUrl = null;
    var index = window.location.href.indexOf("redirect=");
    if (index !== -1) {
      redirectUrl = window.location.href.split("redirect=")[1];
    }
    if (isUsernameValid && username != "" && password != "" && !loginDetails.isLoginFailed) {
      onLoginSubmit({ userId: username, password, redirectUrl: redirectUrl }, navigate);
      // setUsername("");
      // setPassword("");
    }
    if (username == "") {
      // setIsUserEmpty(true);
    }
    if (password == "") {
      // setIsPasswordEmpty(true);
    }
    return;
  };

  const onClickSignUp = () => {
    showPopup("signUp", {});
    // navigate("/signup");
  };
  const renderSignUpPopup = (data) => {
    return (
      <Modal className="signUp-modal" centered visible={true} onCancel={() => showPopup(null)} footer={null}>
        <SignUpPage {...props} />
      </Modal>
    );
  };
  if (loginDetails?.isLoading) {
    return <SachLoader />;
  }
  return (
    <div>
      <div className="login-container login-modal">
        <Link className="modal-close" to="/">
          <i className="bi bi-x"></i>
        </Link>
        <div className="row h-100">
          <div className="col-lg-4 col-md-4">
            <div className="loginModal-img">
              <h4 className="title text-light">
                Get Hope, Happiness, <br />
                Health, and Aspiration in life
              </h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-8">
            <div className="row h-100 align-items-center">
              <div className="col-lg-5 col-md-5 mx-auto">
                <img src={SachImage} className="img-fluid mb-3" alt="Sach Icon" />
                <h4 className="title">Sign in with User ID</h4>
                <p className="para">Enter your unique user id and password.</p>
                <div className="col-12 sach-form">
                  <label className="form-label">User-ID</label>
                  <input type="text" className={`form-control ${loginDetails?.isLoginFailed || isUserEmpty ? "invalid" : ""} ${isUsernameValid ? "" : "invalid"}`} id="userID" value={username} onChange={(event) => onUsernameChange(event.target.value)} />
                  {!isUsernameValid && <div className="col-12 mt-1 error-msg">Please enter Valid userId or phone</div>}
                </div>

                <div className="col-12 sach-form">
                  <label className="form-label">Password</label>
                  <div className="pass-wrapper">
                    <input type={showPass ? "text" : "password"} className={`form-control ${loginDetails?.isLoginFailed || isPasswordEmpty ? "invalid" : ""}`} id="password" value={password} onChange={(event) => onPasswordChange(event.target.value)} onKeyDown={(event) => handleKeyDown(event)} />
                    {!showPass ? <i onClick={() => setShowPass(!showPass)} className="bi bi-eye"></i> : <i onClick={() => setShowPass(!showPass)} className="bi bi-eye-slash"></i>}
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <button className={`btn-sach login-btn ${hovered ? "btn-hover" : "bg-sach-dark"}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={onClickLogin}>
                    Sign In
                  </button>
                </div>
                {loginDetails?.isLoginFailed && <div className="col-12 mt-1 error-msg">{loginDetails?.loginData?.message || "Invalid username or password"}</div>}
                {allowSignUp && (
                  <p className="details">
                    Don't have an account? <span onClick={onClickSignUp}>Create an account</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {commonData?.popupType != "" && commonData?.popupType === "signUp" && renderSignUpPopup(commonData?.popupData)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
    loginDetails: state?.LoginReducer,
    commonData: state?.CommonReducer,
    signUpData: state?.SignUpReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log('in state dis[atch', dispatch)
  return {
    onLoginSubmit: (data, navigate) => dispatch(submitLogin(data, navigate)),
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    generateOTPCall: (data) => dispatch(generateOTPCall(data)),
    verifyOTPCall: (data) => dispatch(verifyOTPCall(data)),
    submitBasicInfo: (data, navigate, pathname) => dispatch(submitBasicInfo(data, navigate, pathname)),
    resetSignUpData: () => dispatch(resetSignUpData()),
    resetLoginData: () => dispatch(resetLoginData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
