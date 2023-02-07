import React, { useEffect, useState } from "react";
import { SearchIcon, AddIcon, EmptyTableIcon } from "../../../../admin/icons";
import { connect } from "react-redux";
import SachLoader from "../../../../commons/Loader";
import SuccessImage from "../../../../static/admin/img/icons/success.svg";

import { getEventMgmtData, getTabsData, handleCreateEvent, handleGenerateEvent, resetKey, setActiveTab } from "../../../../redux/action/admin/eventMgmt";
import { registerEventCall, toggleRegisterPopUp } from "../../../../redux/action/user/events";
import { showPopup } from "../../../../redux/action/common";
import useTableFilter from "../../../../admin/components/hooks/useTableFilter";
import TableTabs from "../../../../admin/components/Common/TableTabs";

import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import AdminModal from "../../common/AdminModal";
import UserAccountPagination from "../../common/UserAccountPagination";
import DeclineModal from "./modals/DeclineModal";
import ViewTicketModal from "./modals/ViewTicketModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyEvents = ({ getEventMgmtData, isLoading, start, tabsData, tableData, activeTab, setActiveTab, getTabsData, showPopup, registerEventCall, toggleRegisterPopUp, eventsData }) => {
  const [show, setShow] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [chooseItem, setChooseItem] = useState();
  const [isToggle, setIsToggle] = useState({});
  const [isShowViewTicket, setShowViewTicket] = useState({});

  const { searchText, filteredData, onSearchChange } = useTableFilter({
    searchKeys: ["title"],
    tableData,
  });

  const handleCancel = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getTabsData({ wishOrRegister: "register" });
  }, []);

  const toggleDetails = (item, i) => {
    if (isToggle[i] === true) {
      isToggle[i] = false;
    } else {
      isToggle[i] = true;
    }
    setIsToggle({ ...isToggle });
  };

  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };
  let navigate = useNavigate();

  const handleRegisterClick = (eventInfo) => {
    const data = {
      eventId: eventInfo?.eventId,
      userId: eventInfo?.userId,
      type: "register",
      value: false,
      page: "userProfile",
    };
    registerEventCall(data, navigate);
    getTabsData({ wishOrRegister: "register" });
  };
  const handleWatchClick = (eventInfo) => {
    const data = {
      eventId: eventInfo?.eventId,
      userId: eventInfo?.userId,
      type: "watch",
      value: !eventInfo?.watchType,
      page: "userProfile",
    };
    registerEventCall(data, navigate);
    getTabsData({ wishOrRegister: "register" });
  };

  const onClickShareEvent = (eventInfo) => {
    console.log(eventInfo);
    showPopup("shareEvent", { shareLink: eventInfo?.shareLink });
  };

  const onClickShowTicket = (data) => {
    setChooseItem(data);
    setShowTicket(true);
  };
  if (isLoading) {
    return <SachLoader />;
  }

  const handleClickDecline = (item) => {
    setChooseItem(item);
    setShow(true);
  };

  return (
    <>
      <div className="col-md-9">
        <ToastContainer />
        {eventsData?.popUpShow && (
          <AdminModal onCancel={toggleRegisterPopUp}>
            <div>
              <div className="px-md-5 text-center mt-5">
                <img src={SuccessImage} alt="Successfully" />
                <div className="modal-heading text-center my-4">
                  <h2>Event registration declined!</h2>
                </div>

                <div className="my-3 text-center">
                  <a
                    onClick={() => {
                      toggleRegisterPopUp();
                    }}
                    className="btn-sach btn-sach-linear  w-40"
                  >
                    <span>Check Details</span>
                  </a>
                  <a onClick={toggleRegisterPopUp} className="btn-sach btn-sach-linear justify-content-center w-40">
                    <span>Discard</span>
                  </a>
                </div>
              </div>
            </div>
          </AdminModal>
        )}
        <div className="nav_content">
          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-tab-1" tabindex="0">
              <div className="userSettingCont">
                <div className="settHead">My Events</div>
                <div className="settPara">In publishing and graphic design, Lorem ipsum is a placeholder text commonly</div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-12 col-md-12">
                  <div className="sach-admin-tabs">
                    {tabsData && tabsData.length > 0 && (
                      <TableTabs
                        activeTab={activeTab}
                        tabsData={tabsData}
                        onTabClick={(val) => {
                          setActiveTab(val);
                          getEventMgmtData({ type: val, wishOrRegister: "register" });
                        }}
                      />
                    )}
                    <div className="tab-content" id="pills-tabContent">
                      {tableData?.map((item, i) => {
                        return (
                          <div className="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-tab-1">
                            <div className="my_event">
                              {!item?.isPast && (
                                <div className="like_share">
                                  <span
                                    onClick={() => {
                                      handleWatchClick(item);
                                    }}
                                  >
                                    <img src={item?.watchType ? require("../../../../static/user/img/icons/heart-fill-o.svg").default : require("../../../../static/user/img/icons/heart-o-orange.svg").default} />
                                  </span>
                                  <span
                                    data-bs-toggle="modal"
                                    data-bs-target="#shareEvent"
                                    onClick={() => {
                                      onClickShareEvent(item);
                                    }}
                                  >
                                    <img src={require("../../../../static/user/img/icons/share.svg").default} alt="Share" />
                                  </span>
                                </div>
                              )}
                              <div className="my_event_dt">
                                <span>{item?.month}</span>
                                <b>{item?.day}</b>
                              </div>
                              <div className="event-data-wrp">
                                <ul className="sach-inline-pills">
                                  {item.tags?.map((eachtag) => {
                                    return (
                                      <li>
                                        <a href="#" className="custom-sach-pills">
                                          {eachtag}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <h2>{item.title}</h2>
                                <ul className="event_features">
                                  <li>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.2083 3.125C8.80738 3.125 7.4379 3.54043 6.27305 4.31876C5.1082 5.09708 4.20031 6.20335 3.66419 7.49766C3.12807 8.79197 2.9878 10.2162 3.26111 11.5902C3.53442 12.9643 4.20904 14.2264 5.19966 15.217C6.19029 16.2076 7.45241 16.8822 8.82645 17.1556C10.2005 17.4289 11.6247 17.2886 12.919 16.7525C14.2133 16.2164 15.3196 15.3085 16.0979 14.1436C16.8762 12.9788 17.2917 11.6093 17.2917 10.2083C17.2917 8.32972 16.5454 6.52804 15.217 5.19966C13.8886 3.87128 12.087 3.125 10.2083 3.125ZM5.57858 3.27942C6.94899 2.36374 8.56016 1.875 10.2083 1.875C12.4185 1.875 14.5381 2.75297 16.1009 4.31578C17.6637 5.87858 18.5417 7.9982 18.5417 10.2083C18.5417 11.8565 18.0529 13.4677 17.1372 14.8381C16.2216 16.2085 14.9201 17.2766 13.3974 17.9073C11.8746 18.5381 10.1991 18.7031 8.58258 18.3815C6.96608 18.06 5.48122 17.2663 4.31578 16.1009C3.15034 14.9355 2.35667 13.4506 2.03513 11.8341C1.71358 10.2176 1.87861 8.54202 2.50934 7.0193C3.14007 5.49659 4.20818 4.1951 5.57858 3.27942Z"
                                        fill="#EE6C4D"
                                      />
                                      <path fillRule="evenodd" clipRule="evenodd" d="M9.92578 6.12109C10.271 6.12109 10.5508 6.40092 10.5508 6.74609V10.4307L13.3881 12.1263C13.6844 12.3033 13.781 12.6871 13.6039 12.9834C13.4269 13.2797 13.0431 13.3763 12.7468 13.1993L9.60516 11.3218C9.41638 11.2089 9.30078 11.0052 9.30078 10.7853V6.74609C9.30078 6.40092 9.5806 6.12109 9.92578 6.12109Z" fill="#EE6C4D" />
                                    </svg>
                                    <span>
                                      {item.startTime} - {item.endTime} {item.timeZone}
                                    </span>
                                  </li>
                                  <li>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2.5 5.83203H17.5" stroke="#EE6C4D" strokeWidth="1.5" strokeLinecap="round" />
                                      <path d="M5 10H15" stroke="#EE6C4D" strokeWidth="1.5" strokeLinecap="round" />
                                      <path d="M8.33398 14.168H11.6673" stroke="#EE6C4D" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <span>{item.mode}</span>
                                  </li>
                                  <li>
                                    <div className="hosted_by">
                                      <img src={item?.authorImg || require("../../../../static/user/img/user-image.png").default} />
                                      <span>by</span>
                                      <b>{item.author}</b>
                                    </div>
                                  </li>
                                </ul>
                                {isToggle[i] && (
                                  <div class="viewDtls_wrp">
                                    <div class="viewDtls">
                                      <span>Attendees</span>
                                      <div class="_attendees">
                                        <img src={require("../../../../static/user/img/user-image-2.png").default} alt="user" />
                                        <img src={require("../../../../static/user/img/user-image-3.png").default} alt="user" />
                                        <img src={require("../../../../static/user/img/user-image-2.png").default} alt="user" />
                                        <img src={require("../../../../static/user/img/user-image-3.png").default} alt="user" />
                                        <span>{item?.eventGuide?.attendeesCount || 0}</span>
                                      </div>
                                    </div>
                                    {item?.mode === "Offline" && (
                                      <div class="viewDtls">
                                        <span>Location</span>
                                        <b>{item?.address}</b>
                                      </div>
                                    )}
                                    <div class="viewDtls">
                                      <span>Language</span>
                                      <b>{item?.eventGuide?.language?.length >= 0 && item?.eventGuide?.language?.join(", ")}</b>
                                    </div>
                                    <div class="viewDtls">
                                      <span>Speaker Name</span>
                                      <b>{item?.author}</b>
                                    </div>

                                    <div class="direction">
                                      <a href="#" class="direction_btn"></a>
                                    </div>
                                  </div>
                                )}
                                {item.isPast && (
                                  <div className="btn_wrp">
                                    {item.mode === "Offline" && (
                                      <a onClick={() => onClickShowTicket(item)} className="btn btn-sach bg-sach-dark">
                                        View Ticket
                                      </a>
                                    )}
                                    <a href="#" className="btn btn-sach bg-sach attended">
                                      Attended
                                    </a>
                                    <a onClick={() => toggleDetails(item, i)} className="btn btn-sach btn-sach-linear">
                                      {isToggle[i] ? "Hide Details" : "View Details"}
                                    </a>
                                  </div>
                                )}
                                {!item.isPast && (
                                  <div className="btn_wrp">
                                    {item.mode === "Offline" && (
                                      <a onClick={() => onClickShowTicket(item)} className="btn btn-sach bg-sach-dark">
                                        View Ticket
                                      </a>
                                    )}
                                    <a href={item?.link} target="_blank" className={item?.link ? "btn btn-sach bg-sach-dark" : "btn btn-sach bg-sach attended"}>
                                      Attend
                                    </a>
                                    <a onClick={() => toggleDetails(item, i)} className="btn btn-sach btn-sach-linear">
                                      {isToggle[i] ? "Hide Details" : "View Details"}
                                    </a>
                                    {item.mode === "Online" && (
                                      <a href="#" className="btn btn-sach btn-sach-linear" data-bs-toggle="modal" onClick={(e) => handleClickDecline(item)} data-bs-target="#Decline">
                                        Decline
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <UserAccountPagination
                start={start || 0}
                total={getCountTotalofRows()}
                handlePaginationOnChange={(size) => {
                  getEventMgmtData({ size, start: size, type: activeTab, wishOrRegister: "register" });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {show && <DeclineModal handleCancel={() => setShow(false)} handleRegisterClick={handleRegisterClick} chooseItem={chooseItem} />}
      {showTicket && <ViewTicketModal handleCancel={() => setShowTicket(false)} chooseItem={chooseItem} onClickShareEvent={onClickShareEvent} />}
      {/* {isShowViewTicket && <AdminModal>
     
        <div class="modal-body">
          <img src={Logo} alt="logo" class="img-fluid w-100" />
          <div class="ticket-wrp">
            <ul class="ticket-pill">
              <li><span>Ageing</span></li>
              <li><span>Sickness</span></li>
            </ul>
            <div class="event-head">Mental health:The problem of loneliness and social media's role</div>
            <ul class="event-info justify-content-between">
              <li>
                <img src="img/icons/calendar-o.svg" alt="event-ico" />
                <b>Mon, 25 May</b>
              </li>
              <li>
                <img src="img/icons/clock-o.svg" alt="event-ico" />
                <b>02:00 PM- 4:30 PM IST</b>
              </li>
              <li>
                <img src="img/icons/location-o.svg" alt="event-ico" />
                <b>FC-16 Sector 16 (Flim City) Noida</b>
              </li>
            </ul>
            <span class="evntInfoTTL">Hosted by:</span>
            <div class="eventHost">
              <img src="img/user-image.png" />
              <span>Dr. Subhash Chandra</span>
            </div>
            <div class="attendeeInfo">
              <span class="evntInfoTTL">Attendee Info:</span>
              <ul class="event-info py-0">
                <li>
                  <img src="img/icons/user-o.svg" alt="event-ico" />
                  <b>Harpreet Kaur</b>
                </li>
                <li>
                  <img src="img/icons/call-o.svg" alt="event-ico" />
                  <b>9900999000</b>
                </li>
              </ul>
            </div>

            <div class="row mt-4">
              <div class="col-md-6">
                <a href="javascript:void(0);" class="btn btn-sach btn-sach-linear justify-content-center w-100">Share</a>
              </div>
              <div class="col-md-6">
                <a href="javascript:void(0);" class="btn btn-sach bg-sach justify-content-center w-100">Download</a>
              </div>
            </div>

          </div>
        </div>
      </AdminModal> */}
      {/* }  */}
    </>
  );
};

const mapStateToProps = (state) => {
  const { EventMgmtReducer, CommonReducer, EventReducer } = state;
  const { eventsData } = EventReducer;
  const { isLoading, tabsData, tableData, activeTab, start } = EventMgmtReducer;

  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    eventsData,
    roleInfo: CommonReducer?.adminInfo?.menu?.event_mgmt || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: (data) => dispatch(getTabsData(data)),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getEventMgmtData: (data) => dispatch(getEventMgmtData(data)),
    resetKey: (data) => dispatch(resetKey(data)),
    handleCreateEvent: (data) => dispatch(handleCreateEvent(data)),
    handleGenerateEvent: (data) => dispatch(handleGenerateEvent(data)),
    registerEventCall: (data, navigate) => dispatch(registerEventCall(data, navigate)),
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    toggleRegisterPopUp: (data) => dispatch(toggleRegisterPopUp(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
