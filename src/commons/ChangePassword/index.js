import "./style.css";
import React, { useEffect, useState } from "react";
import { submitChangePassword, resetPasswordChange } from "../../redux/action/admin/changPassword";
import { connect } from "react-redux";
import SuccessImage from "../../static/admin/img/icons/success.svg";
import SachLoader from "../Loader";
import { checkValidPassword } from "../../utils/util";
import { useNavigate } from "react-router-dom";
// import AdminModal from "../../admin/components/Common/AdminModal";

const ChangePassword = (props) => {
  const { onSubmitPasswordChange, changePasswordDetails, toggleChangePassword, userId } = props;
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    resetPasswordChange();
  }, []);

  useEffect(() => {
    if (changePasswordDetails && changePasswordDetails.isChangePasswordFailed) {
      setError(changePasswordDetails.changePasswordData ? changePasswordDetails.changePasswordData.message : "Something went wrong");
    }
  }, [changePasswordDetails]);

  const onPasswordChange = (password) => {
    setPassword(password);
    setIsPasswordEmpty(false);
    if (error) {
      setError("");
      setIsConfirmPasswordEmpty(false);
    }
  };

  const onOldPasswordChange = (password) => {
    setOldPassword(password);
    setIsPasswordEmpty(false);
    if (error) {
      setError("");
      setIsConfirmPasswordEmpty(false);
    }
  };

  const onConfirmPasswordChange = (password) => {
    setConfirmPassword(password);
    setIsConfirmPasswordEmpty(false);
    if (error) {
      setError("");
      setIsPasswordEmpty(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      onClickSubmit();
    }
  };
  const onClickSubmit = () => {
    if (password == "") {
      setIsPasswordEmpty(true);
    }
    if (confirmPassword == "") {
      setIsConfirmPasswordEmpty(true);
    }
    if (password == "" || confirmPassword == "") {
      return;
    }
    if (!checkValidPassword(password)) {
      setIsPasswordEmpty(true);
      setIsConfirmPasswordEmpty(true);
      setError("Password does not meet requirements");
      return;
    }
    if (password != confirmPassword) {
      setIsPasswordEmpty(true);
      setIsConfirmPasswordEmpty(true);
      setError("Confirm Password not same");
      return;
    }
    //toggleChangePassword();

    onSubmitPasswordChange(
      {
        oldPassword,
        fieldName: "userPassword",
        fieldValue: password,
        userId: userId,
      },
      navigate
    );
  };

  if (changePasswordDetails?.isLoading) {
    return <SachLoader />;
  }

  return (
    <>
      {
        <div>
          <div className="sub-page-title">
            <h2>Change Password</h2>
            <span>Please enter the following details to process further </span>
          </div>
          <hr className="admin-hr" />
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="row">
                <div className="col-lg-12 col-md-12 sach-form">
                  <label className="form-label">
                    Enter Old Password <small>*</small>
                  </label>
                  <input type={showPass ? "text" : "password"} className={`form-control ${changePasswordDetails?.isChangePasswordFailed || isPasswordEmpty ? "invalid" : ""}`} id="oldPassword" onChange={(event) => onOldPasswordChange(event.target.value)} />
                </div>
                <div className="col-lg-12 col-md-12 sach-form">
                  <label className="form-label">
                    Enter New Password <small>*</small>
                  </label>
                  <input type={showPass ? "text" : "password"} className={`form-control ${changePasswordDetails?.isChangePasswordFailed || isPasswordEmpty ? "invalid" : ""}`} id="password" onChange={(event) => onPasswordChange(event.target.value)} />
                  <div className="passToggle">{showPass ? <i onClick={() => setShowPass(!showPass)} className="bi bi-eye"></i> : <i onClick={() => setShowPass(!showPass)} className="bi bi-eye-slash"></i>}</div>
                </div>
                <div className="col-lg-12 col-md-12 sach-form">
                  <label className="form-label">
                    Re-Enter New Password <small>*</small>
                  </label>
                  <input type={showConfirmPass ? "text" : "password"} className={`form-control ${changePasswordDetails?.isChangePasswordFailed || isConfirmPasswordEmpty ? "invalid" : ""}`} id="renewpassword" onChange={(event) => onConfirmPasswordChange(event.target.value)} onKeyDown={(event) => handleKeyDown(event)} />
                  <div className="passToggle">{showConfirmPass ? <i onClick={() => setShowConfirmPass(!showConfirmPass)} className="bi bi-eye"></i> : <i onClick={() => setShowConfirmPass(!showConfirmPass)} className="bi bi-eye-slash"></i>}</div>
                </div>
                {error && <div className="col-12 mt-1 error-msg">{error}</div>}
                <div className="col-lg-12 my-3 pb-3 border-bottom">
                  <div className="h4 pass-title">Password requirements:</div>
                  <div className="h5 pass-sub-title">Ensure that these requirements are met:</div>
                  <ul className="pass-instructions">
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase character</li>
                    <li>At least one uppercase character</li>
                    <li>At least one number</li>
                    <li>At least one symbol, whitespace,or special character</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12">
              {/* <a href="javascript:void(0);" onClick={handleShow} className="btn-sach btn-sach-linear btn-sm me-3">
                <span>Launch</span>
              </a> */}
              <a href="javascript:void(0);" onClick={() => onClickSubmit()} className="btn btn-sach bg-sach-dark btn-sm">
                <span>Change Password</span>
              </a>
            </div>
          </div>
        </div>
      }
      {/* {changePasswordDetails?.popUpShow && (
        <AdminModal onCancel={() => closeSuccessModal()}>
          <div>
            <div className="px-md-5 text-center mt-5">
              <img src={SuccessImage} alt="Successfully" />

              <div className="modal-heading text-center my-4">
                <h2>Password Successfully Changed!</h2>
              </div>

              <div className="my-3 text-center">
                <a
                  onClick={() => closeSuccessModal()}
                  className="btn-sach btn-sach-linear justify-content-center w-100"
                >
                  <span>Close</span>
                </a>
              </div>
            </div>
          </div>
        </AdminModal>
      )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
    changePasswordDetails: state?.ChangePasswordReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitPasswordChange: (data, navigate) => dispatch(submitChangePassword(data, navigate)),
    resetPasswordChange: () => dispatch(resetPasswordChange()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
