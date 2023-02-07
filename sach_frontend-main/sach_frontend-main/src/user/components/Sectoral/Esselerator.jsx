import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Esselerator() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    document.querySelector("body").scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="grant-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Link to="/" className="grant-back-btn">
                <i className="bi bi-chevron-left"></i> Back
              </Link>
              <p className="h6">Fostering Innovation and Leadership</p>
              <p className="h1">Entrepreneurship</p>
              <p className="para w-75">
                Subhash Chandra Foundation aims to scale the start-up and
                incubator ecosystem by embracing new ideas.
              </p>
              <div className="img-container">
                <img
                  src={
                    require("../../../static/user/img/icons/play-round-text.svg")
                      .default
                  }
                  alt="Play Button"
                  className="ply-btn"
                />
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/Entrepreneurship.png")
                      .default
                  }
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="SF-Title">Esselerator</div>
            <div className="SF-SubTitle mb-3">
              “An initiative by Subhash Chandra Foundation”
            </div>
            <p className="SF-Para">
              Esselerator is designed to provide an opportunity to the
              entrepreneurs to build innovative products and solutions in the
              fast-revolving Media and Entertainment space. The program enables
              early and growth stage start-ups to build POC to win commercial
              contracts and equity investment from Essel Group. Esselerator is
              powered by Zinnov, a global strategy and management consulting
              firm based out of Santa Clara and Bangalore.
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="SF-Title">Participating Essel Group Companies</div>
            <div className="zee-fade">
              <div className="zee-icon">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/ZeeTV.svg")
                      .default
                  }
                  alt="Zee TV"
                />
              </div>
              <div className="zee-icon">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/Zee5.svg")
                      .default
                  }
                  alt="Zee 5"
                />
              </div>
              <div className="zee-icon">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/ZeeMedia.svg")
                      .default
                  }
                  alt="Zee Media"
                />
              </div>
              <div className="zee-icon">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/ZeeMusic.svg")
                      .default
                  }
                  alt="Zee Music"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="SF-Title">Programme</div>
          </div>
          <div className="col-md-4">
            <div className="prgrm-tab">
              <i>Step 1</i>
              <div className="prgrm-title">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/application.svg")
                      .default
                  }
                  alt="Application"
                />
                <span>Application</span>
              </div>
              <p>
                Once you -submit your application, we will shortlist start-ups
                that match our parameters.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="prgrm-tab">
              <i>Step 2</i>
              <div className="prgrm-title">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/interview.svg")
                      .default
                  }
                  alt="Application"
                />
                <span>Interview</span>
              </div>
              <p>
                Top 25 start-ups would be invited for a presentation to the
                leadership from Essel Group.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="prgrm-tab">
              <i>Step 3</i>
              <div className="prgrm-title">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/selection.svg")
                      .default
                  }
                  alt="Application"
                />
                <span>Selection</span>
              </div>
              <p>
                After a round of personal interviews, up to 10 start-ups will be
                selected for the program.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="prgrm-tab">
              <i>Step 4</i>
              <div className="prgrm-title">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/DeepDive.svg")
                      .default
                  }
                  alt="Application"
                />
                <span>Deep Dive</span>
              </div>
              <p>
                A customized engagement plan with mentoring will be designed for
                each start-up to deliver an effective proof-of-concept.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="prgrm-tab">
              <i>Step 5</i>
              <div className="prgrm-title">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/pitch.svg")
                      .default
                  }
                  alt="Application"
                />
                <span>Pitch</span>
              </div>
              <p>
                {" "}
                An opportunity to showcase your product/solution to leadership
                of Zee5 and Zee Media Group.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="esslrtr-focus-sctn">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="esslrtr-title mb-4">Focus Areas</div>
            </div>
            <div className="col-md-4">
              <div className="esslrtr-items thm-1">
                <div className="img-wrp">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/play-button.svg")
                        .default
                    }
                    alt="Icon"
                  />
                </div>
                <h3>MediaTech</h3>
                <p>
                  Technology based start-ups for a real-world problem in the
                  media technology space can apply.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="esslrtr-items thm-2">
                <div className="img-wrp">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/graduate.svg")
                        .default
                    }
                    alt="Icon"
                  />
                </div>
                <h3>EdTech</h3>
                <p>
                  Solutions that will help break down some of the obstacles, and
                  complexities of the education industry.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="esslrtr-items thm-3">
                <div className="img-wrp">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/loudSpeaker.svg")
                        .default
                    }
                    alt="Icon"
                  />
                </div>
                <h3>AdTech</h3>
                <p>
                  Digital tools to increase the outreach to customers and for
                  better advertising of content/products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tech-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tech-title mb-4">
                Technology Areas Covered In This Challenge
              </div>
              <div className="tech-list">
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Analytics.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Analytics</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Blockchain.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Blockchain</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/AR-VR.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>AR / VR</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Blockchain.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>User Experience</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/InteractiveGaming.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Interactive Gaming</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Cybersecurity.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Cybersecurity</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Internet-of-Things.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Internet-of-Things</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/OTT&Video.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>OTT & Video</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/EcommerceIntegration.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Ecommerce Integration</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Cloud.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Cloud</span>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="tech-title mt-5 mb-3">Value Propositions </div>
              <img
                src={
                  require("../../../static/user/img/SectoralFocus/technology-arrow.png")
                    .default
                }
                alt="Technology-Arrow"
                className="d-none d-md-block m-auto"
              />
              <div className="tech-list">
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Analytics.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Product Validation</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/Blockchain.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Vendor Agreement</span>
                </div>
                <div className="tech-items">
                  <img
                    src={
                      require("../../../static/user/img/SectoralFocus/icons/AR-VR.svg")
                        .default
                    }
                    alt="Technology"
                  />
                  <span>Equity Investment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="focus-area-section mt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="focus-title mb-4">
                Support Provided During The
                <br />
                Acceleration Period
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="focus-area flx">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/BusinessMentorship.svg")
                      .default
                  }
                  alt="Focus Area Icon"
                />
                <h2>Business Mentorship</h2>
                <p className="text-center">
                  Mentoring by senior industry leaders and subject matter
                  experts.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="focus-area flx">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/TechnologyMentorship.svg")
                      .default
                  }
                  alt="Focus Area Icon"
                />
                <h2>Technology Mentorship</h2>
                <p className="text-center">
                  Personalized learning program and mentoring by experts.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="focus-area flx">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/AccessToTools.svg")
                      .default
                  }
                  alt="Focus Area Icon"
                />
                <h2>Access to Tools</h2>
                <p className="text-center">
                  Access to collaborative tools, productivitytools and other
                  APIs.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="focus-area flx">
                <img
                  src={
                    require("../../../static/user/img/SectoralFocus/icons/BusinessSupport.svg")
                      .default
                  }
                  alt="Focus Area Icon"
                />
                <h2>Business Support</h2>
                <p className="text-center">
                  Advice on business function such as legal,tax & compliance,
                  finance, marketing & HR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mentors-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mentors-title">Mentors</div>
              <div className="mentors-para">
                Mentors to help fuel your ideas.
              </div>
            </div>
            <div className="col-md-4">
              <div className="mentor-wrp">
                <img
                  src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/PunitGoenka.png"
                  alt="Punit-Goenka"
                />
                <div className="mentors-details">
                  <div className="d-flex">
                    <span>Punit Goenka</span>
                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                  <p>MD & CEO, Zee Entertainment Enterprises L.T.D</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mentor-wrp">
                <img
                  src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/AmitGoenka.png"
                  alt="Amit-Goenka"
                />
                <div className="mentors-details">
                  <div className="d-flex">
                    <span>Amit Goenka</span>
                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                  <p>MD & CEO, Zee Entertainment Enterprises L.T.D</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mentor-wrp">
                <img
                  src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/AshokGoel.png"
                  alt="Ashok-Goel"
                />
                <div className="mentors-details">
                  <div className="d-flex">
                    <span>Ashok Goel</span>
                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                  <p>VC & Managing Director, Essel Propack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Esselerator;
