import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import Resource_1 from "../../../static/user/img/about/resources/resource-1.png";
import Resource_2 from "../../../static/user/img/about/resources/resource-2.png";
import Resource_3 from "../../../static/user/img/about/resources/resource-3.png";
import Resource_4 from "../../../static/user/img/about/resources/resource-4.png";
import ArrowImage from "../../../static/user/img/icons/arrow-right.svg";
import Download from "../../../static/user/img/icons/download.svg";
import PlayBtn from "../../../static/user/img/icons/play-btn.svg";
import zeeMedia from "../../../static/user/img/about/trustedPartners/zeeMedia.png";
import zeeLearn from "../../../static/user/img/about/trustedPartners/zeeLearn.png";
import ekalVidyalaya from "../../../static/user/img/about/trustedPartners/ekalVidyalaya.png";
import zee from "../../../static/user/img/about/trustedPartners/zee.png";
import wageningen from "../../../static/user/img/about/trustedPartners/wageningen.png";
import dishtv from "../../../static/user/img/about/trustedPartners/dishtv.png";
import madhavNetralaya from "../../../static/user/img/about/trustedPartners/madhavNetralaya.png";
import SachWhite from "../../../static/user/img/sach-icon-white.svg";
import VideoImage from "../../../static/user/img/video-bg.png";
import { FoundationData } from "./FoundationData";

import { Link } from "react-router-dom";
import "../../../static/user/js/script.js";
import { Modal } from "antd";

