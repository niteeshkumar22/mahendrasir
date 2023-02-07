import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import SachLoader from "../../../commons/Loader";
import { showPopup } from "../../../redux/action/common";
import { getEachVideoData, getVideoLikeComments, postVideoLikeComments, postCommentsLikesReplies } from "../../../redux/action/user/category";
import "./style.css";
import { checkAuthentication, getCurrentUserDetails, parseHtml } from "../../../utils/util";
import isEmpty from "lodash/isEmpty";
import CommentSection from "./CommentSection";
import { registerEventCall } from "../../../redux/action/user/events";

const CategoryVideo = (props) => {
  const { showPopup, isLoading, getEachVideoData, videoData, sectionData, sectionOrder, getVideoLikeComments, postVideoLikeComments, commentSectionData, currVideoObject, postCommentsLikesReplies, registerEventCall } = props;
  const location = useLocation();
  let navigate = useNavigate();

  const [toPlayVideo, setToPlayVideo] = useState(false);
  const [showCommentsSection, setShowCommentsSection] = useState(false);

  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);
  const userDetails = getCurrentUserDetails();

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = '!function (e, t, i) { if (void 0 === e._dyntube_v1_init) { e._dyntube_v1_init = !0; var a = t.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = "https://embed.dyntube.com/v1.0/dyntube.js", t.getElementsByTagName("head")[0].appendChild(a) } }(window, document);';
    document.body.appendChild(s);
    document.querySelector("body").scrollTo(0, 0);
    let data = paramsObj;
    if (checkAuthentication()) {
      data["userId"] = userDetails?.user?.sachUserId;
    }
    getEachVideoData(data);
    window.addEventListener("dyntubeReady", () => {});
  }, [location]);

  const onPlayVideo = (record) => {
    setToPlayVideo(record);
  };
  const closeVideoClick = () => {
    setToPlayVideo(null);
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

  const handlePreviewVideoClick = (e, vid) => {
    // $("#btnPlay").click(() => {
    //   player.play();
    // });
    // let event = new Event('click')
    // document.getElementById("dynPlayer").dispatchEvent(event)
    // dynPlayer
    // setPlayerModal(true);
    // setIsLoader(true);
    // console.log(vid.channelKey)
    // window.addEventListener("dyntubeReady", () => {
    //   // setIsLoader(false);
    //   var player = dyntube.getPlayer(vid.channelKey);
    //   player.play();
    // });
    //Play the video when the button with Id 'btnPlay' is clicked
  };
  const categoriesVidoeCard = {
    loop: true,
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

  const handleViewMoreClick = (data) => {
    const params = {
      ...paramsObj,
      ViewMoreSize: data?.ViewMoreSize,
      contKey: data?.contKey,
      userId: userDetails?.user?.sachUserId,
    };

    getEachVideoData(params);
    // navigate(`/user/category-details?catId=${paramsObj?.catId}&subCatId=${paramsObj?.subCatId}`)
    return;
  };
  const onClickShareEvent = (shareLink) => {
    showPopup("shareEvent", { shareLink: shareLink });
  };
  const onClickViewEvent = (eventId) => {
    navigate(`/user/events-details?eventId=${eventId}`);
    return;
  };
  const handleVideoLikeClick = (type) => {
    if (!checkAuthentication()) {
      navigate("/login?redirect=" + window.location.href);
    }
    let data = {
      userId: userDetails?.user?.sachUserId,
      actionType: type,
      videoId: paramsObj?.videoId,
    };
    postVideoLikeComments(data);
  };

  if (isLoading) {
    return <SachLoader />;
  }
  const renderVideoDetails = (data) => {
    return (
      <div>
        <section className="categories-video-title">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav className="sach-breadcrumb" aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a onClick={() => navigate("/user/categories")}>Categories</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {data?.subCategoryName}
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="">
                  <h1 className="f-700 fs-40 text-md-start text-center">{parseHtml(data?.title)}</h1>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 text-center text-md-end my-3 my-md-0">
                {/* {!checkAuthentication() && (
                  <button id="btnPlay"
                    className="prev-btn me-4"
                    onClick={(e) => handlePreviewVideoClick(e, data)}
                  >
                    <img
                      src={
                        require("../../../static/user/img/icons/play-btn.svg")
                          .default
                      }
                    />
                    <span>Preview</span>
                  </button>
                )} */}
                {!checkAuthentication() && (
                  <a onClick={() => navigate("/login?redirect=" + window.location.href)} className="btn btn-sach bg-sach-dark">
                    Sign Up To Watch Full Video
                  </a>
                )}
              </div>

              <div className="col-lg-12">
                <ul className="pills-list">
                  <li>
                    <span className="sach-pills">{data?.subCategoryName}</span>
                  </li>
                  <li className="pills-play-btn">
                    <span>
                      <img src={require("../../../static/user/img/icons/play-btn.svg").default} />
                      {data?.duration}
                    </span>
                  </li>
                </ul>

                <div className="lecture-by my-3">
                  <img src={data?.authorImg || require("../../../static/user/img/user-image-2.png").default} alt="Hosted By" />
                  <div className="lecturer-name">
                    <span>by </span>
                    <b> {data?.author || "Bessie Cooper"}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container video-description mt-2">
            <div className="row video-description-row">
              <div className="col-lg-11 mx-auto">
                <div className="position-relative">
                  <div id="dynPlayer" className="each-category-video-style" data-dyntube-key={data?.channelKey}>
                    {/* <div className="play-btn">
                      <i className="bi bi-play-fill"></i>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-11 mx-auto video-title mt-5">
                <h2>Description</h2>
                <p>{parseHtml(data?.desc)}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const suggestedVideoRow = (videos) => {
    return (
      <div className="row">
        <div className="col-lg-12 mb-2">
          <OwlCarousel className="owl-theme categoriesVidoeCard" {...categoriesVidoeCard}>
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

  const renderRelatedCategoryVideos = (data) => {
    return (
      <section className="mt-5">
        <div className="container">
          {data &&
            data?.length > 0 &&
            data.map((category) => {
              return (
                <div>
                  <div className="row">
                    <div className="col-lg-6 me-auto col-sm-12">
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
  const renderRelatedEventInfo = (data) => {
    if (data?.length < 1) return null;
    return data?.map((eventData) => {
      return (
        <section className="light-bg video-description py-5">
          <div className="container">
            <div className="row video-description-row">
              <div className="col-lg-9">
                <div className="video-title">
                  <h2>{parseHtml(eventData?.title)}</h2>
                  <p>{parseHtml(eventData?.subTitle)}</p>
                </div>
              </div>
              <section>
                <div className="col-lg-12 mb-2 mt-4">
                  <OwlCarousel
                    className="owl-theme categoriesVidoeCard"
                    // {...categoriesVidoeCard}
                  >
                    {eventData?.list?.map((eachEvent, index) => {
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
              </section>
            </div>
          </div>
        </section>
      );
    });
  };
  const sectionNameMapping = {
    videoDetail: renderVideoDetails,
    videoInfo: renderRelatedCategoryVideos,
    eventInfo: renderRelatedEventInfo,
  };
  const commentSectionProps = {
    userDetails,
    currVideoObject,
    ...commentSectionData,
    sectionData,
    setShowCommentsSection,
    getVideoLikeComments,
    postVideoLikeComments,
    postCommentsLikesReplies,
  };
  return (
    <>
      {sectionOrder?.length > 0 &&
        sectionOrder.map((sectionName) => {
          if (sectionNameMapping[sectionName] || sectionData[sectionName]) {
            return sectionNameMapping[sectionName] && sectionNameMapping[sectionName](sectionData[sectionName]);
          }
          return null;
        })}
      {showCommentsSection ? <CommentSection {...commentSectionProps} /> : null}
      {
        <div className="">
          <div className="text-center my-4" id="commentSection">
            <div className="fixed-comment">
              {currVideoObject?.isLiked ? (
                <div className="like-comment" onClick={() => handleVideoLikeClick("UNLIKE")}>
                  <img src={require("../../../static/user/img/icons/liked.svg").default} alt="Like" />
                  <span>{currVideoObject?.likesCount}</span>
                </div>
              ) : (
                <div className="like-comment" onClick={() => handleVideoLikeClick("LIKE")}>
                  <img src={require("../../../static/user/img/icons/like.svg").default} alt="Like" />
                  <span>{currVideoObject?.likesCount}</span>
                </div>
              )}
              {currVideoObject?.isDisliked ? (
                <div className="like-comment" onClick={() => handleVideoLikeClick("UN_DISLIKE")}>
                  <img src={require("../../../static/user/img/icons/disliked.svg").default} alt="Dislike" />
                  <span>{currVideoObject?.dislikesCount}</span>
                </div>
              ) : (
                <div className="like-comment" onClick={() => handleVideoLikeClick("DISLIKE")}>
                  <img src={require("../../../static/user/img/icons/dislike.svg").default} alt="Dislike" />
                  <span>{currVideoObject?.dislikesCount}</span>
                </div>
              )}

              <div className="LC-divider"></div>
              {currVideoObject && (
                <div className="like-comment" onClick={() => setShowCommentsSection(!showCommentsSection)}>
                  <img src={require("../../../static/user/img/icons/comment.svg").default} alt="Comment" />
                  <span>{currVideoObject?.commentsCount || 0}</span>
                  <span> Comments</span>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  const { UserCategoryReducer } = state;
  const { isLoading, eachVideoData = {}, start = 0, commentSectionData, currVideoObject = {} } = UserCategoryReducer;
  return {
    isLoading,
    ...eachVideoData,
    commentSectionData,
    currVideoObject,
    start,
    commonData: state?.CommonReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    getEachVideoData: (data) => dispatch(getEachVideoData(data)),
    getVideoLikeComments: (data) => dispatch(getVideoLikeComments(data)),
    postVideoLikeComments: (data) => dispatch(postVideoLikeComments(data)),
    postCommentsLikesReplies: (data) => dispatch(postCommentsLikesReplies(data)),
    registerEventCall: (data, navigate) => dispatch(registerEventCall(data, navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryVideo);
