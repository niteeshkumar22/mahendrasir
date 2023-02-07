import React, { useState, useEffect } from "react";
import { AddIcon, EmptyTableIcon } from "../../icons";
import { Row, Col, Dropdown, Menu } from "antd";
import { tableData, tabsData, newRolePermissionData } from "./mockData";
import UserRoleTable from "./UserRoleTable";
import "./style.css";
import { connect } from "react-redux";
import TableTabs from "../Common/TableTabs";
import CreateNewRole from "./CreateNewRole";
import SachLoader from "../../../commons/Loader";
import { handleCtaPostApi } from "../../../redux/action/common";
import {
  getUserRoleMgmtData,
  getTabsData,
  setActiveTab,
  getRoleData,
} from "../../../redux/action/admin/userRoleMgmt";
import useTableFilter from "../hooks/useTableFilter";

const UserRoleManagement = ({
  isLoading,
  start,
  tabsData,
  tableData,
  activeTab,
  roleData,
  setActiveTab,
  getTabsData,
  getUserRoleMgmtData,
  getRoleData,
  handleCtaPostApi,
}) => {
  const { searchText, filteredData, onSearchChange } = useTableFilter({
    searchKeys: ["title", "subTitle", "userContact"],
    tableData,
  });

  const [showCreateNewRolePage, setShowCreateNewRolePage] = useState(false);

  useEffect(() => {
    getTabsData();
    getRoleData();
  }, []);

  const getCountTotalofRows = () => {
    const currTabData = tabsData.filter((item) => item.value === activeTab)[0];
    return currTabData?.count;
  };

  const AddActionMenu = (
    <Menu
      className="action-btn action-dropdown"
      items={[
        {
          key: "1",
          label: (
            <div
              className="dropdown-item"
              onClick={() => setShowAddCatModal(true)}
            >
              <img src={AddIcon} alt="icon" />
              <span>Add Category</span>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              className="dropdown-item"
              onClick={() => setShowAddSubCatModal(true)}
            >
              <img src={AddIcon} alt="icon" />
              <span>Add Sub Category</span>
            </div>
          ),
        },
        {
          key: "3",
          label: (
            <div
              className="dropdown-item"
            // onClick={() => setShowDeleteCategoryModal(true)}
            >
              <img src={AddIcon} alt="icon" />
              <span>Upload Video</span>
            </div>
          ),
        },
      ]}
    />
  );

  const renderHeader = () => {
    return (
      <header className="container-fluid page-header">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <h2 className="page-title">User Role Management</h2>
          </div>
          <div className="col-lg-8 col-md-8 text-md-end text-center">
            <button
              className="btn-sach bg-sach-dark"
              onClick={() => setShowCreateNewRolePage(true)}
            >
              <img src={AddIcon} />
              <span>Create New</span>
            </button>
          </div>
        </div>
      </header>
    );
  };

  if (isLoading) {
    return <SachLoader />;
  }

  if (showCreateNewRolePage) {
    return (
      <CreateNewRole
        permissionData={newRolePermissionData}
        handleCancel={() => setShowCreateNewRolePage(false)}
      />
    );
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
              getUserRoleMgmtData({ type: val });
            }}
          />
        )}
        <UserRoleTable
          tableData={searchText ? filteredData : tableData}
          handleCtaPostApi={handleCtaPostApi}
          total={getCountTotalofRows()}
          start={start}
          roleData={roleData}
          handlePaginationOnChange={(size) => {
            getUserRoleMgmtData({ size, start: size, type: activeTab });
          }}
          emptyText={
            <div className="empty-table">
              <img src={EmptyTableIcon} alt="No Data Found" />
              <h3>No more users</h3>
              <p>
                Please click the <b>“Invite User”</b> button to proceed appears
                here.
              </p>
            </div>
          }
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { UserRoleMgmtReducer } = state;
  const { isLoading, tabsData, tableData, activeTab, start, roleData } =
    UserRoleMgmtReducer;
  return {
    isLoading,
    tabsData,
    tableData,
    activeTab,
    start,
    roleData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTabsData: () => dispatch(getTabsData()),
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getUserRoleMgmtData: (data) => dispatch(getUserRoleMgmtData(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
    getRoleData: (data) => dispatch(getRoleData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRoleManagement);