const FoundationInfo = (props) => {
  const [education, setEducation] = useState(true);
  const [enpowerment, setEnpowerment] = useState(false);
  const [rural, setRural] = useState(false);
  const [Entrepreneurship, setEntrepreneurship] = useState(false);
  const [playerModal, setPlayerModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [playBtn, setPlayBtn] = useState(1);
  const Data = FoundationData.map((item) => console.log(item));

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML =
      '!function (e, t, i) { if (void 0 === e._dyntube_v1_init) { e._dyntube_v1_init = !0; var a = t.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = "https://embed.dyntube.com/v1.0/dyntube.js", t.getElementsByTagName("head")[0].appendChild(a) } }(window, document);  ';
    document.body.appendChild(s);

    document.querySelector("body").scrollTo(0, 0);
  }, []);

  const handleVideo = (e) => {
    setPlayerModal(true);
    setIsLoader(true);
    window.addEventListener("dyntubeReady", () => {
      setIsLoader(false);
      var player = dyntube.getPlayer("51v8eyn640z7a8IbyDong");
      player.play();
    });
  };
  const handleEnterprenership = () => {
    setEntrepreneurship(true);
    setRural(false);
    setEnpowerment(false);
    setEducation(false);
  };
  const handleEducation = () => {
    setEntrepreneurship(false);
    setRural(false);
    setEnpowerment(false);
    setEducation(true);
  };
  const handleRural = () => {
    setEntrepreneurship(false);
    setRural(true);
    setEnpowerment(false);
    setEducation(false);
  };
  const handleEnpowerment = () => {
    setEntrepreneurship(false);
    setRural(false);
    setEnpowerment(true);
    setEducation(false);
  };
  const handleCancel = () => {
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

  const trustedPartners = {
    margin: 10,
    loop: true,
    autoplay: true,
    nav: true,
    navText: [
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="#4D4354" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M19 11H7.135L10.768 6.64003C11.122 6.21603 11.064 5.58503 10.64 5.23203C10.215 4.87803 9.585 4.93603 9.232 5.36003L4.232 11.36C4.193 11.407 4.173 11.462 4.144 11.514C4.12 11.556 4.091 11.592 4.073 11.638C4.028 11.753 4.001 11.874 4.001 11.996C4.001 11.997 4 11.999 4 12C4 12.001 4.001 12.003 4.001 12.004C4.001 12.126 4.028 12.247 4.073 12.362C4.091 12.408 4.12 12.444 4.144 12.486C4.173 12.538 4.193 12.593 4.232 12.64L9.232 18.64C9.43 18.877 9.714 19 10 19C10.226 19 10.453 18.924 10.64 18.768C11.064 18.415 11.122 17.784 10.768 17.36L7.135 13H19C19.552 13 20 12.552 20 12C20 11.448 19.552 11 19 11Z" /></g></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="#4D4354" xmlns="http://www.w3.org/2000/svg"><g id="Property 1=arrow-right"><path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" /></g></svg>',
    ],
    dots: false,
    autoplayTimeout: 4000,
    center: false,
    autoWidth: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 20,
      },
    },
  };

  const options2 = {
    margin: 15,
    loop: true,
    autoplay: false,
    nav: true,
    center: false,
    navText: [
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="#4D4354" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M19 11H7.135L10.768 6.64003C11.122 6.21603 11.064 5.58503 10.64 5.23203C10.215 4.87803 9.585 4.93603 9.232 5.36003L4.232 11.36C4.193 11.407 4.173 11.462 4.144 11.514C4.12 11.556 4.091 11.592 4.073 11.638C4.028 11.753 4.001 11.874 4.001 11.996C4.001 11.997 4 11.999 4 12C4 12.001 4.001 12.003 4.001 12.004C4.001 12.126 4.028 12.247 4.073 12.362C4.091 12.408 4.12 12.444 4.144 12.486C4.173 12.538 4.193 12.593 4.232 12.64L9.232 18.64C9.43 18.877 9.714 19 10 19C10.226 19 10.453 18.924 10.64 18.768C11.064 18.415 11.122 17.784 10.768 17.36L7.135 13H19C19.552 13 20 12.552 20 12C20 11.448 19.552 11 19 11Z" /></g></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="#4D4354" xmlns="http://www.w3.org/2000/svg"><g id="Property 1=arrow-right"><path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" /></g></svg>',
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
        items: 4,
      },
    },
  };

  return (
    <>
      <section className="foundation-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="title">
                Integrated{" "}
                <span className="text-sach d-block">Rural Development</span>
              </h1>
              <h4 className="title">
                Towards holistic development of rural india
              </h4>
              <p className="para">
                We believe in Gram Swaraj for integrated rural development of
                villages
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sach-foundation-section">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="foundation-title">
                <h1>
                  <img src={SachWhite} alt="Sach Icon" /> Foundation
                </h1>
                <p className="my-5">
                  Subhash Chandra Foundation, the philanthropic arm of Essel
                  Group is established to share, contribute and collaborate for
                  a prosperous society – a way to build inclusive & elevated
                  communities. The objective of the foundation is to help create
                  and support models across sectors spanning from the mainstream
                  to the niche sectors that provide for an equitable and
                  sustainable society....
                </p>
                <Link
                  to="/user/foundation-inner"
                  target="_blank"
                  className="btn btn-sach bg-sach"
                >
                  View More
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Property 1=arrow-right">
                      <path
                        id="Icon"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                      />
                    </g>
                  </svg>
                </Link>
                {playBtn && !playerModal ? (
                  <div className="play-btn" onClick={(e) => handleVideo(e)}>
                    <i className="bi bi-play-fill"></i>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {playerModal && (
            <Modal
              centered
              closable={true}
              onCancel={handleCancel}
              visible={true}
              footer={null}
              width={1100}
              className="home-hero-video"
            >
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

        <div className="bg-foundation"></div>
      </section>

      <section class="sach-foundation-accordion">
        <div class="container">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="accordion sach-accordion" id="accordionWeOffer">
                <div class="accordion-item aos-init aos-animate">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      onClick={() => handleEducation()}
                    >
                      <i>01</i>Education
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionWeOffer"
                  >
                    <div class="accordion-body py-1 pe-5">
                      <ul>
                        <li>
                          Supporting early child education through Ekal
                          Vidyalaya.
                        </li>
                        <li>
                          Providing education scholarships to meritorious girl
                          students through SACH Scholarship.
                        </li>
                      </ul>
                      <Link
                        to="/user/child_education"
                        className="theme-dark f-600 card-btn"
                      >
                        <u>Know More</u>{" "}
                        <img
                          src={
                            require("../../../static/user/img/icons/arrow-right.svg")
                              .default
                          }
                          className="ms-2"
                          alt="Arrow"
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="accordion-item aos-init aos-animate">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      onClick={() => handleEnpowerment()}
                    >
                      <i>02</i>Empowerment
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionWeOffer"
                  >
                    <div class="accordion-body py-1 pe-5">
                      <ul>
                        <li>
                          Empowering the citizens through Sarthi, our flagship
                          initiative.
                        </li>
                        <li>
                          Inspiring and motivating the youth through Subhash
                          Chandra Show.
                        </li>
                      </ul>
                      <Link
                        to="/user/sach_sarthi"
                        className="theme-dark f-600 card-btn"
                      >
                        <u>Know More</u>{" "}
                        <img
                          src={
                            require("../../../static/user/img/icons/arrow-right.svg")
                              .default
                          }
                          className="ms-2"
                          alt="Arrow"
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="accordion-item aos-init aos-animate">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                      onClick={() => handleRural()}
                    >
                      <i>03</i>Integrated Rural Development
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionWeOffer"
                  >
                    <div class="accordion-body py-1 pe-5">
                      <ul>
                        <li>
                          Improving the living conditions of rural communities
                          through Village Development.
                        </li>
                        <li>Promoting Sustainable Agriculture Development.</li>
                      </ul>
                      <Link
                        to="/user/sach_agriculture"
                        className="theme-dark f-600 card-btn"
                      >
                        <u>Know More</u>{" "}
                        <img
                          src={
                            require("../../../static/user/img/icons/arrow-right.svg")
                              .default
                          }
                          className="ms-2"
                          alt="Arrow"
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="accordion-item aos-init aos-animate">
                  <h2 class="accordion-header" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                      onClick={() => handleEnterprenership()}
                    >
                      <i>04</i>Entrepreneurship
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionWeOffer"
                  >
                    <div class="accordion-body py-1 pe-5">
                      <ul>
                        <li>
                          Promoting new ideas and innovation through
                          Esselerator, the accelerator program.
                        </li>
                        <li>
                          Nurturing social enterprises through Sach Impact.
                        </li>
                      </ul>
                      <Link
                        to="/user/sach_esselerator"
                        className="theme-dark f-600 card-btn"
                      >
                        <u>Know More</u>{" "}
                        <img
                          src={
                            require("../../../static/user/img/icons/arrow-right.svg")
                              .default
                          }
                          className="ms-2"
                          alt="Arrow"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {education && <div className="bg-1" id="bg-accordion"></div>}
        {enpowerment && <div className="bg-2" id="bg-accordion"></div>}
        {rural && <div className="bg-3" id="bg-accordion"></div>}
        {Entrepreneurship && <div className="bg-4" id="bg-accordion"></div>}
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sach-title mb-4">
                <h1 className="f-700 fs-40 text-center">Trusted Partners</h1>
                <p className="text-center">
                  In publishing and graphic design, Lorem ipsum is a
                  placehold....
                </p>
              </div>
            </div>

            <div className="col-lg-12">
              <OwlCarousel
                className="owl-theme trustedPartners custom-owl-nav-3 custom-owl-nav-4"
                {...trustedPartners}
              >
                <div className="item">
                  <div className="partnersLogo">
                    <img src={zeeMedia} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={zeeLearn} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={ekalVidyalaya} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={zee} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={wageningen} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={dishtv} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={madhavNetralaya} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={zee} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={wageningen} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={dishtv} alt="Trusted Partners" />
                  </div>
                </div>
                <div className="item">
                  <div className="partnersLogo">
                    <img src={madhavNetralaya} alt="Trusted Partners" />
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="sach-title mb-5">
                <h1 className="f-700 fs-40 text-center">Resources</h1>
                <p className="text-center">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate...
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <OwlCarousel
                className="owl-theme resources custom-owl-nav-3 custom-owl-nav-4"
                {...options2}
              >
                <div className="item">
                  <div className="card resource-card">
                    <img
                      src={Resource_1}
                      className="card-img-top"
                      alt="Resources"
                    />
                    <div className="card-body">
                      <span className="badge rounded-pill bg-sach text-white mb-2">
                        Brochure
                      </span>
                      <h5 className="card-title">Subhash Chandra Foundation</h5>
                      <p className="card-text">
                        In publishing and graphic design, Lorem ipsum is a
                        placehold....
                      </p>
                      <a href="#" className="card-btn">
                        <img src={Download} className="me-2" alt="Download" />{" "}
                        Download Now
                      </a>
                    </div>
                  </div>
                </div>

                <div className="item">
                  <div className="card resource-card">
                    <img
                      src={Resource_2}
                      className="card-img-top"
                      alt="Resources"
                    />
                    <div className="card-body">
                      <span className="badge rounded-pill bg-sach text-white mb-2">
                        Media
                      </span>
                      <h5 className="card-title">
                        Subhash Chandra Foundation Partners with Wageningen
                        University & Research
                      </h5>
                      <a href="#" className="card-btn">
                        <img src={Download} className="me-2" alt="Download" />{" "}
                        Download Now
                      </a>
                    </div>
                  </div>
                </div>

                <div className="item">
                  <div className="card resource-card">
                    <img
                      src={Resource_3}
                      className="card-img-top"
                      alt="Resources"
                    />
                    <div className="card-body">
                      <span className="badge rounded-pill bg-sach text-white mb-2">
                        Impact Story
                      </span>
                      <h5 className="card-title">Livelihood Story</h5>
                      <p className="card-text">
                        In publishing and graphic design, Lorem ipsum is a
                        placehold....
                      </p>
                      <a href="#" className="card-btn">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>

                <div className="item">
                  <div className="card resource-card">
                    <img
                      src={Resource_4}
                      className="card-img-top"
                      alt="Resources"
                    />
                    <div className="card-body">
                      <span className="badge rounded-pill bg-sach text-white mb-2">
                        SARTHI HAQ
                      </span>
                      <h5 className="card-title">Sarthi HAQ</h5>
                      <p className="card-text">
                        In publishing and graphic design, Lorem ipsum is a
                        placehold....
                      </p>
                      <a href="#" className="card-btn">
                        <img src={PlayBtn} className="me-2" alt="Play Button" />{" "}
                        Watch Video
                      </a>
                    </div>
                  </div>
                </div>

                <div className="item">
                  <div className="card resource-card">
                    <img
                      src={Resource_2}
                      className="card-img-top"
                      alt="Resources"
                    />
                    <div className="card-body">
                      <span className="badge rounded-pill bg-sach text-white mb-2">
                        Media
                      </span>
                      <h5 className="card-title">
                        Subhash Chandra Foundation Partners with Wageningen
                        University & Research
                      </h5>
                      <a href="#" className="card-btn">
                        <img src={Download} className="me-2" alt="Download" />{" "}
                        Download Now
                      </a>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FoundationInfo;
