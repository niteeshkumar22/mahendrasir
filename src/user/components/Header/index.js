import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { showPopup } from "../../../redux/action/common";
import Logo from "../../../static/user/img/logo.svg";
import Logo_white from "../../../static/user/img/logo-white.svg";

import { checkAuthentication, removeAuthetication, getCurrentUserDetails } from "../../../utils/util";
import isEmpty from "lodash/isEmpty";
import { UserRoutes } from "../../../routes";
import { AvatarIcon, InvalidIcon } from "../../../admin/icons";

window.addEventListener("scroll", function () {
  const selectHeader = document.querySelector("#header");
  const pageOffset = window.pageYOffset;

  if (selectHeader) {
    if (pageOffset > 100) {
      selectHeader.classList.add("header-scrolled");
    } else {
      selectHeader.classList.remove("header-scrolled");
    }
  }
});

window.scrollTo({
  top: 0,
  behavior: "smooth",
});

const Header = (props) => {
  const { showPopup, categoryData, getUserCategoryData } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const userDetails = getCurrentUserDetails();

  useEffect(() => {
    document.body.scrollTo(0, 0);
    window.scrollTo(0, 0);

    // ========== Easy selector helper function ==========
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    // ========== Easy event listener function ==========
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          selectEl.forEach((e) => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    // window.addEventListener("scroll", function () {
    //   console.log(window.pageYOffset);
    // });

    // ========== Easy on scroll event listener ==========
    const onscroll = (el, listener) => {
      el.addEventListener("scroll", listener);
    };

    // ========== Toggle .header-scrolled class to #header when page is scrolled ==========
    let selectHeader = select("#header");
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add("header-scrolled");
        } else {
          selectHeader.classList.remove("header-scrolled");
        }
      };
      window.addEventListener("load", headerScrolled);
      onscroll(document, headerScrolled);
    }

    // ========== Mobile nav toggle ==========
    on("click", ".mobile-nav-toggle", function (e) {
      select("#navbar").classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });

    // ========== Mobile nav dropdowns activate ==========
    on(
      "click",
      ".navbar .dropdown > a",
      function (e) {
        if (select("#navbar").classList.contains("navbar-mobile")) {
          e.preventDefault();
          this.nextElementSibling.classList.toggle("dropdown-active");
        }
      },
      true
    );
  }, [categoryData, location]);

  const logoutSession = (e) => {
    removeAuthetication(navigate);
  };

  const body_tag = document.body;
  if (location.pathname == "/login" || location.pathname == "/user/about" || location.pathname == "/user/contact_us" || location.pathname == "/user/faq" || location.pathname == "/user/privacy_policy" || location.pathname == "/user/T&C" || location.pathname == "/user/events-details" || location.pathname == "/user/contribute") {
    body_tag.classList.add("mt-0");
  } else {
    body_tag.classList.remove("mt-0");
  }

  return (
    <header id="header" className={location.pathname == "/user/about" ? "fixed-top d-flex align-items-center header-white" : "fixed-top d-flex align-items-center"}>
      <div className="container d-flex align-items-center">
        <Link to="/" className="logo me-auto">
          <img className="logo-black" src={Logo} alt="Logo" />
          <img className="logo-white" src={Logo_white} alt="Logo" />
        </Link>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown">
              <a href="#">
                <span>About</span>
                <i className="dropdown-icon-down"></i>
              </a>
              <ul>
                <li>
                  <Link to="/user/about">Overview</Link>
                </li>
                <li>
                  <Link to="/user/foundation">Subhash Chandra Foundation</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a>
                <span>Categories</span>
                <i className="dropdown-icon-down"></i>
              </a>
              <ul>
                <li>
                  <a className="head-title">Categories</a>
                </li>
                {categoryData &&
                  categoryData?.length > 0 &&
                  categoryData?.map((category) => {
                    return (
                      <li className="dropdown">
                        <a>
                          <span>{category?.categoryName}</span>
                          {category?.subCategories?.length > 0 && <i className="dropdown-icon-right"></i>}
                        </a>
                        {category?.subCategories?.length > 0 && (
                          <ul>
                            {category?.subCategories?.length > 0 && (
                              <li>
                                <a className="head-title">Sub Categories</a>
                              </li>
                            )}
                            {category?.subCategories?.length > 0 &&
                              category?.subCategories?.map((subCategory) => {
                                return (
                                  <li>
                                    <NavLink to={`/user/category-details?catId=${category?.categoryId}&subCatId=${subCategory?.subCategoryId}`}>{subCategory?.subCategoryName}</NavLink>
                                  </li>
                                );
                              })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                <li>
                  <NavLink to={`/user/categories`}>Show More</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/user/events");
                }}
              >
                Events
              </a>
            </li>
            <li>
              <Link to="/user/counseling" className="nav-link">
                Counseling
              </Link>
            </li>
            <li className="dropdown">
              <a>
                <span>Sectoral Focus</span>
                <i className="dropdown-icon-down"></i>
              </a>
              <ul className="megamenu">
                <div className="row g-0">
                  <div className="col-md-5">
                    <ul className="mm-item">
                      <li>
                        <a className="head-title _1">Education</a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            navigate("/user/child_education");
                          }}
                        >
                          Early Child Education
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            navigate("/user/sach_scholarship");
                          }}
                        >
                          SACH Scholarship 2022
                        </a>
                      </li>
                      <li>
                        <a className="head-title _3">Empowerment</a>
                      </li>
                      <li>
                        <Link to="/user/sach_sarthi">Sarthi</Link>
                      </li>
                      <li>
                        <Link to={"/user/category-details?catId=6315a93a7003739ae10d0544&subCatId=6315a9af7003739ae10d05c0"}>Subhash Chandra Show</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-7">
                    <ul className="mm-item">
                      <li>
                        <a className="head-title _2">Entrepreneurship</a>
                      </li>
                      <li>
                        <Link to="/user/sach_esselerator">Esselerator</Link>
                      </li>
                      <li>
                        <Link to="/user/sach_impact">SACH Impact</Link>
                      </li>
                      <li>
                        <a className="head-title _4">Integrated Rural Development</a>
                      </li>
                      <li>
                        <Link to="/user/sach_agriculture">Village / Sustainable Agriculture Development</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">
                <svg width="24" height="24" className="me-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.78129 7.83333H8.39857C8.72759 6.65714 9.16241 5.65382 9.59804 4.83701C9.78918 4.47863 9.98062 4.15584 10.1636 3.86968C7.86658 4.38628 5.92775 5.85145 4.78129 7.83333ZM12 4.13814C11.7315 4.50174 11.4006 4.99882 11.0686 5.62132C10.7393 6.23879 10.4094 6.97847 10.1377 7.83333H13.8623C13.5906 6.97847 13.2607 6.23879 12.9314 5.62132C12.5994 4.99882 12.2685 4.50174 12 4.13814ZM14.2767 9.5H9.7233C9.58355 10.2678 9.5 11.1022 9.5 12C9.5 12.8978 9.58355 13.7322 9.7233 14.5H14.2767C14.4164 13.7322 14.5 12.8978 14.5 12C14.5 11.1022 14.4164 10.2678 14.2767 9.5ZM15.9678 14.5C16.0933 13.723 16.1667 12.8887 16.1667 12C16.1667 11.1113 16.0933 10.277 15.9677 9.5H19.9521C20.1996 10.2884 20.3333 11.1279 20.3333 12C20.3333 12.8721 20.1996 13.7116 19.9521 14.5H15.9678ZM13.8623 16.1667H10.1377C10.4094 17.0215 10.7393 17.7612 11.0686 18.3787C11.4006 19.0012 11.7315 19.4983 12 19.8619C12.2685 19.4983 12.5994 19.0012 12.9314 18.3787C13.2607 17.7612 13.5906 17.0215 13.8623 16.1667ZM10.1636 20.1303C9.98062 19.8442 9.78918 19.5214 9.59804 19.163C9.16241 18.3462 8.72759 17.3429 8.39857 16.1667H4.78129C5.92775 18.1486 7.86658 19.6137 10.1636 20.1303ZM4.04793 14.5H8.03225C7.90667 13.723 7.83333 12.8887 7.83333 12C7.83333 11.1113 7.90667 10.277 8.03225 9.5H4.04793C3.80035 10.2884 3.66667 11.1279 3.66667 12C3.66667 12.8721 3.80035 13.7116 4.04793 14.5ZM13.8364 20.1303C14.0194 19.8442 14.2108 19.5214 14.402 19.163C14.8376 18.3462 15.2724 17.3429 15.6014 16.1667H19.2187C18.0722 18.1486 16.1334 19.6137 13.8364 20.1303ZM19.2187 7.83333H15.6014C15.2724 6.65714 14.8376 5.65382 14.402 4.83701C14.2108 4.47863 14.0194 4.15584 13.8364 3.86968C16.1334 4.38628 18.0722 5.85145 19.2187 7.83333ZM2.68199 8.36352C4.13611 4.64008 7.75872 2 12 2C16.2413 2 19.8639 4.64008 21.318 8.36352C21.7586 9.49169 22 10.7186 22 12C22 13.2814 21.7586 14.5083 21.318 15.6365C19.8639 19.3599 16.2413 22 12 22C7.75872 22 4.13611 19.3599 2.68199 15.6365C2.24141 14.5083 2 13.2814 2 12C2 10.7186 2.24141 9.49169 2.68199 8.36352Z"
                  />
                </svg>
                <span>ENG</span>
                <i className="dropdown-icon-down"></i>
              </a>
              <ul>
                <li>
                  <a href="#">English</a>
                </li>
                <li>
                  <a href="#">Hindi (हिंदी)</a>
                </li>
                <li>
                  <a href="#">Tamil (தமிழ்)</a>
                </li>
                <li>
                  <a href="#">Telugu (తెలుగు)</a>
                </li>
                <li>
                  <a href="#">Marathi (મરાઠી)</a>
                </li>
                <li>
                  <a href="#">Bengali (বাংলা)</a>
                </li>
                <li>
                  <a href="#">Punjabi (ਪੰਜਾਬੀ)</a>
                </li>
                <li>
                  <a href="#">Gujrati (ગુજરાતી)</a>
                </li>
              </ul>
            </li>
            <li>
              <Link className="nav-link py-0" to="/user/contribute">
                <span className="btn btn-sach bg-sach">Contribute</span>
              </Link>
            </li>
            {checkAuthentication() ? (
              <>
                <li className="separator"></li>
                <li>
                  <div className="dropdown sach-dropdown">
                    <a className="dropdown-toggle no-icon" href="javascript:void(0);" role="button" id="notification" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={require("../../../static/user/img/icons/notification.svg").default} alt="User Avatar" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="dropdown sach-dropdown ms-md-2 ms-0">
                    <a className="dropdown-toggle no-icon" href="javascript:void(0);" role="button" id="profileMenu" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={userDetails?.user?.icon} alt="User Avatar" onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = AvatarIcon;
          }} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end profileMenu" aria-labelledby="profileMenu">
                      {userDetails && (
                        <div className="profile-data">
                          <img src={userDetails?.user?.icon}
                          onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = AvatarIcon;
                            }} alt="Profile Picture" />
                          <div className="data-inner">
                            <h4>{userDetails.user?.userFullName}</h4>
                            <span>{userDetails.user?.userEmail}</span>
                          </div>
                        </div>
                      )}
                      <li>
                        <a className="token-btn" href="javascript:void(0);">
                          {userDetails.user?.sachUserId}
                        </a>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={`${UserRoutes.MY_ACCOUNT}?tab=my-events`}>
                          <img src={require("../../../static/user/img/icons/profile.svg").default} alt="icon" />
                          <span>Account</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={`${UserRoutes.MY_ACCOUNT}?tab=settings`}>
                          <img src={require("../../../static/user/img/icons/settings.svg").default} alt="icon" />
                          <span>Settings</span>
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={(e) => logoutSession(e)}>
                          <img src={require("../../../static/user/img/icons/logout.svg").default} alt="icon" />
                          <span>Logout</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            ) : (
              <li>
                <a
                  className="nav-link py-0 ps-3"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <span className="btn btn-sach bg-sach-dark">Login</span>
                </a>
              </li>
            )}
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPopup: (type, data) => dispatch(showPopup(type, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
