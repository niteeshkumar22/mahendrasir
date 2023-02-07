import React, { useState, useEffect } from "react";
import {
  SearchIcon,
  DownloadIcon,
  AddIcon,
  EmptyTableIcon,
  AddBlackIcon,
} from "../../icons";
import { Row, Col } from "antd";
import "./style.css";
import TableTabs from "../Common/TableTabs";
import UserTable from "./UserTable";
import ImportUserModal from "./modals/ImportUsersModal";
import InviteUserModal from "./modals/InviteUserModal";

import {
  getTabsData,
  getUserMgmtData,
  handleInviteUser,
  setActiveTab,
  getUserMgmtDataRespond,
  getViewDetail,
} from "../../../redux/action/admin/userMgmt";
import { connect } from "react-redux";
import SachLoader from "../../../commons/Loader";
import { handleCtaPostApi } from "../../../redux/action/common";
import useTableFilter from "../hooks/useTableFilter";
import ViewDetail from "./ViewDetail";

const UserManagement = ({
  roleInfo,
  isLoading,
  start,
  tabsData,
  tableData,
  activeTab,
  viewDetail,
  isUploadLoader,
  setActiveTab,
  getTabsData,
  getUserMgmtData,
  getUserMgmtDataRespond,
  handleInviteUser,
  handleCtaPostApi,
  getViewDetail,
}) => {
  const { searchText, filteredData, onSearchChange } = useTableFilter({
    searchKeys: ["title", "subTitle", "userContact"],
    tableData,
  });
  const [showImportUserModal, setShowImportUserModal] = useState(false);
  const [showInviteUserModal, setShowInviteUserModal] = useState(false);

  useEffect(() => {
    getTabsData();

    return () => {
      // remove viewDetails page data
      getUserMgmtDataRespond({
        viewDetails: null,
      });
    };
  }, []);

  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const exportToCsv = (e) => {
    e.preventDefault();
    console.log("swdf");
    // Headers for each column
    let headers = ["UserId,UserName,UserContact,UserStatus"];

    // Convert users data to a csv
    let usersCsv = tableData.reduce((acc, user) => {
      const { userId, title, userContact, status } = user;
      const { value } = status;
      acc.push([userId, title, userContact, value].join(","));
      return acc;
    }, []);

    downloadFile({
      data: [...headers, ...usersCsv].join("\n"),
      fileName: "users.csv",
      fileType: "text/csv",
    });
  };

  const renderInviteUser = () => {
    return (
      <button
        className="btn-sach bg-sach-dark"
        onClick={() => setShowInviteUserModal(true)}
      >
        <img src={AddIcon} />
        <span>Add User</span>
      </button>
    );
  };

  const renderHeader = () => {
    return (
      <header className="container-fluid page-header">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <h2 className="page-title">User Management</h2>
          </div>
          <div className="col-lg-9 col-md-8 text-md-end text-center">
            <div className="input-group sach-input-group me-0 me-md-3 my-3 my-md-0">
              <span className="input-group-text" id="basic-addon1">
                <img src={SearchIcon} alt="Search Icon" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, email and number..."
                onChange={onSearchChange}
              />
            </div>

            {roleInfo.export && <button
              className="btn-sach btn-sach-linear me-3"
              onClick={exportToCsv}
            >
              <img src={DownloadIcon} alt="Download Icon" />
              <span>Export CSV</span>
            </button>
            }
            { roleInfo.create && <>
            <button
              className="btn-sach btn-sach-linear me-3"
              onClick={() => setShowImportUserModal(true)}
            >
              <img src={AddBlackIcon} alt="Download Icon" />
              <span>Bulk Invite</span>
            </button>
            {renderInviteUser()}
            </>}
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
              getUserMgmtData({ type: val });
            }}
          />
        )}
        <UserTable
          tableData={searchText ? filteredData : tableData}
          handleCtaPostApi={handleCtaPostApi}
          total={getCountTotalofRows()}
          start={start}
          handlePaginationOnChange={(size) => {
            getUserMgmtData({ size, start: size, type: activeTab });
          }}
          emptyText={
            <div className="empty-table">
              <img src={EmptyTableIcon} alt="No Data Found" />
              <h3>No more users</h3>
              <p>
                Please click the <b>“Invite User”</b> button to proceed appears
                here.
              </p>
              {renderInviteUser()}
            </div>
          }
          isLoading={isLoading}
          getViewDetail={getViewDetail}
          viewDetail={viewDetail}
        />
      </div>

      {showImportUserModal && (
        <ImportUserModal
          handleInviteUser={handleInviteUser}
          handleCancel={() => setShowImportUserModal(false)}
        />
      )}
      {showInviteUserModal && (
        <InviteUserModal
          isUploadLoader={isUploadLoader}
          handleInviteUser={handleInviteUser}
          handleCancel={() => setShowInviteUserModal(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { UserMgmtReducer, CommonReducer } = state;
  const { isLoading, tabsData, tableData, activeTab, start, viewDetail } =
    UserMgmtReducer;
  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    viewDetail,
    isUploadLoader: CommonReducer.isUploadLoader,
    roleInfo: CommonReducer?.adminInfo?.menu?.user_mgmt || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: () => dispatch(getTabsData()),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getUserMgmtData: (data) => dispatch(getUserMgmtData(data)),
    getUserMgmtDataRespond: (data) => dispatch(getUserMgmtDataRespond(data)),
    handleInviteUser: (data) => dispatch(handleInviteUser(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
    getViewDetail: (data) => dispatch(getViewDetail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
