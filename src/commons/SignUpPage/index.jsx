import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import { checkValidUsername, getUserId, goToLoginPage, startTimer, checkValidPassword, checkValidPhone, checkValidFullName } from "../../utils/util";

const SignUpPage = (props) => {
  const { generateOTPCall, verifyOTPCall, signUpData, submitBasicInfo, resetSignUpData, showPopup, verifyOTPFailed } = props;
  let navigate = useNavigate();
  let timer;
  const { pathname } = useLocation();

  const [currStep, setCurrStep] = useState(1);
  const [formValues, setFormValues] = useState([]);
  const [isFormValid, setValidForm] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [disableResendOtpBtn, setDisableResendOtpBtn] = useState(true);
  const [showError, setShowError] = useState("");
  const [fromEvent, setFromEvent] = useState(-1);
  useEffect(() => {
    resetSignUpData();
    setFromEvent(window.location.href.indexOf("fromEvent="));
  }, []);

  const [value, setValue] = useState();

  const countryValChange = () => {
    document.querySelector("#mobileNumber").focus();
    setValue();
  };

  useEffect(() => {
    if (currStep === 1 && signUpData.isLoading === false && signUpData.isError === false) {
      setCurrStep(2);
      setShowError(signUpData?.data?.data?.message || "Something went wrong, please try again");
    } else if (currStep === 1 && signUpData.isLoading === false && signUpData.isError === true) {
      setShowError(signUpData?.data?.data?.message || "Something went wrong, please try again");
    }
  }, [signUpData]);

  useEffect(() => {
    if (currStep === 2) {
      timer = startTimer(14, () => setDisableResendOtpBtn(false));
    } else {
      clearInterval(timer);
    }
  }, [currStep]);

  const onChangeSignUpform = (event) => {
    if (showError) {
      setShowError("");
    }
    const copyForm = Object.assign({}, formValues);
    copyForm[event.target.id] = event.target.value;
    if (event.target.id === "fullName" && event.target.value !== "" && checkValidFullName(event.target.value)) {
      copyForm["isValidName"] = true;
    } else if (event.target.id === "fullName" && event.target.value !== "" && !checkValidFullName(event.target.value)) {
      copyForm["isValidName"] = false;
    }

    if (event.target.id === "email" && event.target.value !== "" && checkValidUsername(event.target.value)) {
      copyForm["isValidEmail"] = true;
    } else if (event.target.id === "email" && event.target.value !== "" && !checkValidUsername(event.target.value)) {
      copyForm["isValidEmail"] = false;
    }

    if (event.target.id === "mobileNumber" && event.target.value !== "" && checkValidPhone(event.target.value)) {
      copyForm["isValidPhone"] = true;
    } else if (event.target.id === "mobileNumber" && event.target.value !== "" && !checkValidPhone(event.target.value)) {
      copyForm["isValidPhone"] = false;
    }

    if (event.target.id === "password" && event.target.value !== "" && checkValidPassword(event.target.value)) {
      copyForm["isValidPassword"] = true;
    } else if (event.target.id === "password" && event.target.value !== "" && !checkValidPassword(event.target.value)) {
      copyForm["isValidPassword"] = false;
    }
    if (event.target.id === "OTPChar1" || event.target.id === "OTPChar2" || event.target.id === "OTPChar3" || event.target.id === "OTPChar4") {
      const fieldIndex = event.target.id[event.target.id.length - 1];
      let fieldIntIndex = parseInt(fieldIndex, 10);
      const nextfield = document.querySelector(`input[id=OTPChar${fieldIntIndex + 1}]`);
      // If found, focus the next field
      if (nextfield !== null) {
        nextfield.focus();
      }
    }
    if (copyForm["isValidName"] && copyForm["isValidEmail"] && copyForm["isValidPassword"] && copyForm["isValidPhone"]) {
      setValidForm(true);
    } else {
      //  setValidForm(false);
    }
    setFormValues(copyForm);
  };
  const ageGroupMapping = {
    "AgeGroup-1": "12-29",
    "AgeGroup-2": "30-39",
    "AgeGroup-3": "40-49",
    "AgeGroup-4": "50+",
  };
  const onChangeSelection = (event) => {
    const copyForm = Object.assign({}, formValues);
    if (event.target.name === "AgeGroup") {
      copyForm[event.target.name] = ageGroupMapping[event.target.id];
    } else {
      copyForm[event.target.name] = event.target.id;
    }
    setFormValues(copyForm);
  };
  const onChangeAspirationSelection = (event) => {
    const copyForm = Object.assign({}, formValues);
    if (copyForm[event.target.name]) {
      if (copyForm[event.target.name].indexOf(event.target.id) >= 0) {
        copyForm[event.target.name].splice(copyForm[event.target.name].indexOf(event.target.id), 1);
      } else {
        if (["Goals"].includes(event.target.name)) {
          if (copyForm[event.target.name].length === 3) {
            setShowError("Choose up to 3 goals");
            event.target.value = "";
            event.target.checked = false;
          } else {
            copyForm[event.target.name].push(event.target.id);
          }
        } else {
          copyForm[event.target.name].push(event.target.id);
        }
      }
    } else {
      copyForm[event.target.name] = [event.target.id];
    }
    setFormValues(copyForm);
  };
  const togglePasswordShown = () => {
    setShowPass(!showPass);
  };
  const setErrorMsg = () => {
    if (!formValues["fullName"] || !formValues["isValidName"]) {
      setShowError("Please Enter Valid Name, Only alphabets are allowed");
    } else if (!formValues["email"] || !formValues["isValidEmail"]) {
      setShowError("Please Enter Valid Email Address");
    } else if (!formValues["mobileNumber"] || !formValues["isValidPhone"]) {
      setShowError("Please Enter Valid Phone Number");
    } else if (!formValues["password"] || !formValues["isValidPaswword"]) {
      setShowError("Please Enter Strong Password");
    } else {
      return true;
    }
  };

  const onClickNext = (type) => {
    if (!isFormValid) {
      setErrorMsg();
      return;
    }
    if (type === "REQUEST_OTP") {
      generateOTPCall({
        crId: "crid-58634587385",
        userContact: `${formValues?.mobileNumber}`,
        userName: formValues?.fullName,
        userEmail: formValues?.email,
        password: formValues?.password,
      });
    } else {
      if (currStep == 2 && fromEvent != -1) {
        goToLoginPage(pathname, navigate);
        return;
      }
      setCurrStep(currStep + 1);
    }
  };

  const onClickResendOtp = () => {
    if (disableResendOtpBtn) return;
    timer = startTimer(14, () => setDisableResendOtpBtn(false));
    generateOTPCall({
      crId: "58634587385",
      userContact: `${formValues?.mobileNumber}`,
      userName: formValues?.fullName,
      userEmail: formValues?.email,
      password: formValues?.password,
    });
  };

  const onClickVerifyOTP = () => {
    if (formValues?.OTPChar1 === undefined || formValues?.OTPChar2 === undefined || formValues?.OTPChar3 === undefined || formValues?.OTPChar4 === undefined) {
      return;
    }
    const data = {
      crId: "23432432423",
      userContact: `${formValues?.mobileNumber}`,
      userName: formValues?.fullName,
      userEmail: formValues?.email,
      password: formValues?.password,
      otp: formValues?.OTPChar1 + formValues?.OTPChar2 + formValues?.OTPChar3 + formValues?.OTPChar4,
    };
    verifyOTPCall(data);
  };

  const onSubmitSignUp = (type) => {
    if (type === "SKIP") {
      // goToLoginPage(pathname, navigate);
    } else if (type === "NEXT") {
      const userId = getUserId();
      const data = {
        userId: userId,
        userName: formValues?.fullName,
        userEmail: formValues?.email,
        gender: formValues?.Gender,
        ageGroup: formValues?.AgeGroup,
        feeling: formValues?.Feeling,

        goals: formValues?.Goals,
        elevate: formValues?.elevate,
        Issue: formValues?.Issue,
        spendDuration: formValues?.spendDuration,
        availableTime: formValues?.Days,
      };
      submitBasicInfo(data, navigate, pathname);
      showPopup(null);
      // goToLoginPage(pathname, navigate);
    }
  };
  const inputNumberOnly = (evt) => {
    if(evt.keyCode !== 8 && evt.keyCode !== 189 && (evt.keyCode <= 47 || evt.keyCode >= 58 )) {
      evt.stopPropagation();
      evt.preventDefault();
      return false;
     }
  }
  const renderInitalForm = () => {
    return (
      <div className="col-md-5 col-lg-5 offset-lg-1 offset-md-1" id="step-1">
        <span className="stepNum">Step 1</span>
        <h4 className="title">Create an account</h4>
        <p className="para">Please enter the following details.</p>
        <div className="row">
          <div className="col-12 sach-form">
            <label htmlFor="fullName" className="form-label">
              Full Name<small>*</small>
            </label>
            <input type="text" maxLength={50} max={50} className="form-control text-capitalize" id="fullName" onChange={(event) => onChangeSignUpform(event)} />
          </div>
          <div className="col-12 sach-form">
            <label htmlFor="email" className="form-label">
              Email Address<small>*</small>
            </label>
            <input type="text" className="form-control" id="email" onChange={(event) => onChangeSignUpform(event)} />
          </div>
          <div className="col-12 sach-form">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number<small>*</small>
            </label>
            <input type="text" className="form-control" id="mobileNumber" 
            onKeyDown={ inputNumberOnly }
            onChange={(event) => onChangeSignUpform(event)} />
          </div>
          <div className="col-12 sach-form">
            <label htmlFor="password" className="form-label">
              Password<small>*</small>
            </label>
            {/* <CountryDropdown id="UNIQUE_ID" className="YOUR_CSS_CLASS" preferredCountries={["gb", "us"]} value="" handleChange={(e) => console.log(e.target.value)}></CountryDropdown> */}
            <div className="pass-wrapper">
              <input type={showPass ? "text" : "password"} className="form-control" id="password" 
              
              onChange={(event) => onChangeSignUpform(event)} />
              {!showPass ? <i onClick={togglePasswordShown} className="bi bi-eye-slash"></i> : <i onClick={togglePasswordShown} className="bi bi-eye"></i>}
            </div>
          </div>
          <div className="col-md-12 password-inst">
            <b>Your password must include the following:</b>
            <ul>
              <li>Minimum 8 characters long — the more, the better</li>
              <li>Upper & lowercase character</li>
              <li>At least one number & special character</li>
            </ul>
          </div>

          <div className="TnC">
            By Clicking request OTP, you agree to our{" "}
            <Link to="/user/T&C" target="_blank">
              <b>Terms, Condition</b>
            </Link>
            <b> & </b>
            <Link to="/user/privacy_policy" target="_blank">
              <b>Privacy Policy</b>
            </Link>
          </div>
          <div className="col-12 sach-form">
            <a href="javascript:void(0);" className="btn btn-sach bg-sach-dark justify-content-center w-100 mt-1" onClick={() => onClickNext("REQUEST_OTP")}>
              Request OTP
            </a>
          </div>
          {showError && <div className="col-12 mt-1 error-msg">{showError}</div>}
          <p className="details">
            I have an account?{" "}
            <a href=" #" onClick={() => goToLoginPage(pathname, navigate)}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    );
  };

  const renderVerifyAccount = () => {
    return (
      <div className="col-md-5 col-lg-5 offset-lg-1 offset-md-1 mt-md-5 pb-md-5 mt-0 pb-0" id="step-2">
        <span className="stepNum">Step 2</span>
        <h4 className="title">Verify Account</h4>
        <p className="para">We have sent you OTP to your mobile number or register Email</p>
        <div className="row">
          <div className="col-12 sach-form sach-form-OTP">
            <label className="form-label d-block">OTP</label>
            <div></div>
            <input type="text" className="form-control" maxLength="1" id="OTPChar1" onChange={(event) => onChangeSignUpform(event)} />
            <input type="text" className="form-control" maxLength="1" id="OTPChar2" onChange={(event) => onChangeSignUpform(event)} />
            <input type="text" className="form-control" maxLength="1" id="OTPChar3" onChange={(event) => onChangeSignUpform(event)} />
            <input type="text" className="form-control" maxLength="1" id="OTPChar4" onChange={(event) => onChangeSignUpform(event)} />
          </div>
          {!signUpData?.otpVerified && <div className="col-12 mt-1 error-msg">{signUpData?.data?.data?.message || "Please enter correct otp"}</div>}
          <div className="col-12 my-2 resendOTP">
            <a href=" #" className={disableResendOtpBtn ? "btn-disabled text-sach" : "text-sach"} onClick={() => onClickResendOtp()}>
              Resend OTP
            </a>
            <span>
              <img src={require("../../static/user/img/icons/clock.svg").default} alt="Clock" /> Ends in{" "}
              <b id="timer-value" className="text-sach">
                40
              </b>{" "}
              sec
            </span>
          </div>
          <div className="col-12 sach-form">
            <a href=" #" className="btn btn-sach bg-sach-dark justify-content-center w-100" onClick={onClickVerifyOTP}>
              Verify OTP
            </a>
          </div>

          <div className="col-12 sach-form text-center">
            <b className="text-sach" role="button" onClick={() => setCurrStep(1)}>
              Change number
            </b>
          </div>
        </div>

        <div id="verified-popup" className="accountVerified">
          <div className="accountVerified-body">
            {/* <span className="modal-close" onClick={closeVerifyModal}>
              <i className="bi bi-x"></i>
            </span> */}
            <img src={require("../../static/user/img/icons/success-tick.svg").default} alt="Success" />
            <h4>Account Verified</h4>
            <p>Your account verification is successful</p>
            <a href=" #" className="btn btn-sach bg-sach-dark mt-3 px-5" onClick={() => onClickNext()}>
              Next
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderBasicInfoForm = () => {
    return (
      <div className="col-md-6 col-lg-6 offset-lg-1 offset-md-1" id="step-3" styles="display: none;">
        <span className="stepNum">Step 3</span>
        <h4 className="title">Basic Information</h4>
        <p className="para">Please complete the following informtion</p>
        <div className="row">
          <div className="col-12 sach-form">
            <div className="icon-group-title">Select Gender</div>
            <ul className="icon-group" onClick={(event) => onChangeSelection(event)}>
              <li>
                <input type="radio" className="btn-check" name="Gender" id="Male" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Male">
                  <img src={require("../../static/user/img/icons/signupIcons/male.svg").default} alt="Male" /> Male
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Gender" id="Female" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Female">
                  <img src={require("../../static/user/img/icons/signupIcons/female.svg").default} alt="Female" />
                  Female
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Gender" id="Other" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Other">
                  <img src={require("../../static/user/img/icons/signupIcons/other.svg").default} alt="Other" />
                  Other
                </label>
              </li>
            </ul>
          </div>
          <div className="col-12 sach-form">
            <div className="icon-group-title">Select Age Group</div>
            <ul className="icon-group" onClick={(event) => onChangeSelection(event)}>
              <li>
                <input type="radio" className="btn-check" name="AgeGroup" id="AgeGroup-1" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="AgeGroup-1">
                  <img src={require("../../static/user/img/icons/signupIcons/12-29.svg").default} alt="AgeGroup-1" /> 12-29
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="AgeGroup" id="AgeGroup-2" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="AgeGroup-2">
                  <img src={require("../../static/user/img/icons/signupIcons/30-39.svg").default} alt="AgeGroup-2" />
                  30-39
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="AgeGroup" id="AgeGroup-3" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="AgeGroup-3">
                  <img src={require("../../static/user/img/icons/signupIcons/40-49.svg").default} alt="AgeGroup-3" />
                  40-49
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="AgeGroup" id="AgeGroup-4" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="AgeGroup-4">
                  <img src={require("../../static/user/img/icons/signupIcons/50+.svg").default} alt="AgeGroup-4" />
                  50+
                </label>
              </li>
            </ul>
          </div>
          <div className="col-12 sach-form">
            <div className="icon-group-title">How you're feeling now?</div>
            <ul className="icon-group" onClick={(event) => onChangeSelection(event)}>
              <li>
                <input type="radio" className="btn-check" name="Feeling" id="happy" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="happy">
                  <img src={require("../../static/user/img/icons/signupIcons/happy.svg").default} alt="happy" /> Happy
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Feeling" id="sad" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="sad">
                  <img src={require("../../static/user/img/icons/signupIcons/sad.svg").default} alt="sad" />
                  Sad
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Feeling" id="angry" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="angry">
                  <img src={require("../../static/user/img/icons/signupIcons/angry.svg").default} alt="angry" />
                  Angry
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Feeling" id="tired" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="tired">
                  <img src={require("../../static/user/img/icons/signupIcons/tired.svg").default} alt="tired" />
                  Tired
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Feeling" id="noEmotion" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="noEmotion">
                  <img src={require("../../static/user/img/icons/signupIcons/noEmotion.svg").default} alt="noEmotion" />
                  None of these
                </label>
              </li>
            </ul>
          </div>
          <div className="col-12 sach-form">
            <a href=" #" className="btn btn-sach btn-sach-linear me-3" onClick={() => onClickNext()}>
              Skip
            </a>
            <a href=" #" className="btn btn-sach bg-sach-dark px-4" onClick={() => onClickNext()}>
              Next
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderAspirationsForm = () => {
    return (
      <div className="col-md-10 col-lg-10 offset-lg-1 offset-md-1" id="step-4" styles="display: none;">
        <span className="stepNum">Step 4</span>
        <h4 className="title">Aspirations</h4>
        <p className="para">Please select your interest as per the following process.</p>
        <div className="row signUp-fixedHeight">
          {showError && <div className="col-12 mt-1 error-msg">{showError}</div>}
          <div className="col-12 sach-form">
            <div className="icon-group-title mb-0">What are your goals?</div>
            <p className="icon-group-para">Choose up to 3 goals for more precise personalization.</p>
            <ul className="icon-group" onClick={(event) => onChangeAspirationSelection(event)}>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Win at work" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Win at work">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/Win.svg").default} alt="Goals" />
                  Win at work
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Have more money" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Have more money">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/Money.svg").default} alt="Goals" />
                  Have more money
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Be productive" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Be productive">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/Productive.svg").default} alt="Goals" />
                  Be productive
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Build strong family" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Build strong family">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/Family.svg").default} alt="Goals" />
                  Build strong family
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Have a healthy body" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Have a healthy body">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/Healthcare.svg").default} alt="Goals" />
                  Have a healthy body
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Love & be loved" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Love & be loved">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/Loved-Ones.svg").default} alt="Goals" />
                  Love & be loved
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Be happy" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Be happy">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/happy.svg").default} alt="Goals" />
                  Be happy
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Goals" id="Improve social life" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Improve social life">
                  <img src={require("../../static/user/img/icons/signupIcons/goals/Social-Work.svg").default} alt="Goals" />
                  Improve social life
                </label>
              </li>
            </ul>
          </div>
          <div className="col-12 sach-form mb-0">
            <div className="icon-group-title">Choose areas you'd like to elevate</div>
            <ul className="icon-group" onClick={(event) => onChangeAspirationSelection(event)}>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Motivation" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Motivation">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Motivation.svg").default} alt="Elevate" />
                  Motivation
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Leadership" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Leadership">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Leadership.svg").default} alt="Elevate" />
                  Leadership
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Management" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Management">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Management.svg").default} alt="Elevate" />
                  Management
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Empthy" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Empthy">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Empathy.svg").default} alt="Elevate" />
                  Empthy
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Planning" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Planning">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Planning.svg").default} alt="Elevate" />
                  Planning
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Time-Management" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Time-Management">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Time-Management.svg").default} alt="Elevate" />
                  Time-Management
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Parenting" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Parenting">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Parenting.svg").default} alt="Elevate" />
                  Parenting
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Habits" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Habits">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Habits.svg").default} alt="Elevate" />
                  Habits
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Emotions" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Emotions">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Emotions.svg").default} alt="Elevate" />
                  Emotions
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Nutrition" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Nutrition">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Nutrition.svg").default} alt="Elevate" />
                  Nutrition
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Mindset" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Mindset">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Mindset.svg").default} alt="Elevate" />
                  Mindset
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Self Confidence" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Self Confidence">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Self-Confidance.svg").default} alt="Elevate" />
                  Self Confidence
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Self Care" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Self Care">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Self-Care.svg").default} alt="Elevate" />
                  Self Care
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Communication" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Communication">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Communication.svg").default} alt="Elevate" />
                  Communication
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="elevate" id="Exercise" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Exercise">
                  <img src={require("../../static/user/img/icons/signupIcons/elevate/Exercise.svg").default} alt="Elevate" />
                  Exercise
                </label>
              </li>
            </ul>
          </div>
          <div className="col-12 sach-form">
            <div className="icon-group-title">Choose at least 3 or more categories that represent your issues.</div>
            <ul className="icon-group" onClick={(event) => onChangeAspirationSelection(event)}>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Dr. Subhash Chandra Show" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Dr. Subhash Chandra Show">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/SubhashChandraShow.svg").default} alt="Issue" />
                  Dr. Subhash Chandra Show
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Birth" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Birth">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Birth.svg").default} alt="Issue" />
                  Birth
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Ageing" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Ageing">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Ageing.svg").default} alt="Issue" />
                  Ageing
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Sickness" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Sickness">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Sickness.svg").default} alt="Issue" />
                  Sickness
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Dissociation from loved ones" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Dissociation from loved ones">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Loved-Ones.svg").default} alt="Issue" />
                  Dissociation from loved ones
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Not to get what one wants" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Not to get what one wants">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Want.svg").default} alt="Issue" />
                  Not to get what one wants
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Desire of sensual pleasure" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Desire of sensual pleasure">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Pleasure.svg").default} alt="Issue" />
                  Desire of sensual pleasure
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Desire to get rid off" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Desire to get rid off">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Desire-2.svg").default} alt="Issue" />
                  Desire to get rid off
                </label>
              </li>
              <li>
                <input type="checkbox" className="btn-check" name="Issue" id="Desire to become" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Desire to become">
                  <img src={require("../../static/user/img/icons/signupIcons/issues/Desire-1.svg").default} alt="Issue" />
                  Desire to become
                </label>
              </li>
            </ul>
          </div>
          <div className="col-12 sach-form">
            <div className="icon-group-title">
              When do you have time for <img src={require("../../static/user/img/sach-icon.svg").default} alt="Sach" />
            </div>
            <ul className="icon-group" onClick={(event) => onChangeSelection(event)}>
              <li>
                <input type="radio" className="btn-check" name="Days" id="Morning" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Morning">
                  <img src={require("../../static/user/img/icons/signupIcons/days/Morning.svg").default} alt="Morning" />
                  Morning
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Days" id="Daytime" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Daytime">
                  <img src={require("../../static/user/img/icons/signupIcons/days/Afternoon.svg").default} alt="Afternoon" />
                  Daytime
                </label>
              </li>
              <li>
                <input type="radio" className="btn-check" name="Days" id="Evening" autoComplete="off" />
                <label className="btn btn-outline-primary" htmlFor="Evening">
                  <img src={require("../../static/user/img/icons/signupIcons/days/Evening.svg").default} alt="Evening" />
                  Evening
                </label>
              </li>
            </ul>
          </div>
          <div className="col-12 sach-form mb-5">
            <div className="icon-group-title">
              How much time are you ready to spend on <img src={require("../../static/user/img/sach-icon.svg").default} alt="Sach" />
            </div>
            <div className="row">
              <div className="col-12 sach-form my-0">
                <input type="number" min="0" className="form-control ducation-input" id="spendDuration" maxLength="3" onChange={(event) => onChangeSignUpform(event)} />
                <label className="ducation-mins">mins</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 sach-form">
            <a href=" #" className="btn btn-sach btn-sach-linear me-3" data-bs-dismiss="modal" onClick={() => onSubmitSignUp("SKIP")}>
              Skip
            </a>
            <a href=" #" className="btn btn-sach bg-sach-dark px-4" data-bs-dismiss="modal" onClick={() => onSubmitSignUp("NEXT")}>
              Next
            </a>
          </div>
        </div>
      </div>
    );
  };

  const stepFunMapping = {
    1: renderInitalForm,
    2: renderVerifyAccount,
    3: renderBasicInfoForm,
    4: renderAspirationsForm,
  };

  const renderCurrStepData = (step) => {
    return stepFunMapping[step] && stepFunMapping[step]();
  };

  return (
    <div className="login-modal">
      <div className="row">
        <div className="col-lg-4 col-md-4">
          <div className="loginModal-img signUpModal-img">
            <h4 className="title text-light">
              Get Hope, Happiness, <br />
              Health, and Aspiration in life
            </h4>
          </div>
        </div>
        <div className="col-lg-8 col-md-8 align-self-center">
          <div className="row">
            <div className="col-lg-10 col-md-10 offset-lg-1 offset-md-1 mb-4">
              <ul className="signUpSteps">
                <li id="stepIndicator-1" className={currStep === 1 ? "active" : currStep > 1 ? "done" : ""}>
                  <i>1</i>
                  <span>Account Setup</span>
                </li>
                <li id="stepIndicator-2" className={currStep === 2 ? "active" : currStep > 2 ? "done" : ""}>
                  <i>2</i>
                  <span>Verify Account</span>
                </li>
                {fromEvent == -1 && (
                  <li id="stepIndicator-3" className={currStep === 3 ? "active" : currStep > 3 ? "done" : ""}>
                    <i>3</i>
                    {/* <i className="bi bi-check-lg"></i> */}
                    <span>Basic Information</span>
                  </li>
                )}
                {fromEvent == -1 && (
                  <li id="stepIndicator-4" className={currStep === 4 ? "active" : currStep > 4 ? "done" : ""}>
                    <i>4</i>
                    <span>Aspirations</span>
                  </li>
                )}
              </ul>
            </div>
            {renderCurrStepData(currStep) || <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
