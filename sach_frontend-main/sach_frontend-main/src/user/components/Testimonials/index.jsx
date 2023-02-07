import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "../common/Pagination";
import { paginate } from "../common/paginate";

import { useLocation, useNavigate } from "react-router-dom";
import SachLoader from "../../../commons/Loader";
import { getAllTestimonials } from "../../../redux/action/user/myTestimonial";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { parseHtml } from "../../../utils/util";
import "./style.css";
import { Link } from "react-router-dom";
import ViewModal from "./modals/ViewModal";

const UserTestimonials = (props) => {
  const { isLoading, getAllTestimonials, sectionData, sectionOrder } = props;
  const location = useLocation();
  let navigate = useNavigate();
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedViewCta, setSelectedViewCta] = useState(false);
  const [testimonialSlider, setTestimonialSlider] = useState([]);

  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);

  //Testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testimonialPerPage] = useState(9);
  const [indexOfFirstTestimonial, setIndexOfFirstTestimonial] = useState(0);
  const [indexOfLastTestimonial, setIndexOfLastTestimonial] = useState(testimonialPerPage);

  useEffect(() => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = '!function (e, t, i) { if (void 0 === e._dyntube_v1_init) { e._dyntube_v1_init = !0; var a = t.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = "https://embed.dyntube.com/v1.0/dyntube.js", t.getElementsByTagName("head")[0].appendChild(a) } }(window, document);';
    document.body.appendChild(s);

    getAllTestimonials(paramsObj);
  }, [location]);

  if (isLoading) {
    return <SachLoader />;
  }

  // Testimonial Pag
  const renderTestimonialsScrollPart = (data) => {
    const totalTestimonial = data.length;

    setTimeout(() => {
      setTestimonialSlider(data);
    }, 300);

    console.log("Length of the data " + totalTestimonial);

    // const currentTestimonial = data.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

    // const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalTestimonial / testimonialPerPage); i++) {
      pageNumbers.push(i);
    }

    // const allData = { ...data };
    const allData = paginate(data, currentPage, testimonialPerPage);
    const handlePageChange = (page) => {
      // console.log(page);
      setCurrentPage(page);
    };

    function previousPage() {
      // console.log(currentPage);
      setCurrentPage(currentPage - 1);
    }
    function nextPage() {
      // console.log(currentPage);
      setCurrentPage(currentPage + 1);
    }

    return (
      <section>
        <div className="container py-5 my-md-5 md-0">
          <div className="row gy-5 gx-4">
            {data.length > 0 &&
              allData.slice(indexOfFirstTestimonial, indexOfLastTestimonial).map((testmnl, index) => {
                return (
                  <div className="col-lg-4 col-md-4" key={index}>
                    <div className="testimonial-cards">
                      <img src={testmnl.authorImg} alt="User" />
                      <div className="tstmnl-name">{testmnl.author}</div>
                      <div className="tstmnl-dsgn">{testmnl.designation ?? "Co-Founder & CEO"}</div>
                      <div className="tstmnl-ttl">{testmnl.title}</div>
                      <div className="tstmnl-para">
                        {parseHtml(testmnl.body.substring(0, 300))}{" "}
                        {
                          <Link
                            className="readMore"
                            onClick={() => {
                              setSelectedViewCta({
                                author:testmnl.author,
                                title: testmnl.title,
                                icon: testmnl.authorImg,
                                description: testmnl.body,
                                status: "Published",
                              });
                              setShowViewModal(true);
                            }}
                          >
                            Read more...
                          </Link>
                        }
                      </div>
                    </div>
                  </div>
                );
              })}

            <div className="col-md-12 pt-5">
              <Pagination itemsCount={data.length} pageSize={testimonialPerPage} onPageChange={handlePageChange} OnPreviousPage={previousPage} OnNextPage={nextPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderJoinSachBanner = (data) => {
    return (
      <>
        <section className="mt-5 newsletter event-newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-1">
                <div className="sach-title">
                  <h1 className="f-700 fs-40 text-white text-md-start text-center">{parseHtml(data?.title || `Become a part of <span className="text-sach">Sach,</span> forget all your worries & stay happy.`)}</h1>
                  <p className="text-white text-md-start text-center">{parseHtml(data?.text)}</p>
                </div>
                <div className="row g-3 align-items-center my-md-4 my-2">
                  <div className="col-lg-5 col-sm-12 text-md-start text-center">
                    <span className="btn btn-sach bg-sach" data-aos-delay="400" onClick={() => navigate("/login")}>
                      Get Started
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="Property 1=arrow-right">
                          <path id="Icon" fillRule="evenodd" clipRule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  const scrollingTestimonials = (data) => {
    // console.log(data);
    return (
      <>
        <div className="container-fluid">
          <div className="testimonial-hero-section">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="h1">
                  The members of <img src={require("../../../static/user/img/sach-icon.svg").default} alt="SACH-ICON"></img>
                </div>
                <div className="h1">Community have to</div>
                <div className="h1">say about</div>
                <p>Here what our people have to say about us and how this platform has changed their lives</p>
              </div>
            </div>
            <div className="testimonialSlider">
              <div className="tstmSlideRow">
                <div className="tstmSlideCol">
                  {testimonialSlider.length > 0 &&
                    testimonialSlider.slice(0, 10).map((testmnl, index) => {
                      return (
                        <div className="tstmSlide" key={index}>
                          <div className="quoteIcon">
                            <svg width="37" height="33" viewBox="0 0 37 33" fill="currentColor" className="quoteBG" xmlns="http://www.w3.org/2000/svg">
                              <path
                                opacity="0.2"
                                d="M14.303 31.3035L15.6323 28.4784C15.8476 28.0288 15.8722 27.5137 15.7008 27.0462C15.5294 26.5788 15.1759 26.1974 14.7181 25.9858C12.6533 25.0683 11.1106 23.9065 10.0899 22.5004C8.7978 20.7202 8.11604 18.352 8.04462 15.3957L13.4156 15.3957C13.9112 15.3897 14.384 15.1907 14.7302 14.8425C15.0764 14.4942 15.2676 14.0253 15.2618 13.5387L15.2618 2.24153C15.2676 1.75524 15.0766 1.28656 14.7308 0.938393C14.385 0.590225 13.9126 0.391021 13.4174 0.384514L2.19363 0.384515C1.69813 0.390653 1.22538 0.589695 0.87926 0.937903C0.533143 1.28611 0.341978 1.755 0.347773 2.24153L0.347773 11.1229C0.347773 15.4698 0.728225 18.8982 1.48912 21.408C2.28466 23.9783 3.73726 26.3057 5.70851 28.1685C7.50399 29.8748 9.60216 31.2444 11.8995 32.2096C12.1314 32.3108 12.3824 32.3631 12.6363 32.3633C12.9882 32.3616 13.3323 32.2609 13.6277 32.0731C13.9231 31.8852 14.1575 31.6182 14.303 31.3035ZM34.8409 31.2956L36.1662 28.4784C36.3816 28.0288 36.4062 27.5137 36.2348 27.0462C36.0633 26.5788 35.7098 26.1973 35.252 25.9858C33.1876 25.0683 31.6451 23.9065 30.6246 22.5004C29.3325 20.7202 28.6508 18.352 28.5793 15.3957L33.9518 15.3957C34.4471 15.3894 34.9197 15.1902 35.2656 14.8421C35.6115 14.4939 35.8026 14.0251 35.7968 13.5387L35.7968 2.24153C35.8026 1.75514 35.6115 1.28638 35.2656 0.938196C34.9197 0.590012 34.4471 0.390873 33.9518 0.384514L22.7281 0.384514C22.2325 0.390578 21.7597 0.589589 21.4135 0.937806C21.0673 1.28602 20.8761 1.75495 20.8819 2.24153L20.8819 11.1229C20.8819 15.504 21.2624 18.9411 22.0233 21.4341C22.8274 23.9982 24.2891 26.3165 26.2681 28.1665C28.0605 29.8624 30.1478 31.2293 32.4311 32.2025C32.6631 32.3048 32.9146 32.3578 33.169 32.358C33.5219 32.3563 33.867 32.2553 34.1633 32.0671C34.4596 31.8788 34.6947 31.6111 34.8409 31.2956Z"
                              />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="currentColor" className="quoteFG" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.8033 11.9196L6.27803 10.9036C6.35491 10.7419 6.36371 10.5566 6.30248 10.3885C6.24126 10.2204 6.11503 10.0832 5.95155 10.0071C5.21418 9.67714 4.66324 9.2593 4.29874 8.75358C3.83731 8.11335 3.59385 7.26162 3.56834 6.19841L5.48641 6.19841C5.66338 6.19622 5.83224 6.12465 5.95586 5.99941C6.07949 5.87418 6.14777 5.70553 6.1457 5.53053L6.1457 1.46749C6.14777 1.2926 6.07957 1.12404 5.95608 0.998821C5.83258 0.873603 5.66389 0.801959 5.48703 0.799619L1.47887 0.799619C1.30192 0.801826 1.13309 0.873412 1.00949 0.998645C0.885881 1.12388 0.817614 1.29251 0.819684 1.46749L0.819684 4.66169C0.819684 6.22504 0.955547 7.45805 1.22727 8.36072C1.51137 9.28511 2.03012 10.1222 2.73408 10.7921C3.37527 11.4058 4.12456 11.8984 4.94497 12.2455C5.02781 12.2819 5.11744 12.3007 5.20809 12.3008C5.33378 12.3002 5.45665 12.264 5.56215 12.1964C5.66765 12.1289 5.75134 12.0328 5.8033 11.9196ZM13.1377 11.9168L13.611 10.9036C13.6879 10.7419 13.6967 10.5566 13.6355 10.3885C13.5743 10.2204 13.448 10.0832 13.2845 10.0071C12.5473 9.67714 11.9964 9.2593 11.632 8.75358C11.1706 8.11335 10.9271 7.26162 10.9016 6.19841L12.8202 6.19841C12.9971 6.19612 13.1658 6.1245 13.2894 5.99927C13.4129 5.87405 13.4811 5.70546 13.4791 5.53053L13.4791 1.46749C13.4811 1.29256 13.4129 1.12398 13.2894 0.998751C13.1658 0.873526 12.9971 0.801906 12.8202 0.799619L8.81202 0.799619C8.63506 0.8018 8.4662 0.873374 8.34258 0.99861C8.21895 1.12385 8.15067 1.2925 8.15274 1.46749L8.15274 4.66169C8.15274 6.23735 8.2886 7.47349 8.56033 8.37011C8.84751 9.2923 9.36949 10.1261 10.0762 10.7914C10.7163 11.4013 11.4617 11.893 12.2771 12.243C12.36 12.2798 12.4498 12.2988 12.5406 12.2989C12.6667 12.2983 12.7899 12.262 12.8957 12.1942C13.0015 12.1265 13.0855 12.0303 13.1377 11.9168Z" />
                            </svg>
                          </div>
                          <p>{parseHtml(index % 2 === 0 ? testmnl.body.substring(0, 120) : testmnl.body.substring(0, 180))}</p>
                          <div className="testUsrName">
                            <img src={testmnl.authorImg} alt="user-img" />
                            <div className="tstUsr">
                              <b>{testmnl.author}</b>
                              <span>{testmnl.designation ?? "Co-Founder & CEO"}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="tstmSlideCol">
                  {testimonialSlider.length > 0 &&
                    testimonialSlider.slice(10, 20).map((testmnl, index) => {
                      return (
                        <div className="tstmSlide" key={index}>
                          <div className="quoteIcon">
                            <svg width="37" height="33" viewBox="0 0 37 33" fill="currentColor" className="quoteBG" xmlns="http://www.w3.org/2000/svg">
                              <path
                                opacity="0.2"
                                d="M14.303 31.3035L15.6323 28.4784C15.8476 28.0288 15.8722 27.5137 15.7008 27.0462C15.5294 26.5788 15.1759 26.1974 14.7181 25.9858C12.6533 25.0683 11.1106 23.9065 10.0899 22.5004C8.7978 20.7202 8.11604 18.352 8.04462 15.3957L13.4156 15.3957C13.9112 15.3897 14.384 15.1907 14.7302 14.8425C15.0764 14.4942 15.2676 14.0253 15.2618 13.5387L15.2618 2.24153C15.2676 1.75524 15.0766 1.28656 14.7308 0.938393C14.385 0.590225 13.9126 0.391021 13.4174 0.384514L2.19363 0.384515C1.69813 0.390653 1.22538 0.589695 0.87926 0.937903C0.533143 1.28611 0.341978 1.755 0.347773 2.24153L0.347773 11.1229C0.347773 15.4698 0.728225 18.8982 1.48912 21.408C2.28466 23.9783 3.73726 26.3057 5.70851 28.1685C7.50399 29.8748 9.60216 31.2444 11.8995 32.2096C12.1314 32.3108 12.3824 32.3631 12.6363 32.3633C12.9882 32.3616 13.3323 32.2609 13.6277 32.0731C13.9231 31.8852 14.1575 31.6182 14.303 31.3035ZM34.8409 31.2956L36.1662 28.4784C36.3816 28.0288 36.4062 27.5137 36.2348 27.0462C36.0633 26.5788 35.7098 26.1973 35.252 25.9858C33.1876 25.0683 31.6451 23.9065 30.6246 22.5004C29.3325 20.7202 28.6508 18.352 28.5793 15.3957L33.9518 15.3957C34.4471 15.3894 34.9197 15.1902 35.2656 14.8421C35.6115 14.4939 35.8026 14.0251 35.7968 13.5387L35.7968 2.24153C35.8026 1.75514 35.6115 1.28638 35.2656 0.938196C34.9197 0.590012 34.4471 0.390873 33.9518 0.384514L22.7281 0.384514C22.2325 0.390578 21.7597 0.589589 21.4135 0.937806C21.0673 1.28602 20.8761 1.75495 20.8819 2.24153L20.8819 11.1229C20.8819 15.504 21.2624 18.9411 22.0233 21.4341C22.8274 23.9982 24.2891 26.3165 26.2681 28.1665C28.0605 29.8624 30.1478 31.2293 32.4311 32.2025C32.6631 32.3048 32.9146 32.3578 33.169 32.358C33.5219 32.3563 33.867 32.2553 34.1633 32.0671C34.4596 31.8788 34.6947 31.6111 34.8409 31.2956Z"
                              />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="currentColor" className="quoteFG" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.8033 11.9196L6.27803 10.9036C6.35491 10.7419 6.36371 10.5566 6.30248 10.3885C6.24126 10.2204 6.11503 10.0832 5.95155 10.0071C5.21418 9.67714 4.66324 9.2593 4.29874 8.75358C3.83731 8.11335 3.59385 7.26162 3.56834 6.19841L5.48641 6.19841C5.66338 6.19622 5.83224 6.12465 5.95586 5.99941C6.07949 5.87418 6.14777 5.70553 6.1457 5.53053L6.1457 1.46749C6.14777 1.2926 6.07957 1.12404 5.95608 0.998821C5.83258 0.873603 5.66389 0.801959 5.48703 0.799619L1.47887 0.799619C1.30192 0.801826 1.13309 0.873412 1.00949 0.998645C0.885881 1.12388 0.817614 1.29251 0.819684 1.46749L0.819684 4.66169C0.819684 6.22504 0.955547 7.45805 1.22727 8.36072C1.51137 9.28511 2.03012 10.1222 2.73408 10.7921C3.37527 11.4058 4.12456 11.8984 4.94497 12.2455C5.02781 12.2819 5.11744 12.3007 5.20809 12.3008C5.33378 12.3002 5.45665 12.264 5.56215 12.1964C5.66765 12.1289 5.75134 12.0328 5.8033 11.9196ZM13.1377 11.9168L13.611 10.9036C13.6879 10.7419 13.6967 10.5566 13.6355 10.3885C13.5743 10.2204 13.448 10.0832 13.2845 10.0071C12.5473 9.67714 11.9964 9.2593 11.632 8.75358C11.1706 8.11335 10.9271 7.26162 10.9016 6.19841L12.8202 6.19841C12.9971 6.19612 13.1658 6.1245 13.2894 5.99927C13.4129 5.87405 13.4811 5.70546 13.4791 5.53053L13.4791 1.46749C13.4811 1.29256 13.4129 1.12398 13.2894 0.998751C13.1658 0.873526 12.9971 0.801906 12.8202 0.799619L8.81202 0.799619C8.63506 0.8018 8.4662 0.873374 8.34258 0.99861C8.21895 1.12385 8.15067 1.2925 8.15274 1.46749L8.15274 4.66169C8.15274 6.23735 8.2886 7.47349 8.56033 8.37011C8.84751 9.2923 9.36949 10.1261 10.0762 10.7914C10.7163 11.4013 11.4617 11.893 12.2771 12.243C12.36 12.2798 12.4498 12.2988 12.5406 12.2989C12.6667 12.2983 12.7899 12.262 12.8957 12.1942C13.0015 12.1265 13.0855 12.0303 13.1377 11.9168Z" />
                            </svg>
                          </div>
                          <p>{parseHtml(index % 2 !== 0 ? testmnl.body.substring(0, 100) : testmnl.body.substring(0, 180))}</p>
                          <div className="testUsrName">
                            <img src={testmnl.authorImg} alt="user-img" />
                            <div className="tstUsr">
                              <b>{testmnl.author}</b>
                              <span>{testmnl.designation ?? "Co-Founder & CEO"}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="tstmSlideCol">
                  {testimonialSlider.length > 0 &&
                    testimonialSlider.slice(20, 30).map((testmnl, index) => {
                      return (
                        <div className="tstmSlide" key={index}>
                          <div className="quoteIcon">
                            <svg width="37" height="33" viewBox="0 0 37 33" fill="currentColor" className="quoteBG" xmlns="http://www.w3.org/2000/svg">
                              <path
                                opacity="0.2"
                                d="M14.303 31.3035L15.6323 28.4784C15.8476 28.0288 15.8722 27.5137 15.7008 27.0462C15.5294 26.5788 15.1759 26.1974 14.7181 25.9858C12.6533 25.0683 11.1106 23.9065 10.0899 22.5004C8.7978 20.7202 8.11604 18.352 8.04462 15.3957L13.4156 15.3957C13.9112 15.3897 14.384 15.1907 14.7302 14.8425C15.0764 14.4942 15.2676 14.0253 15.2618 13.5387L15.2618 2.24153C15.2676 1.75524 15.0766 1.28656 14.7308 0.938393C14.385 0.590225 13.9126 0.391021 13.4174 0.384514L2.19363 0.384515C1.69813 0.390653 1.22538 0.589695 0.87926 0.937903C0.533143 1.28611 0.341978 1.755 0.347773 2.24153L0.347773 11.1229C0.347773 15.4698 0.728225 18.8982 1.48912 21.408C2.28466 23.9783 3.73726 26.3057 5.70851 28.1685C7.50399 29.8748 9.60216 31.2444 11.8995 32.2096C12.1314 32.3108 12.3824 32.3631 12.6363 32.3633C12.9882 32.3616 13.3323 32.2609 13.6277 32.0731C13.9231 31.8852 14.1575 31.6182 14.303 31.3035ZM34.8409 31.2956L36.1662 28.4784C36.3816 28.0288 36.4062 27.5137 36.2348 27.0462C36.0633 26.5788 35.7098 26.1973 35.252 25.9858C33.1876 25.0683 31.6451 23.9065 30.6246 22.5004C29.3325 20.7202 28.6508 18.352 28.5793 15.3957L33.9518 15.3957C34.4471 15.3894 34.9197 15.1902 35.2656 14.8421C35.6115 14.4939 35.8026 14.0251 35.7968 13.5387L35.7968 2.24153C35.8026 1.75514 35.6115 1.28638 35.2656 0.938196C34.9197 0.590012 34.4471 0.390873 33.9518 0.384514L22.7281 0.384514C22.2325 0.390578 21.7597 0.589589 21.4135 0.937806C21.0673 1.28602 20.8761 1.75495 20.8819 2.24153L20.8819 11.1229C20.8819 15.504 21.2624 18.9411 22.0233 21.4341C22.8274 23.9982 24.2891 26.3165 26.2681 28.1665C28.0605 29.8624 30.1478 31.2293 32.4311 32.2025C32.6631 32.3048 32.9146 32.3578 33.169 32.358C33.5219 32.3563 33.867 32.2553 34.1633 32.0671C34.4596 31.8788 34.6947 31.6111 34.8409 31.2956Z"
                              />
                            </svg>
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="currentColor" className="quoteFG" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.8033 11.9196L6.27803 10.9036C6.35491 10.7419 6.36371 10.5566 6.30248 10.3885C6.24126 10.2204 6.11503 10.0832 5.95155 10.0071C5.21418 9.67714 4.66324 9.2593 4.29874 8.75358C3.83731 8.11335 3.59385 7.26162 3.56834 6.19841L5.48641 6.19841C5.66338 6.19622 5.83224 6.12465 5.95586 5.99941C6.07949 5.87418 6.14777 5.70553 6.1457 5.53053L6.1457 1.46749C6.14777 1.2926 6.07957 1.12404 5.95608 0.998821C5.83258 0.873603 5.66389 0.801959 5.48703 0.799619L1.47887 0.799619C1.30192 0.801826 1.13309 0.873412 1.00949 0.998645C0.885881 1.12388 0.817614 1.29251 0.819684 1.46749L0.819684 4.66169C0.819684 6.22504 0.955547 7.45805 1.22727 8.36072C1.51137 9.28511 2.03012 10.1222 2.73408 10.7921C3.37527 11.4058 4.12456 11.8984 4.94497 12.2455C5.02781 12.2819 5.11744 12.3007 5.20809 12.3008C5.33378 12.3002 5.45665 12.264 5.56215 12.1964C5.66765 12.1289 5.75134 12.0328 5.8033 11.9196ZM13.1377 11.9168L13.611 10.9036C13.6879 10.7419 13.6967 10.5566 13.6355 10.3885C13.5743 10.2204 13.448 10.0832 13.2845 10.0071C12.5473 9.67714 11.9964 9.2593 11.632 8.75358C11.1706 8.11335 10.9271 7.26162 10.9016 6.19841L12.8202 6.19841C12.9971 6.19612 13.1658 6.1245 13.2894 5.99927C13.4129 5.87405 13.4811 5.70546 13.4791 5.53053L13.4791 1.46749C13.4811 1.29256 13.4129 1.12398 13.2894 0.998751C13.1658 0.873526 12.9971 0.801906 12.8202 0.799619L8.81202 0.799619C8.63506 0.8018 8.4662 0.873374 8.34258 0.99861C8.21895 1.12385 8.15067 1.2925 8.15274 1.46749L8.15274 4.66169C8.15274 6.23735 8.2886 7.47349 8.56033 8.37011C8.84751 9.2923 9.36949 10.1261 10.0762 10.7914C10.7163 11.4013 11.4617 11.893 12.2771 12.243C12.36 12.2798 12.4498 12.2988 12.5406 12.2989C12.6667 12.2983 12.7899 12.262 12.8957 12.1942C13.0015 12.1265 13.0855 12.0303 13.1377 11.9168Z" />
                            </svg>
                          </div>
                          <p>{parseHtml(index % 2 === 0 ? testmnl.body.substring(0, 120) : testmnl.body.substring(0, 180))}</p>
                          <div className="testUsrName">
                            <img src={testmnl.authorImg} alt="user-img" />
                            <div className="tstUsr">
                              <b>{testmnl.author}</b>
                              <span>{testmnl.designation ?? "Co-Founder & CEO"}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const sectionNameMapping = {
    banner: scrollingTestimonials,
    testimonials: renderTestimonialsScrollPart,
    joinSoch: renderJoinSachBanner,
  };

  return (
    <>
      {sectionOrder?.length > 0 &&
        sectionOrder.map((sectionName) => {
          // console.log("Parsing section::", sectionName, sectionNameMapping[sectionName], sectionData[sectionName]);
          if (sectionNameMapping[sectionName] || sectionData[sectionName]) {
            return sectionNameMapping[sectionName] && sectionNameMapping[sectionName](sectionData[sectionName]);
          }
          return null;
        })}
      {showViewModal && <ViewModal selectedCta={selectedViewCta} handleCancel={() => setShowViewModal(false)} />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { MyTestimonialReducer } = state;
  const { isLoading, allTestimonials = {}, start = 0 } = MyTestimonialReducer;
  return {
    isLoading,
    ...allTestimonials,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTestimonials: (data) => dispatch(getAllTestimonials(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTestimonials);
