import React, { useState, useEffect } from "react";
import { SearchIcon, DownloadIcon, AddIcon, UploadIcon } from "../../icons";
import { Row, Col } from "antd";
import "./style.css";
import TableTabs from "../Common/TableTabs";
import TestimonialTable from "./testimonialTable";
// import ImportTestimonialModal from "./modals/ImportTestimonialModal";
// import InviteTestimonialModal from "./modals/InviteTestimonialModal";

import {
  getTabsData,
  getTestimonialMgmtData,
  handleCreateTestimonial,
  modifyTestimonial,
  setActiveTab,
} from "../../../redux/action/admin/testimonialMgmt";
import { connect } from "react-redux";
import PageLoader from "../../../commons/PageLoader";
import { handleCtaPostApi } from "../../../redux/action/common";
import ReplyModal from "./modals/ReplyModal";
import CreateTestimonialModal from "./modals/CreateTestimonialModal";
import useTableFilter from "../hooks/useTableFilter";

const Testimonial = ({
  roleInfo,
  isLoading,
  start,
  tabsData,
  tableData,
  activeTab,
  setActiveTab,
  getTabsData,
  getTestimonialMgmtData,
  modifyTestimonial,

  handleCtaPostApi,
}) => {
  const { searchText, filteredData, onSearchChange } = useTableFilter({
    searchKeys: ["title", "subTitle"],
    tableData,
  });
  const [showCreateTestimonialModal, setShowCreateTestimonialModal] =
    useState(false);

  useEffect(() => {
    getTabsData();
  }, []);

  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };

  const renderCreateTestimonial = () => {
    return (
      roleInfo.create && (
        <button
          className="btn-sach bg-sach-dark me-3"
          onClick={() => setShowCreateTestimonialModal(true)}
        >
          <img src={AddIcon} />
          <span>Write Testimonial</span>
        </button>
      )
    );
  };

  const renderHeader = () => {
    return (
      <header className="container-fluid page-header">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <h2 className="page-title">Testimonial Management</h2>
          </div>
          <div className="col-lg-9 col-md-8 text-md-end text-center">
            <div className="input-group sach-input-group w-50 me-0 me-md-3 my-3 my-md-0">
              <span className="input-group-text" id="basic-addon1">
                <img src={SearchIcon} alt="Search Icon" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by reviewer or email..."
                onChange={onSearchChange}
              />
            </div>
            {roleInfo.export && (
              <button className="btn-sach btn-sach-linear me-3">
                <img src={UploadIcon} alt="Upload Icon" />
                <span>Export CSV</span>
              </button>
            )}
            {renderCreateTestimonial()}
          </div>
        </div>
      </header>
    );
  };

  if (isLoading) {
    return <PageLoader />;
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
              getTestimonialMgmtData({ type: val });
            }}
          />
        )}
        <TestimonialTable
          tableData={searchText ? filteredData : tableData}
          handleCtaPostApi={handleCtaPostApi}
          total={getCountTotalofRows()}
          start={start}
          handlePaginationOnChange={(size) => {
            getTestimonialMgmtData({ size, start: size, type: activeTab });
          }}
          modifyTestimonial={modifyTestimonial}
        />
      </div>
      {showCreateTestimonialModal && (
        <CreateTestimonialModal
          // handleCreateTestimonial={handleCreateTestimonial}
          handleCancel={() => setShowCreateTestimonialModal(false)}
        />
      )}
      
    </>
  );
};

const mapStateToProps = (state) => {
  const { TestimonialMgmtReducer, CommonReducer } = state;
  const { isLoading, tabsData, tableData, activeTab, start } =
    TestimonialMgmtReducer;
  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    roleInfo: CommonReducer?.adminInfo?.others?.testimonial_mgmt || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: () => dispatch(getTabsData()),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getTestimonialMgmtData: (data) => dispatch(getTestimonialMgmtData(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
    modifyTestimonial: (data) => dispatch(modifyTestimonial(data)),
    handleCreateTestimonial: (data) => dispatch(handleCreateTestimonial(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Testimonial);
