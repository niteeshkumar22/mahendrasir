import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import { searchBlogCall } from "../../../redux/action/user/blogs";
import SachLoader from "../../../commons/Loader";
import { parseHtml } from "../../../utils/util";
import { showPopup } from "../../../redux/action/common";
import { UserRoutes } from "../../../routes";
const BlogsSummary = (props) => {
  const { searchBlogCall, blogsData, showPopup } = props;
  let navigate = useNavigate();
  const location = useLocation();
  const [searchValues, setSearchValues] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);

  useEffect(() => {
    searchBlogCall(paramsObj);
  }, []);
  const handleKeyDown = (blog) => {
    if (blog.key == "Enter") {
      onSearchClick(searchValues);
    }
  };

  if (blogsData?.isLoading) {
    return <SachLoader />;
  }
  const blogsSearchResult = blogsData?.searchResult;

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
    searchBlogCall(params);
  };

  const renderEachSection = (eachBlog, index) => {
    return (
      <div
        className="col-md-4"
        onClick={() => {
          navigate(`${UserRoutes.BLOG_DETAIL}?id=${eachBlog.blogId}`);
        }}
      >
        <a className="card category-video blog-card">
          <div className="video-thumb">
            <img src={eachBlog.blogThumnail} alt="blog-thumb" />
          </div>
          <div className="card-body">
            <ul className="blog-ctgry">{eachBlog.tags && eachBlog.tags.length > 0 && eachBlog.tags.map((tag) => <li>{tag}</li>)}</ul>
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

  return (
    <>
      <div>
        <section className="searchbar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="sach-title text-start">
                  <h2 className="f-700 mt-4">{parseHtml(blogsSearchResult?.title)}</h2>
                  <p data-aos-delay="100">{parseHtml(blogsSearchResult?.subTitle)}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <div className="input-group with-btn">
                  <span className="input-group-text">
                    <img src={require("../../../static/user/img/icons/search.svg").default} alt="Search" htmlFor="voice-input" />
                  </span>
                  <input type="text" className="form-control" id="searchKey" placeholder="Search Topic, categories....." value={searchValues["searchKey"]} onChange={(blog) => onSearchChange(blog)} onKeyDown={(blog) => handleKeyDown(blog)} />
                  <span className="btn btn-sach bg-sach-dark mx-2" onClick={() => onSearchClick(searchValues)}>
                    Search
                  </span>
                </div>
              </div>

              {blogsSearchResult?.filters?.length > 0
                ? blogsSearchResult?.filters.map((eachFilter) => {
                    if (eachFilter?.tag === "year") {
                      return (
                        <div className="col-auto">
                          <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              {eachFilter?.name}
                              <img src={require("../../../static/user/img/icons/dropdown-icon-down.svg").default} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end">
                              {eachFilter?.options?.map((option) => {
                                let isSelected = searchValues[eachFilter?.tag]?.includes(option);
                                return (
                                  <li>
                                    <div className="dropdown-item">
                                      <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id={option} checked={isSelected} onChange={(blog) => onFilterChange(blog, eachFilter?.tag)} />
                                        <label className="form-check-label" for="LangEnglish">
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
                    return null;
                  })
                : null}
            </div>
          </div>
        </section>
        <div className="container py-5">
          <div className="row g-4">
            {blogsSearchResult?.blogs?.length > 0 ? (
              blogsSearchResult?.blogs?.map((item, index) => {
                if (item?.list && item?.list?.length > 0) {
                  return item.list.map((d) => renderEachSection(d));
                }
                return <div></div>;
              })
            ) : (
              <h4 className="container d-flex justify-content-center">No Blogs Found Yet</h4>
            )}
          </div>
        </div>
      </div>
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
    searchBlogCall: (data) => dispatch(searchBlogCall(data)),
    showPopup: (type, data) => dispatch(showPopup(type, data)),
    // registerBlogCall: (data, navigate) => dispatch(registerBlogCall(data, navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogsSummary);
