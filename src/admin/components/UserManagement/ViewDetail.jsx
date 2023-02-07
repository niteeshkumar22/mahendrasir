import { Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import UserIdIcon from "../../icons/userID.svg";
import PhoneIcon from "../../icons/phone-call.svg";
import EmailIcon from "../../icons/email.svg";
import LockIcon from "../../icons/lock.svg";
import CheckIcon from "../../icons/checkmark-circle.svg";
import GenderIcon from "../../icons/gender.svg";
import LeftArrowIcon from "../../icons/left-arrow.svg";
import { AvatarIcon, EmptyTableIcon } from "../../icons";
import SachLoader from "../../../commons/Loader";
import ChangePassword from "../../../commons/ChangePassword";
import { connect } from "react-redux";
import { getViewDetail } from "../../../redux/action/admin/userMgmt";
import { AdminRoutes } from "../../../routes";
import { useNavigate } from "react-router-dom";

const ViewDetail = ({
  isLoading,
  handleCancel,
  getViewDetail,
  viewDetail = {},
}) => {
  let navigate = useNavigate();

  const { username, sachUserId, userContact, userEmail, gender, status, tabs } =
    viewDetail;

  const [activeTab, setActiveTab] = useState(
    tabs && tabs.length > 0 ? tabs[0].id : ""
  );
  const [showChangePass, setShowChangePass] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsObj = Object.fromEntries(params);
    getViewDetail(paramsObj);
  }, []);

  if (isLoading) {
    return <SachLoader />;
  }
  const toggleChangePassword = () => setShowChangePass(!showChangePass);
  const tabsData = tabs && tabs.filter((tab) => tab.id === activeTab);
  return (
    <div>
      <header className="container-fluid page-header">
        <div>
          <a
            className="back-btn"
            onClick={() => {
              navigate(`${AdminRoutes.USER_MANAGEMENT}`);
            }}
          >
            <img src={LeftArrowIcon} alt="Left-Arrow" />
            <span>Back to list</span>
          </a>
        </div>
      </header>
      <div className="container-fluid">
        <Row>
          <Col xs={24} sm={24} xl={7}>
            <div className="profile-details">
              <div className="profiel-pic">
                <div className="p-pic">
                  {/* <span>HA</span> */}
                  <img src={AvatarIcon} alt="Profile Picture" />
                </div>
                <h2>{username}</h2>
                <a>{userEmail}</a>
              </div>
              <div className="basic-info">
                <h3>Basic Information</h3>
                <ul>
                  <li>
                    <img src={UserIdIcon} alt="icon" />
                    <span>User ID</span>
                    <b>{sachUserId}</b>
                  </li>
                  <li>
                    <img src={EmailIcon} alt="icon" />
                    <span>Email Address</span>
                    <b>{userEmail}</b>
                  </li>
                  <li>
                    <img src={PhoneIcon} alt="icon" />
                    <span>Mobile Number</span>
                    <b>{userContact}</b>
                  </li>
                  <li>
                    <img src={GenderIcon} alt="icon" />
                    <span>Gender</span>
                    <b>Male</b>
                  </li>
                  <li>
                    <img src={LockIcon} alt="icon" />
                    <span>Password</span>
                    <a
                      href="javascript:void(0);"
                      onClick={() => setShowChangePass(true)}
                    >
                      Change
                    </a>
                    <b>xxxx-xxxx-xxxx</b>
                  </li>
                  <li>
                    <img src={CheckIcon} alt="icon" />
                    <span>Status</span>
                    <b>
                      <span
                        className={`status-btn _${
                          status && status.toLowerCase()
                        }`}
                      >
                        {status}
                      </span>
                    </b>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col span={1} xs={0} sm={0} xl={0}></Col>
          <Col xs={24} sm={24} xl={16}>
            {tabs && tabs.length > 0 && !showChangePass && (
              <div className="sach-admin-tabs b-bottom">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  {tabs.map((tab, i) => (
                    <li
                      key={`pills-${i}`}
                      className="nav-item"
                      role="presentation"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <button
                        className={`nav-link ${
                          tab.id === activeTab ? "active" : ""
                        }`}
                        id={`pills-${i}`}
                        type="button"
                        role="tab"
                        aria-controls={`pills-${i}`}
                        aria-selected="true"
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>

                {tabsData && tabsData.length > 0 && (
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-1"
                      role="tabpanel"
                      aria-labelledby="pills-tab-1"
                    >
                      <div className="profile-data-wrap">
                        {tabsData[0].data &&
                          tabsData[0].data.map((item, pIdx) => (
                            <div
                              key={`profileData-${pIdx}`}
                              className="profile-data"
                            >
                              <h4>{item.title}</h4>
                              <p>{item.subTitle}</p>
                              {item.optionData && item.optionData.length > 0 && (
                                <ul className="sach-pills">
                                  {item.optionData.map((opt, idx) => (
                                    <li key={`optList-${idx}`}>
                                      <span>{opt.value}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        {!tabsData[0].data && (
                          <div className="empty-table">
                            <img src={EmptyTableIcon} alt="No Data Found" />
                            <h3>No data found</h3>
                            <p>Lorem ipsum is a placeholder text commonly.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {showChangePass && (
              <div className="container-fluid">
                <ChangePassword
                  toggleChangePassword={toggleChangePassword}
                  userId={sachUserId}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { UserMgmtReducer } = state;
  const { viewDetail } = UserMgmtReducer;
  UserMgmtReducer;
  return {
    viewDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getViewDetail: (data) => dispatch(getViewDetail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail);
