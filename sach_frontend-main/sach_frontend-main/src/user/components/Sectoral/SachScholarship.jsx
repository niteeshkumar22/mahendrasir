import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { childEducationData, scholarshipData } from "./metaData";

function SachScholoarship() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth"
    // });
    document.querySelector("body").scrollTo(0, 0);
  }, []);
  const [collapse, setCollapse] = useState(true);
  const style = {
    backgroundColor: "var(--theme-orange)",
  };

  const education = JSON.stringify(childEducationData);
  const scholarship = JSON.stringify(scholarshipData);

  const data = JSON.parse(education);
  const scholardata = JSON.parse(scholarship);
  const educationData = data.map((item) => {
    return (
      <>
        <div className="container my-5">
          {item.key == 2 ? (
            <div className="row early-edu-description" key={item.key}>
              <div className="col-md-6">
                <div className="h1">
                  <span>{item?.sort_title} </span>
                  <span className="text-sach">{item?.title}</span>
                </div>
                <div className="para">{item?.desc}</div>
                <a href={item?.link_url} target="_blank" className="btn btn-sach" style={style}>
                  <span>View More</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Property 1=arrow-right">
                      <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"></path>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="col-md-5 offset-md-1">
                <div className="desc-img">
                  <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/desc-3.png" alt="Children" />
                </div>
              </div>
            </div>
          ) : null}
          {item.key == 3 ? (
            <div className="row early-edu-description" key={item.key}>
              <div className="col-md-5">
                <div className="desc-img">
                  <img src={require("../../../static/user/img/subhashChandraFoundation/desc-2.png").default} alt="Children" />
                </div>
              </div>
              <div className="col-md-6 offset-md-1">
                <div className="h1">
                  <span>{item?.sort_title} </span>
                  <span className="text-sach">{item?.title}</span>
                </div>
                <div className="para">{item?.desc}</div>
                <a href={item?.link_url} target="_blank" className="btn btn-sach" style={style}>
                  <span>View More</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Property 1=arrow-right">
                      <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"></path>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  });

  const scholar = scholardata.map((item) => {
    return (
      <>
        <div className="accordion-item" key={item.key}>
          <button className={`accordion-button  ${item.key != "4" ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse_${item.key}`} aria-expanded={item.key == "4" ? "true" : "false"} aria-controls={`collapse_${item.key}`} onClick={() => (collapse ? setCollapse(false) : setCollapse(false))}>
            {item.title}
          </button>
          <div id={`collapse_${item.key}`} className={`accordion-collapse collapse ${collapse && item.key == "4 " ? "show" : ""}`} data-bs-parent="#FAQ_Accordion">
            <span>{item.desc}</span>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <section className="scholarship-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <Link to="/" className="SF-back-btn backbtn">
                <i className="bi bi-chevron-left"></i> Back
              </Link>
              <p className="h6">SACH Vijaya Scholarship</p>

              <h1 class="title">
                <span class="text-sach d-block">{"i<ks] l{ke Ckuks]"}</span>
                <span>lius Lkkdkj djks !</span>
              </h1>
              <p class="para">es/kkoh Nk=kvks ds fy, lp fot;k Nk=o`fRr</p>

              <span className="download-label">Download:</span>
              <a href="https://sach-public-file.s3.ap-south-1.amazonaws.com/SACH-Vijaya-Application-form-2020-form.pdf" target="_blank" className="btn btn-sach" style={style}>
                <svg className="me-2" width="20" height="20" viewBox="0 0 21 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 0.128906C10.6642 0.128906 11 0.464693 11 0.878906V12.9199C11 13.3341 10.6642 13.6699 10.25 13.6699C9.83579 13.6699 9.5 13.3341 9.5 12.9199V0.878906C9.5 0.464693 9.83579 0.128906 10.25 0.128906Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6953 9.46077C13.9887 9.75306 13.9897 10.2279 13.6974 10.5214L10.7814 13.4494C10.6407 13.5907 10.4495 13.6702 10.25 13.6702C10.0506 13.6702 9.85934 13.5907 9.7186 13.4494L6.8026 10.5214C6.51031 10.2279 6.51128 9.75306 6.80478 9.46077C7.09827 9.16848 7.57314 9.16945 7.86543 9.46295L10.25 11.8573L12.6346 9.46295C12.9269 9.16945 13.4018 9.16848 13.6953 9.46077Z" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.75 9.29808C18.7501 8.91271 18.6743 8.5311 18.5269 8.17504C18.3795 7.81898 18.1634 7.49544 17.8909 7.22291C17.6185 6.95038 17.295 6.73419 16.939 6.58669C16.583 6.4392 16.2014 6.36328 15.816 6.36328H14.883C14.4688 6.36328 14.133 6.02749 14.133 5.61328C14.133 5.19907 14.4688 4.86328 14.883 4.86328H15.816C16.3984 4.86328 16.9751 4.97801 17.5131 5.20091C18.0511 5.42382 18.54 5.75053 18.9517 6.1624C19.3635 6.57426 19.6901 7.0632 19.9128 7.6013C20.1356 8.13933 20.2501 8.71597 20.25 9.29828C20.25 9.29835 20.25 9.29821 20.25 9.29828V14.1823C20.25 15.3559 19.7838 16.4814 18.9539 17.3112C18.1241 18.1411 16.9986 18.6073 15.825 18.6073H4.685C3.50877 18.6073 2.3807 18.14 1.54898 17.3083C0.717257 16.4766 0.25 15.3485 0.25 14.1723V9.28728C0.250319 8.11391 0.716665 6.9885 1.54648 6.15891C2.37629 5.32932 3.50163 4.86328 4.675 4.86328H5.617C6.03121 4.86328 6.367 5.19907 6.367 5.61328C6.367 6.02749 6.03121 6.36328 5.617 6.36328H4.675C3.89938 6.36328 3.15552 6.67134 2.60699 7.21971C2.05852 7.76804 1.75027 8.51173 1.75 9.28728C1.75 9.28735 1.75 9.28721 1.75 9.28728V14.1723C1.75 14.9507 2.05922 15.6972 2.60964 16.2476C3.16006 16.7981 3.90659 17.1073 4.685 17.1073H15.825C16.6008 17.1073 17.3447 16.7991 17.8933 16.2506C18.4418 15.702 18.75 14.958 18.75 14.1823V9.29808Z"
                  />
                </svg>
                <span>Application Form</span>
              </a>
              <a href="https://sach-public-file.s3.ap-south-1.amazonaws.com/SACH-Vijaya-Recommendation-form-2020-form.pdf" target="_blank" className="btn btn-sach ms-3" style={style}>
                <svg className="me-2" width="20" height="20" viewBox="0 0 21 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 0.128906C10.6642 0.128906 11 0.464693 11 0.878906V12.9199C11 13.3341 10.6642 13.6699 10.25 13.6699C9.83579 13.6699 9.5 13.3341 9.5 12.9199V0.878906C9.5 0.464693 9.83579 0.128906 10.25 0.128906Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6953 9.46077C13.9887 9.75306 13.9897 10.2279 13.6974 10.5214L10.7814 13.4494C10.6407 13.5907 10.4495 13.6702 10.25 13.6702C10.0506 13.6702 9.85934 13.5907 9.7186 13.4494L6.8026 10.5214C6.51031 10.2279 6.51128 9.75306 6.80478 9.46077C7.09827 9.16848 7.57314 9.16945 7.86543 9.46295L10.25 11.8573L12.6346 9.46295C12.9269 9.16945 13.4018 9.16848 13.6953 9.46077Z" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.75 9.29808C18.7501 8.91271 18.6743 8.5311 18.5269 8.17504C18.3795 7.81898 18.1634 7.49544 17.8909 7.22291C17.6185 6.95038 17.295 6.73419 16.939 6.58669C16.583 6.4392 16.2014 6.36328 15.816 6.36328H14.883C14.4688 6.36328 14.133 6.02749 14.133 5.61328C14.133 5.19907 14.4688 4.86328 14.883 4.86328H15.816C16.3984 4.86328 16.9751 4.97801 17.5131 5.20091C18.0511 5.42382 18.54 5.75053 18.9517 6.1624C19.3635 6.57426 19.6901 7.0632 19.9128 7.6013C20.1356 8.13933 20.2501 8.71597 20.25 9.29828C20.25 9.29835 20.25 9.29821 20.25 9.29828V14.1823C20.25 15.3559 19.7838 16.4814 18.9539 17.3112C18.1241 18.1411 16.9986 18.6073 15.825 18.6073H4.685C3.50877 18.6073 2.3807 18.14 1.54898 17.3083C0.717257 16.4766 0.25 15.3485 0.25 14.1723V9.28728C0.250319 8.11391 0.716665 6.9885 1.54648 6.15891C2.37629 5.32932 3.50163 4.86328 4.675 4.86328H5.617C6.03121 4.86328 6.367 5.19907 6.367 5.61328C6.367 6.02749 6.03121 6.36328 5.617 6.36328H4.675C3.89938 6.36328 3.15552 6.67134 2.60699 7.21971C2.05852 7.76804 1.75027 8.51173 1.75 9.28728C1.75 9.28735 1.75 9.28721 1.75 9.28728V14.1723C1.75 14.9507 2.05922 15.6972 2.60964 16.2476C3.16006 16.7981 3.90659 17.1073 4.685 17.1073H15.825C16.6008 17.1073 17.3447 16.7991 17.8933 16.2506C18.4418 15.702 18.75 14.958 18.75 14.1823V9.29808Z"
                  />
                </svg>
                <span>Recommendation Form</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        <div className="row early-edu-description">
          <div className="col-md-6">
            <div className="sach-vijaya-log">
              <img src={require("../../../static/user/img/sach-icon.svg").default} className="p-3 ps-0" alt="Sach" />
              <img src={require("../../../static/user/img/VijayaScholarship.jpg").default} alt="Sach" />
            </div>
            <div className="h2">Vision</div>
            <div className="para my-2">To unleash the girl child's potential</div>
            <div className="h2">Mission</div>
            <div className="para my-2">Encouraging meritorious girls from economically weaker backgrounds through scholarships and acting act as a catalyst in empowering future women leaders with requisite knowledge to play an active role in nation building</div>
            <div className="h2">Objective</div>
            <div className="para my-2">The objectives of the scholarship program are to:</div>
            <ul className="ch-list">
              <li>Reduce the dropout rate of meritorious girl students owing to economic concerns</li>
              <li>Encourage meritorious girl students from weaker sections of the society to pursue higher education</li>
              <li>Act as a facilitator to boost their self-esteem and self-confidence, and encourage them to dream big</li>
            </ul>
          </div>
          <div className="col-md-5 offset-md-1 align-self-end">
            <div className="desc-img">
              <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/desc-1.png" alt="Children" />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <div className="SF-Title-SM-2 text-sach">Watch Video</div>
            <div className="SF-Title-2">
              <span>Visual Featuring </span>
              <span className="text-sach">Mr. Subhash Chandra</span>
            </div>
            <p className="SF-Title-SubTitle-2">Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.</p>
            <div className="SF-img-cont">
              <img src={require("../../../static/user/img/icons/play-round-text.svg").default} alt="Play Button" className="ply-btn" />
              <img src={require("../../../static/user/img/SectoralFocus/VisualFeaturing.png").default} alt="Mr. Subhash Chandra" />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <div className="SF-Title-2">
              <span className="text-sach">SACH</span>
              <span> Vijaya Scholarship </span>
              <span className="text-sach">
                Application <br /> Guidelines
              </span>
            </div>
            <div className="SF-Title-3 my-4">The Subhash Chandra Foundation's SACH Vijaya Scholarship is a national level, merit cum means scholarship that aims to provide financial assistance to girls from economically weak backgrounds to support them in pursuing higher levels of education.</div>
          </div>
        </div>
        <div className="row early-edu-description">
          <div className="col-md-6">
            <div className="h3">What does the Scholarship Cover?</div>
            <ol className="num-list mt-4">
              <li className="mb-4">
                The Scholarship is of <b>INR 10,000</b> maximum for each selected student and can be utilized towards funding School Tuition Fees, Books & Periodicals, School Uniform & Stationary.
              </li>
              <li className="mb-4">
                Each Selected student will be assigned with a Mentor, who will mentor the scholar through <b>one year.</b>
              </li>
              <li className="mb-4">
                <span>
                  Membership to the exclusive <b>SCF Scholars Group.</b> The benefits of the membership include.
                </span>
                <div>•Summer Placements & Internships</div>
                <div>•Opportunities to lead social initiatives</div>
                <div>•Attend Domestic conferences</div>
              </li>
            </ol>
            <Link to="/user/vijay_scholarship" className="btn btn-sach" style={style}>
              <span>View More</span>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="Property 1=arrow-right">
                  <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"></path>
                </g>
              </svg>
            </Link>
          </div>
          <div className="col-md-5 offset-md-1">
            <div className="desc-img">
              <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/desc-4.png" alt="Children" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="dowld-sec">
              <span>Download:</span>
              <a href="https://sach-public-file.s3.ap-south-1.amazonaws.com/SACH-Vijaya-Application-form-2020-form.pdf" target="_blank" className="btn btn-sach" style={style}>
                <svg className="me-2" width="20" height="20" viewBox="0 0 21 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 0.128906C10.6642 0.128906 11 0.464693 11 0.878906V12.9199C11 13.3341 10.6642 13.6699 10.25 13.6699C9.83579 13.6699 9.5 13.3341 9.5 12.9199V0.878906C9.5 0.464693 9.83579 0.128906 10.25 0.128906Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6953 9.46077C13.9887 9.75306 13.9897 10.2279 13.6974 10.5214L10.7814 13.4494C10.6407 13.5907 10.4495 13.6702 10.25 13.6702C10.0506 13.6702 9.85934 13.5907 9.7186 13.4494L6.8026 10.5214C6.51031 10.2279 6.51128 9.75306 6.80478 9.46077C7.09827 9.16848 7.57314 9.16945 7.86543 9.46295L10.25 11.8573L12.6346 9.46295C12.9269 9.16945 13.4018 9.16848 13.6953 9.46077Z" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.75 9.29808C18.7501 8.91271 18.6743 8.5311 18.5269 8.17504C18.3795 7.81898 18.1634 7.49544 17.8909 7.22291C17.6185 6.95038 17.295 6.73419 16.939 6.58669C16.583 6.4392 16.2014 6.36328 15.816 6.36328H14.883C14.4688 6.36328 14.133 6.02749 14.133 5.61328C14.133 5.19907 14.4688 4.86328 14.883 4.86328H15.816C16.3984 4.86328 16.9751 4.97801 17.5131 5.20091C18.0511 5.42382 18.54 5.75053 18.9517 6.1624C19.3635 6.57426 19.6901 7.0632 19.9128 7.6013C20.1356 8.13933 20.2501 8.71597 20.25 9.29828C20.25 9.29835 20.25 9.29821 20.25 9.29828V14.1823C20.25 15.3559 19.7838 16.4814 18.9539 17.3112C18.1241 18.1411 16.9986 18.6073 15.825 18.6073H4.685C3.50877 18.6073 2.3807 18.14 1.54898 17.3083C0.717257 16.4766 0.25 15.3485 0.25 14.1723V9.28728C0.250319 8.11391 0.716665 6.9885 1.54648 6.15891C2.37629 5.32932 3.50163 4.86328 4.675 4.86328H5.617C6.03121 4.86328 6.367 5.19907 6.367 5.61328C6.367 6.02749 6.03121 6.36328 5.617 6.36328H4.675C3.89938 6.36328 3.15552 6.67134 2.60699 7.21971C2.05852 7.76804 1.75027 8.51173 1.75 9.28728C1.75 9.28735 1.75 9.28721 1.75 9.28728V14.1723C1.75 14.9507 2.05922 15.6972 2.60964 16.2476C3.16006 16.7981 3.90659 17.1073 4.685 17.1073H15.825C16.6008 17.1073 17.3447 16.7991 17.8933 16.2506C18.4418 15.702 18.75 14.958 18.75 14.1823V9.29808Z"
                  />
                </svg>
                <span>Application Form</span>
              </a>
              <a href="https://sach-public-file.s3.ap-south-1.amazonaws.com/SACH-Vijaya-Recommendation-form-2020-form.pdf" target="_blank" download className="btn btn-sach ms-3" style={style}>
                <svg className="me-2" width="20" height="20" viewBox="0 0 21 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 0.128906C10.6642 0.128906 11 0.464693 11 0.878906V12.9199C11 13.3341 10.6642 13.6699 10.25 13.6699C9.83579 13.6699 9.5 13.3341 9.5 12.9199V0.878906C9.5 0.464693 9.83579 0.128906 10.25 0.128906Z" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6953 9.46077C13.9887 9.75306 13.9897 10.2279 13.6974 10.5214L10.7814 13.4494C10.6407 13.5907 10.4495 13.6702 10.25 13.6702C10.0506 13.6702 9.85934 13.5907 9.7186 13.4494L6.8026 10.5214C6.51031 10.2279 6.51128 9.75306 6.80478 9.46077C7.09827 9.16848 7.57314 9.16945 7.86543 9.46295L10.25 11.8573L12.6346 9.46295C12.9269 9.16945 13.4018 9.16848 13.6953 9.46077Z" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.75 9.29808C18.7501 8.91271 18.6743 8.5311 18.5269 8.17504C18.3795 7.81898 18.1634 7.49544 17.8909 7.22291C17.6185 6.95038 17.295 6.73419 16.939 6.58669C16.583 6.4392 16.2014 6.36328 15.816 6.36328H14.883C14.4688 6.36328 14.133 6.02749 14.133 5.61328C14.133 5.19907 14.4688 4.86328 14.883 4.86328H15.816C16.3984 4.86328 16.9751 4.97801 17.5131 5.20091C18.0511 5.42382 18.54 5.75053 18.9517 6.1624C19.3635 6.57426 19.6901 7.0632 19.9128 7.6013C20.1356 8.13933 20.2501 8.71597 20.25 9.29828C20.25 9.29835 20.25 9.29821 20.25 9.29828V14.1823C20.25 15.3559 19.7838 16.4814 18.9539 17.3112C18.1241 18.1411 16.9986 18.6073 15.825 18.6073H4.685C3.50877 18.6073 2.3807 18.14 1.54898 17.3083C0.717257 16.4766 0.25 15.3485 0.25 14.1723V9.28728C0.250319 8.11391 0.716665 6.9885 1.54648 6.15891C2.37629 5.32932 3.50163 4.86328 4.675 4.86328H5.617C6.03121 4.86328 6.367 5.19907 6.367 5.61328C6.367 6.02749 6.03121 6.36328 5.617 6.36328H4.675C3.89938 6.36328 3.15552 6.67134 2.60699 7.21971C2.05852 7.76804 1.75027 8.51173 1.75 9.28728C1.75 9.28735 1.75 9.28721 1.75 9.28728V14.1723C1.75 14.9507 2.05922 15.6972 2.60964 16.2476C3.16006 16.7981 3.90659 17.1073 4.685 17.1073H15.825C16.6008 17.1073 17.3447 16.7991 17.8933 16.2506C18.4418 15.702 18.75 14.958 18.75 14.1823V9.29808Z"
                  />
                </svg>
                <span>Recommendation Form</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-md-5 my-0 py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="SF-Title-SM-2 text-sach">FAQs</div>
            <div className="SF-Title-2">
              <span className="text-sach">SACH </span>
              <span>Vijaya Scholarship 2022</span>
            </div>
            <p className="SF-Para">Everything you need to know about the product and billing. Can't find the answar you're looking for?</p>
            <div className="sach-accordion-2 accordion mt-5" id="FAQ_Accordion">
              <div className="accordion-item">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                  1. Who can apply for the scholarship?
                </button>
                <div id="collapse_1" className="accordion-collapse collapse show" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>The Subhash Chandra Foundation’s SACH Vijaya Scholarship is a national level, merit cum means scholarship that aims to provide financial assistance to girls from economically weak backgrounds to support them in pursuing higher levels of education.</span>
                    <ul>
                      <li>Tier I: Scholarship for Girls studying in 9th standard (Age Group 13-14 years as on April 1, 2020)</li>
                      <li>Tier II: Scholarship for Girls studying in 11th standard (Age Group 15-16 years as on April 1, 2020)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                  2. What is the eligibility criteria for the scholarship?
                </button>
                <div id="collapse_2" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>The scholarship is for meritorious girls from disadvantaged backgrounds. Students must fulfil the following basic criteria in order to be eligible for the scholarship:</span>
                    <ul>
                      <li>The annual family income should be less than INR 3,00,000 from all sources</li>
                      <li>For Scholarship Tier I: Student must have scored minimum 70% in Grade 7 final school exam & 70% in Grade 8 Half Yearly school exam</li>
                      <li>For Scholarship Tier II: Student must have scored minimum 70% in Grade 9 final school exam & 70% in Grade 10 Half Yearly school exam</li>
                      <li>For specially-abled,the minimum cut off is 50% across all the tiers. Such students need to provide Disability certificate at the time of shortlisting</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                  3. What is the duration of the scholarship?
                </button>
                <div id="collapse_3" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>The duration of the scholarship for each tier is as explained below:</span>
                    <ul>
                      <li>Tier 1: 1 year (class 9th)</li>
                      <li>Tier 2: 1 years (class 11th)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_4" aria-expanded="false" aria-controls="collapse_4">
                  4. What are the Scholarship components?
                </button>
                <div id="collapse_4" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>
                      The Scholarship is of <b>₹ 10,000</b> (maximum scholarship) for each selected student and can be utilized towards funding School Tuition Fees, Books & Periodicals, School Uniform & Stationary Each Selected student will be assigned with a Mentor, who will mentor the scholar through one year Membership to the exclusive SCF Scholars Group. The benefits of the membership include:
                    </span>
                    <ul>
                      <li>Summer Placements & Internships</li>
                      <li>Opportunities to lead social initiatives</li>
                    </ul>
                    <span>Attend Domestic conferences</span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                  5. How can a student apply for the scholarship?
                </button>
                <div id="collapse_5" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>
                      Please visit the website through URL <a href="http://www.subhashchandrafoundation.org/scholarship/">http://www.subhashchandrafoundation.org/scholarship/</a>.
                    </span>
                    <div>
                      The student must click on 'Application form', download the form, fill in all the necessary details and submit the application form on Email:- <a href="mailto:info@dscfoundation.org">info@dscfoundation.org</a> with subject line: <b>"SACH Vijaya Scholarship 2020 Application Form"</b>
                    </div>
                    <div>The recommendation form along with 2 recommendation letters need to be couriered to SCF on below address:</div>
                    <div>
                      <b>SACH Vijaya Scholarship 2020 Subhash Chandra Foundation:-</b> 7th Floor FC- 19/20,Sector 16-A (Filmcity).Noida : 201301
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                  6. If a student does not have a bank account on her name or a joint account with her parent/guardian, can she still apply for the scholarship?
                </button>
                <div id="collapse_6" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>
                      Yes, a student can apply for the scholarship even if she does not have a bank account on her name or a joint account with her <b>parent/guardian</b>. Students can open a bank account after they have been selected for the scholarship.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_7" aria-expanded="false" aria-controls="collapse_7">
                  7. In the application form, can a student mention any other information that is relevant to the scholarship application?
                </button>
                <div id="collapse_7" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>All relevant information important for making assessment are already shared in the application form. Additional details, supporting documents can be shared during the interview process</span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_8" aria-expanded="false" aria-controls="collapse_8">
                  8. What are the documents to be submitted along with the application form?
                </button>
                <div id="collapse_8" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>The list of documents to be submitted for the scholarship have been mentioned in the application form itself. Most of these documents are to be submitted on shortlisting for the next stage of the application process</span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_9" aria-expanded="false" aria-controls="collapse_9">
                  9. Can students modify the information in the submitted application form?
                </button>
                <div id="collapse_9" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>A student will be allowed to apply for the scholarship only once. As there will not be any provision to modify the information in the submitted application form, students are requested to take utmost care while filling up the application form.</span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_10" aria-expanded="false" aria-controls="collapse_10">
                  10. What is the selection process of the scholarship?
                </button>
                <div id="collapse_10" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <div>The students will be selected on the basis of their merit and financial need. Received applications will be assessed on the basis of predefined criteria and documents will be verified. This would involve basic scrutiny of the received applications:</div>
                    <div>candidates who submit incomplete application forms and do not furnish all the required documents will be rejected.</div>
                    <div>candidates who do not satisfy the basic eligibility criteria will also be rejected, i.e.:</div>
                    <ul>
                      <li>candidates who do not fulfil the parameters of the General Criteria, or</li>
                      <li>candidates whose total parental/guardians’ income is above INR 3,00,000,or</li>
                      <li>candidates with merit credentials below the minimum stipulated marks for each tier of the scholarship, as specified in the Criteria for Merit</li>
                      <li>candidates applying in the disabled category who do not fulfil the Criteria for Specially Abled will be disqualified under this category and be considered an applicant under the General category, and will be scrutinized as per the guidelines under this category as elaborated above</li>
                    </ul>
                    .
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_11" aria-expanded="false" aria-controls="collapse_11">
                  11. What will happen if the information provided by the student is found to be incorrect in the verification process?
                </button>
                <div id="collapse_11" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>In case the information provided by the student is found to be incorrect in the verification process, the student's application will be rejected and the participant will be debarred from all schemes in the future.</span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_12" aria-expanded="false" aria-controls="collapse_12">
                  12. When will the selected students be notified?
                </button>
                <div id="collapse_12" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>
                      The shortlisted applicants will be notified by <b>February 10, 2020</b>. The shortlisted students will need to furnish proof of the information provided in the application form by <b>February 15, 2020</b>. The tentative interview dates for the shortlisted candidates will be scheduled between <b>February 17 – March 10, 2020</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_13" aria-expanded="false" aria-controls="collapse_13">
                  13. How will the selected students be intimated?
                </button>
                <div id="collapse_13" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>
                      The final list of scholarships will be uploaded on the website by <b>March 30, 2020</b>. Selected students will be communicated through <b>SMS/telephone calls and email</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_14" aria-expanded="false" aria-controls="collapse_14">
                  14. Will the scholarship funds be disbursed in instalments?
                </button>
                <div id="collapse_14" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>
                      The decision of disbursement will be decided on case to case basis, depending on student needs <b>over the year</b>.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_15" aria-expanded="false" aria-controls="collapse_15">
                  15. How will the scholarship funds be disbursed?
                </button>
                <div id="collapse_15" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>
                      The scholarship funds will be disbursed directly into the <b>student’s bank account</b>, subject to the submission of proof of the student passing to <b>Grade 9 & Grade 11 respectively</b>.
                    </span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_16" aria-expanded="false" aria-controls="collapse_16">
                  16. On competition of the current academic year, can the scholarship be renewed for second academic year (Tier1/Tier2)?
                </button>
                <div id="collapse_16" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>At the moment there are no renewals available</span>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_17" aria-expanded="false" aria-controls="collapse_17">
                  17. Are there any expectations from the selected students in the given academic year?
                </button>
                <div id="collapse_17" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                  <div class="accor_wrp">
                    <span>A student receiving the Scholarship is expected to abide by the following:</span>
                    <ul>
                      <li>Ensure to complete education till Graduation</li>
                      <li>Refrain from being involved in malicious or undesirable activities></li>
                      <li>Avoid involvement in violation of the school/college rules, damage to institute property, misbehaviour with staff or colleagues or any other major disciplinary action</li>
                      <li>Maintain academic standards of the school/college</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SachScholoarship;
