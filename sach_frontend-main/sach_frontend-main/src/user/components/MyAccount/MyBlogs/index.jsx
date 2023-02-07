import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BlogTile from "./blogTile";
import UserAccountTabs from "../../common/UserAccountTabs";
import DeleteBlogModal from "./modals/DeleteBlogModal";
import { getTabsData, setActiveTab, getBlogDetail, getMyBlogsData } from "../../../../redux/action/user/myBlogs";
import { AdminRoutes, UserRoutes } from "../../../../routes";
import { useLocation, useNavigate } from "react-router-dom";
import UserAccountPagination from "../../common/UserAccountPagination";
import ShareBlogModal from "./modals/ShareBlogModal";
import { handleCtaPostApi } from "../../../../redux/action/common";
import CommentBlogModal from "./modals/CommentBlogModal";
import "./style.css";
const MyBlogs = ({ isLoading, start, tabsData, tableData, activeTab, setActiveTab, getTabsData, getMyBlogsData, getBlogDetail, handleCtaPostApi, blogDetail }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false);
  const [showShareBlogModal, setShowShareBlogModal] = useState(false);
  const [showCommentBlogModal, setShowCommentBlogModal] = useState(false);
  const [selectedCta, setSelectedCta] = useState(false);

  const handleSelectedCta = (data) => {
    setSelectedCta({ ...data });
  };

  useEffect(() => {
    getTabsData();
  }, []);
  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };
  return (
    <>
      <div className="col-md-9">
        <div className="nav_content">
          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-tab-1" tabIndex="0">
              <div className="row">
                <div className="col-md-9">
                  <div className="userSettingCont">
                    <div className="settHead">My Stories / Blogs</div>
                    <div className="settPara">In publishing and graphic design, Lorem ipsum is a placeholder text commonly</div>
                  </div>
                </div>
                <div className="col-md-3 text-end">
                  <button className="btn btn-sach bg-sach" onClick={() => navigate(UserRoutes.WRITE_BLOG)}>
                    Write Your Story
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-12 col-md-12">
                  {tabsData && tabsData.length > 0 && (
                    <UserAccountTabs
                      activeTab={activeTab}
                      tabsData={tabsData}
                      onTabClick={(val) => {
                        setActiveTab(val);
                        getMyBlogsData({ type: val });
                      }}
                    />
                  )}

                  <div className="tab-content" id="pills-tabContent-3">
                    <div className="tab-pane fade show active" id="pills-7" role="tabpanel" aria-labelledby="pills-tab-7">
                      {tableData && tableData.length > 0 && tableData.map((d, i) => <BlogTile key={`blogTile-${i}`} item={d} handleSelectedCta={handleSelectedCta} setShowDeleteBlogModal={setShowDeleteBlogModal} setShowShareBlogModal={setShowShareBlogModal} setShowCommentBlogModal={setShowCommentBlogModal} />)}
                      <UserAccountPagination
                        start={start}
                        total={getCountTotalofRows()}
                        handlePaginationOnChange={(size) => {
                          getMyBlogsData({
                            size,
                            start: size,
                            type: activeTab,
                          });
                        }}
                      />
                    </div>

                    <div className="tab-pane fade" id="pills-8" role="tabpanel" aria-labelledby="pills-tab-8">
                      <div className="no_profile_data">
                        <img src={require("../../../../static/user/img/icons/note.svg").default} alt="No-Data" />
                        <span>No Stories yet!</span>

                        <button className="btn btn-sach bg-sach" onClick={() => navigate(UserRoutes.WRITE_BLOG)}>
                          Write Story
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteBlogModal && <DeleteBlogModal selectedCta={selectedCta} handleCtaPostApi={handleCtaPostApi} handleCancel={() => setShowDeleteBlogModal(false)} />}
      {showShareBlogModal && <ShareBlogModal link={`${window?.origin}${UserRoutes.BLOG_DETAIL}?id=${selectedCta.blogId}`} handleCancel={() => setShowShareBlogModal(false)} />}
      {showCommentBlogModal && <CommentBlogModal text={selectedCta.comment} title={selectedCta.title} handleCancel={() => setShowCommentBlogModal(false)} />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { MyBlogsReducer } = state;
  const { isLoading, tabsData, tableData, activeTab, start, blogDetail } = MyBlogsReducer;
  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    blogDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: () => dispatch(getTabsData()),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getMyBlogsData: (data) => dispatch(getMyBlogsData(data)),
    handlePublishBlog: (data) => dispatch(handlePublishBlog(data)),
    getBlogDetail: (data) => dispatch(getBlogDetail(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogs);
