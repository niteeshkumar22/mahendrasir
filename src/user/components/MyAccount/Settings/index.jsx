import React, { useState } from "react";
import { connect } from "react-redux";
import UserProfile from "../../../../commons/UserProfile";
import ChangePassword from "../../../../commons/ChangePassword";
import { submitChangePassword, submitChangeUser } from "../../../../redux/action/admin/changPassword";
import { getCurrentUserDetails } from "../../../../utils/util";
import SachLoader from "../../../../commons/Loader";
import { generateOTPCall } from "../../../../redux/action/signup";

const Settings = ({ submitChangeUser, isLoading, generateOTPCall }) => {
  const [activeTab, setActiveTab] = useState(0);
  const userDetails = getCurrentUserDetails();

  const getActiveClass = (index) => {
    return activeTab === index ? "show active" : "";
  };

  if (isLoading) {
    return <SachLoader />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <UserProfile userDetails={userDetails} submitChangeUser={submitChangeUser} generateOTPCall={generateOTPCall} />;
      case 1:
        return <ChangePassword userId={userDetails?.user?.sachUserId} />;

      default:
        break;
    }
  };

  return (
    <div className="col-md-9">
      <div className="nav_content">
        <div className="tab-content" id="v-pills-tabContent">
          <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-tab-1" tabIndex="0">
            <div className="userSettingCont">
              <div className="settHead">Settings</div>
              <div className="settPara">Update and Manage your account settings</div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12 col-md-12">
                <div className="sach-admin-tabs">
                  <ul className="nav nav-pills" id="pills-tab-6" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link ${getActiveClass(0)}`} id="pills-tab-11" data-bs-toggle="pill" data-bs-target="#pills-11" type="button" role="tab" aria-controls="pills-11" aria-selected="true" onClick={() => setActiveTab(0)}>
                        Profile Info
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className={`nav-link ${getActiveClass(1)}`} id="pills-tab-12" data-bs-toggle="pill" data-bs-target="#pills-12" type="button" role="tab" aria-controls="pills-12" aria-selected="false" onClick={() => setActiveTab(1)}>
                        Change Password
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button className={`nav-link ${getActiveClass(2)}`} id="pills-tab-13" data-bs-toggle="pill" data-bs-target="#pills-13" type="button" role="tab" aria-controls="pills-13" aria-selected="false" onClick={() => setActiveTab(2)}>
                        Notification
                      </button>
                    </li> */}
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    <div className="p-4 pt-5">{renderActiveTab()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { ChangePasswordReducer } = state;
  const { isLoading } = ChangePasswordReducer;
  return {
    isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitChangePassword: (data, navigate) => dispatch(submitChangePassword(data, navigate)),
    submitChangeUser: (data, navigate) => dispatch(submitChangeUser(data, navigate)),
    generateOTPCall: (data) => dispatch(generateOTPCall(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
