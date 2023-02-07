import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBlogsData } from "../../../redux/action/user/blogs";

import SachLoader from "../../../commons/Loader";
import { checkAuthentication, parseHtml } from "../../../utils/util";
import { showPopup } from "../../../redux/action/common";
import "./style.css";
import Subcriber from "../common/Subscriber";
import { UserRoutes } from "../../../routes";

const UserBlogHomePage = (props) => {
  const { fetchBlogsData, blogsData } = props;
  let navigate = useNavigate();
  let tag = "Today";

  const params = new URLSearchParams(location?.search);
  const paramsObj = Object.fromEntries(params);

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const [searchValues, setSearchValues] = useState([]);

  const handleShowMore = (type) => {
    navigate(`/user/blogs-summary?blogType=${type}`);
    return;
  };
  const handleKeyDown = (blog) => {
    if (blog.key == "Enter") {
      onSearchClick(searchValues);
    }
  };
  const onSearchChange = (blog) => {
    const copySearch = Object.assign({}, searchValues);
    copySearch[blog.target.id] = blog.target.value;
    setSearchValues(copySearch);
  };
  const onFilterChange = (blog, filterType) => {
    const copySearch = Object.assign({}, searchValues);
    if (filterType !== "sortBy") {
      if (copySearch[filterType]) {
        if (copySearch[filterType].some((item) => item === blog.target.id)) {
          copySearch[filterType] = copySearch[filterType].filter((item) => item !== blog.target.id);
        } else {
          copySearch[filterType].push(blog.target.id);
        }
      } else {
        copySearch[filterType] = [blog.target.id];
      }
    } else {
      copySearch[filterType] = [blog.target.id];
    }
    setSearchValues(copySearch);
    setTimeout(() => onSearchClick(copySearch), 100);
  };
  const onSearchClick = (searchValues) => {
    let searchQuery = Object.assign({}, searchValues);
    Object.keys(searchValues) &&
      Object.keys(searchValues)?.map((item) => {
        if (Array.isArray(searchValues[item])) {
          searchQuery[item] = searchValues[item].join();
        }
      });
    const params = {
      ...paramsObj,
      ...searchQuery,
    };
    fetchBlogsData(params);
  };
  if (blogsData?.isLoading) {
    return <SachLoader />;
  }

  const renderBlogItem = (eachBlog, index) => {
    return (
      <div
        key={index}
        className="col-md-4 pb-2"
        onClick={() => {
          navigate(`${UserRoutes.BLOG_DETAIL}?id=${eachBlog.blogId}`);
        }}
      >
        <a className="card category-video blog-card">
          <div className="video-thumb">
            <img src={eachBlog.blogThumnail} alt="blog-thumb" />
          </div>
          <div className="card-body">
            <ul className="blog-ctgry">{eachBlog.tags && eachBlog.tags.length > 0 && eachBlog.tags.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
            <h6 className="card-title">{eachBlog.title}</h6>
            <p className="info">{parseHtml(eachBlog.desc)}</p>
            <ul className="bullet-list sm">
              <li>by {eachBlog.author}</li>
              <li>{eachBlog.date}</li>
            </ul>
          </div>
        </a>
      </div>
    );
  };

  const renderBlogs = (section) => {
    return (
      <section>
        <div className="container mb-5">
          <div className="row g-4">
            <div className="col-lg-12 me-auto col-sm-12">
              <div className="sach-title">
                <h2 className="f-700">{parseHtml(section?.title)} </h2>
                <p data-aos-delay="100">{parseHtml(section?.subTitle)} </p>
              </div>
            </div>

            {section?.itemList?.map((eachBlog, index) => renderBlogItem(eachBlog, index))}

            <div className="col-lg-12 mt-5 text-center">
              <span onClick={() => handleShowMore(section?.title)} className="btn btn-sach bg-sach-dark aos-init aos-animate">
                {section.showMoreBtnText}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderCategoryAndfilter = (data) => {
    return (
      <>
        <section className="searchbar pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 mb-3">
                <nav className="sach-breadcrumb" aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Blogs
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="row pb-3">
              <div className="col-md-8 col-lg-8">
                <div className="sach-title">
                  <h1 className="fs-40 f-700 mb-0">Latest Blog</h1>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 text-center text-md-end">
                <button onClick={() => (checkAuthentication() ? navigate(UserRoutes.WRITE_BLOG) : navigate("/login"))} className="btn btn-sach bg-sach">
                  Write Your Story
                </button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-8 col-md-8">
                <div className="input-group with-btn">
                  <span className="input-group-text">
                    <img src={require("../../../static/user/img/icons/search.svg").default} />
                  </span>
                  <input type="text" className="form-control" id="searchKey" placeholder="Search Topic, categories....." value={searchValues["searchKey"]} onChange={(blog) => onSearchChange(blog)} onKeyDown={(blog) => handleKeyDown(blog)} />
                  <span className="btn btn-sach bg-sach-dark mx-2" onClick={() => onSearchClick(searchValues)}>
                    Search
                  </span>
                </div>
              </div>
              {data?.filters?.length > 0
                ? data?.filters.map((eachFilter, index) => {
                    if (eachFilter?.tag === "year") {
                      return (
                        <div className="col-auto" key={index}>
                          <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              {searchValues[eachFilter?.tag] && searchValues[eachFilter?.tag].length > 0 ? searchValues[eachFilter?.tag].join(", ") : eachFilter?.name}
                              <img src={require("../../../static/user/img/icons/dropdown-icon-down.svg").default} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end">
                              {eachFilter?.options?.map((option, index) => {
                                let isSelected = searchValues[eachFilter?.tag]?.includes(option);
                                return (
                                  <li key={index}>
                                    <div className="dropdown-item">
                                      <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id={option} checked={isSelected} onChange={(blog) => onFilterChange(blog, eachFilter?.tag)} />
                                        <label className="form-check-label" htmlFor="LangEnglish">
                                          {option}
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                    }
                    if (eachFilter?.tag === "sortBy") {
                      return (
                        <div className="col-auto">
                          <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle sortByBtn" data-bs-toggle="dropdown" aria-expanded="false">
                              {eachFilter?.name}
                              <img src={require("../../../static/user/img/icons/dropdown-icon-down.svg").default} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end">
                              {eachFilter?.options?.map((option, index) => {
                                return (
                                  <li key={index}>
                                    <span className={`dropdown-item ${option === (searchValues?.sortBy && searchValues?.sortBy[0]) ? "active" : ""}`} id={option} onClick={(blog) => onFilterChange(blog, eachFilter?.tag)}>
                                      {option}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })
                : null}
            </div>
          </div>
          <div className="container my-5">{data.mainBlog && renderMainBlog(data.mainBlog)}</div>
          {data?.blogs?.length > 0 &&
            data?.blogs.map((section, index) => {
              return renderBlogs(section);
            })}
        </section>
      </>
    );
  };

  const renderWhyBlogInfo = (data) => {
    return (
      <>
        <section className="features-sach">
          <div className="container">
            <div className="row">
              <div className="col-md-5 mx-auto sach-title text-center">
                <h2 className="f-700">{parseHtml(data?.title)}</h2>
                <p className="f-400">{parseHtml(data?.subTitle)}</p>
              </div>
            </div>
            <div className="row">
              {data?.cards?.length > 0 &&
                data?.cards.map((card, index) => {
                  return (
                    <div className="col-lg-4 col-md-4" key={index}>
                      <div className="feature">
                        <img src={card?.icon || require("../../../static/user/img/icons/feature-1.svg").default} alt="Feature" />
                        <div className="h1">{parseHtml(card?.title)}</div>
                        <p>{parseHtml(card?.text)}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>{" "}
      </>
    );
  };

  const renderTopBanner = (data) => {
    return (
      <section className="cms-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="h1">{data.title}</div>
              <p className="para w-100"> {data.subTitle}</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderMainBlog = (data) => {
    return (
      <div
        className="row cursorPointer"
        onClick={() => {
          navigate(`${UserRoutes.BLOG_DETAIL}?id=${data.blogId}`);
        }}
      >
        <div className="col-lg-12">
        { data.tags &&
                  data.tags.length > 0 ? 
          (<div className="main-blog-bnr">
            <div className="main-blog-data">
              <ul className="sach-inline-pills my-0">
                {
                  data.tags.map((tag, index) => (
                    <li>
                      <span className="custom-sach-pills active" key={index}>
                        {tag}
                      </span>
                    </li>
                  ))}
              </ul>

              <h2>{data.title}</h2>
              <p>{parseHtml(data.desc)}</p>
              <ul className="bullet-list">
                <li>by {data.author}</li>
                <li>{data.date}</li>
              </ul>
            </div>
            <div className="main-blog-img">
              <img src={data.blogThumnail} alt="Blog Banner" />
            </div>
          </div>)
          : (<h2>No data found</h2>)
          }
        </div>
      </div>
    );
  };

  const sectionNameMapping = {
    categoryAndfilter: renderCategoryAndfilter,
    blogInfo: renderWhyBlogInfo,
    search: renderTopBanner,
  };

  return (
    <>
      <div>
        {blogsData?.data?.sectionOrder?.length > 0 &&
          blogsData?.data?.sectionOrder.map((sectionName) => {
            if (sectionNameMapping[sectionName] || blogsData?.data?.sectionData[sectionName]) {
              return sectionNameMapping[sectionName] && sectionNameMapping[sectionName](blogsData?.data?.sectionData[sectionName]);
            }
            return null;
          })}
      </div>
      <Subcriber />;
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    commonData: state?.CommonReducer,
    blogsData: state?.BlogReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogsData: (data) => dispatch(fetchBlogsData(data)),
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    //registerBlogCall: (data, navigate) => dispatch(registerBlogCall(data, navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBlogHomePage);
