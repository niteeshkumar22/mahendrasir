import React, { useEffect, useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchEventsData, registerEventCall } from "../../../redux/action/user/events";

import SachLoader from "../../../commons/Loader";
import { parseHtml } from "../../../utils/util";
import { showPopup } from "../../../redux/action/common";
import "./style.css";

const UserEventHomePage = (props) => {
  const { fetchEventsData, eventsData, showPopup, registerEventCall } = props;
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);

  const data = eventsData?.data;

  useEffect(() => {
    fetchEventsData();
  }, []);
  useEffect(() => {
    if (data?.sectionData?.categoryAndfilter?.events?.length > 0) setSelectedDayFilter(data?.sectionData?.categoryAndfilter?.events[0].itemList[0].tag);
  }, data);
  const [carouselIndexes, setCarouselIndexes] = useState([]);
  const [selectedDayFilter, setSelectedDayFilter] = useState("Today");
  const [searchValues, setSearchValues] = useState([]);
  const [eventSearchValues, setEventSearchValues] = useState([]);
  const handleCarouselSelect = (selectedIndex, currIndex) => {
    let copyCarouselIndexes = Object.assign([], carouselIndexes);
    copyCarouselIndexes[currIndex] = selectedIndex;
    setCarouselIndexes(copyCarouselIndexes);
  };
  const handleShowMore = (type) => {
    navigate(`/user/events-summary?eventType=${type}`);
    return;
  };
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      onSearchClick(searchValues);
    }
  };
  const onClickShareEvent = (link, cl) => {
    showPopup("shareEvent", { shareLink: link, cl });
  };
  const onEventSearchChange = (event) => {
    const copySearch = Object.assign({}, eventSearchValues);
    copySearch[event.target.id] = event.target.value;
    setEventSearchValues(copySearch);
  };
  const onSearchChange = (event) => {
    const copySearch = Object.assign({}, searchValues);
    copySearch[event.target.id] = event.target.value;
    setSearchValues(copySearch);
  };
  const onFilterChange = (event, filterType) => {
    const copySearch = Object.assign({}, searchValues);
    if (filterType !== "sortBy") {
      if (copySearch[filterType]) {
        if (copySearch[filterType].some((item) => item === event.target.id)) {
          copySearch[filterType] = copySearch[filterType].filter((item) => item !== event.target.id);
        } else {
          copySearch[filterType].push(event.target.id);
        }
      } else {
        copySearch[filterType] = [event.target.id];
      }
    } else {
      copySearch[filterType] = [event.target.id];
    }
    setSearchValues(copySearch);
    setTimeout(() => onSearchClick(copySearch), 100);
  };
  const onSearchClick = (searchValues) => {
    let searchQuery = Object.assign({}, searchValues);
    Object.keys(searchValues) &&
      Object.keys(searchValues)?.map((item) => {
        if (Array.isArray(searchValues[item])) {
          searchQuery[item] = searchValues[item].join();
        }
      });
    const params = {
      ...paramsObj,
      ...searchQuery,
    };
    fetchEventsData(params);
  };
  const onEventSearchClick = () => {
    navigate(`/user/events-summary?searchKey=${eventSearchValues?.searchKey}`);
  };
  const onClickViewEvent = (eventId, cl) => {
    navigate(`/user/events-details?eventId=${eventId}&cl=${cl}`);
    return;
  };
  const handleWatchClick = (eventInfo) => {
    const data = {
      eventId: eventInfo?.eventId,
      userId: eventInfo?.userId,
      type: "watch",
      value: !eventInfo?.watchType,
    };
    registerEventCall(data, navigate);
  };
  if (eventsData?.isLoading) {
    return <SachLoader />;
  }

  const eventsSlider = {
    margin: 30,
    loop: false,
    autoplay: false,
    nav: false,
    navText: [
      '<span><svg width="17" height="16" viewBox="0 0 17 16" fill="#201429" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7915 6.9584H3.43213L7.2165 2.41673C7.58525 1.97507 7.52484 1.31778 7.08317 0.950068C6.64046 0.581318 5.98421 0.641735 5.6165 1.0834L0.408171 7.3334C0.367546 7.38236 0.346712 7.43965 0.316504 7.49382C0.291504 7.53757 0.261296 7.57507 0.242546 7.62299C0.195671 7.74278 0.167546 7.86882 0.167546 7.9959C0.167546 7.99694 0.166504 7.99903 0.166504 8.00007C0.166504 8.00111 0.167546 8.00319 0.167546 8.00424C0.167546 8.13132 0.195671 8.25736 0.242546 8.37715C0.261296 8.42507 0.291504 8.46257 0.316504 8.50632C0.346712 8.56049 0.367546 8.61778 0.408171 8.66674L5.6165 14.9167C5.82275 15.1636 6.11859 15.2917 6.4165 15.2917C6.65192 15.2917 6.88838 15.2126 7.08317 15.0501C7.52484 14.6824 7.58525 14.0251 7.2165 13.5834L3.43213 9.04174H15.7915C16.3665 9.04174 16.8332 8.57507 16.8332 8.00007C16.8332 7.42507 16.3665 6.9584 15.7915 6.9584"/> </svg></span>',
      '<span><svg width="17" height="16" viewBox="0 0 17 16" fill="#201429" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.20817 9.04159H13.5675L9.78317 13.5833C9.41442 14.0249 9.47484 14.6822 9.9165 15.0499C10.3592 15.4187 11.0155 15.3583 11.3842 14.9166L16.5925 8.66659C16.6332 8.61763 16.653 8.56034 16.6832 8.50617C16.7082 8.46242 16.7384 8.42492 16.7571 8.377C16.804 8.25721 16.8321 8.13117 16.8321 8.00409C16.8321 8.00304 16.8332 8.00096 16.8332 7.99992C16.8332 7.99888 16.8321 7.99679 16.8321 7.99575C16.8321 7.86867 16.804 7.74263 16.7571 7.62284C16.7384 7.57492 16.7082 7.53742 16.6832 7.49367C16.653 7.4395 16.6332 7.38221 16.5925 7.33325L11.3842 1.08325C11.1769 0.836377 10.8811 0.708252 10.5832 0.708252C10.3478 0.708252 10.1113 0.787419 9.9165 0.949919C9.47484 1.31763 9.41442 1.97492 9.78317 2.41659L13.5675 6.95825H1.20817C0.633171 6.95825 0.166504 7.42492 0.166504 7.99992C0.166504 8.57492 0.633171 9.04159 1.20817 9.04159"/> </svg></span>',
    ],
    dots: false,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
  const renderSearchSection = (data) => {
    return (
      <>
        <section className="event-heroSection">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2 className="head">
                  <span>Find your inner </span>
                  <span className="text-sach">peace, happiness, health</span>
                  <span> & much more with our </span>
                  <span className="text-sach">live events</span>
                </h2>
                <p>{data?.subTitle}</p>
                <div className="voice-search">
                  <a href="#">
                    <img src={require("../../../static/user/img/icons/search.svg").default} alt="Search" htmlFor="voice-input" />
                  </a>
                  <input type="text" className="form-control voice-input" id="searchKey" placeholder="Search events" onChange={(event) => onEventSearchChange(event)} />
                  {/* <a href="#">
                          <img src={require("../../../static/user/img/icons/mic.svg").default} alt="Voice Icon" />
                      </a> */}
                  <div className="divider"></div>
                  <span className="btn btn-sach bg-sach-dark" onClick={(event) => onEventSearchClick(event)}>
                    Search
                  </span>
                </div>
                <p className="mt-3">{data?.searchLabel}</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  const renderCategoryAndfilter = (data) => {
    return (
      <>
        <section className="searchbar pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="sach-title text-start">
                  <h2 className="f-700 mb-4"> {parseHtml(data?.title) || "Categories and Filters"}</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className="input-group with-btn">
                  <span className="input-group-text">
                    <img src={require("../../../static/user/img/icons/search.svg").default} />
                  </span>
                  <input type="text" className="form-control" id="searchKey" placeholder="Search Topic, categories....." value={searchValues["searchKey"]} onChange={(event) => onSearchChange(event)} onKeyDown={(event) => handleKeyDown(event)} />
                  <span className="btn btn-sach bg-sach-dark mx-2" onClick={() => onSearchClick(searchValues)}>
                    Search
                  </span>
                  {/* <span className="input-group-text">
                        <img src={require('../../../static/user/img/icons/mic.svg').default} />
                      </span> */}
                </div>
              </div>
              {data?.filters?.length > 0
                ? data?.filters.map((eachFilter) => {
                    if (eachFilter?.tag === "duration" || eachFilter?.tag === "lang" || eachFilter?.tag === "mode" || eachFilter?.tag === "paymentMode") {
                      return (
                        <div className="col-auto">
                          <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            {searchValues[eachFilter?.tag] && searchValues[eachFilter?.tag] .length > 0
                              ? searchValues[eachFilter?.tag].join(", ") 
                              : eachFilter?.name }
                              <img src={require("../../../static/user/img/icons/dropdown-icon-down.svg").default} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end">
                              {eachFilter?.options?.map((option) => {
                                let isSelected = searchValues[eachFilter?.tag]?.includes(option);
                                return (
                                  <li>
                                    <div className="dropdown-item">
                                      <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id={option} checked={isSelected} onChange={(event) => onFilterChange(event, eachFilter?.tag)} />
                                        <label className="form-check-label" for="LangEnglish">
                                          {option}
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                    }
                    if (eachFilter?.tag === "sortBy") {
                      return (
                        <div className="col-auto">
                          <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle sortByBtn" data-bs-toggle="dropdown" aria-expanded="false">
                              {eachFilter?.name}
                              <img src={require("../../../static/user/img/icons/dropdown-icon-down.svg").default} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end">
                              {eachFilter?.options?.map((option) => {
                                return (
                                  <li>
                                    <span className={`dropdown-item ${option === (searchValues?.sortBy && searchValues?.sortBy[0]) ? "active" : ""}`} id={option} onClick={(event) => onFilterChange(event, eachFilter?.tag)}>
                                      {option}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                : null}
            </div>
          </div>
          {data?.events?.length > 0 &&
            data?.events.map((section, index) => {
              if (section?.itemList.length > 0) {
                let currList = section?.itemList[0]?.list;
                if (section?.itemList[0]?.tag != undefined && selectedDayFilter != "") {
                  const filteredEvents = section?.itemList.filter((val) => val.tag === selectedDayFilter);
                  currList = filteredEvents[0]?.list;
                }
                let arrays = [],
                  size = 3;
                for (let i = 0; i < currList?.length; i += size) arrays.push(currList.slice(i, i + size));

                return (
                  <section>
                    <div className="container mb-5">
                      <div className="row">
                        <div className="col-lg-12 me-auto col-sm-12">
                          <div className="sach-title">
                            <h2 className="f-700">{parseHtml(section?.title)} </h2>
                            <p data-aos-delay="100">{parseHtml(section?.subTitle)} </p>
                            {section?.itemList[0]?.tag != undefined ? (
                              <ul className="sach-inline-pills">
                                {section?.itemList.some((val) => val.tag === "Today") ? (
                                  <li>
                                    <span className={`custom-sach-pills ${selectedDayFilter == "Today" ? "active" : ""}`} onClick={() => setSelectedDayFilter("Today")}>
                                      Today
                                    </span>
                                  </li>
                                ) : null}
                                {section?.itemList.some((val) => val.tag === "Tomorrow") ? (
                                  <li>
                                    <span className={`custom-sach-pills ${selectedDayFilter == "Tomorrow" ? "active" : ""}`} onClick={() => setSelectedDayFilter("Tomorrow")}>
                                      Tomorrow
                                    </span>
                                  </li>
                                ) : null}
                                {section?.itemList.some((val) => val.tag === "This Weekend") ? (
                                  <li>
                                    <span className={`custom-sach-pills ${selectedDayFilter == "This Weekend" ? "active" : ""}`} onClick={() => setSelectedDayFilter("This Weekend")}>
                                      This Weekend
                                    </span>
                                  </li>
                                ) : null}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12 mb-2 aos-init aos-animate">
                            <OwlCarousel className="owl-theme eventsSlider" {...eventsSlider}>
                              {currList?.map((eachEvent, index) => {
                                let cl = (index % 4) + 1;
                                return (
                                  <div className="item m-2">
                                    <div
                                      className={"new-event  _" + cl}
                                      //style={customStyle}
                                    >
                                      <div className="new-event-top">
                                        <span>{parseHtml(eachEvent?.month)?.toUpperCase() || "MAY"}</span>
                                        <h2>{parseHtml(eachEvent?.day) || "25"}</h2>
                                        <p>
                                          {parseHtml(eachEvent?.startTime)} - {parseHtml(eachEvent?.endTime)} {parseHtml(eachEvent?.timeZone)}
                                        </p>
                                        <div className="event-share-like">
                                          <a
                                            onClick={() => {
                                              handleWatchClick(eachEvent);
                                            }}
                                          >
                                            {!eachEvent?.watchType && (
                                              <svg width="14" height="12" viewBox="0 0 14 12" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M3.81312 2.0013C3.23712 2.0013 2.69712 2.22397 2.29312 2.62864C1.45445 3.46864 1.45445 4.83597 2.29379 5.6773L6.99979 10.3913L11.7065 5.6773C12.5458 4.83597 12.5458 3.46864 11.7065 2.62864C10.8985 1.81864 9.47445 1.81997 8.66645 2.62864L7.47179 3.8253C7.22112 4.07664 6.77845 4.07664 6.52779 3.8253L5.33312 2.62797C4.92912 2.22397 4.38979 2.0013 3.81312 2.0013ZM6.99979 12.0013C6.82312 12.0013 6.65312 11.9313 6.52845 11.8053L1.34979 6.61863C-0.00754623 5.25864 -0.00754623 3.04597 1.34979 1.68597C2.00579 1.02997 2.88045 0.667969 3.81312 0.667969C4.74579 0.667969 5.62112 1.02997 6.27645 1.68597L6.99979 2.41064L7.72312 1.68664C8.37912 1.02997 9.25379 0.667969 10.1871 0.667969C11.1191 0.667969 11.9945 1.02997 12.6498 1.68597C14.0078 3.04597 14.0078 5.25864 12.6505 6.61863L7.47179 11.806C7.34645 11.9313 7.17712 12.0013 6.99979 12.0013Z"
                                                />
                                              </svg>
                                            )}
                                            {eachEvent?.watchType && (
                                              <svg width="16" height="17" viewBox="0 0 16 17" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00003 14.6107V14.6107C7.8227 14.6107 7.65336 14.5407 7.52803 14.4147L2.35003 9.22801C0.992698 7.86801 0.992698 5.65534 2.35003 4.29534C3.00536 3.63934 3.8807 3.27734 4.81336 3.27734C5.74603 3.27734 6.62136 3.63934 7.2767 4.29534L8.00003 5.02001L8.7227 4.29601C9.3787 3.63934 10.254 3.27734 11.1867 3.27734C12.1194 3.27734 12.9947 3.63934 13.65 4.29534C15.0074 5.65534 15.0074 7.86801 13.6507 9.22801L8.47203 14.4153C8.3467 14.5407 8.17736 14.6107 8.00003 14.6107" />
                                              </svg>
                                            )}
                                          </a>
                                          <a onClick={() => onClickShareEvent(eachEvent?.shareLink)}>
                                            <svg width="13" height="12" viewBox="0 0 13 12" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M11.0007 8.00037C10.456 8.00037 9.96265 8.22037 9.60132 8.57437L4.31132 6.2237C4.31998 6.1497 4.33398 6.07637 4.33398 6.00037C4.33398 5.92437 4.31998 5.85103 4.31132 5.77703L9.60132 3.42637C9.96265 3.78037 10.456 4.00037 11.0007 4.00037C12.1033 4.00037 13.0007 3.10303 13.0007 2.00037C13.0007 0.8977 12.1033 0.000366211 11.0007 0.000366211C9.89798 0.000366211 9.00065 0.8977 9.00065 2.00037C9.00065 2.07637 9.01465 2.1497 9.02332 2.2237L3.73332 4.57437C3.37198 4.22037 2.87865 4.00037 2.33398 4.00037C1.23132 4.00037 0.333984 4.8977 0.333984 6.00037C0.333984 7.10303 1.23132 8.00037 2.33398 8.00037C2.87865 8.00037 3.37198 7.78037 3.73332 7.42637L9.02332 9.77703C9.01465 9.85103 9.00065 9.92437 9.00065 10.0004C9.00065 11.103 9.89798 12.0004 11.0007 12.0004C12.1033 12.0004 13.0007 11.103 13.0007 10.0004C13.0007 8.8977 12.1033 8.00037 11.0007 8.00037Z"
                                              />
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                      <div className="new-event-mid">
                                        <h2>{parseHtml(eachEvent?.title)}</h2>
                                        <ul className="sach-inline-pills">
                                          {eachEvent?.tags?.map((eachTag) => {
                                            return (
                                              <li>
                                                <a href="#" className="custom-sach-pills">
                                                  {parseHtml(eachTag)}
                                                </a>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                        {eachEvent?.address && (
                                          <div>
                                            Address:
                                            <h5>{eachEvent?.address}</h5>
                                          </div>
                                        )}

                                        <div className="lecture-by">
                                          <img src={eachEvent?.authorImg || require("../../../static/user/img/user-image.png").default} alt="Hosted By" />
                                          <div className="lecturer-name">
                                            <span>by </span>
                                            <b>{parseHtml(eachEvent?.author)}</b>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="new-event-btm">
                                        <span>{eachEvent?.mode}</span>
                                        <div>
                                          {eachEvent?.freeTag && (
                                            <a href="#" className="btn btn-sach btn-sach-linear">
                                              Free
                                            </a>
                                          )}
                                          {!eachEvent?.freeTag && (
                                            <a href="#" className="btn btn-sach btn-sach-linear">
                                              Paid
                                            </a>
                                          )}
                                          <span className="btn btn-sach bg-sach-dark ms-2" onClick={() => onClickViewEvent(eachEvent?.eventId, cl)}>
                                            View Details
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </OwlCarousel>
                          </div>
                        </div>
                        <div className="col-lg-12 mt-5 text-center">
                          <span onClick={() => handleShowMore(section?.title)} className="btn btn-sach bg-sach-dark aos-init aos-animate">
                            Show more events
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }
              return null;
            })}
        </section>
      </>
    );
  };
  const renderWhyEventInfo = (data) => {
    return (
      <>
        <section className="features-sach">
          <div className="container">
            <div className="row">
              <div className="col-md-5 mx-auto sach-title text-center">
                <h2 className="f-700">{parseHtml(data?.title)}</h2>
                <p className="f-400">{parseHtml(data?.subTitle)}</p>
              </div>
            </div>
            <div className="row">
              {data?.cards?.length > 0 &&
                data?.cards.map((card, index) => {
                  return (
                    <div className="col-lg-4 col-md-4" key={index}>
                      <div className="feature">
                        <img src={card?.icon || require(`../../../static/user/img/icons/feature-${index + 1}.svg`).default} alt="Feature" />
                        <div className="h1">{parseHtml(card?.title)}</div>
                        <p>{parseHtml(card?.text)}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </>
    );
  };
  const renderJoinSachBanner = (data) => {
    return (
      <>
        <section className="newsletter event-newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-1">
                <div className="sach-title">
                  <h1 className="f-700 fs-40 text-white text-md-start text-center">{parseHtml(data?.title || `Become a part of <span className="text-sach">Sach,</span> forget all your worries & stay happy.`)}</h1>
                  <p className="text-white text-md-start text-center">{parseHtml(data?.text)}</p>
                </div>
                <div className="row g-3 align-items-center my-md-4 my-2">
                  <div className="col-lg-5 col-sm-12 text-md-start text-center">
                    <span className="btn btn-sach bg-sach" data-aos-delay="400" onClick={() => navigate("/login")}>
                      Get Started
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="Property 1=arrow-right">
                          <path id="Icon" fillRule="evenodd" clipRule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  const sectionNameMapping = {
    search: renderSearchSection,
    categoryAndfilter: renderCategoryAndfilter,
    eventInfo: renderWhyEventInfo,
    joinSoch: renderJoinSachBanner,
  };

  return (
    <>
      <div>
        {eventsData?.data?.sectionOrder?.length > 0 &&
          eventsData?.data?.sectionOrder.map((sectionName) => {
            if (sectionNameMapping[sectionName] || eventsData?.data?.sectionData[sectionName]) {
              return sectionNameMapping[sectionName] && sectionNameMapping[sectionName](eventsData?.data?.sectionData[sectionName]);
            }
            return null;
          })}
      </div>
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
    fetchEventsData: (data) => dispatch(fetchEventsData(data)),
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    registerEventCall: (data, navigate) => dispatch(registerEventCall(data, navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEventHomePage);
