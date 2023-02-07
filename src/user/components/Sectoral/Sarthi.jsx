import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTopVideosHome } from "../../../redux/action/common-action";
import { getEachVideoData } from "../../../redux/action/user/category";

function Sarthi(props) {
  const { topVideos, getTopVideosHome, getEachVideoData, sectionData } = props;
  const [dscVideos, setDscVideos] = useState({});
  const [firstDcVideos, setFirstDscVideos] = useState({});
  const [playerModal, setPlayerModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [playBtn, setPlayBtn] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState({});
  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = '!function (e, t, i) { if (void 0 === e._dyntube_v1_init) { e._dyntube_v1_init = !0; var a = t.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = "https://embed.dyntube.com/v1.0/dyntube.js", t.getElementsByTagName("head")[0].appendChild(a) } }(window, document);  ';
    document.body.appendChild(s);
    document.querySelector("body").scrollTo(0, 0);
    getTopVideosHome({
      pageType: "sarthi",
    });
    document.querySelector("body").scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (sectionData) {
      setSelectedVideo(sectionData.videoDetail);
      window.addEventListener("dyntubeReady", () => {
        setIsLoader(false);
        var player = dyntube.getPlayer(sectionData.videoDetail.videoId);
        player.play();
      });
    }
  }, [sectionData]);

  useEffect(() => {
    let videosAndCategories = topVideos?.sectionData?.videoInfo;
    if (videosAndCategories) {
      videosAndCategories = videosAndCategories.filter((item) => item.title === "DSC Show");

      if (videosAndCategories?.length > 0) {
        let videos = videosAndCategories[0]?.cards;
        setFirstDscVideos(videos.shift());
        setDscVideos(videosAndCategories[0]);
      }
    }
  }, [topVideos]);

  const handleVideo = (video) => {
    setSelectedVideo({});
    setPlayerModal(true);
    setIsLoader(true);
    getEachVideoData({
      videoId: video.videoId,
      catId: video.catId,
      subCatId: video.subCatId,
    });
  };

  const handleCancel = () => {
    // setPlaying(false);
    pauseVideo();
    setTimeout(() => setPlayerModal(false), 500);
    setPlayBtn(1);
  };

  const pauseVideo = () => {
    var iframes = document.querySelectorAll("iframe");
    for (let i = 0; i < iframes.length; i++) {
      if (iframes[i] !== null) {
        var temp = iframes[i].src;
        iframes[i].src = temp;
      }
    }
  };
  return (
    <>
      <section className="grant-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Link to="/" className="grant-back-btn">
                <i className="bi bi-chevron-left"></i> Back
              </Link>
              <p className="h6">Realizing Power of Self</p>
              <p className="h1">Empowerment</p>
              <p className="para w-75">Subhash Chandra Foundation aims to strengthen the ability of the citizens by providing robust empowerment platforms.</p>
              <div className="img-container">
                <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/Empowerment.png" alt="Hero Image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="SF-Title">Sarthi</div>
            <div className="SF-SubTitle mb-3">“Sarthi is Revolutionizing the Way People Are Empowered to Take Actions.”</div>
            <p className="SF-Para mb-0">
              The word <b>“Sarthi”</b> means the one who drives us in the right direction. True to its name, this mission is one such guiding force that propels change in the lives of people through constructive interventions. Sarthi is a flagship program of Subhash Chandra Foundation that seeks to create a nation where citizens are well informed about their rights and duties; empowered enough to raise their voices against the problems faced by them, which are then effectively addressed and resolved.
            </p>
            <p className="SF-Para">Sarthi is a network of like-minded institutions such as Government Department, Non-Government Organization, Corporate Foundations and Voluntary Organizations, which are working towards the common goal of building a well - informed and empowered nation to bring about sustainable positive change.</p>
          </div>
        </div>
      </div>

      <div className="container mt-2">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="emp-approach">
              <div className="SF-Title text-center">Approach</div>
              <div className="sarthi-link">
                <img className="sarthi-img" src={require("../../../static/user/img/SectoralFocus/sarthi.png").default} alt="Sarthi" />
                <img className="link-img" src={require("../../../static/user/img/SectoralFocus/icons/link.svg").default} alt="Link" />
                <div className="linksTo">
                  <span>Beneficiary</span>
                  <span>Solution Provider</span>
                </div>
              </div>
              <div className="emp-link">The Empowerment Link</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="emp-intervention">
              <div className="SF-Title text-center">Intervention Areas</div>
              <div className="intervention-flow">
                <div className="intrvntn-item">
                  <h2>Education</h2>
                  <ul>
                    <li>RTE Act, Section 12(1)(c )</li>
                    <li>Restart education for dropouts</li>
                  </ul>
                </div>
                <div className="intrvntn-item">
                  <h2>Health</h2>
                  <ul>
                    <li>Child Immunization</li>
                    <li>Awareness and access to early diagnosis</li>
                  </ul>
                </div>
                <div className="intrvntn-item">
                  <h2>Altenarte Livelihood</h2>
                  <ul>
                    <li>Skill Building</li>
                    <li>Micro Enterpreneurship</li>
                  </ul>
                </div>
                <div className="intrvntn-item">
                  <h2>Social Justice</h2>
                  <ul>
                    <li>Domestic Violence</li>
                  </ul>
                </div>
                <div className="intrvntn-item">
                  <h2>Women Empowerement</h2>
                  <ul>
                    <li>Prevention of female foeticide</li>
                    <li>Prevention of chile marriage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container DSCShowWrp">
        <div class="row pb-4 align-items-center">
          <div class="col-md-8">
            <div class="h2">Subhash Chandra Show</div>
            <div class="h6">You can search the happening courses by clicking the course below.</div>
          </div>
          <div class="col-md-4 text-center text-md-end">
            <a href="categories-inner.html" class="btn btn-sach btn-sach-linear" data-aos="zoom-in" data-aos-delay="150">
              View All
            </a>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6 col-lg-6">
            <div class="DSCShowVideo">
              <div class="img-wrp">
                <img src={firstDcVideos.icon} alt="DSC Show" />
              </div>
              <div class="show-cntnt">
                <h2>👉 {dscVideos.title}</h2>
                <span>{dscVideos.subTitle}</span>
                <a onClick={() => handleVideo(firstDcVideos)} href="javascript:void(0);" class="btn btn-sach bg-sach">
                  <img src={require("../../../static/user/img/icons/play-icon.svg").default} alt="play-icon" class="ms-0 me-2" />
                  <span>Watch Video</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Property 1=arrow-right">
                      <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"></path>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-6">
            <div class="DSC-VideoList">
              {dscVideos?.cards?.map((item) => {
                return (
                  <div onClick={() => handleVideo(item)} class="DSC-Item">
                    <div class="video-thumb">
                      <img src={item.icon} alt="DSC-Video" />
                    </div>
                    <div class="video-cont">
                      <h3>{item.title}</h3>
                      <span>{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {playerModal && selectedVideo?.channelKey && (
        <Modal centered closable={true} onCancel={handleCancel} visible={true} footer={null} width={1100} className="home-hero-video">
          {isLoader && (
            <div className="row mt-lg-5 mt-3">
              <div className="col-12 text-center position-relative">
                <video className="w-100" poster={selectedVideo.icon}>
                  {/* <source src="../media/banner.mp4" type="video/mp4" /> */}
                </video>
              </div>
            </div>
          )}
          {/* <div data-dyntube-key="51v8eyn640z7a8IbyDong"></div> */}
          <div data-dyntube-key={selectedVideo.channelKey}></div>
        </Modal>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  const { CommonReducer, UserCategoryReducer } = state;
  const { params = {}, topVideos = {} } = CommonReducer;
  const { eachVideoData = {} } = UserCategoryReducer;
  return {
    ...state,
    ...params,
    ...eachVideoData,
    topVideos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopVideosHome: (params) => dispatch(getTopVideosHome(params)),
    getEachVideoData: (data) => dispatch(getEachVideoData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sarthi);
