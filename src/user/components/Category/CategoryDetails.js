import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SachLoader from "../../../commons/Loader";
import { showPopup } from "../../../redux/action/common";
import { getEachCategoryData } from "../../../redux/action/user/category";
import "./style.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { parseHtml } from "../../../utils/util";
import isEmpty from "lodash/isEmpty";
import { registerEventCall } from "../../../redux/action/user/events";
import AdviseTopicRequestComponent from "../common/AdviseTopicRequestComponent";
import { adviseTopicRequest } from "../../../redux/action/user/topicRequest";

const CategoryDetails = (props) => {
  const { isLoading, getEachCategoryData, sectionData, sectionOrder, start, registerEventCall } = props;
  const location = useLocation();
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);

  const [searchValues, setSearchValues] = useState({});
  const [selectedDayFilter, setSelectedDayFilter] = useState({});

  useEffect(() => {
    getEachCategoryData(paramsObj);
  }, [location]);

  const handleSubCatClick = (data) => {
    navigate(`/user/category-details?catId=${data?.catId}&subCatId=${data?.subCatId}`);
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
  const handleVideoClick = (data) => {
    navigate(`/user/category-video?catId=${paramsObj?.catId}&subCatId=${paramsObj?.subCatId}&videoId=${data?.videoId}`);
    return;
  };
  const handleViewMoreClick = (data) => {
    const params = {
      ...paramsObj,
      ViewMoreSize: data?.ViewMoreSize,
      contKey: data?.contKey,
    };

    getEachCategoryData(params);
  };

  const onSearchChange = (event) => {
    const copySearch = Object.assign({}, searchValues);
    copySearch[event.target.id] = event.target.value;
    setSearchValues(copySearch);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      onSearchClick(searchValues);
    }
  };

  const categoriesVidoeCard = {
    loop: false,
    autoplay: false,
    nav: false,
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

  const solutionsPills = {
    margin: 10,
    loop: false,
    autoplay: false,
    autoWidth: true,
    nav: true,
    navText: [
      '<svg width="8" height="14" viewBox="0 0 8 14" fill="#201429" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0.500504 6.99991C0.500504 6.77191 0.577504 6.54491 0.732504 6.35991L5.7325 0.359909C6.0855 -0.064091 6.7165 -0.122091 7.1405 0.231909C7.5645 0.584909 7.6215 1.21491 7.2685 1.63991L2.7925 7.01091L7.1075 12.3729C7.4535 12.8029 7.3855 13.4329 6.9555 13.7789C6.5255 14.1249 5.8965 14.0569 5.5495 13.6269L0.721504 7.62691C0.574505 7.44391 0.500504 7.22191 0.500504 6.99991Z"/></svg>',
      '<svg width="8" height="14" viewBox="0 0 8 14" fill="#201429" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.4995 6.99991C7.4995 6.77191 7.4225 6.54491 7.2675 6.35991L2.2675 0.359909C1.9145 -0.064091 1.2835 -0.122091 0.859495 0.231909C0.435495 0.584909 0.378496 1.21491 0.731496 1.63991L5.2075 7.01091L0.892496 12.3729C0.546496 12.8029 0.614496 13.4329 1.0445 13.7789C1.4745 14.1249 2.1035 14.0569 2.4505 13.6269L7.2785 7.62691C7.4255 7.44391 7.4995 7.22191 7.4995 6.99991Z"/></svg>',
    ],
    dots: false,
    autoplayTimeout: 0,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
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
    getEachCategoryData(params);
  };

  if (isLoading) {
    return <SachLoader />;
  }

  const categoryHeroPara = {
    "DSC Show": `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.`,
    Birth: `Due to the cycle of rebirth, we spend nine months in the mother's womb and the child always leaves the womb crying. The child faces trouble breathing. He/she needs oxygen. The intake of air is the first stage in the desire, which is followed by milk, food, and water and it continues to build with time. All throughout life, the cycle of want continues to increase. As a result, we claim that "Suffering begins at birth."`,
    Ageing: `As a child, youth, and finally adult, one starts to notice his quick ageing and notices that his hair is beginning to turn grey. Therefore, he begins to feel depressed about it. He wishes he could stop time from ageing him. The root cause is that we frequently desire impossibilities. Suffering begins as a result of one's desire to stay young.`,
    Sickness: `Every person experiences the emergence of an illness at some point in their life.There are multiple conditions such as weakness, joint pain, diabetes, obesity, high blood pressure, etc. One does not want to acknowledge the fact that as one ages,their bodies gradually deteriorate and they will develop illnesses. And so,There is sorrow.`,
    "Dissociation from loved once": `When we are separated from someone we love,it makes us feel horrible.Such a separation may result through misunderstanding, separate geographic locations,death etc. As soon as we realise that the more attached we are to one another, the more sorrow we encounter. Humans begin to have higher expectations when a child is conceived nine months before giving birth.If the mental image we begin to create for our loved ones is not realised,Our so-called heart is broken and we suffer.`,
    "Not to get what one wants": `One sets out to become a successful person who enjoys a posh lifestyle from an early age. When someone achieves this, they work incredibly hard to acquire more. But the moment one loses it, he is miserable. But "Nothing in life is permanent, "states the law of nature. In this world, every living thing is experiencing sadness. Humans suffer right now, have suffered in the past and will suffer in the future. Everyone experiences pain, including those with wealth and those without.`,
    "Desire of Sensual Pleasure": `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.`,
    "Desire to get rid off": `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.`,
    "Desire to become": `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.`,
  };

  const renderCategoryInfo = (data) => {
    // console.log(categoryHeroPara[data?.title].length < 500);
    return (
      <section className="categories-inner-hero" style={{ backgroundImage: `url(${data?.image})` }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-1">
              <div className="sach-title">
                <h1 className="f-700 fs-40 text-md-start text-center">{parseHtml(data?.title)}</h1>
                <p className="text-md-start text-center">{categoryHeroPara[data?.title].length >= 500 ? categoryHeroPara[data?.title].substring(0, 500) + "..." : categoryHeroPara[data?.title]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderTopList = (data) => {
    return (
      <section className="searchbar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="sach-title text-start">
                <h2 className="f-700">{parseHtml(data?.title)}</h2>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12 col-lg-12 mt-3 mb-4">
              <OwlCarousel className="owl-theme custom-owl-nav-1" id="solutionsPills" {...solutionsPills}>
                {data?.tableContents?.length > 0 &&
                  data?.tableContents.map((item) => {
                    return (
                      <div className="item">
                        <a href=" " onClick={() => handleSubCatClick(item)}>
                          <span className={`badge bg-light text-dark custom-badge rounded-pill ${item?.isSelected ? "active" : ""}`}>{parseHtml(item?.title)}</span>
                        </a>
                      </div>
                    );
                  })}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderCategoryAndfilter = (data) => {
    return (
      <>
        <section className="searchbar pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className="input-group with-btn">
                  <span className="input-group-text">
                    <img src={require("../../../static/user/img/icons/search.svg").default} loading="lazy" />
                  </span>
                  <input type="text" className="form-control" id="searchKey" value={searchValues["searchKey"]} placeholder="Search Topic, categories....." onChange={(event) => onSearchChange(event)} onKeyDown={(event) => handleKeyDown(event)} />
                  <span className="btn btn-sach bg-sach-dark mx-2" onClick={(event) => onSearchClick(searchValues)}>
                    Search
                  </span>
                </div>
              </div>
              {data?.filters?.length > 0
                ? data?.filters.map((eachFilter) => {
                    if (eachFilter?.tag === "duration" || eachFilter?.tag === "lang") {
                      return (
                        <div className="col-auto">
                          <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              {eachFilter?.name}
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
                                        <label className="form-check-label" htmlFor="LangEnglish">
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
                    // if (eachFilter?.tag === "sortBy") {
                    //   return (
                    //     <div className="col-auto">
                    //       <div className="btn-group">
                    //         <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    //           {eachFilter?.name}
                    //           <img src={require("../../../static/user/img/icons/dropdown-icon-down.svg").default} />
                    //         </button>
                    //         <ul className="dropdown-menu dropdown-menu-lg-end">
                    //           {eachFilter?.options?.map((option) => {
                    //             return (
                    //               <li>
                    //                 <span className={`dropdown-item ${option === (searchValues?.sortBy && searchValues?.sortBy[0]) ? "active" : ""}`} id={option} onClick={(event) => onFilterChange(event, eachFilter?.tag)}>
                    //                   {option}
                    //                 </span>
                    //               </li>
                    //             );
                    //           })}
                    //         </ul>
                    //       </div>
                    //     </div>
                    //   );
                    // }
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
                        <div className="row">
                          <div className="col-lg-12 mb-2 aos-init aos-animate">
                            <OwlCarousel className="owl-theme categoriesVidoeCard" {...categoriesVidoeCard}>
                              {currList?.map((eachEvent, index) => {
                                let cl = (index % 4) + 1;
                                const customStyle = {
                                  background: eachEvent?.bgColor,
                                };
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
                                                <path fillRule="evenodd" clipRule="evenodd" d="M8.00003 14.6107V14.6107C7.8227 14.6107 7.65336 14.5407 7.52803 14.4147L2.35003 9.22801C0.992698 7.86801 0.992698 5.65534 2.35003 4.29534C3.00536 3.63934 3.8807 3.27734 4.81336 3.27734C5.74603 3.27734 6.62136 3.63934 7.2767 4.29534L8.00003 5.02001L8.7227 4.29601C9.3787 3.63934 10.254 3.27734 11.1867 3.27734C12.1194 3.27734 12.9947 3.63934 13.65 4.29534C15.0074 5.65534 15.0074 7.86801 13.6507 9.22801L8.47203 14.4153C8.3467 14.5407 8.17736 14.6107 8.00003 14.6107" />
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

  const suggestedVideoRow = (videos) => {
    return (
      <div className="row">
        <div className="col-lg-12 mb-2">
          <OwlCarousel className="owl-theme categoriesVidoeCard no-gap" {...categoriesVidoeCard}>
            {videos?.length > 0 &&
              videos.map((eachVideo) => {
                return (
                  <div className="item">
                    <div className="card category-video category-detail-video">
                      <div className="video-thumb" onClick={() => handleVideoClick(eachVideo)}>
                        <img src={eachVideo?.icon} alt="video-thumb" />
                        <span className="video-play-btn"></span>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title">{parseHtml(eachVideo?.title)}</h6>
                        <p className="card-text categoriesVidoeItemStyle">
                          <span>
                            {eachVideo?.categoryName?.substring(0, 15)}
                            {"..."}
                            <i className="bi bi-circle-fill"></i> {eachVideo?.subCategoryName}
                          </span>
                          <i className="bi bi-circle-fill"></i> {eachVideo?.duration}
                        </p>
                        <p className="info">
                          {parseHtml(eachVideo?.desc?.substring(0, 50))}
                          ...
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </OwlCarousel>
        </div>
      </div>
    );
  };

  const suggestedVideoSection = (categoryData) => {
    const allVideos = categoryData?.cards?.length > 0 ? categoryData?.cards : [];
    const vidRows = [];
    const vidsInARow = 3;
    for (let i = 0; i < allVideos?.length; i += vidsInARow) {
      vidRows.push(suggestedVideoRow(allVideos.slice(i, i + vidsInARow)));
    }
    return (
      <div>
        {vidRows.map((vidRow) => {
          return <div>{vidRow}</div>;
        })}
        {!isEmpty(categoryData?.viewMore) ? (
          <div className="col-lg-12 text-center">
            <a onClick={() => handleViewMoreClick(categoryData)} className="btn btn-sach bg-sach-dark">
              View more
            </a>
          </div>
        ) : null}
      </div>
    );
  };

  const renderCategoryVideos = (data) => {
    return (
      <section className="mt-5">
        <div className="container">
          {data &&
            data?.length > 0 &&
            data.map((category) => {
              return (
                <div>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="category-title">
                        <h5>{parseHtml(category?.title)}</h5>
                        <p>{parseHtml(category?.subTitle)}</p>
                      </div>
                    </div>
                  </div>
                  {category?.cards?.length > 0 && suggestedVideoSection(category)}
                </div>
              );
            })}
        </div>
      </section>
    );
  };

  const renderJoinSachBanner = (data) => {
    return (
      <>
        {/* <AdviseTopicRequestComponent /> */}
        <section className="mt-5 newsletter event-newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-1">
                <div className="sach-title">
                  <h1 className="f-700 fs-40 text-white text-md-start text-center">{parseHtml(data?.title || `Become a part of <span className="text-sach">Sach,</span> forget all your worries & stay happy.`)}</h1>
                  <p className="text-white text-md-start text-center">{parseHtml(data?.text)}</p>
                </div>
                <div className="row g-3 align-items-center my-md-4 my-2">
                  <div className="col-lg-5 col-sm-12 text-md-start text-center">
                    <span className="btn btn-sach bg-sach" data-aos-delay="400" onClick={() => navigate("/login?redirect=" + window.location.href)}>
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
        </section>{" "}
      </>
    );
  };

  const renderTopic = (data) => {
    return (
      data?.title === "DSC Show" && (
        <>
          <AdviseTopicRequestComponent type={data?.title} />
        </>
      )
    );
  };
  const sectionNameMapping = {
    categoryInfo: renderCategoryInfo,
    topList: renderTopList,
    categoryAndfilter: renderCategoryAndfilter,
    videoInfo: renderCategoryVideos,
    joinSoch: renderJoinSachBanner,
    topicInfo: renderTopic,
  };
  return (
    <>
      {sectionOrder?.length > 0 &&
        sectionOrder.map((sectionName) => {
          if (sectionNameMapping[sectionName] || sectionData[sectionName]) {
            let data = sectionData[sectionName];
            if (sectionName === "topicInfo") {
              data = sectionData["categoryInfo"];
            }
            return sectionNameMapping[sectionName] && sectionNameMapping[sectionName](data);
          }
          return null;
        })}
    </>
  );
};

const mapStateToProps = (state) => {
  const { UserCategoryReducer } = state;
  const { isLoading, data = {}, start = 0 } = UserCategoryReducer;
  return {
    isLoading,
    ...data,
    start,
    commonData: state?.CommonReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    getEachCategoryData: (data) => dispatch(getEachCategoryData(data)),
    registerEventCall: (data, navigate) => dispatch(registerEventCall(data, navigate)),
    adviseTopicRequest: (data) => dispatch(adviseTopicRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
