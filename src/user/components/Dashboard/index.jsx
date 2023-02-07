import React, { useEffect, useState } from "react";
import { parseHtml, checkAuthentication } from "../../../utils/util";

import OwlCarousel from "react-owl-carousel";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../../../commons/Login";
import { Modal } from "antd";
import { showPopup } from "../../../redux/action/common";
import { fetchBlogsData } from "../../../redux/action/user/blogs";

import { getTop3Testdata, getTopVideosHome } from "../../../redux/action/common-action";
import VideoImage from "../../../static/user/img/video-bg.png";
import Hope from "../../../static/user/img/img-icons/hope.svg";
import Happiness from "../../../static/user/img/img-icons/happiness.svg";
import Health from "../../../static/user/img/img-icons/health.svg";
import Aspiration from "../../../static/user/img/img-icons/aspiration.svg";
import OfferImage from "../../../static/user/img/we-offer.png";
import OfferImageThumb from "../../../static/user/img/we-offer-thumb.jpg";
import UserImage from "../../../static/user/img/user-image.png";
import SearchIcon from "../../../static/user/img/sach-icon.svg";
import slide_3 from "../../../static/user/img/slide-3.png";
import arrow_pointer from "../../../static/user/img/arrow-pointer.png";
import blog_1 from "../../../static/user/img/blog-1.png";
import Subcriber from "../common/Subscriber";
import { TopData, PhilosphyData, offerData, eventData, happinessData, soluionData } from "./mockData";
import { UserRoutes } from "../../../routes";
import { stubFalse } from "lodash";

