import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function Counseling() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [key, setKey] = useState("sach-tab-1");
  const counselorCarousel = {
    margin: 0,
    loop: false,
    autoplay: false,
    nav: false,
    dots: true,
    autoplayTimeout: 0,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  return (
    <>
      <div className="container counselling-hero">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="cons-hero-title">
              <span className="text-sach">Get help. Get better.</span>
              <span>Your Guide</span>
              <span>to Happiness</span>
            </div>
            <div className="cons-para">
              <span>No matter what's troubling you, get the support you need, right here, right now. We match you only with licensed Counsellors/Experts that fit you best to provide advice or solution for your all kinds of sufferings.</span>
              <b>Start a new, more fulfilling life.</b>
            </div>
            <Link
              to="/login"
              // onClick={() => {
              //   navigate("/login");
              // }}
              class="btn btn-sach bg-sach-dark"
            >
              <span>Get Started</span>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="Property 1=arrow-right">
                  <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"></path>
                </g>
              </svg>
            </Link>
          </div>
          <div className="col-md-6 col-lg-6">
            <img src={require("../../../static/user/img/counselling/counselling-hero-bg.png").default} alt="counselling-hero-bg" />
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="match-therapist">
          <div className="row">
            <div className="col-md-8 mx-auto text-center">
              <div className="m-therapist-ttl">Specialized Help For Your All Kinds of Sufferings or Issues</div>
              <div className="m-therapist-para">We can help overcome all kinds of sufferings or issues and be useful for anyone looking to make a change. Our network of counsellors/Experts covers a range of specialties to meet your specific needs. Only evidence-based therapy and counseling approaches.</div>
              <ul className="sach-inline-pills">
                <li>
                  <span className="custom-sach-pills">Anger management</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Anxiety and stress</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Emotional abuse</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Childhood abuse</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Family conflict</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Relationship</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Grief and trauma</span>
                </li>
                <li>
                  <span className="custom-sach-pills active">Chronic illness </span>
                </li>
                <li>
                  <span className="custom-sach-pills">Eating disorders</span>
                </li>
                <li>
                  <span className="custom-sach-pills">LGBTQIA+</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Low self-esteem</span>
                </li>
                <li>
                  <span className="custom-sach-pills">Depression</span>
                </li>
                <li>
                  <span className="custom-sach-pills">+ More</span>
                </li>
              </ul>

              <a
                href
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="btn btn-sm btn-sach bg-sach"
              >
                <span>Take Assessment</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-md-6 col-lg-6 d-flex flex-column justify-content-center">
            <div className="OnOff-Counselling-ttl">
              <span>Online </span>
              <span className="text-sach">Counselling</span>
            </div>
            <div className="OnOff-Counselling-para">With online counselling you don’t have to wait an entire week to talk to your therapist. Online therapy is easily accessible to anyone. You can get professional support when you need it, no matter where you live. Message your therapist any day or schedule a live therapy session from the comfort of your home from any device.</div>
          </div>
          <div className="col-md-6 col-lg-6 text-center">
            <img src={require("../../../static/user/img/counselling/online-counselling.png").default} alt="Online Counselling" className="img-fluid" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-md-6 col-lg-6 text-center">
            <img src={require("../../../static/user/img/counselling/offline-counselling.png").default} alt="Online Counselling" className="img-fluid" loading="lazy" />
          </div>
          <div className="col-md-6 col-lg-6 d-flex flex-column justify-content-center">
            <div className="OnOff-Counselling-ttl">
              <span className="text-sach">Offline </span>
              <span>Counselling</span>
            </div>
            <div className="OnOff-Counselling-para">With offline counseling, there is an opportunity to interact with your therapist in person. When you visit your therapist face-to-face, you not only process all your emotions, but you also learn new communication skills as well. As some people prefer talking to their doctor personally rather than interacting with them through a video call.</div>
          </div>
        </div>
      </div>

      <section className="howDoesWrks">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="sach-title">
                <h1 className="fs-40 f-700 mb-2">
                  <span>How does it </span>
                  <span className="text-sach">works ?</span>
                </h1>
                <p className="f-400">Steps to get your counseling started whether it be online or offline </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="sach-nav-tabs">
                  <Tab eventKey="sach-tab-1" title="Online">
                    <div className="row">
                      <div className="col-md-6 text-center">
                        <img src={require("../../../static/user/img/counselling/for-online-counselling.png").default} alt="for-online-counselling" className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <div className="howDoesWrkCnt">
                          <div className="hdwc-ttl">
                            <span>For</span>
                            <span className="text-sach">Online</span>
                            <span>Counseling</span>
                          </div>
                          <ul>
                            <li>
                              <i>
                                <img src={require("../../../static/user/img/icons/check-o.svg").default} alt="icon" />
                              </i>
                              <b>Take a quick assessment</b>
                              <span>Answer a few questions to help us understand your preferences to start therapy.</span>
                            </li>
                            <li>
                              <i>
                                <img src={require("../../../static/user/img/icons/list-2.svg").default} alt="icon" />
                              </i>
                              <b>Get matched to the best therapist</b>
                              <span>As you complete the assessment according to your prefernce you can select from a list of world’s largest network of licensed, accredited and experienced therapist who can help with range of issues. </span>
                            </li>
                            <li>
                              <i>
                                <img src={require("../../../static/user/img/icons/attendees.svg").default} alt="icon" />
                              </i>
                              <b>Communicate your way</b>
                              <span>Messaging, phone, or video - talk to your therapist however you both feel comfortable.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="sach-tab-2" title="Offline">
                    <div className="row">
                      <div className="col-md-6 text-center">
                        <img src={require("../../../static/user/img/counselling/for-offline-counselling.png").default} alt="for-offline-counselling" className="img-fluid" />
                      </div>
                      <div className="col-md-6">
                        <div className="howDoesWrkCnt">
                          <div className="hdwc-ttl">
                            <span>For</span>
                            <span className="text-sach">Online</span>
                            <span>Counseling</span>
                          </div>
                          <ul>
                            <li>
                              <i>
                                <img src={require("../../../static/user/img/icons/check-o.svg").default} alt="icon" />
                              </i>
                              <b>Take a quick assessment</b>
                              <span>Answer a few questions to help us understand your preferences to start therapy. Submit your assessment as this assessment will help the counsellor to know your case and be prepared beforehand.</span>
                            </li>
                            <li>
                              <i>
                                <img src={require("../../../static/user/img/icons/list-2.svg").default} alt="icon" />
                              </i>
                              <b>Find the nearest center</b>
                              <span>In order to have a in-person counseling, find the nearest centers located and according to your assessment we will provide you with the right counsellor.</span>
                            </li>
                            <li>
                              <i>
                                <img src={require("../../../static/user/img/icons/attendees.svg").default} alt="icon" />
                              </i>
                              <b>Book appointment</b>
                              <span>To book appointment, call at the center and make appointment at your convenient time. You can also reschedule your appointment if you want.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5 py-5">
        <div className="row mb-5">
          <div className="col-md-10 mx-auto">
            <div className="row">
              <div className="col-md-12">
                <div className="meetOurNetwork">
                  <h4>
                    <span>Meet our network of</span>
                    <span className="text-sach">licensed</span>
                    <span>providers</span>
                  </h4>
                  <b>Our network of providers cover a range of specialities to meet your specific needs. Get matched today!</b>
                  <ul>
                    <li>Depression</li>
                    <li>Anger management</li>
                    <li>Eating disorders</li>
                    <li>Relationships</li>
                    <li>Childhood abuse</li>
                    <li>LGBTQIA+</li>
                    <li>Anxiety & Stress</li>
                    <li>Mood disorders</li>
                    <li>Substance abuse</li>
                    <li>Parenting</li>
                    <li>OCD</li>
                    <li>Family conflict</li>
                    <li>Chronic illness</li>
                    <li>Trauma & grief</li>
                    <li>and more...</li>
                  </ul>
                  {/* <a href="javascript:void(0);" className="btn btn-sach bg-sach-dark">
                    <span>Meet Experts</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <g id="Property 1=arrow-right">
                        <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"></path>
                      </g>
                    </svg>
                  </a> */}

                  <div className="counselorCarousel-wrp">
                    <OwlCarousel className="owl-theme custom-owl-nav-1" {...counselorCarousel}>
                      <div className="item">
                        <div className="counselorCarouselItem">
                          <img src={require("../../../static/user/img/counselling/counselor-1.png").default} alt="counselor" />
                        </div>
                      </div>
                      <div className="item">
                        <div className="counselorCarouselItem">
                          <img src={require("../../../static/user/img/counselling/counselor-1.png").default} alt="counselor" />
                        </div>
                      </div>
                      <div className="item">
                        <div className="counselorCarouselItem">
                          <img src={require("../../../static/user/img/counselling/counselor-1.png").default} alt="counselor" />
                        </div>
                      </div>
                      <div className="item">
                        <div className="counselorCarouselItem">
                          <img src={require("../../../static/user/img/counselling/counselor-1.png").default} alt="counselor" />
                        </div>
                      </div>
                      <div className="item">
                        <div className="counselorCarouselItem">
                          <img src={require("../../../static/user/img/counselling/counselor-1.png").default} alt="counselor" />
                        </div>
                      </div>
                      <div className="item">
                        <div className="counselorCarouselItem">
                          <img src={require("../../../static/user/img/counselling/counselor-1.png").default} alt="counselor" />
                        </div>
                      </div>
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter event-newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-1">
              <div className="sach-title">
                <h1 className="f-700 fs-40 text-white text-md-start text-center">Let's take the first step to find your inner peace and joy together.</h1>
                <p className="text-white text-md-start text-center">Join the thousands of people who have enriched their lives from this platform and have find your own 3 mantras of life.</p>
              </div>
              <div className="row g-3 align-items-center my-md-4 my-2">
                <div className="col-lg-7">
                  <input type="text" id="newsletterEmail" className="form-control p-3 pe-5 transpInput" placeholder="Enter E-mail" />
                </div>
                <div className="col-lg-4 col-sm-12 text-md-start text-center">
                  <span className="btn btn-sach bg-sach px-5" data-aos-delay="400">
                    <span>Subscribe</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Modal title="Thank you!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>We'll notify you on this soon.</p>
      </Modal> */}
      <Modal show={isModalOpen} centered className="sach-modal" backdrop="static" keyboard={false}>
        <div className="px-md-5 text-center mt-5">
          <img src={require("../../../static/user/img/icons/success-tick.svg").default} alt="Successfully" />
          <div className="modal-heading text-center my-4">
            <h1>
              <div>Thank You!</div>
            </h1>
            <span>We'll update you soon on this.</span>
          </div>

          <div className="my-3 text-center">
            <a
              href
              onClick={() => {
                setIsModalOpen(false);
              }}
              className="btn-sach bg-sach-dark justify-content-center w-100"
            >
              <span className="py-1">Okay</span>
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Counseling;
