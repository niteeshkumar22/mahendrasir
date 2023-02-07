import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogDetail, modifyBlog, getRelatedBlogs } from "../../../../redux/action/user/myBlogs";
import { DeleteIcon, BlockIcon, CloseIcon, PlayButtonIcon, PauseButtonIcon } from "../../../icons";
import ChangeStatusModal from "./modals/ChangeStatusModal";
import SachLoader from "../../../../commons/Loader";
import { parseHtml, secondsToTime, startTimer } from "../../../../utils/util";
import { useSpeechSynthesis } from "react-speech-kit";
import "./style.css";
import { speak, pause, getVoices, speaking, paused , resume, cancel} from './audioPlayer';
import { Select, Input } from "antd";
const BlogDetail = ({ isLoading, blogDetail, getBlogDetail, modifyBlog, roleInfo, getRelatedBlogs, relatedPost }) => {
  let navigate = useNavigate();
  const voices = getVoices();
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [audioIcon, setAudioIcon] = useState(PlayButtonIcon);
  const [type, setType] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedVoice, setVoice] = useState(voices[1]?.lang);
  const [volume, setVolume] = useState(0.5);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);
  
  
  let timer;
  const Option = Select.Option;

  const onEnd = (event) => {
    setAudioIcon(PlayButtonIcon);
  };

  // const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({ onEnd });
  useEffect(() => {
    getBlogDetail(paramsObj);
  }, []);

  const handleGetBlogDetail = (id) => {
    getBlogDetail({ id });
    window.scrollTo(5, 10);
  };

  useEffect(() => {
    blogDetail && getRelatedBlogs({ catId: blogDetail?.blogCategory, subCatId: blogDetail?.blogSubCategory, id: blogDetail?.id });
  }, [blogDetail]);

  const handleShowMore = (type) => {
    navigate(`/user/blogs-summary?blogType=${type}`);
    return;
  };

  const handleModifyBlog = (val, reason) => {
    modifyBlog([
      {
        blogId: blogDetail.id,
        blogFieldName: "status",
        blogFieldValue: val,
      },
      {
        blogId: blogDetail.id,
        blogFieldName: "comment",
        blogFieldValue: reason,
      },
    ]);
    navigate(-1);
  };

  if (isLoading) {
    return <SachLoader />;
  }

  if (!blogDetail) return null;

  const getSuccessButton = () => {
    if (roleInfo.view_action && (blogDetail?.status === "pending" || blogDetail?.status === "new")) {
      return (
        <>
          <div
            className="btn-sach btn-success mt-3 mt-md-0 ms-3"
            onClick={() => {
              setType("published");
              setShowChangeStatusModal(true);
            }}
          >
            <svg width="20" height="20" className="me-2" viewBox="0 0 20 20" fill="#fff" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.21965 14.9999C7.98965 14.9999 7.76965 14.9049 7.61215 14.7374L3.55965 10.4216C3.24381 10.0866 3.26131 9.55906 3.59631 9.24406C3.93215 8.92906 4.45965 8.94572 4.77381 9.28072L8.21131 12.9399L15.218 5.27156C15.5296 4.93072 16.0563 4.90822 16.3963 5.21822C16.7355 5.52822 16.7588 6.05572 16.4488 6.39489L8.83465 14.7282C8.67881 14.8999 8.45715 14.9982 8.22548 14.9999H8.21965Z"></path>
            </svg>
            <span>Approve</span>
          </div>

          <div className="dvdr mx-3"></div>
        </>
      );
    }
  };

  const cancelAudio = () => {
    setAudioIcon(PlayButtonIcon);
    setShowPlayer(false);
    cancel();
  }
  const changeVoice = (value) => {
    setVoice(value);
    setShowPlayer(true);
    setAudioIcon(PauseButtonIcon);
    speak({
      rate,
      pitch,
      volume,
      text: blogDetail?.blogBodyParse, lang: value
    });
  }

  const changeVolume = e => {
    setVolume(e.target.value);
    setShowPlayer(true);
    setAudioIcon(PauseButtonIcon);
    speak({
      rate,
      pitch,
      volume: e.target.value,
      text: blogDetail?.blogBodyParse, lang: selectedVoice
    });
  }
  const changeRate = e => {
    setRate(e.target.value);
    setShowPlayer(true);
    setAudioIcon(PauseButtonIcon);
    speak({
      pitch,
      volume,
      rate: e.target.value,
      text: blogDetail?.blogBodyParse, lang: selectedVoice
    });
  }
  const changePitch = e => {
    setPitch(e.target.value);
    setShowPlayer(true);
    setAudioIcon(PauseButtonIcon);
    speak({
      volume,
      rate,
      pitch: e.target.value,
      text: blogDetail?.blogBodyParse, lang: selectedVoice
    });
  }

  const manageAudio = () => { 
    setShowPlayer(true);
    if(paused) {
      setAudioIcon(PauseButtonIcon)
      resume()
    }
    if (speaking) {
     setAudioIcon(PlayButtonIcon);
     pause();
    
    } else {
     setAudioIcon(PauseButtonIcon);
     speak({
      text: blogDetail?.blogBodyParse,
      lang: selectedVoice || voices[1]?.lang,
      volume,
      rate,
      pitch
    });
    }
  }

  const getDeclineButton = () => {
    if (roleInfo.view_action && (blogDetail?.status === "pending" || blogDetail?.status === "new" || blogDetail?.status === "published")) {
      return (
        <>
          <div
            className="btn-sach btn-sach-linear mt-3 mt-md-0"
            onClick={() => {
              setType("declined");
              setShowChangeStatusModal(true);
            }}
          >
            <img className="me-2" src={BlockIcon} />
            <span>Decline</span>
          </div>
          <div className="dvdr mx-3"></div>
        </>
      );
    }
  };
  const handleLinkClick = (e) => {
    // e.stoppropagation();
    const id = e.target.getAttribute("data-id");
    const id1 = document.getElementById(id);
    if (id) {
      id1.scrollIntoView();
    }
  };
  const mainHeader = () => {
    return (
      <main className="blog-page">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a onClick={() => navigate(-1)} className="back-btn">
                <i className="bi bi-chevron-left"></i> Back
              </a>
            </div>

            <div className="col-md-12">
              <ul className="blog-tags">
                {blogDetail?.tags?.map((tag) => (
                  <li>
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-12">
              <div className="blog-tile">{blogDetail?.blogTitle}</div>
            </div>

            <div className="col-md-12">
              <div className="blog-banner-wrp">
                <img src={blogDetail?.blogThumnail} alt="Blog-Banner" />
                {/* <span>Type caption for image (optional)</span> */}
              </div>
            </div>

            <div className="col-md-12">
              <div className="blog-info-data">
                <ul className="blog-data">
                  <li>
                    <i>By </i>
                    <strong>
                      <img src={blogDetail?.authorImage} alt="play-bnt" className="ms-2" />
                      {blogDetail?.author}
                    </strong>
                  </li>
                  <li>
                    <b>{blogDetail?.dateTime}</b>
                  </li>
                  <li>
                    <span onClick={() => manageAudio()}>
                      <img src={audioIcon} alt="" />
                    </span>
                    <span>{blogDetail?.audioTime}</span>
                  </li>
                </ul>
                <div className="blog-social">
                  <a href="https://facebook.com" target="_blank">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://www.instagram.com" target="_blank">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            {blogDetail?.tableContent && (
              <div className="col-md-4">
                <div className="tableOfCont">
                  <div className="h1">Table of Contents:</div>
                  <ul>
                    {blogDetail?.tableContent?.map((tag) => (
                      <li className="content__item" onClick={handleLinkClick}>
                        <span className="active">{parseHtml(tag.title)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className={blogDetail?.tableContent ? "col-md-8 preview-blog-wrp" : "row preview-blog-wrp"}>{blogDetail?.blogBody?.length ? parseHtml(blogDetail.blogBody) : <p>Nothing to preview</p>} </div>
          </div>
        </div>
      </main>
    );
  };
  const renderBlogItem = (eachBlog) => {
    return (
      <div
        className="col-md-4"
        onClick={() => {
          handleGetBlogDetail(eachBlog.blogId);
          //navigate(`${UserRoutes.BLOG_DETAIL}?id=${eachBlog.blogId}`);
        }}
      >
        <a className="card category-video blog-card">
          <div className="video-thumb">
            <img src={eachBlog.blogThumnail} alt="blog-thumb" />
          </div>
          <div className="card-body">
            <ul className="blog-ctgry">{eachBlog.tags && eachBlog.tags.length > 0 && eachBlog.tags.map((tag) => <li>{tag}</li>)}</ul>
            <h6 className="card-title">{eachBlog.title}</h6>
            <p className="info">{parseHtml(eachBlog.desc)}</p>
            <ul className="bullet-list sm">
              <li>by {eachBlog.author}</li>
              <li>{eachBlog.date}</li>
            </ul>
          </div>
        </a>
      </div>
    );
  };
  return (
    <>
      <div>{mainHeader()}</div>
      {relatedPost?.itemList?.length > 0 && (
        <section>
          <div className="container mb-5">
            <div className="row">
              <div className="col-lg-12 me-auto col-sm-12">
                <div className="sach-title">
                  <h2 className="f-700">{parseHtml(relatedPost?.title)} </h2>
                  <p data-aos-delay="100">{parseHtml(relatedPost?.subTitle)} </p>
                </div>
              </div>

              {relatedPost?.itemList?.map((eachBlog) => renderBlogItem(eachBlog))}
              <div className="col-lg-12 mt-5 text-center">
                <span onClick={() => handleShowMore(relatedPost?.title)} className="btn btn-sach bg-sach-dark aos-init aos-animate">
                  {relatedPost.showMoreBtnText}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
      {showPlayer && (
        <div className="textToSpeach-cont">
          <div className="textToSpeach-wrp">
            <div className="close-player" onClick={() => cancelAudio()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4142 11.9998L17.7072 7.70676C18.0982 7.31576 18.0982 6.68376 17.7072 6.29276C17.3162 5.90176 16.6842 5.90176 16.2933 6.29276L12.0002 10.5858L7.70725 6.29276C7.31625 5.90176 6.68425 5.90176 6.29325 6.29276C5.90225 6.68376 5.90225 7.31576 6.29325 7.70676L10.5862 11.9998L6.29325 16.2928C5.90225 16.6838 5.90225 17.3158 6.29325 17.7068C6.48825 17.9018 6.74425 17.9998 7.00025 17.9998C7.25625 17.9998 7.51225 17.9018 7.70725 17.7068L12.0002 13.4138L16.2933 17.7068C16.4882 17.9018 16.7443 17.9998 17.0002 17.9998C17.2562 17.9998 17.5122 17.9018 17.7072 17.7068C18.0982 17.3158 18.0982 16.6838 17.7072 16.2928L13.4142 11.9998Z" />
              </svg>
            </div>
            <div>
              <Select onChange={changeVoice} defaultValue={selectedVoice}>
                {
                voices.map((voice) => (
                   <Option value={voice.lang}>{voice.voiceURI.replace("Google", "")}</Option>
                ))
                }
                
              </Select>
            </div>
      <div>
        <p class="lead">Volume</p>
        <Input type="range" min="0" max="1" value={volume} step="0.1" id="volume"  onChange={changeVolume}/>
        <span id="volume-label" class="ms-2">1</span>
      </div>
      <div>
        <p class="lead">Rate</p>
        <Input type="range" min="0.1" max="10" value={rate} id="rate" step="0.1" onChange={changeRate} />
        <span id="rate-label" class="ms-2">10</span>
      </div>
      <div>
        <p class="lead">Pitch</p>
        <Input type="range" min="0" max="2" value={pitch} step="0.1" id="pitch" onChange={changePitch}/>
        <span id="pitch-label" class="ms-2">2</span>
      </div>
            <div className="player-timer">
              {/* <span>
          {timer.h ? `${timer.h}: `  : ''} {timer.m ? `${timer.m}: `  : ''} {timer.s ? `${timer.s}: `  : ''}
          </span> */}
              <div className="player-progress">
                <span className="progress-ico" style={{ width: "30%" }}>
                  {" "}
                </span>
              </div>
              <span>{blogDetail?.audioTime}</span>
            </div>

            <div className="player-btns">
              {/* <img src="img/icons/prev.svg" alt="previous" /> */}
              {/* <img src="img/icons/pause-btn.svg" alt="play-pause" className="play-pause" /> */}
              <img src={audioIcon} alt="play-pause" className="play-pause" onClick={() => manageAudio()} />
              {/* <img src="img/icons/next.svg" alt="next" /> */}
            </div>
          </div>
        </div>
      )}
      {showChangeStatusModal && <ChangeStatusModal type={type} title={blogDetail?.blogTitle} handleCancel={() => setShowChangeStatusModal(false)} handleModifyBlog={handleModifyBlog} />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { MyBlogsReducer, CommonReducer } = state;
  const { isLoading, blogDetail, relatedPost } = MyBlogsReducer;
  return {
    isLoading,
    blogDetail,
    roleInfo: CommonReducer?.adminInfo?.others?.blog_mgmt || {},
    relatedPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogDetail: (data) => dispatch(getBlogDetail(data)),
    getRelatedBlogs: (data) => dispatch(getRelatedBlogs(data)),
    modifyBlog: (data) => dispatch(modifyBlog(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