const Dashboard = (props) => {
  const { commonData, showPopup, testData, showTop3Test, getTop3Testdata, topVideos, getTopVideosHome, fetchBlogsData, blogsData } = props;
  const [onData, setOnData] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCategoryVideos, setSelectedCategoryVideos] = useState([]);
  const [isActiveHappiness, setIsActiveHappiness] = useState(0);

  useEffect(() => {
    const videosAndCategories = topVideos?.sectionData?.videoInfo;
    if (videosAndCategories) {
      setSelectedCategoryId(videosAndCategories[0]?.title);
      setSelectedCategoryVideos(videosAndCategories[0]?.cards);
    }
  }, [topVideos]);
  const allCategories = () => {
    const videosAndCategories = topVideos?.sectionData?.videoInfo;
    const categories = [];
    for (let i = 0; i < videosAndCategories?.length; i++) {
      const catVideos = videosAndCategories[i].cards;
      let catId, subCatId;
      for (let j = 0; j < catVideos?.length; j++) {
        catId = catVideos[j].categoryId;
        subCatId = catVideos[j].subCategoryId;
      }
      categories.push({ title: videosAndCategories[i]?.title, catId: catId, subCatId: subCatId });
    }
    return categories;
  };

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = '!function (e, t, i) { if (void 0 === e._dyntube_v1_init) { e._dyntube_v1_init = !0; var a = t.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = "https://embed.dyntube.com/v1.0/dyntube.js", t.getElementsByTagName("head")[0].appendChild(a) } }(window, document);  ';
    document.body.appendChild(s);
    document.querySelector("body").scrollTo(0, 0);
    getTop3Testdata({});
    getTopVideosHome({});
    fetchBlogsData({ limit: 3 });
    // allCategories();
  }, []);

  const handleCategoryWiseVideos = (item) => {
    setSelectedCategoryId(item.title);

    const videosAndCategories = topVideos?.sectionData?.videoInfo;

    setTimeout(() => {
      const videos = [];
      for (let i = 0; i < videosAndCategories?.length; i++) {
        if (item.title === videosAndCategories[i].title) {
          const catVideos = videosAndCategories[i].cards;
          for (let j = 0; j < catVideos?.length; j++) {
            videos.push(catVideos[j]);
          }
        }
      }
      setSelectedCategoryVideos(videos);
    }, 10);

    setTimeout(() => {
      const videos = [];
      for (let i = 0; i < videosAndCategories?.length; i++) {
        if (item.title === videosAndCategories[i].title) {
          const catVideos = videosAndCategories[i].cards;
          for (let j = 0; j < catVideos?.length; j++) {
            videos.push(catVideos[j]);
          }
        }
      }
      setSelectedCategoryVideos(videos);
    }, 10);
  };

  const [playBtn, setPlayBtn] = useState(1);
  let blogData;
  if (blogsData?.data?.sectionData?.categoryAndfilter?.blogs?.length > 0 && blogsData?.data?.sectionData?.categoryAndfilter?.blogs[0].itemList.length > 0) {
    blogData = blogsData?.data?.sectionData?.categoryAndfilter?.blogs[0].itemList;
  }

  const data = (
    <p>
      {parseHtml(TopData[0].desc)}
      <span className="o">You</span> again.
    </p>
  );
  const philosophy = <p className="text-md-start text-center">{PhilosphyData[0].desc}</p>;
  const category = (
    <>
      <div className="col-lg-8 col-xl-6 offset-xl-2">
        <div className="icon-box-section brdrBtm">
          <div className="icon-box-item">
            <div>
              <div className="icon-box">
                <img className="img-fluid" src={Hope} alt="Icon" />
              </div>
              <div className="content">
                <h4>{PhilosphyData[0].category[0].type}</h4>
                <p>{parseHtml(PhilosphyData[0].category[0].desc)}</p>
              </div>
            </div>
          </div>

          <div className="icon-box-item">
            <div>
              <div className="icon-box">
                <img className="img-fluid" src={Happiness} alt="Icon" />
              </div>
              <div className="content">
                <h4>{PhilosphyData[0].category[1].type}</h4>
                <p>{parseHtml(PhilosphyData[0].category[1].desc)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="icon-box-section">
          <div className="icon-box-item">
            <div>
              <div className="icon-box">
                <img className="img-fluid" src={Health} alt="Icon" />
              </div>
              <div className="content">
                <h4>{PhilosphyData[0].category[2].type}</h4>
                <p>{parseHtml(PhilosphyData[0].category[2].desc)}</p>
              </div>
            </div>
          </div>
          <div className="icon-box-item">
            <div>
              <div className="icon-box">
                <img className="img-fluid" src={Aspiration} alt="Icon" />
              </div>
              <div className="content">
                <h4>{PhilosphyData[0].category[3].type}</h4>
                <p>{parseHtml(PhilosphyData[0].category[3].desc)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const offer = <p>{offerData[0].description}</p>;
  // eventData;
  const event = (
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionWeOffer">
      <div className="accordion-body py-1">
        <strong className="d-block mb-3">{eventData[0].title}:</strong>
        <p>{eventData[0].description}</p>
        <Link to="/user/events" className="theme-dark f-600">
          Get Started <i className="bi bi-arrow-right text-dark"></i>
        </Link>
      </div>
    </div>
  );

  const Happyness = (
    <section className="light-bg my-gap-7 py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="sach-title text-center">
              <h1 className="f-700 fs-40">
                How we can create <span className="o">Happiness</span> in your life
              </h1>
              <p>{happinessData[0].description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          {happinessData[0]?.type.map((elm, index) => {
            return (
              <div className="col-lg-3 col-sm-6">
                <div className={`card happiness-card ${index % 2 === 0 ? "line-card" : "circle-card"} ${isActiveHappiness === index ? "active" : ""}`} onMouseEnter={() => setIsActiveHappiness(index)}>
                  <div className="card-body">
                    <h5 className="card-title">{elm.title}</h5>
                    <p className="card-text">{elm.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  const blog1 = (
    <div
      className="col-lg-5"
      onClick={() => {
        navigate(UserRoutes.BLOG_DETAIL + "?id=" + blogData?.[0].blogId);
      }}
    >
      <div className="card custom-blog-card cb-card-1">
        <img src={blogData?.[0].blogThumnail} alt="Blog-Image" className="img-fluid" />
        <div className="card-body">
          <h6 className="card-title">{blogData?.[0].tags?.[0]} </h6>
          <h6 className="card-heading">{blogData?.[0].title} </h6>
          <p className="card-text">{parseHtml(blogData?.[0].desc)}</p>
          <p className="time">
            by {blogData?.[0].author} • {blogData?.[0].date}
          </p>
        </div>
      </div>
    </div>
  );

  const blogsImage1 = {
    backgroundImage: "url(img/blog-2.png)",
  };

  const blogsImage2 = {
    backgroundImage: "url(img/blog-3.png)",
  };

  const blogs = (
    <>
      <div
        className="col-lg-12"
        onClick={() => {
          navigate(UserRoutes.BLOG_DETAIL + "?id=" + blogData?.[1].blogId);
        }}
      >
        <div className="card custom-blog-card ms-md-2 cb-card-2">
          <div className="row g-0">
            <div className="col-md-4 col-12">
              <div className="blog-bg">
                <img src={blogData?.[1].blogThumnail} alt="Blog-Image" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h6 className="card-title">{blogData?.[1].tags?.[0]} </h6>
                <h6 className="card-heading">{blogData?.[1].title} </h6>
                <p className="card-text-2">{parseHtml(blogData?.[1].desc)}</p>
                <p className="time mt-3">
                  by {blogData?.[1].author} • {blogData?.[1].date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-lg-12"
        onClick={() => {
          navigate(UserRoutes.BLOG_DETAIL + "?id=" + blogData?.[2].blogId);
        }}
      >
        <div className="card custom-blog-card ms-md-2 cb-card-2">
          <div className="row g-0">
            <div className="col-md-4 col-12">
              <img src={blogData?.[2].blogThumnail} alt="Blog-Image" className="img-fluid" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h6 className="card-title">{blogData?.[2].tags?.[0]}</h6>
                <h6 className="card-heading">{blogData?.[2].title}</h6>
                <p className="card-text-2">{parseHtml(blogData?.[2].desc)}</p>
                <p className="time mt-3">
                  by {blogData?.[2].author} • {blogData?.[2].date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const [playing, setPlaying] = useState(true);
  const [secondPlaying, setSecondPlayingg] = useState(true);

  const [playerModal, setPlayerModal] = useState(false);
  const [playerSecondModal, setPlayerSecondModal] = useState(false);

  function handleClick() {
    setPlayBtn(0);
  }

  const handleVideo = (e) => {
    setPlayerModal(true);
    setIsLoader(true);
    window.addEventListener("dyntubeReady", () => {
      setIsLoader(false);
      var player = dyntube.getPlayer("51v8eyn640z7a8IbyDong");
      player.play();
    });
  };

  const handleSecondVideo = (e) => {
    setPlayerSecondModal(true);
    setIsLoader(true);
    window.addEventListener("dyntubeReady", () => {
      setIsLoader(false);
      var player = dyntube.getPlayer("lBpB657e8keGj4nCuWpxA");
      player.play();
    });
  };

  const onLoadingVideoHandler = () => {
    setTimeout(() => setShowLoading(false), 500);
  };
  const handleSecondCancel = () => {
    setSecondPlayingg(false);
    pauseVideo();
    setTimeout(() => setPlayerSecondModal(false), 500);
    setPlayBtn(1);
  };

  const handleCancel = () => {
    setPlaying(false);
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
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  };

  const solutionsVideos = {
    loop: false,
    autoplay: true,
    nav: false,
    dots: true,
    // center: true,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  };

  const soltionDesc = <p>{soluionData[0].description}</p>;
  const solutionsPills = {
    margin: 10,
    loop: false,
    autoplay: false,
    autoWidth: true,
    nav: true,
    navText: [
      '<svg width="8" height="14" viewBox="0 0 8 14" fill="#201429" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clip-rule="evenodd" d="M0.500504 6.99991C0.500504 6.77191 0.577504 6.54491 0.732504 6.35991L5.7325 0.359909C6.0855 -0.064091 6.7165 -0.122091 7.1405 0.231909C7.5645 0.584909 7.6215 1.21491 7.2685 1.63991L2.7925 7.01091L7.1075 12.3729C7.4535 12.8029 7.3855 13.4329 6.9555 13.7789C6.5255 14.1249 5.8965 14.0569 5.5495 13.6269L0.721504 7.62691C0.574505 7.44391 0.500504 7.22191 0.500504 6.99991Z"/></svg>',
      '<svg width="8" height="14" viewBox="0 0 8 14" fill="#201429" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clip-rule="evenodd" d="M7.4995 6.99991C7.4995 6.77191 7.4225 6.54491 7.2675 6.35991L2.2675 0.359909C1.9145 -0.064091 1.2835 -0.122091 0.859495 0.231909C0.435495 0.584909 0.378496 1.21491 0.731496 1.63991L5.2075 7.01091L0.892496 12.3729C0.546496 12.8029 0.614496 13.4329 1.0445 13.7789C1.4745 14.1249 2.1035 14.0569 2.4505 13.6269L7.2785 7.62691C7.4255 7.44391 7.4995 7.22191 7.4995 6.99991Z"/></svg>',
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

  const renderLoginPopup = () => {
    return (
      <Modal
        className="w-100"
        centered
        open={true}
        // onOk={handleDeleteEvent}
        onCancel={() => showPopup(null)}
        footer={null}
      >
        {" "}
        <Login />{" "}
      </Modal>
    );
  };

  const top3TestDets = () => {
    const top3Test = testData.slice(0, 3);
    return (
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
              <OwlCarousel className="owl-theme" id="sachCommunity" {...sachCommunity}>
                {top3Test[0] && (
                  <div className="item">
                    {top3Test[0].descriptionPlain.length > 80 ? (
                      <p>
                        <Link to="/user/testimonials">{parseHtml(top3Test[0].descriptionPlain.substring(0, 80))}</Link>
                      </p>
                    ) : (
                      <p>{parseHtml(top3Test[0].descriptionPlain)}</p>
                    )}
                    <div className="testimInfo">
                      <img src={top3Test[0].authorImg} alt="icon" />
                      <span>{top3Test[0].author}</span>
                      <i>{top3Test[0].designation}</i>
                    </div>
                  </div>
                )}
                {top3Test[1] && (
                  <div className="item">
                    {top3Test[1].descriptionPlain.length > 80 ? (
                      <p>
                        <Link to="/user/testimonials">{parseHtml(top3Test[1].descriptionPlain.substring(0, 80))}</Link>
                      </p>
                    ) : (
                      <p>{parseHtml(top3Test[1].descriptionPlain)}</p>
                    )}
                    <div className="testimInfo">
                      <img src={top3Test[1].authorImg} alt="icon" />
                      <span>{top3Test[1].author}</span>
                      <i>{top3Test[1].designation}</i>
                    </div>
                  </div>
                )}
                {top3Test[2] && (
                  <div className="item">
                    {top3Test[2].descriptionPlain.length > 80 ? (
                      <p>
                        <Link to="/user/testimonials">{parseHtml(top3Test[2].descriptionPlain.substring(0, 80))}</Link>
                      </p>
                    ) : (
                      <p>{parseHtml(top3Test[2].descriptionPlain)}</p>
                    )}
                    <div className="testimInfo">
                      <img src={top3Test[2].authorImg} alt="icon" />
                      <span>{top3Test[2].author}</span>
                      <i>{top3Test[2].designation}</i>
                    </div>
                  </div>
                )}
              </OwlCarousel>
            </div>

            <div className="col-lg-12 text-center">
              <Link
                to="/user/testimonials"
                // onClick={() => handleViewMoreClick(category)}
                className="btn btn-sach bg-sach-dark"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-9 mx-auto text-center">
              <div className="sach-title mt-3 pt-3 mt-lg-5 pt-lg-5">
                <h1 className="f-800">
                  Get{" "}
                  <span className="o">
                    Hope, Happiness,
                    <br /> Health,
                  </span>{" "}
                  and <span className="o">Aspiration</span> in Life
                </h1>
                {data}
              </div>
            </div>
          </div>
          {!checkAuthentication() ? (
            <div className="row my-4">
              <div className="col-lg-12 text-center">
                <a
                  href="javascript:void(0);"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="btn btn-sach bg-sach-dark"
                >
                  Get Started
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Property 1=arrow-right">
                      <path id="Icon" fillRule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          ) : null}
          <div className="row mt-lg-5 mt-3">
            <div className="col-12 text-center position-relative">
              <video className="hero-video-banner" poster={VideoImage}>
                {/* <source src="../media/banner.mp4" type="video/mp4" /> */}
              </video>
              {playBtn && !playerModal ? (
                <div className="play-btn" onClick={(e) => handleVideo(e)}>
                  <i className="bi bi-play-fill"></i>
                </div>
              ) : null}
            </div>
          </div>

          {playerModal && (
            <Modal centered closable={true} onCancel={handleCancel} visible={true} footer={null} width={1100} className="home-hero-video">
              {isLoader && (
                <div className="row mt-lg-5 mt-3">
                  <div className="col-12 text-center position-relative">
                    <video className="w-100" poster={VideoImage}>
                      <source src="../media/banner.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
              <div data-dyntube-key="51v8eyn640z7a8IbyDong"></div>
            </Modal>
          )}
        </div>
      </section>

      <section className="my-gap-10">
        <div className="container py-md-5 py-0">
          <div className="row">
            <div className="col-lg-4 col-md-10 col-xl-4">
              <div className="sach-title mt-lg-5 mt-0 pt-lg-5 pt-0 text-md-start text-center">
                <h5>Our Philosophy</h5>
                <h1 className="f-700">To guide every individual to gain insight into their own life</h1>
                {philosophy}
              </div>
            </div>

            {category}
          </div>
        </div>
      </section>

      <section className="my-gap-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 me-auto ms-lg-4">
              <div className="sach-title">
                <h1 className="f-700">
                  What we offer in <img src={SearchIcon} />
                </h1>
                {offer}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 ms-lg-4">
              <div className="accordion sach-accordion" id="accordionWeOffer">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <i>01</i>Events
                    </button>
                  </h2>
                  {event}
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <i>02</i>Counselling
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionWeOffer">
                    <div className="accordion-body py-1">
                      <strong className="d-block mb-3">Attend Online Recorded and live events:</strong>
                      <p>You can view online recorded and live events according to your choice of subjects where the Aachaaryas talk about different issues touching your lives. Also Sach (Subhash Chandra) shows can be watched.</p>
                      <Link to="/user/counseling" className="theme-dark f-600">
                        Get Started <i className="bi bi-arrow-right text-dark"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col me-4">
              <div className="card video-card border-0">
                <div className="card-body position-relative">
                  <div className="row mt-lg-5 mt-3">
                    <div className="col-12">
                      <video className="w-100 mt-2" poster={OfferImage} onClick={() => handleSecondVideo()}>
                        {/* <source src="../media/movie.mp4" type="video/mp4" /> */}
                      </video>
                      {playBtn && !playerSecondModal ? (
                        <div className="play-btn" onClick={(e) => handleSecondVideo(e)}>
                          <i className="bi bi-play-fill"></i>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {playerSecondModal && (
                    <Modal centered closable={true} onCancel={handleSecondCancel} visible={true} footer={null} width={1100} className="home-hero-video">
                      {/* {isLoader && <div className="row mt-lg-5 mt-3">
                    <div className="col-12 text-center position-relative">
                        <video className="w-100 mt-2" poster={OfferImage}>
                          <source src="../media/movie.mp4" type="video/mp4" />
                        </video>
                        <img src={OfferImageThumb} className="img-fluid" alt="video-thumb" />
                      </div>
                    </div>} */}
                      {isLoader && (
                        <div className="row mt-lg-5 mt-3">
                          <div className="col-12 text-center position-relative">
                            <video className="w-100 rounded" poster={OfferImageThumb}>
                              <source src="../media/banner.mp4" type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      )}
                      <div data-dyntube-key="lBpB657e8keGj4nCuWpxA"></div>
                    </Modal>
                  )}

                  <div>
                    <div className="card-speaker">
                      <div className="speaker-dp">
                        <img src={UserImage} alt="Speaker" />
                      </div>
                      <div className="speaker-details">
                        <h6>Dr. Subhash Chandra</h6>
                        <span>Speaker</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {Happyness}

      <section className="solutions-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="sach-title text-center">
                <h1 className="f-700 fs-40">
                  Find <span className="o">Solutions</span> to any of your <span className="o">Sufferings</span>
                  <br /> faced at any stage of life.
                </h1>
                {soltionDesc}
              </div>
            </div>
          </div>
          {/* {topVideos?.sectionData?.videoInfo && homePageCategories()} */}
          <div>
            <div className="row">
              <div className="col-lg-12 col-lg-12 mt-3 mb-4">
                {selectedCategoryId && (
                  <OwlCarousel className="owl-carousel owl-theme custom-owl-nav-1" id="solutionsPills" {...solutionsPills}>
                    {allCategories().map((item) => {
                      return (
                        <div className="item" key={item.title}>
                          <span onClick={() => handleCategoryWiseVideos(item)} className={selectedCategoryId === item.title ? "badge bg-light text-dark custom-badge rounded-pill active" : "badge bg-light text-dark custom-badge rounded-pill"} role="button">
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 mb-4 mb-md-5">
                {selectedCategoryVideos.length > 0 && (
                  <OwlCarousel className="owl-carousel owl-theme" id="solutionsVideos" {...solutionsVideos}>
                    {selectedCategoryVideos.map((vid, i) => {
                      return (
                        <div
                          className="item"
                          key={i}
                          onClick={() => {
                            navigate(UserRoutes.CATEGORY_VIDEO_PAGE + "?catId=" + vid.categoryId + "&subCatId=" + vid.subCategoryId + "&videoId=" + vid.videoId);
                          }}
                        >
                          <div className="card filtered-video">
                            <div className="video-thumb">
                              <img src={vid.icon} alt="video-thumb" />
                              <span className="video-play-btn"></span>
                            </div>
                            <div className="card-body pb-0">
                              <h6 className="card-title">{vid.title}</h6>
                              <p className="card-text">
                                <span>{vid.categoryName}</span>
                                <i className="bi bi-circle-fill"></i>
                                {vid.duration}
                              </p>
                              <p className="info">{vid.title}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </OwlCarousel>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="light-bg py-5">
        <div className="container py-3">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="sach-title text-center">
                <h1 className="f-700 fs-40">
                  How <img src={SearchIcon} /> has <span className="o">gained capabilities</span>
                  <br /> to be able to help you.
                </h1>
                <p>Subhash Chandra has gained knowledge and experience since his childhood from his grandfather Late Jagan Nath Ji Goenka and Late S.N. Goenka (Vipassanacharya) and the gurus/ teachers inside the thousands of people, out of lacs of people he met throughout his life.</p>
                <p>He has seen all kinds of Ups & Downs, Success & Failures, sincere individuals as well as not so sincere people who claimed friendship.</p>
                <p>He has gained knowledge/wisdom by observing people who were seen a happy, also who were suffering from poverty, sickness, being lonely, under stress due to debt burden, bad relations with their spouse, family member (s), property disputes, other kind of litigations, weakness of various kind, failure in schools/colleges and facing other kind of failures in life, Joblessness, losses in business, sadness and depression.</p>
                <p>
                  Having gained such rich experience he started a 'DSC show' (Dr. Subhash Chandra Show) on television. This is a motivational show, which gained popularity. He has been getting thousands and lacs of mails seeking solutions to the problems from fellow Indians from all walks of life. He has tried to answer to his best ability in the time available. Due to large scale of dis-satisfaction and confused state of minds amongst youth and people of all walks of life, he has decided to share his wisdom by using technology. This will enable him to answer largescale issues. He hopes that his experience in similar situations will assist most if not all, especially the
                  <span className="theme-orange"> Youth</span>
                </p>
                <h2 className="f-700 theme-orange my-md-5 my-4">
                  These are the 'Global Gurus ' who have mentored,
                  <br /> guided & taught Subhash Chandra in his life.
                </h2>
              </div>
            </div>
          </div>
          <div className="row mt-md-5 mt-0">
            <div className="col-lg-4 col-md-6 text-center">
              <div className="guru-img guru-bg-1">
                <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/homepage/guru-01.png" />
                <div className="guru-details">
                  <span>Late Jagan Nath Goenka</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 text-center">
              <div className="guru-img guru-bg-2">
                <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/homepage/guru-02.png" />
                <div className="guru-details">
                  <span>Late S.N. Goenka</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 text-center">
              <div className="guru-img guru-bg-3">
                <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/homepage/guru-03.png" />
                <div className="guru-details">
                  <span className="long">Teachers within the lakhs of people he met through out his life</span>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center guru-arrow">
              <img src={arrow_pointer} className="img-fluid" />
            </div>
            <div className="col-lg-4 col-md-6 mx-auto text-center">
              <div className="guru-img guru-bg-4">
                <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/homepage/guru-04.png" />
                <div className="guru-details">
                  <span className="pb-1">Dr.Subhash Chandra</span>
                  <small className="pb-2">Your Sarthi For Life</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showTop3Test && top3TestDets()}

      <section className="light-bg py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="sach-title text-center">
                <h1 className="f-700 fs-40">Blogs</h1>
                <p>If you have learnt a good lesson in life then you can write your view here and we will publish it on the website. </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9 mx-auto my-md-5 mb-4">
              <div className="row">
                {blog1}
                <div className="col-lg-7">
                  <div className="row">{blogs}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <a
                href="#"
                className="btn btn-sach bg-sach-dark"
                onClick={() => {
                  navigate(UserRoutes.USER_BLOGS);
                }}
              >
                View more
              </a>
            </div>
          </div>
        </div>
      </section>

      <Subcriber />

      <Outlet />
      {commonData?.popupType != "" && commonData?.popupType === "login" && renderLoginPopup()}
    </>
  );
};

const mapStateToProps = (state) => {
  const { CommonReducer } = state;
  const { commonData, params = {}, testData = [], showTop3Test = false, topVideos = {} } = CommonReducer;

  return {
    ...state,
    ...params,
    commonData: commonData,
    testData,
    showTop3Test,
    topVideos,
    blogsData: state?.BlogReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    getTop3Testdata: (params) => dispatch(getTop3Testdata(params)),
    getTopVideosHome: (params) => dispatch(getTopVideosHome(params)),
    fetchBlogsData: (data) => dispatch(fetchBlogsData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
