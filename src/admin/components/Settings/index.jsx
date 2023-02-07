import { Col, Row } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import "./style.css";
import ChangePassword from "../../../commons/ChangePassword";
import UserProfile from "../../../commons/UserProfile";
import { submitChangePassword } from "../../../redux/action/admin/changPassword";
import { getCurrentUserDetails } from "../../../utils/util";

const Settings = ({ submitChangeUser }) => {
  const userDetails = getCurrentUserDetails();
  const [activeTab, setActiveTab] = useState(0);

  const getActiveClass = (index) => {
    return activeTab === index ? "active" : "";
  };
  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <UserProfile userDetails={userDetails} submitChangeUser={submitChangeUser} />;
      case 1:
        return <ChangePassword userId={userDetails?.user?.sachUserId} />;

      default:
        break;
    }
  };

  return (
    <Row style={{ height: "100vh" }}>
      <Col span={6}>
        <div className=" pt-5 px-4 sidebar-2" style={{ height: "100%" }}>
          <div className="userName-ID">
            <div className="pro-pic">
              <span>AR</span>
            </div>
           {userDetails && <div>
              <h2>{userDetails.user?.userFullName}</h2>
              <span>{userDetails.user?.sachUserId}</span>
            </div>}
          </div>

          <hr className="admin-hr" />

          <div
            className="nav nav-pills flex-column sidebar-2-tabs"
            id="v-settings-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <div className="ttl mt-0">Account &amp; Privacy</div>
            <div
              className={getActiveClass(0)}
              role="tab"
              aria-controls="settings-tab-1"
              aria-selected="true"
              onClick={() => setActiveTab(0)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.53786 12.5739C6.7292 12.1743 8.30778 12.0537 9.9335 12.0537C11.5682 12.0537 13.1474 12.1787 14.3375 12.5833C14.9358 12.7867 15.4814 13.0757 15.8828 13.4963C16.2986 13.9321 16.5335 14.4832 16.5335 15.1345C16.5335 15.7873 16.2965 16.3381 15.8783 16.7723C15.475 17.191 14.9274 17.4773 14.3285 17.6782C13.137 18.0779 11.5585 18.1987 9.9335 18.1987C8.29927 18.1987 6.72006 18.0739 5.52989 17.6694C4.93152 17.4661 4.38584 17.1772 3.98432 16.7565C3.56839 16.3206 3.3335 15.7694 3.3335 15.1179C3.3335 14.4651 3.57022 13.9142 3.98831 13.4799C4.39159 13.061 4.939 12.7747 5.53786 12.5739ZM4.88884 14.3469C4.69052 14.5529 4.5835 14.7948 4.5835 15.1179C4.5835 15.4421 4.69048 15.6859 4.88861 15.8935C5.10115 16.1162 5.44172 16.3193 5.9321 16.4859C6.91943 16.8214 8.32772 16.9487 9.9335 16.9487C11.5318 16.9487 12.9408 16.8253 13.931 16.4931C14.4229 16.3281 14.7647 16.1265 14.978 15.9051C15.1765 15.699 15.2835 15.4572 15.2835 15.1345C15.2835 14.8105 15.1766 14.5669 14.9785 14.3593C14.766 14.1366 14.4255 13.9335 13.9351 13.7668C12.9479 13.4312 11.5396 13.3037 9.9335 13.3037C8.33421 13.3037 6.9253 13.4269 5.93538 13.759C5.44362 13.9239 5.10197 14.1255 4.88884 14.3469Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.80623 2.95617C7.63343 2.13041 8.75449 1.66663 9.92331 1.66663C11.0921 1.66663 12.2132 2.13041 13.0404 2.95617C13.8676 3.78193 14.3334 4.90218 14.3354 6.071C14.3374 7.23982 13.8756 8.36169 13.0513 9.19034C12.227 10.019 11.1075 10.4867 9.93873 10.4908L9.93665 10.4908H9.90998L9.9079 10.4908C8.73909 10.4867 7.61965 10.019 6.79534 9.19034C5.97102 8.36169 5.5092 7.23982 5.51124 6.071C5.51328 4.90218 5.97902 3.78193 6.80623 2.95617ZM9.92331 2.85746C9.06996 2.85746 8.25148 3.19607 7.64754 3.79895C7.0436 4.40184 6.70356 5.21973 6.70207 6.07308C6.70058 6.92643 7.03776 7.74551 7.63959 8.3505C8.24116 8.95524 9.05802 9.29667 9.91098 9.29994H9.93565C10.7886 9.29667 11.6055 8.95524 12.207 8.3505C12.8089 7.74551 13.1461 6.92643 13.1446 6.07308C13.1431 5.21973 12.803 4.40184 12.1991 3.79895C11.5952 3.19607 10.7767 2.85746 9.92331 2.85746Z"
                ></path>
              </svg>
              <span >User Profile</span>
            </div>
            <div
              role="tab"
              aria-controls="settings-tab-2"
              aria-selected="false"
              className={getActiveClass(1)}
              onClick={() => setActiveTab(1)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.20263 2.93329C8.03248 2.11908 9.14938 1.66409 10.312 1.66664C11.4745 1.66919 12.5894 2.12907 13.4157 2.94691C14.242 3.76475 14.7133 4.87487 14.7277 6.03735L14.7278 6.04514L14.7278 7.83597C14.7278 8.18115 14.448 8.46097 14.1028 8.46097C13.7576 8.46097 13.4778 8.18115 13.4778 7.83597V6.0492C13.4664 5.21639 13.1284 4.4213 12.5364 3.83532C11.9434 3.24846 11.1434 2.91846 10.3092 2.91663C9.47498 2.9148 8.67354 3.24129 8.07806 3.82554C7.48378 4.40862 7.14228 5.20169 7.12695 6.03397V7.83597C7.12695 8.18115 6.84713 8.46097 6.50195 8.46097C6.15678 8.46097 5.87695 8.18115 5.87695 7.83597V6.01795C5.89653 4.85553 6.37278 3.7475 7.20263 2.93329Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.1185 8.40015C6.44617 8.40015 5.80139 8.66723 5.32598 9.14263C4.85058 9.61804 4.5835 10.2628 4.5835 10.9351V14.5093C4.5835 15.1816 4.85058 15.8264 5.32598 16.3018C5.80139 16.7772 6.44617 17.0443 7.1185 17.0443H13.486C13.8189 17.0443 14.1485 16.9787 14.4561 16.8513C14.7637 16.724 15.0431 16.5372 15.2785 16.3018C15.5139 16.0664 15.7006 15.787 15.828 15.4794C15.9554 15.1719 16.021 14.8422 16.021 14.5093V10.9351C16.021 10.6022 15.9554 10.2726 15.828 9.96504C15.7006 9.65748 15.5139 9.37803 15.2785 9.14263C15.0431 8.90723 14.7637 8.72051 14.4561 8.59311C14.1485 8.46572 13.8189 8.40015 13.486 8.40015H7.1185ZM4.4421 8.25875C5.15192 7.54892 6.11465 7.15015 7.1185 7.15015H13.486C13.983 7.15015 14.4752 7.24805 14.9345 7.43826C15.3937 7.62848 15.8109 7.90728 16.1624 8.25875C16.5139 8.61022 16.7927 9.02747 16.9829 9.48669C17.1731 9.94591 17.271 10.4381 17.271 10.9351V14.5093C17.271 15.0064 17.1731 15.4986 16.9829 15.9578C16.7927 16.417 16.5139 16.8342 16.1624 17.1857C15.8109 17.5372 15.3937 17.816 14.9345 18.0062C14.4752 18.1964 13.983 18.2943 13.486 18.2943H7.1185C6.11465 18.2943 5.15192 17.8955 4.4421 17.1857C3.73227 16.4759 3.3335 15.5132 3.3335 14.5093V10.9351C3.3335 9.9313 3.73227 8.96857 4.4421 8.25875Z"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.3027 11.1718C10.6479 11.1718 10.9277 11.4516 10.9277 11.7968V13.6476C10.9277 13.9928 10.6479 14.2726 10.3027 14.2726C9.95756 14.2726 9.67773 13.9928 9.67773 13.6476V11.7968C9.67773 11.4516 9.95756 11.1718 10.3027 11.1718Z"
                ></path>
              </svg>
              <span >Change Password</span>
            </div>
          </div>
        </div>
      </Col>
      <Col span={18}>
        <div className="p-4 pt-5">{renderActiveTab()}</div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitChangePassword:(data, navigate) =>dispatch(submitChangePassword(data, navigate))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
