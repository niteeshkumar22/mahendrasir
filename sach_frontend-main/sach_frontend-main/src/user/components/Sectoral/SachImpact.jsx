import { map } from "lodash";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { scholarImpactFocusData, scholarEligibilityData } from "./metaData";

function SachImpact() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth"
    // });
    document.querySelector("body").scrollTo(0, 0);
  }, []);
  const style = {
    boxShadow: "0 0 -0.75rem 0 var(--rgba-primary-2)",
  };

  const focus = JSON.stringify(scholarImpactFocusData);
  const eligibility = JSON.stringify(scholarEligibilityData);

  const focusData = JSON.parse(focus);

  const eligibiData = JSON.parse(eligibility);

  const focusArea = focusData.map((item) => {
    return (
      <>
        <div className="col-lg-4 col-md-4">
          <div className="focus-area">
            <img src={item.img_url} alt="Focus Area Icon" />
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        </div>
      </>
    );
  });
  const eligibilityCate = eligibiData.map((item) => {
    return item.category.map((item1) => {
      return (
        <button className={`nav-link  ${item1.key == 1 ? "active" : ""}`} id={`v-pills-tab-${item1.key}`} data-bs-toggle="pill" data-bs-target={`#v-tab-${item1.key}`} type="button" role="tab" aria-controls={`v-tab-${item1.key}`} aria-selected="false" style={style}>
          {item1.type}
        </button>
      );
    });
  });

  const eligibilitySub = eligibiData.map((item) => {
    return item.subCategory.map((item1) => {
      return (
        <div className={`tab-pane fade ${item1.key == 1 ? "show active" : ""}`} id={`v-tab-${item1.key}`} role="tabpanel" aria-labelledby={`v-pills-tab-${item1.key}`}>
          <div className="h2">{item1.title}</div>
          <p>{item1.desc}</p>
        </div>
      );
    });
  });

  return (
    <>
      <section className="grant-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Link to="/" className="grant-back-btn">
                <i className="bi bi-chevron-left"></i> Back
              </Link>
              <p className="h6">Partnership with</p>
              <p className="h1">
                SACH Impact + <img src={require("../../../static/user/img/SectoralFocus/LetsEndorse.png").default} alt="LetsEndorse" />
              </p>
              <p className="para">SACH Impact is one-of-a-kind incubator run by Subhash Chandra Foundation, in partnership with Lets Endorse, which truly embodies the philosophy of innovating for the modern-day challenges facing the nation and being agile in doing so at the same time.</p>
              <div className="img-container">
                <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/sachImpact.png" alt="Hero Image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="focus-area-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="focus-title">Focus Areas</div>
            </div>
            {focusArea}
          </div>
        </div>
      </section>

      <section className="eligibility-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="eligibility-title">Eligibility</div>
            </div>
            <div className="col-md-12">
              <div className="sach-nav-tabs grant-nav-tabs eligibility-nav-tabs">
                <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  {eligibilityCate}
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-tab-1" role="tabpanel" aria-labelledby="v-pills-tab-1">
                    <div className="h2">Entity Type</div>
                    <p>Product, technology or process-based solutions which have the potential to solve problems at a large scale, registered as either for-profit or not-for-profit (Society, Trust or Section 8 Company) not before 1st April, 2016. Unregistered entities may be considered on a case-to-case basis.</p>
                  </div>
                  <div className="tab-pane fade" id="v-tab-2" role="tabpanel" aria-labelledby="v-pills-tab-2">
                    <div className="h2">Stage</div>
                    <p>The venture must have already developed a testable version of product/technology/software or must have just begun conducting pilot tests on-the-ground.</p>
                  </div>
                  <div className="tab-pane fade" id="v-tab-3" role="tabpanel" aria-labelledby="v-pills-tab-3">
                    <div className="h2">Innovation</div>
                    <p>We are seeking solutions which are transformational and not incremental, innovative and not me-too.</p>
                  </div>
                  <div className="tab-pane fade" id="v-tab-4" role="tabpanel" aria-labelledby="v-pills-tab-4">
                    <div className="h2">Opportunity to Impact</div>
                    <p>We are seeking solutions which are meant for large target populations across different geographies. Ventures having direct and tangible impact on lives in terms of sustainability, affordability and accessibility are the ideal fits.</p>
                  </div>
                  <div className="tab-pane fade" id="v-tab-5" role="tabpanel" aria-labelledby="v-pills-tab-5">
                    <div className="h2">Sustainablity</div>
                    <p>Ventures should have the potential to achieve financial sustainability in long run.</p>
                  </div>
                </div>
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
              <div className="mentors-para">Mentors to help fuel your ideas.</div>
            </div>
            <div className="col-md-4">
              <div className="mentor-wrp">
                <img src={require("../../../static/user/img/SectoralFocus/mentors/PunitGoenka.png").default} alt="Punit-Goenka" />
                <div className="mentors-details">
                  <div className="d-flex">
                    <span>Punit Goenka</span>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://linkedin.com/" target="_blank">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                  <p>MD & CEO, Zee Entertainment Enterprises L.T.D</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mentor-wrp">
                <img src={require("../../../static/user/img/SectoralFocus/mentors/AmitGoenka.png").default} alt="Amit-Goenka" />
                <div className="mentors-details">
                  <div className="d-flex">
                    <span>Amit Goenka</span>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://linkedin.com/" target="_blank">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                  <p>MD & CEO, Zee Entertainment Enterprises L.T.D</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mentor-wrp">
                <img src={require("../../../static/user/img/SectoralFocus/mentors/AshokGoel.png").default} alt="Ashok-Goel" />
                <div className="mentors-details">
                  <div className="d-flex">
                    <span>Ashok Goel</span>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://linkedin.com/" target="_blank">
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

export default SachImpact;
