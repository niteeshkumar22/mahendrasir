import React, { useState, useEffect } from "react";
import { SearchIcon, DownloadIcon, AddIcon, EmptyTableIcon } from "../../icons";
import { Row, Col } from "antd";
import "./style.css";
import TableTabs from "../Common/TableTabs";
import BlogTable from "./BlogTable";


import {
  getTabsData,
  getBlogMgmtData,
  
  setActiveTab,
  getBlogDetail,
} from "../../../redux/action/admin/blogMgmt";
import { connect } from "react-redux";
import SachLoader from "../../../commons/Loader";
import { handleCtaPostApi } from "../../../redux/action/common";
import useTableFilter from "../hooks/useTableFilter";
import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "../../../routes";

const BlogManagement = ({
  isLoading,
  start,
  tabsData,
  tableData,
  activeTab,
  setActiveTab,
  getTabsData,
  getBlogMgmtData,
  getBlogDetail,
  handleCtaPostApi,
  roleInfo
}) => {
  let navigate = useNavigate();
  
  const { searchText, filteredData, onSearchChange } = useTableFilter({searchKeys: ['title', 'subTitle', 'userContact'], tableData});
  
  useEffect(() => {
    getTabsData();
  }, []);

  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };

  const renderHeader = () => {
    return (
      <header className="container-fluid page-header">
				<div className="row">
					<div className="col-lg-4 col-md-4">
						<h2 className="page-title">Blogs Management</h2>
					</div>
					<div className="col-lg-6 col-md-6 text-center text-md-end ms-auto ms-auto">
						<button className="input-group sach-input-group w-50 me-3">
							<span className="input-group-text" id="basic-addon1">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd" d="M4.16667 9.16667C4.16667 6.40917 6.40917 4.16667 9.16667 4.16667C11.9242 4.16667 14.1667 6.40917 14.1667 9.16667C14.1667 11.9242 11.9242 14.1667 9.16667 14.1667C6.40917 14.1667 4.16667 11.9242 4.16667 9.16667ZM17.2558 16.0775L14.4267 13.2475C15.3042 12.1192 15.8333 10.705 15.8333 9.16667C15.8333 5.49083 12.8425 2.5 9.16667 2.5C5.49083 2.5 2.5 5.49083 2.5 9.16667C2.5 12.8425 5.49083 15.8333 9.16667 15.8333C10.705 15.8333 12.1192 15.3042 13.2475 14.4267L16.0775 17.2558C16.24 17.4183 16.4533 17.5 16.6667 17.5C16.88 17.5 17.0933 17.4183 17.2558 17.2558C17.5817 16.93 17.5817 16.4033 17.2558 16.0775Z"></path>
								</svg>
							</span>
							<input type="text" className="form-control" placeholder="Search by title..." 
                  onChange={onSearchChange}
              />
						</button>
						{roleInfo.create &&<button className="btn-sach bg-sach-dark mt-3 mt-md-0" onClick={()=>{
              navigate(`${AdminRoutes.WRITE_BLOG}`);
              return;
            }}>
							<img src={AddIcon}/>
							<span>Write Blog</span>
						</button>}
					</div>
				</div>
			</header>
    );
  };

  if (isLoading) {
    return <SachLoader />;
  }

  return (
    <>
      {renderHeader()}
      <div className="container-fluid">
        {tabsData && tabsData.length > 0 && (
          <TableTabs
            activeTab={activeTab}
            tabsData={tabsData}
            onTabClick={(val) => {
              setActiveTab(val);
              getBlogMgmtData({ type: val });
            }}
          />
        )}
        <BlogTable
          tableData={searchText ? filteredData : tableData}
          handleCtaPostApi={handleCtaPostApi}
          getBlogDetail={getBlogDetail}
          total={getCountTotalofRows()}
          start={start}
          handlePaginationOnChange={(size) => {
            getBlogMgmtData({ size, start: size, type: activeTab });
          }}
          emptyText={
            <div className="empty-table">
              <img src={EmptyTableIcon} alt="No Data Found" />
              <h3>No more blogs</h3>
              <p>
                Please click the <b>Write Blog”</b> button to proceed appears
                here.
              </p>
            </div>
          }
        />
      </div>
      {/* {showImportBlogModal && (
        <ImportBlogModal
          handleInviteBlog={handleInviteBlog}
          handleCancel={() => setShowImportBlogModal(false)}
        />
      )}
      {showInviteBlogModal && (
        <InviteBlogModal
          handleInviteBlog={handleInviteBlog}
          handleCancel={() => setShowInviteBlogModal(false)}
        />
      )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  const { BlogMgmtReducer, CommonReducer } = state;
  const { isLoading, tabsData, tableData, activeTab, start,blogDetail } = BlogMgmtReducer;
  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    blogDetail,
    roleInfo: CommonReducer?.adminInfo?.others?.blog_mgmt || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: () => dispatch(getTabsData()),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getBlogMgmtData: (data) => dispatch(getBlogMgmtData(data)),
    handlePublishBlog: (data) => dispatch(handlePublishBlog(data)),
    getBlogDetail: (data) => dispatch(getBlogDetail(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogManagement);
