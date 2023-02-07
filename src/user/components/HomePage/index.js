import React from "react";
import VideoImage from "../../../static/user/img/video-bg.png";
import Hope from "../../../static/user/img/img-icons/hope.svg";
import Happiness from "../../../static/user/img/img-icons/happiness.svg";
import Health from "../../../static/user/img/img-icons/health.svg";
import Aspiration from "../../../static/user/img/img-icons/aspiration.svg";
import Offer from "../../../static/user/img/we-offer.png";
import UserImage from "../../../static/user/img/user-image.png";
import SearchIcon from "../../../static/user/img/sach-icon.svg";

const UserHomePage = (props) => {
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-9 mx-auto text-center">
              <div className="sach-title mt-3 pt-3 mt-lg-5 pt-lg-5">
                <h1 className="f-800" data-aos="flip-down">
                  Get{" "}
                  <span className="o">
                    Hope, Happiness,
                    <br /> Health,
                  </span>{" "}
                  and <span className="o">Aspiration</span> in Life
                </h1>
                <p data-aos="zoom-in" data-aos-delay="100">
                  Are you someone who wants to get Hope,Happiness,Health,and
                  Aspiration in Life With little or no <br /> suffering and
                  sadness? Then this is the place for you to join and become
                  <span className="o"> You</span> again.
                </p>
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-lg-12 text-center">
              <a
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                className="btn btn-sach bg-sach-dark"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                Get Started
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
              </a>
            </div>
          </div>
          <div className="row mt-lg-5 mt-3">
            <div className="col-12 text-center position-relative">
              <video
                className="w-100"
                poster={VideoImage}
                data-aos="zoom-in"
                data-aos-delay="100"
              ></video>
              <div className="play-btn">
                <i className="bi bi-play-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-gap-10">
        <div className="container py-md-5 py-0">
          <div className="row">
            <div className="col-lg-4 col-md-10 col-xl-4">
              <div className="sach-title mt-lg-5 mt-0 pt-lg-5 pt-0 text-md-start text-center">
                <h5
                  data-aos="fade-left"
                  data-aos-delay="100"
                  data-aos-duration="600"
                >
                  Our Philosophy
                </h5>
                <h1
                  className="f-700"
                  data-aos="fade-left"
                  data-aos-delay="150"
                  data-aos-duration="700"
                >
                  To guide every individual to gain insight into their own life
                </h1>
                <p
                  className="text-md-start text-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="800"
                >
                  Every one's life has suffering, having understood it, SACH
                  finds solution(s)
                </p>
              </div>
            </div>

            <div className="col-lg-8 col-xl-6 offset-xl-2">
              <div className="icon-box-section brdrBtm">
                <div className="icon-box-item">
                  <div data-aos="zoom-in" data-aos-delay="50">
                    <div className="icon-box">
                      <img className="img-fluid" src={Hope} alt="Icon" />
                    </div>
                    <div className="content">
                      <h4>Hope</h4>
                      <p>
                        There is always a way to come out of a problem and solve
                        it. It is nature's Law that there is always 'Cause and
                        Effect' and nothing is permanent.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="icon-box-item">
                  <div data-aos="zoom-in" data-aos-delay="100">
                    <div className="icon-box">
                      <img className="img-fluid" src={Happiness} alt="Icon" />
                    </div>
                    <div className="content">
                      <h4>Happiness</h4>
                      <p>
                        To be and remain happy is within our power, we need to
                        discover our own power. We will guide you how.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="icon-box-section">
                <div className="icon-box-item">
                  <div data-aos="zoom-in" data-aos-delay="150">
                    <div className="icon-box">
                      <img className="img-fluid" src={Health} alt="Icon" />
                    </div>
                    <div className="content">
                      <h4>Health</h4>
                      <p>
                        Medical science has proven that if you have a friend who
                        is wiser than you and you trust your friend, talking
                        with the friend gives you a long and healthy life.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="icon-box-item">
                  <div data-aos="zoom-in" data-aos-delay="200">
                    <div className="icon-box">
                      <img className="img-fluid" src={Aspiration} alt="Icon" />
                    </div>
                    <div className="content">
                      <h4>Aspiration</h4>
                      <p>
                        We all have desire to be successful in our life.
                        Aspiration in life means intention, attitude & a
                        movement inside all of us. <b>SACH</b> helps you to
                        arrive at right understanding and right aspiration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="my-gap-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 me-auto ms-lg-4">
              <div className="sach-title">
                <h1 className="f-700" data-aos="fade-left" data-aos-delay="50">
                  What we offer in <img src={SearchIcon} />
                </h1>
                <p data-aos="fade-left" data-aos-delay="100">
                  Sach is movement designed towards helping human being to come
                  out of ignorance and gain wisdom. By gaining wisdom, your
                  body, mind and spirit gets integrated with each other and
                  support each other to gain meaningful as well as blissful
                  life.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 ms-lg-4">
              <div className="accordion sach-accordion" id="accordionWeOffer">
                <div
                  className="accordion-item"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <i>01</i>Events
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionWeOffer"
                  >
                    <div className="accordion-body py-1">
                      <strong className="d-block mb-3">
                        Attend Online Recorded and live events:
                      </strong>
                      <p>
                        You can view online recorded and live events according
                        to your choice of subjects where the Aachaaryas talk
                        about different issues touching your lives. Also Sach
                        (Subhash Chandra) shows can be watched.
                      </p>
                      <a href="#" className="theme-dark f-600">
                        Get Started{" "}
                        <i className="bi bi-arrow-right text-dark"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="accordion-item"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <i>02</i>Counselling
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionWeOffer"
                  >
                    <div className="accordion-body py-1">
                      <strong className="d-block mb-3">
                        Attend Online Recorded and live events:
                      </strong>
                      <p>
                        You can view online recorded and live events according
                        to your choice of subjects where the Aachaaryas talk
                        about different issues touching your lives. Also Sach
                        (Subhash Chandra) shows can be watched.
                      </p>
                      <a href="#" className="theme-dark f-600">
                        Get Started{" "}
                        <i className="bi bi-arrow-right text-dark"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col me-4">
              <div className="card video-card border-0">
                <div className="card-body position-relative">
                  <div
                    className="col-12"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <video className="w-100 mt-2" poster={Offer}>
                      <source src="media/movie.mp4" type="video/mp4" />
                    </video>
                    <div className="play-btn">
                      <i className="bi bi-play-fill"></i>
                    </div>
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="250"
                    data-aos-duration="800"
                  >
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
    </>
  );
};

export default UserHomePage;
