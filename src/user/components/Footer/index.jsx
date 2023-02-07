import React from "react";
import { Link } from "react-router-dom";
import { UserRoutes } from "../../../routes";
import Logo from "../../../static/user/img/logo.svg";
import "./style.css";

const Footer = (props) => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-start text-center">
              <Link to="/">
                <img src={Logo} className="img-fluid logo" />
              </Link>
            </div>
            <div className="col-md-6">
              <div className="social-links">
                <ul className="text-lg-end px-0 mb-0">
                  <li>
                    <a href="https://www.facebook.com/SubhashChandraFoundation" target="_blank" rel="noreferrer">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/Subhashchandra" target="_blank" rel="noreferrer">
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/subhashchandrafoundation" target="_blank" rel="noreferrer">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCXQbpATiZKmDnNc-XmN5PjA" target="_blank" rel="noreferrer">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="footer-nav p-0 mt-lg-3 footer-style">
                <li className="nav-item">
                  <Link className="nav-link" to="/user/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/counseling">
                    Counselling
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/events">
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/grant">
                    Grant
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/organic_farming">
                    Organic Farming
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={UserRoutes.USER_BLOGS}>
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="border-dash mb-3"></div>
            </div>
            <div className="col-lg-6">
              <p className="copyright-info text-lg-start text-center">© 2022 Subhash Chandra Foundation. All rights reserved</p>
            </div>
            <div className="col-lg-6">
              <ul className="copyright-footer text-lg-end text-center px-0">
                <li>
                  <Link to="/user/contact_us">Contact</Link>
                </li>
                <li>
                  <Link to="/user/faq">
                    <span className="pe-2">
                      <i className="bi bi-circle-fill"></i>
                    </span>
                    FAQ's
                  </Link>
                </li>
                <li>
                  <Link to="/user/privacy_policy">
                    <span className="pe-2">
                      <i className="bi bi-circle-fill"></i>
                    </span>
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link to="/user/T&C">
                    <span className="pe-2">
                      <i className="bi bi-circle-fill"></i>
                    </span>
                    Terms & conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
