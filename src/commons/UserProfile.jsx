import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Tooltip } from "antd";
import AdminModal from "../user/components/common/AdminModal";
import { checkValidPhone } from "../utils/util";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ handleCancel, userDetails, submitChangeUser, generateOTPCall }) => {
  const [userProfileForm] = Form.useForm();
  const [isFullNameChange, setIsFullNameChange] = useState(false);
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [userContact, setUserContact] = useState();
  const [showError, setShowError] = useState("");
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [disableResendOtpBtn, setDisableResendOtpBtn] = useState(true);
 const navigate = useNavigate();
  useEffect(() => {
    if (userDetails && userDetails.user) {
      userProfileForm.setFieldsValue({ ...userDetails.user });
    }
  }, [userDetails]);

  const changeFullNameAndEmail = (key) => {
    submitChangeUser({
      fieldName: key,
      fieldValue: userProfileForm.getFieldValue(key),
      userId: userDetails.user.sachUserId,
    }, navigate);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const renderHeader = () => {
    return (
      <div className="sub-page-title">
        <h2>User Profile</h2>
        <span>Update and manage your account</span>
      </div>
    );
  };
  const inputNumberOnly = (evt) => {
    if (evt.keyCode !== 8 && evt.keyCode !== 189 && (evt.keyCode <= 47 || evt.keyCode >= 58)) {
      evt.stopPropagation();
      evt.preventDefault();
      return false;
    }
  };
  const sendOtp = () => {
    setShowError("");
    if (!checkValidPhone(userContact)) {
      setShowError("Please enter correct phone number");
    }

    generateOTPCall({
      crId: "crid-58634587385",
      userId: userDetails.user.sachUserId,
      userContact: `${userContact}`,
      userName: userDetails.user.userFullName,
      // userEmail: userDetails.user.userEmail,
      // password: userDetails.user.password || '',
    });
    setIsModal(false);
    setVerifyOtp(true);
  };

  const onChangeVerifyOtp = (event) => {
    if (event.target.id === "OTPChar1" || event.target.id === "OTPChar2" || event.target.id === "OTPChar3" || event.target.id === "OTPChar4") {
      const fieldIndex = event.target.id[event.target.id.length - 1];
      let fieldIntIndex = parseInt(fieldIndex, 10);
      const nextfield = document.querySelector(`input[id=OTPChar${fieldIntIndex + 1}]`);
      // If found, focus the next field
      if (nextfield !== null) {
        nextfield.focus();
      }
    }
  };
  return (
    <>
      {renderHeader()}
      <hr className="admin-hr"></hr>
      <Form form={userProfileForm} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} autoComplete="off" validateMessages={validateMessages}>
        <Row>
          <Col span={9}>
            <Form.Item label="Full Name" name="userFullName" rules={[{ required: true }]} onChange={() => setIsFullNameChange(true)}>
              <Input placeholder="Enter your name" />
            </Form.Item>
            {isFullNameChange && (
              <Tooltip placement="top" title="Save Full Name">
                <span onClick={() => changeFullNameAndEmail("userFullName")} className="confirmEdit">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                    <g id="Icons-Others=checkmark">
                      <path id="Icon" fill-rule="evenodd" clipRule="evenodd" d="M9.86326 18C9.58726 18 9.32326 17.886 9.13426 17.685L4.27126 12.506C3.89226 12.104 3.91326 11.471 4.31526 11.093C4.71826 10.715 5.35126 10.735 5.72826 11.137L9.85326 15.528L18.2613 6.32599C18.6353 5.91699 19.2673 5.88999 19.6753 6.26199C20.0823 6.63399 20.1103 7.26699 19.7383 7.67399L10.6013 17.674C10.4143 17.88 10.1483 17.998 9.87026 18H9.86326Z"></path>
                    </g>
                  </svg>
                </span>
              </Tooltip>
            )}
          </Col>
          <Col span={1}></Col>
          <Col span={8}>
            <Form.Item label="E-mail Address" name="userEmail" rules={[{ required: true, type: "email" }]} onChange={() => setIsEmailChange(true)}>
              <Input placeholder="Enter your email ID" />
            </Form.Item>

            {isEmailChange && (
              <Tooltip placement="top" title="Save Email">
                <span onClick={() => changeFullNameAndEmail("userEmail")} className="confirmEdit" data-toggle="tooltip" title="Hello">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg">
                    <g id="Icons-Others=checkmark">
                      <path id="Icon" fill-rule="evenodd" clipRule="evenodd" d="M9.86326 18C9.58726 18 9.32326 17.886 9.13426 17.685L4.27126 12.506C3.89226 12.104 3.91326 11.471 4.31526 11.093C4.71826 10.715 5.35126 10.735 5.72826 11.137L9.85326 15.528L18.2613 6.32599C18.6353 5.91699 19.2673 5.88999 19.6753 6.26199C20.0823 6.63399 20.1103 7.26699 19.7383 7.67399L10.6013 17.674C10.4143 17.88 10.1483 17.998 9.87026 18H9.86326Z"></path>
                    </g>
                  </svg>
                </span>
              </Tooltip>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={9}>
            <Form.Item label="User ID" name="sachUserId" rules={[{ required: true }]}>
              <Input placeholder="Enter your User ID" disabled={true} />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
          <Col span={8}>
            {/* <div className="sach-form">
              <a onClick={() => setIsModal(true)} data-bs-toggle="modal" data-bs-target="#changeNumber" className="form-link">
                Change Number
              </a>
            </div> */}
            <Form.Item
              label="Mobile Number"
              name="userContact"
              rules={
                [
                  // {
                  //   required: true,
                  //   max: 13,
                  //   message: "Mobile number must be 10 digits",
                  // },
                  // {
                  //   min: 10,
                  //   message: "Mobile should be atleast 10 digits",
                  // },
                  // {
                  //   pattern: "^([-]?[1-9][0-9]*|0)$",
                  //   message: "Mobile number must be a numeric value.",
                  // },
                ]
              }
            >
              <Input placeholder="Enter your mobile number" disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        {/* <Form.Item>
          <div className="mt-4">
            <button
              className="btn-sach btn-sach-linear me-3"
              onClick={handleCancel}
            >
              <span>Cancel</span>
            </button>
            <button className="btn-sach bg-sach-dark" type="submit">
              <span>Save Change</span>
            </button>
          </div>
        </Form.Item> */}
      </Form>
      {isModal && (
        <AdminModal className="w-30" centered open={true} onCancel={() => setIsModal(false)} footer={null}>
          <div className="modal-content p-0">
            <div className="modal-body pt-0">
              <div className="modal-heading text-center">
                <h1>Change Mobile Number</h1>
                <span>Please enter the following details to process further </span>
              </div>
              {showError && <div className="col-12 mt-1 error-msg">{showError}</div>}
            </div>
          </div>

          <div class="row">
            <div class="col-12 sach-form">
              <label class="form-label">
                Current Mobile Number <small>*</small>
              </label>
              <input type="text" class="form-control" id="currentMobile" value={userDetails.user.userContact} />
            </div>
            <div class="col-12 sach-form">
              <label class="form-label">
                Enter New Mobile Number <small>*</small>
              </label>
              <input type="text" class="form-control" id="newMobile" onChange={(e) => setUserContact(e.target.value)} onKeyDown={inputNumberOnly} />
            </div>
          </div>

          <div class="my-3 text-center">
            <span class="d-block my-4 m-para">We will send an OTP to new mobile number for confirmation</span>
            <a
              onClick={() => {
                sendOtp();
              }}
              data-bs-toggle="modal"
              data-bs-target="#OTPforNumberChange"
              data-bs-dismiss="modal"
              class="btn-sach bg-sach-dark justify-content-center w-100"
            >
              <span class="py-1">Send OTP</span>
            </a>
          </div>
        </AdminModal>
      )}

      {verifyOtp && (
        <AdminModal className="w-30" centered open={true} onCancel={() => setVerifyOtp(false)} footer={null}>
          <div className="modal-content p-0">
            <div className="modal-body pt-0">
              <div className="modal-heading text-center">
                <h1>Verify Account</h1>
                <span>We have sent you OTP to your register number xxxx99</span>
              </div>
              {showError && <div className="col-12 mt-1 error-msg">{showError}</div>}
            </div>

            <div className="col-md-5 col-lg-5 offset-lg-1 offset-md-1 mt-md-5 pb-md-5 mt-0 pb-0" id="step-2">
              <span className="stepNum">Step 2</span>
              <h4 className="title">Verify Account</h4>
              <p className="para">We have sent you OTP to your mobile number or register Email</p>
              <div className="row">
                <div className="col-12 sach-form sach-form-OTP">
                  <label className="form-label d-block">OTP</label>
                  <div></div>
                  <input type="text" className="form-control" maxLength="1" id="OTPChar1" onClick={(e) => onChangeVerifyOtp(e)} />
                  <input type="text" className="form-control" maxLength="1" id="OTPChar2" onClick={(e) => onChangeVerifyOtp(e)} />
                  <input type="text" className="form-control" maxLength="1" id="OTPChar3" onClick={(e) => onChangeVerifyOtp(e)} />
                  <input type="text" className="form-control" maxLength="1" id="OTPChar4" onClick={(e) => onChangeVerifyOtp(e)} />
                </div>
                <div className="col-12 mt-1 error-msg">{"Please enter correct otp"}</div>
                <div className="col-12 my-2 resendOTP">
                  <a href=" #" className={disableResendOtpBtn ? "btn-disabled text-sach" : "text-sach"}>
                    Resend OTP
                  </a>
                  <span>
                    <img src={require("../static/user/img/icons/clock.svg").default} alt="Clock" /> Ends in{" "}
                    <b id="timer-value" className="text-sach">
                      40
                    </b>{" "}
                    sec
                  </span>
                </div>
                <div className="col-12 sach-form">
                  <a href=" #" className="btn btn-sach bg-sach-dark justify-content-center w-100">
                    Verify OTP
                  </a>
                </div>

                <div
                  onClick={() => {
                    setVerifyOtp(false);
                    setIsModal(true);
                  }}
                  className="col-12 sach-form text-center"
                >
                  <b className="text-sach" role="button">
                    Change number
                  </b>
                </div>
              </div>

              <div id="verified-popup" className="accountVerified">
                <div className="accountVerified-body">
                  <img src={require("../static/user/img/icons/success-tick.svg").default} alt="Success" />
                  <h4>Account Verified</h4>
                  <p>Your account verification is successful</p>
                </div>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </>
  );
};

export default UserProfile;
