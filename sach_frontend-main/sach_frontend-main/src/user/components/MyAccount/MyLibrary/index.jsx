import React, { useEffect, useState } from "react";
import { SearchIcon, AddIcon, EmptyTableIcon } from "../../../../admin/icons";
import { connect } from "react-redux";
import SachLoader from "../../../../commons/Loader";
import SuccessImage from "../../../../static/admin/img/icons/success.svg";

import {
  getEventMgmtData,
  getTabsData,
  handleCreateEvent,
  handleGenerateEvent,
  resetKey,
  setActiveTab,
} from "../../../../redux/action/admin/eventMgmt";
import {
  registerEventCall,
  toggleRegisterPopUp,
} from "../../../../redux/action/user/events";
import { showPopup } from "../../../../redux/action/common";
import useTableFilter from "../../../../admin/components/hooks/useTableFilter";
import TableTabs from "../../../../admin/components/Common/TableTabs";

import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import AdminModal from "../../common/AdminModal";
import UserAccountPagination from "../../common/UserAccountPagination";
const MyLibrary = ({
  getEventMgmtData,
  isLoading,
  start,
  tabsData,
  tableData,
  activeTab,
  setActiveTab,
  getTabsData,
  showPopup,
  registerEventCall,
  toggleRegisterPopUp,
  eventsData,
}) => {
  const { searchText, filteredData, onSearchChange } = useTableFilter({
    searchKeys: ["title"],
    tableData,
  });
 
  useEffect(() => {
    getTabsData({wishOrRegister:"watch",activeTab:"event", page:"MyLibrary"});
  }, []);
  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };
  let navigate = useNavigate();
  const handleVideoClick = (data) => {
    navigate(`/user/category-video?catId=${data?.categoryId}&subCatId=${data?.subCategoryId}&videoId=${data?.videoId}`);
    return;
  };
  if (isLoading) { 
    return <SachLoader />;
  }

  return (
    <>
    <div className="col-md-9">
    <div className="nav_content">
      <div className="tab-content" id="v-pills-tabContent">
        <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-tab-1" tabindex="0">
              <div className="userSettingCont">
                <div className="settHead">My Library</div>
                <div className="settPara">In publishing and graphic design, Lorem ipsum is a placeholder text commonly</div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-12 col-md-12">
                    <div className="sach-admin-tabs">
                    {tabsData && tabsData.length > 0 && (
                      <TableTabs
                        activeTab={activeTab}
                        tabsData={tabsData}
                        onTabClick={(val) => {
                          setActiveTab(val);
                          getEventMgmtData({ type: val , page:"MyLibrary"});
                        }}
                      />
                    )}
                    {activeTab == 'video' && tableData?.map( (item) => {
                        return (  
                            <div className="col-lg-4 col-md-4 col-sm-6">
                              <div className="my_lib">
                                <div className="my_lib_video" onClick={()=>{handleVideoClick(item)}}>
                                  <img src={item.icon} alt="library-thumb"  />
                                </div>
                                <h3>{item.title}</h3>
                                <ul>
                                  <li>
                                    <span className="text-sach">{item.categoryName}</span>
                                  </li>
                                </ul>
                                <p>{item.videoDescription}</p>
                                <div className="hosted_by">
                                  <img src={require('../../../../static/user/img/user-image.png').default} alt="Hosted-By" />
                                  <span>by</span>
                                  <b>Dr.Subhash Chandra Ji</b>
                                </div>
                              </div>
                            </div>
                           
                        )
                    })}
                    </div>
                  </div>
              </div>
              <UserAccountPagination
                        start={start||0}
                        total={getCountTotalofRows()}
                        handlePaginationOnChange={(size) => {
                          getEventMgmtData({ size, start: size, type: activeTab,wishOrRegister:'register'});
                        }}
                      />
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

const mapStateToProps = (state) => {
  const { EventMgmtReducer, CommonReducer,EventReducer } = state;
  const {eventsData} = EventReducer;
  const { isLoading, tabsData, tableData, activeTab, start } = EventMgmtReducer;

  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    eventsData,
    roleInfo: CommonReducer?.adminInfo?.menu?.event_mgmt || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: (data) => dispatch(getTabsData(data)),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getEventMgmtData: (data) => dispatch(getEventMgmtData(data)),
    resetKey: (data) => dispatch(resetKey(data)),
    handleCreateEvent: (data) => dispatch(handleCreateEvent(data)),
    handleGenerateEvent: (data) => dispatch(handleGenerateEvent(data)),
    registerEventCall: (data, navigate) =>
    dispatch(registerEventCall(data, navigate)),
  showPopup: (type, data) => dispatch(showPopup(type, data)),
  toggleRegisterPopUp: (data) => dispatch(toggleRegisterPopUp(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLibrary);
 