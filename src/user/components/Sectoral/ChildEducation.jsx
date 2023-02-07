import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { childEducationData } from "./metaData";

function ChildEducation() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    document.querySelector("body").scrollTo(0, 0);
  }, []);

  const style = {
    backgroundColor: "var(--theme-orange)",
  };
  const pado = "i<ks] l{ke Ckuks]";

  const education = JSON.stringify(childEducationData);
  const data = JSON.parse(education);
  const educationData = data.map((item) => {
    return (
      <>
        {item.key == 1 ? (
          <div className="container EarlyEdu-Heading my-5">
            <div className="row">
              <div className="col-md-9 mx-auto" key="{item}">
                <div className="h2">{item?.title}</div>
                <div className="h4">{item?.desc}</div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="container my-5">
          {item.key == 2 ? (
            <div className="row early-edu-description" key="{item}">
              <div className="col-md-6">
                <div className="h1">
                  <span>{item?.sort_title} </span>
                  <span className="text-sach">{item?.title}</span>
                </div>
                <div className="para">{item?.desc}</div>
                <a
                  href={item?.link_url}
                  target="_blank"
                  className="btn btn-sach"
                  style={style}
                >
                  <span>View More</span>
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
                      ></path>
                    </g>
                  </svg>
                </a>
              </div>
              <div className="col-md-5 offset-md-1">
                <div className="desc-img">
                  <img
                    src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/desc-1.png"
                    alt="Children"
                  />
                </div>
              </div>
            </div>
          ) : null}
          {item.key == 3 ? (
            <div className="row early-edu-description" key="{item}">
              <div className="col-md-5">
                <div className="desc-img">
                  <img
                    src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/desc-2.png"
                    alt="Children"
                  />
                </div>
              </div>
              <div className="col-md-6 offset-md-1">
                <div className="h1">
                  <span>{item?.sort_title} </span>
                  <span className="text-sach">{item?.title}</span>
                </div>
                <div className="para">{item?.desc}</div>
                <Link
                  to={item?.link_url}
                  className="btn btn-sach"
                  style={style}
                >
                  <span>View More</span>
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
                      ></path>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          ) : null}
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
              <Link to="/" className="SF-back-btn">
                <i className="bi bi-chevron-left"></i> Back
              </Link>
              <p className="h6">Vijaya Scholarship</p>
              <h1 class="title">
                <span class="text-sach d-block">{"i<ks] l{ke Ckuks]"}</span>
                <span>lius Lkkdkj djks !</span>
              </h1>
              <p class="para">es/kkoh Nk=kvks ds fy, lp fot;k Nk=o`fRr</p>
            </div>
          </div>
        </div>
      </section>
      {educationData}
    </>
  );
}

export default ChildEducation;
