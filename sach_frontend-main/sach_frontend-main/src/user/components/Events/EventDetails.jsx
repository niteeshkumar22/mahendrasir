import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SachLoader from "../../../commons/Loader";
import { showPopup } from "../../../redux/action/common";
import SuccessImage from "../../../static/admin/img/icons/success.svg";
import calendarIcon from "../../../static/user/img/icons/calendar-o.svg";
import clockIcon from "../../../static/user/img/icons/clock-o.svg";
import listIcon from "../../../static/user/img/icons/digital.svg";

import {
  fetchEventDetailsCall,
  registerEventCall,
  resetEventData,
  toggleRegisterPopUp,
} from "../../../redux/action/user/events";
import { countdownTimeStart, parseHtml } from "../../../utils/util";
import AdminModal from "../common/AdminModal";
import "./style.css";

const EventDetails = (props) => {
  const {
    fetchEventDetailsCall,
    eventsData,
    registerEventCall,
    showPopup,
    toggleRegisterPopUp,
  } = props;
  let navigate = useNavigate();
  let eventInfo = eventsData?.eventInfo;
  const location = useLocation();
  const [cl, setCl] = useState("1");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsObj = Object.fromEntries(params);
    setCl(paramsObj.cl);
    fetchEventDetailsCall(paramsObj);
    return () => resetEventData();
  }, []);

  useEffect(() => {
    let timerId = 0;
    if (eventsData?.eventInfo?.dateInterval) {
      timerId = countdownTimeStart(`${eventsData?.eventInfo?.dateInterval}`);
    }
    return () => clearInterval(timerId);
  }, eventsData?.eventInfo?.dateInterval);

  const handleRegisterClick = () => {
    const data = {
      eventId: eventInfo?.eventId,
      userId: eventInfo?.userId,
      type: "register",
      value: !eventInfo?.registerType,
    };
    registerEventCall(data, navigate);
  };
  const handleWatchClick = () => {
    const data = {
      eventId: eventInfo?.eventId,
      userId: eventInfo?.userId,
      type: "watch",
      value: !eventInfo?.watchType,
    };
    registerEventCall(data, navigate);
  };

  const onClickShareEvent = () => {
    showPopup("shareEvent", { shareLink: eventInfo?.shareLink });
  };
  if (eventsData?.isLoading) {
    return <SachLoader />;
  }
  const customStyle = {
    background: eventInfo?.bgColor,
  };
  return (
    <>
      <section className={"event-inner-hero bg_" + cl}>
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <nav className="sach-breadcrumb" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/user/events">Events</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    {eventInfo?.eventType || "Happining Now"}
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-8">
              <div className="inner-hero-content">
                <h5>
                  {parseHtml(eventInfo?.date)},{" "}
                  {parseHtml(eventInfo?.startTime)}-{" "}
                  {parseHtml(eventInfo?.endTime)}{" "}
                  {parseHtml(eventInfo?.timeZone)}
                </h5>
                <h1>{parseHtml(eventInfo?.title)}</h1>
                <ul className="sach-inline-pills">
                  {eventInfo?.tags?.length > 0 &&
                    eventInfo?.tags.map((eachTag) => {
                      return (
                        <li>
                          <a href="#" className="custom-sach-pills">
                            {parseHtml(eachTag)}
                          </a>
                        </li>
                      );
                    })}
                </ul>
                <div className="duration-title">Starting in</div>
                <div className="duration-container">
                  <div className="duration">
                    <h4 id="event-days"></h4>
                    <h6>Days</h6>
                  </div>
                  <div className="duration">
                    <h4 id="event-hours"></h4>
                    <h6>HRS</h6>
                  </div>
                  <div className="duration">
                    <h4 id="event-mins"></h4>
                    <h6>Min</h6>
                  </div>
                  <div className="duration">
                    <h4 id="event-secs"></h4>
                    <h6>Sec</h6>
                  </div>
                </div>
                <span
                  className="btn btn-sach me-md-2 me-1 register-btn"
                  onClick={handleRegisterClick}
                >
                  {eventInfo?.registerType ? "Decline" : "Register Now"}
                </span>
                <span
                  className="btn btn-sach-2 mx-md-2 mx-1"
                  onClick={onClickShareEvent}
                >
                  <img
                    src={
                      require("../../../static/user/img/icons/share-orange.svg")
                        .default
                    }
                    alt='icon'
                  />
                  Share Event
                </span>
                <span
                  className="btn btn-sach-2 mx-md-2 mx-1 my-2 my-md-0"
                  onClick={handleWatchClick}
                >
                  <img
                    src={
                      eventInfo?.watchType
                        ? require("../../../static/user/img/icons/heart-fill-o.svg")
                            .default
                        : require("../../../static/user/img/icons/heart-o-orange.svg")
                            .default
                    }
                    alt='icon'
                  />
                  Watchlist
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="event_inner_typ">
              {eventInfo?.icon && (
                <img
                  src={
                    eventInfo?.icon ||
                    require("../../../static/user/img/events/thumbnail.png")
                      .default
                  }
                  className="img-fluid mb-4"
                  alt="thumbnail"
                />
              )}
              {eventInfo?.body?.text?.length > 0 &&
                eventInfo?.body?.text?.map((text) => {
                  return <p>{parseHtml(text)}</p>;
                })}
              {/* <p>Social media capitalizes on isolation by "separating" us from friends, then making us want to check on what these friends are doing. Connecting on social media creates more disconnection. Being on social media actually isolates us from our real-life networks.When people look online and see they're excluded from an activity, it can affect thoughts and feelings, and can affect them physically. A 2018 British study tied social media use to decreased, disrupted, and delayed sleep, which is associated with depression, memory loss, and poor academic performance.</p>
              <p>In this event we will discuss and talk about how we can become self-aware and don't mislead our life through social media and take in the positive way.</p> */}
              {eventInfo?.protocols?.text.length > 0 && (
                <div>
                  <div className="h2">
                    {parseHtml(eventInfo?.protocols?.title)}
                  </div>
                  {eventInfo?.protocols?.text.map((txt) => {
                    return <p>{parseHtml(txt)}</p>;
                  })}
                </div>
              )}

              {/* <p>To attend the event, please RSVP via this registration page.</p>
              <p>To gain access to the building, all attendees must sign-in upon arrival, sign an NDA, and provide proof of full vaccination and booster status</p> */}
              <div className="event_speaker">
                <img
                  src={
                    eventInfo?.speakerDetails?.icon ||
                    require("../../../static/user/img/Dr.SubhashChandra.png")
                      .default
                  }
                  alt="Speaker"
                />
                <div className="speaker_details">
                  <i>Speaker</i>
                  <h2>{eventInfo?.speakerDetails?.name}</h2>
                  <span>{eventInfo?.speakerDetails?.designation}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="event-sidebar">
              <div className="sidebar-container">
                <h2 className="title">Event guide 🚀</h2>
                <ul className="event-list">
                  <li>
                    <img
                      src={
                        require("../../../static/user/img/icons/attendees.svg")
                          .default
                      }
                      alt="Event Icon"
                    />
                    <span>Attendees</span>
                    <b>
                      <img
                        src={
                          require("../../../static/user/img/user-image-2.png")
                            .default
                        }
                        alt="Attendees"
                      />
                      <img
                        src={
                          require("../../../static/user/img/user-image-3.png")
                            .default
                        }
                        alt="Attendees"
                      />
                      <img
                        src={
                          require("../../../static/user/img/user-image-2.png")
                            .default
                        }
                        alt="Attendees"
                      />
                      <img
                        src={
                          require("../../../static/user/img/user-image-3.png")
                            .default
                        }
                        alt="Attendees"
                      />
                      <i>+{eventInfo?.eventGuide?.attendeesCount}</i>
                    </b>
                  </li>
                  <li>
                    <img
                      src={
                        require("../../../static/user/img/icons/digital.svg")
                          .default
                      }
                      alt="Event Icon"
                    />
                    <span>Digital Event</span>
                    <b>{eventInfo?.eventGuide?.eventMode} ✨</b>
                  </li>
                  <li>
                    <img
                      src={
                        require("../../../static/user/img/icons/calendar-o.svg")
                          .default
                      }
                      alt="Event Icon"
                    />
                    <span>Event Date</span>
                    <b>
                      {parseHtml(eventInfo?.date)},{" "}
                      {parseHtml(eventInfo?.startTime)}-{" "}
                      {parseHtml(eventInfo?.endTime)}{" "}
                      {parseHtml(eventInfo?.timeZone)}
                    </b>
                  </li>
                  <li>
                    <img
                      src={
                        require("../../../static/user/img/icons/language.svg")
                          .default
                      }
                      alt="Event Icon"
                    />
                    <span>Language</span>
                    {eventInfo?.eventGuide?.language?.map((txt) => {
                      return <b>{txt}</b>;
                    })}
                  </li>
                  {eventInfo?.address && (
                    <li>
                      <img
                        src={
                          require("../../../static/user/img/icons/language.svg")
                            .default
                        }
                        alt="Event Icon"
                      />
                      <span>Address</span>
                      <b>{eventInfo?.address} ✨</b>
                    </li>
                  )}
                </ul>
                <div className="event_share_icons">
                  <div
                    className="share-ico cursorPointer"
                    onClick={onClickShareEvent}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18 15.0005C17.183 15.0005 16.443 15.3305 15.901 15.8615L7.966 12.3355C7.979 12.2245 8 12.1145 8 12.0005C8 11.8865 7.979 11.7765 7.966 11.6655L15.901 8.13949C16.443 8.67049 17.183 9.00049 18 9.00049C19.654 9.00049 21 7.65449 21 6.00049C21 4.34649 19.654 3.00049 18 3.00049C16.346 3.00049 15 4.34649 15 6.00049C15 6.11449 15.021 6.22449 15.034 6.33549L7.099 9.86149C6.557 9.33049 5.817 9.00049 5 9.00049C3.346 9.00049 2 10.3465 2 12.0005C2 13.6545 3.346 15.0005 5 15.0005C5.817 15.0005 6.557 14.6705 7.099 14.1395L15.034 17.6655C15.021 17.7765 15 17.8865 15 18.0005C15 19.6545 16.346 21.0005 18 21.0005C19.654 21.0005 21 19.6545 21 18.0005C21 16.3465 19.654 15.0005 18 15.0005Z"
                      />
                    </svg>
                    <span>Share</span>
                  </div>
                  <div className="share-ico" onClick={handleWatchClick}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Icons-Others=Heart-Outline">
                        <path
                          id="Icon"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.21968 6C6.35568 6 5.54568 6.334 4.93968 6.941C3.68168 8.201 3.68168 10.252 4.94068 11.514L11.9997 18.585L19.0597 11.514C20.3187 10.252 20.3187 8.201 19.0597 6.941C17.8477 5.726 15.7117 5.728 14.4997 6.941L12.7077 8.736C12.3317 9.113 11.6677 9.113 11.2917 8.736L9.49968 6.94C8.89368 6.334 8.08468 6 7.21968 6ZM11.9997 21C11.7347 21 11.4797 20.895 11.2927 20.706L3.52468 12.926C1.48868 10.886 1.48868 7.567 3.52468 5.527C4.50868 4.543 5.82068 4 7.21968 4C8.61868 4 9.93168 4.543 10.9147 5.527L11.9997 6.614L13.0847 5.528C14.0687 4.543 15.3807 4 16.7807 4C18.1787 4 19.4917 4.543 20.4747 5.527C22.5117 7.567 22.5117 10.886 20.4757 12.926L12.7077 20.707C12.5197 20.895 12.2657 21 11.9997 21Z"
                        />
                      </g>
                    </svg>
                    <span>
                      {eventInfo?.watchType ? "Remove From List" : "Watchlist"}
                    </span>
                  </div>
                </div>
                <span
                  className="btn btn-sach me-2 register-btn"
                  onClick={handleRegisterClick}
                >
                  {eventInfo?.registerType ? "Decline" : "Register Now"}
                </span>
                {/* <a href="#" className="btn btn-sach btn-sach-linear theme-orange">
                  <img src={require("../../../static/user/img/icons/calendar-o.svg").default} alt="calender" className="me-2" />
                  <span>Add To Calendar</span>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {eventsData?.popUpShow && (  
        <AdminModal onCancel={toggleRegisterPopUp} className='modalT2'>
           <div className="modal-content p-0">
        <div className="modal-body pt-0">
          <div className="modal-heading text-center">
            <img src={SuccessImage} alt="success" />

            {eventInfo?.registerType && (
              <>
                  <h1 className="py-2">Thanks for Registration!</h1>
                  <span>We'll send you event updates and notify you when it starts</span>
                  </>
              )}
              {!eventInfo?.registerType && (
                <>
                  <h1 className="py-2">Event Removed from your List!</h1>
                  <span>We'll send you event updates and notify you when it starts</span>
                  </>
              )}
          </div>
            <ul className="modal-icoList">
              <li>
                <img src={calendarIcon} alt="icon" />
                <span> {parseHtml(eventInfo?.dayName)}, {parseHtml(eventInfo?.date)}</span>
              </li>
              <li>
                <img src={clockIcon} alt="icon" />
                <span> {parseHtml(eventInfo?.startTime)} - {parseHtml(eventInfo?.endTime)}  {parseHtml(eventInfo?.timeZone)}</span>
              </li>
              <li>
                <img src={listIcon} alt="icon" />
                <span>{eventInfo?.eventGuide?.eventMode}</span>
              </li>
            </ul>
            <div className="inline-hr"></div>
            <div className="row mt-4">
              <div className="col-md-6">
                <a href="#" 
                  onClick={() => {
                    toggleRegisterPopUp();
                    navigate("/user/account?tab=my-events");
                  }} className="btn btn-sach bg-sach w-100 justify-content-center">Check Details</a>
              </div>
              <div className="col-md-6">
                <a href="#" onClick={toggleRegisterPopUp} className="btn btn-sach btn-sach-linear w-100 justify-content-center">Discard</a>
              </div>
            </div>
        </div>
      </div>
        </AdminModal>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
    commonData: state?.CommonReducer,
    eventsData: state?.EventReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEventDetailsCall: (data) => dispatch(fetchEventDetailsCall(data)),
    registerEventCall: (data, navigate) =>
      dispatch(registerEventCall(data, navigate)),
    resetEventData: () => dispatch(resetEventData(data)),
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    toggleRegisterPopUp: (data) => dispatch(toggleRegisterPopUp(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
