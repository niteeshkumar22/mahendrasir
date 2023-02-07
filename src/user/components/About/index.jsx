import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
// import SubhashChandra from "../../../static/user/img/about/subhashChandra.png";
// import Vision from "../../../static/user/img/about/vision.png";
// import Mission from "../../../static/user/img/about/mission.png";
import QuoteLeft from "../../../static/user/img/icons/quote-left.svg";
import SuccessStories1 from "../../../static/user/img/about/successStories1.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { AboutData } from "./mockData";
import { parseHtml } from "../../../utils/util";
import { connect } from "react-redux";
import { Form, Input, message, Modal } from "antd";
import { adviseTopicRequest } from "../../../redux/action/user/topicRequest";
import { resetToast } from "../../../redux/action/common";
import { checkAuthentication, getCurrentUserDetails } from "../../../utils/util";
import AdviseTopicRequestComponent from "../common/AdviseTopicRequestComponent";
import { getTop3Testdata, getTopVideosHome } from "../../../redux/action/common-action";
import { Link } from "react-router-dom";
import { SoundFilled } from "@ant-design/icons";

const AboutOverview = ({ getTop3Testdata, testData }) => {
  const [playBtn, setPlayBtn] = useState(true);
  const [playerModal, setPlayerModal] = useState(false);
  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = '!function (e, t, i) { if (void 0 === e._dyntube_v1_init) { e._dyntube_v1_init = !0; var a = t.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = "https://embed.dyntube.com/v1.0/dyntube.js", t.getElementsByTagName("head")[0].appendChild(a) } }(window, document);';
    document.body.appendChild(s);

    // 👇️ scroll to top on page load
    document.querySelector("body").scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getTop3Testdata({});
  }, []);

  const handleVideo = (e) => {
    setPlayerModal(true);
  };

  const handleCancel = () => {
    setTimeout(() => setPlayerModal(false), 500);
  };

  const sachCommunity = {
    loop: true,
    autoplay: true,
    center: true,
    nav: false,
    dots: true,
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

  console.log(testData);

  const life = AboutData.map((item) => {
    return (
      <>
        <h2 className="overview-title">{item.key == 2 ? item.title : ""}</h2>
        <p className="overview-para">{item.key == 2 ? parseHtml(item.description) : ""}</p>
      </>
    );
  });

  const birth = AboutData.map((item) => {
    return (
      <>
        <h2 className="overview-title">{item.key == 3 ? item.title : ""}</h2>
        <p className="overview-para">{item.key == 3 ? parseHtml(item.description) : ""}</p>
      </>
    );
  });

  const ageing = AboutData.map((item) => {
    return (
      <>
        <h2 className="overview-title">{item.key == 4 ? item.title : ""}</h2>
        <p className="overview-para">{item.key == 4 ? parseHtml(item.description) : ""}</p>
      </>
    );
  });

  const sickness = AboutData.map((item) => {
    return (
      <>
        <h2 className="overview-title">{item.key == 5 ? item.title : ""}</h2>
        <p className="overview-para">{item.key == 5 ? parseHtml(item.description) : ""}</p>
      </>
    );
  });

  const loved = AboutData.map((item) => {
    return (
      <>
        <h2 className="overview-title">{item.key == 6 ? item.title : ""}</h2>
        <p className="overview-para">{item.key == 6 ? parseHtml(item.description) : ""}</p>
      </>
    );
  });

  const suffering = AboutData.map((item) => {
    return (
      <>
        <h2 className="overview-title">{item.key == 7 ? item.title : ""}</h2>
        <p className="overview-para">{item.key == 7 ? parseHtml(item.description1) : ""}</p>
        <p className="overview-para">{item.key == 7 ? parseHtml(item.description2) : ""}</p>
      </>
    );
  });

  const suffering2 = AboutData.map((item) => {
    return (
      <>
        <p className="overview-para">{item.key == 7 ? parseHtml(item.description3) : ""}</p>
        <p className="overview-para">{item.key == 7 ? parseHtml(item.description4) : ""}</p>
        <p className="overview-para">{item.key == 7 ? parseHtml(item.description5) : ""}</p>
      </>
    );
  });

  const vision = AboutData.map((item) => {
    return (
      <>
        <h1 className="vision-mission-title">{item.key == 8 ? item.title : ""}</h1>
        <p className="vision-mission-para mb-5">{item.key == 8 ? parseHtml(item.description) : ""}</p>
      </>
    );
  });

  const mission = AboutData.map((item) => {
    return (
      <>
        <h1 className="vision-mission-title">{item.key == 9 ? item.title : ""}</h1>
        <p className="vision-mission-para">{item.key == 9 ? parseHtml(item.description) : ""}</p>
      </>
    );
  });

  // const options = {
  //   margin: 50,
  //   loop: true,
  //   autoplay: true,
  //   nav: true,
  //   navText: [
  //     '<svg width="8" height="14" viewBox="0 0 8 14" fill="#201429" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0.500504 6.99991C0.500504 6.77191 0.577504 6.54491 0.732504 6.35991L5.7325 0.359909C6.0855 -0.064091 6.7165 -0.122091 7.1405 0.231909C7.5645 0.584909 7.6215 1.21491 7.2685 1.63991L2.7925 7.01091L7.1075 12.3729C7.4535 12.8029 7.3855 13.4329 6.9555 13.7789C6.5255 14.1249 5.8965 14.0569 5.5495 13.6269L0.721504 7.62691C0.574505 7.44391 0.500504 7.22191 0.500504 6.99991Z"/></svg>',
  //     '<svg width="8" height="14" viewBox="0 0 8 14" fill="#201429" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.4995 6.99991C7.4995 6.77191 7.4225 6.54491 7.2675 6.35991L2.2675 0.359909C1.9145 -0.064091 1.2835 -0.122091 0.859495 0.231909C0.435495 0.584909 0.378496 1.21491 0.731496 1.63991L5.2075 7.01091L0.892496 12.3729C0.546496 12.8029 0.614496 13.4329 1.0445 13.7789C1.4745 14.1249 2.1035 14.0569 2.4505 13.6269L7.2785 7.62691C7.4255 7.44391 7.4995 7.22191 7.4995 6.99991Z"/></svg>',
  //   ],
  //   dots: false,
  //   autoplayTimeout: 4000,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 1,
  //     },
  //     1000: {
  //       items: 1,
  //     },
  //   },
  // };

  return (
    <>
      <section className="aboutus-hero-section">
        <video className="overview-hero-video" autoPlay={true} loop muted>
          <source src="https://sach-public-file.s3.ap-south-1.amazonaws.com/lamdingpageBGVideo.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="py-md-5 py-3">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                <div className="col-lg-12">
                  <div className="sach-title mb-4">
                    <h1 className="f-700 fs-40 text-md-start text-center">Overview</h1>
                  </div>
                </div>

                <div className="col-12">{life}</div>

                <div className="col-12">{birth}</div>

                <div className="col-12">{ageing}</div>

                <div className="col-12">{sickness}</div>

                <div className="col-12">{loved}</div>

                <div className="col-12">{suffering}</div>

                <div className="col-12 py-5 my-5">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">{suffering2}</div>
                    <div className="col-lg-5 col-md-5 col-sm-12 offset-lg-1 offset-md-1">
                      <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/OverviewPage/subhashChandra.png" alt="Dr. Subhash Chandra" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision-mission">
        <div className="container py-3">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  {vision}
                  <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/OverviewPage/vision.png" alt="Vision" className="img-fluid" />
                </div>
                <div className="col-md-6 col-sm-12">
                  <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/OverviewPage/mission.png" alt="Mission" className="img-fluid" />
                  {mission}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="my-gap-8">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="sach-title">
                <h1 className="f-700 fs-40 text-center">
                  Success <span className="text-sach">Stories</span>
                </h1>
                <p className="text-center">Please write your success stories here with or without SACH.</p>
              </div>
            </div>
            <div className="col-lg-12 text-center mt-5">
              <a href="#" className="btn btn-sach bg-sach-dark px-5">
                View more
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g id="Property 1=arrow-right">
                    <path id="Icon" fillRule="evenodd" clipRule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" />
                  </g>
                </svg>
              </a>
            </div>

            <div className="col-md-12">
              <OwlCarousel className="owl-theme successStories custom-owl-nav-3 custom-owl-nav-4" {...options}>
                <div className="item">
                  <div className="row">
                    <div className="col-md-10 col-sm-12 mx-auto">
                      <div className="row">
                        <div className="col-md-6 success-stories">
                          <img src={QuoteLeft} className="quote" alt="Quote" />
                          <h2 className="title">Great Place to Improvise yourself</h2>
                          <p className="para">This Docquity Privacy and Data Protection Policy applies to the collection, storage, processing, transfer, and use of Personal Data concerning its customers</p>
                          <p className="para">This Docquity Privacy and Data Protection Policy applies to the collection, storage, processing, transfer, and use of Personal Data concerning its customers</p>
                          <strong className="name">Kanika Gaur</strong>
                          <span className="occupation">Student</span>
                        </div>
                        <div className="col-md-4 offset-md-2">
                          <img src={SuccessStories1} alt="Stories" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-md-10 col-sm-12 mx-auto">
                      <div className="row">
                        <div className="col-md-6 success-stories">
                          <img src={QuoteLeft} className="quote" alt="Quote" />
                          <h2 className="title">Great Place to Improvise yourself</h2>
                          <p className="para">This Docquity Privacy and Data Protection Policy applies to the collection, storage, processing, transfer, and use of Personal Data concerning its customers</p>
                          <p className="para">This Docquity Privacy and Data Protection Policy applies to the collection, storage, processing, transfer, and use of Personal Data concerning its customers</p>
                          <strong className="name">Kanika Gaur</strong>
                          <span className="occupation">Student</span>
                        </div>
                        <div className="col-md-4 offset-md-2">
                          <img src={SuccessStories1} alt="Stories" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="row">
                    <div className="col-md-10 col-sm-12 mx-auto">
                      <div className="row">
                        <div className="col-md-6 success-stories">
                          <img src={QuoteLeft} className="quote" alt="Quote" />
                          <h2 className="title">Great Place to Improvise yourself</h2>
                          <p className="para">This Docquity Privacy and Data Protection Policy applies to the collection, storage, processing, transfer, and use of Personal Data concerning its customers</p>
                          <p className="para">This Docquity Privacy and Data Protection Policy applies to the collection, storage, processing, transfer, and use of Personal Data concerning its customers</p>
                          <strong className="name">Kanika Gaur</strong>
                          <span className="occupation">Student</span>
                        </div>
                        <div className="col-md-4 offset-md-2">
                          <img src={SuccessStories1} alt="Stories" className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-5">
        <div className="container py-md-4 py-0">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="sach-title text-center">
                <h1 className="f-900">
                  The members of <img src={require("../../../static/user/img/sach-icon.svg").default} /> Community
                  <br /> have to say about
                </h1>
                <p>Here what our people have to say about us and how this platform has changed their lives</p>
              </div>
            </div>

            <div className="col-lg-12">
              <OwlCarousel className="owl-carousel owl-theme" id="sachCommunity" {...sachCommunity}>
                {testData &&
                  testData.slice(0, 3).map((tstmData, index) => {
                    return (
                      <div className="item" key={index}>
                        <p>
                          <Link to="/user/testimonials">{parseHtml(tstmData.descriptionPlain.substring(0, 80))}</Link>
                        </p>
                        <div className="testimInfo">
                          <img src={tstmData.authorImg} alt="author-img" />
                          <span>{tstmData.author}</span>
                          <i>{tstmData.designation}</i>
                        </div>
                      </div>
                    );
                  })}
              </OwlCarousel>
            </div>

            <div className="col-lg-12 text-center">
              <Link to="/user/testimonials" className="btn btn-sach bg-sach-dark">
                View more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AdviseTopicRequestComponent type="ABOUT" />

      <section className="newsletter about-newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="sach-title">
                <h1 className="f-700 fs-40 text-white text-center">Subscribe to Weekly thoughts by Dr. Subhash Chandra. </h1>
                <p className="text-white text-center">Join our subscribers list to get weekly videos and thoughts from Dr. Subhash Chandra on diffrent topics, suggestions and solutions.</p>
              </div>
              <div className="row g-3 align-items-center my-md-4 my-2">
                <div className="col-lg-8">
                  <input type="text" id="newsletterEmail" className="form-control p-3 pe-5 transpInput" placeholder="Enter E-mail" />
                </div>
                <div className="col-lg-4 col-sm-12 text-md-start text-center">
                  <a href="#" className="btn btn-sach bg-sach w-100 justify-content-center">
                    Get Started
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <g id="Property 1=arrow-right">
                        <path id="Icon" fillRule="evenodd" clipRule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" />
                      </g>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { adviseTopicReducer, CommonReducer } = state;

  return {
    toastData: CommonReducer.toastData,
    toastType: CommonReducer.toastType,
    testData: CommonReducer.testData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adviseTopicRequest: (data) => dispatch(adviseTopicRequest(data)),
    getTop3Testdata: (data) => dispatch(getTop3Testdata({})),
    resetToast: () => dispatch(resetToast()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutOverview);
