import React, { useEffect, useState } from "react";
import { SearchIcon, DownloadIcon, AddIcon, EmptyTableIcon } from "../../icons";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import EventTable from "./EventTable";
import "./style.css";
import CreateEventModal from "./modals/CreateEventModal";
import SachLoader from "../../../commons/Loader";
import {
  getEventMgmtData,
  getTabsData,
  handleCreateEvent,
  handleGenerateEvent,
  resetKey,
  setActiveTab,
} from "../../../redux/action/admin/eventMgmt";
import TableTabs from "../Common/TableTabs";
import { handleCtaPostApi } from "../../../redux/action/common";
import useTableFilter from "../hooks/useTableFilter";
import { getCategoryData } from "../../../redux/action/admin/categoryMgmt";
const EventManagement = ({
  getEventMgmtData,
  isLoading,
  start,
  tabsData,
  tableData,
  activeTab,
  categoryData,
  setActiveTab,
  getTabsData,
  handleCtaPostApi,
  handleGenerateEvent,
  getCategoryData,
  handleCreateEvent,
  resetKey,
  roleInfo
}) => {
  const { searchText, filteredData, onSearchChange } = useTableFilter({
    searchKeys: ["title"],
    tableData,
  });

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  useEffect(() => {
    getTabsData();
  }, []);

  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };

  const renderCreateEvent = () => {
    return (
      roleInfo.create && <button
        className="btn-sach bg-sach-dark"
        onClick={() => setShowCreateEventModal(true)}
      >
        <img src={AddIcon} />
        <span>Create Event</span>
      </button>
    );
  };

  const renderHeader = () => {
    return (
      <header className="container-fluid page-header">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <h2 className="page-title">Event Management</h2>
          </div>
          <div className="col-lg-6 col-md-6 text-center text-md-end ms-auto">
              <button className="input-group sach-input-group me-0 me-md-3 my-3 my-md-0">
                <span className="input-group-text" id="basic-addon1">
                  <img src={SearchIcon} alt="Search Icon" />
                </span>
                <input  
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  onChange={onSearchChange}
                />
              </button>
              {renderCreateEvent()}
          </div>
        </div>
      </header>
    );
  };

  if (isLoading) {
    return <SachLoader />;
  }

  return (
    <div>
      {renderHeader()}
      <div className="container-fluid">
        {tabsData && tabsData.length > 0 && (
          <TableTabs
            activeTab={activeTab}
            tabsData={tabsData}
            onTabClick={(val) => {
              setActiveTab(val);
              getEventMgmtData({ type: val });
            }}
          />
        )}
        <EventTable
          tableData={searchText ? filteredData : tableData}
          handleCtaPostApi={handleCtaPostApi}
          total={getCountTotalofRows()}
          start={start}
          setEditEventData={setEditEventId}
          handlePaginationOnChange={(size) => {
            getEventMgmtData({ size, start: size, type: activeTab });
          }}
          emptyText={
            <div className="empty-table">
              <img src={EmptyTableIcon} alt="No Data Found" />
              <h3>No more events</h3>
              <p>
                Please click the <b>“Create Event”</b> button to proceed appears
                here.
              </p>
              {renderCreateEvent()}
            </div>
          }
          setEditEventId={setEditEventId}
          setShowCreateEventModal={setShowCreateEventModal}
        />
      </div>
      {showCreateEventModal && (
        <CreateEventModal
          editEventId={editEventId}
          categoryData={categoryData}
          handleCancel={() => {
            setShowCreateEventModal(false);
            setEditEventId(null);
            resetKey({ eventDetail: null });
          }}
          handleCreateEvent={handleCreateEvent}
          getCategoryData={getCategoryData}
          handleGenerateEvent={handleGenerateEvent}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { EventMgmtReducer, CategoryMgmtReducer, CommonReducer } = state;
  const { categoryData } = CategoryMgmtReducer;
  const { isLoading, tabsData, tableData, activeTab, start } = EventMgmtReducer;
  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    categoryData,
    roleInfo: CommonReducer?.adminInfo?.menu?.event_mgmt || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: () => dispatch(getTabsData()),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getEventMgmtData: (data) => dispatch(getEventMgmtData(data)),
    resetKey: (data) => dispatch(resetKey(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
    handleCreateEvent: (data) => dispatch(handleCreateEvent(data)),
    handleGenerateEvent: (data) => dispatch(handleGenerateEvent(data)),
    getCategoryData: (data) => dispatch(getCategoryData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventManagement);
