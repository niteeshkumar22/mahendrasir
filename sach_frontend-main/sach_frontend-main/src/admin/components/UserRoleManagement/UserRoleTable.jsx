import React, { useState } from "react";
import AdminTable from "../Common/AdminTable";
import { Menu, Space, Dropdown, Button } from "antd";
import { DropdownIcon } from "../../icons";
import ViewDetailsSvg from "../../../static/admin/img/icons/viewDetails.svg";
import ResendInviteSvg from "../../../static/admin/img/icons/resendInvite.svg";
import BlockSvg from "../../../static/admin/img/icons/block.svg";
import DeleteUserRoleModal from "./modals/DeleteUserRoleModal";
import EditUserRoleEventModal from "./modals/EditUserRoleModal";

const UserRoleTable = (props) => {

  const [showDeleteUserRoleModal, setShowDeleteUserRoleModal] = useState(false);
  const [showEditUserRoleModal, setShowEditUserRoleModal] = useState(false);

  const { roleData, handleCtaPostApi, emptyText } = props;
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [selectedCta, setSelectedCta] = useState(false);
  const [dataSource, setDataSource] = useState(props.tableData || []);

  const handleStatusClick = (val, i) => {
    const tempData = [...dataSource];
    let status = val === "active" ? "inactive" : "active";
    tempData[i].status = status;
    setDataSource(tempData);
  }

  const handleEditUserRole = () => { }

  const handleInactiveUserRole = (record) => {
    console.log(record)
  }


  const getMenuItems = (row) => {
    console.log(row)
    if (!row.action) return null;
    const res = row?.action.map((item, i) => {
      switch (item.type) {
        case "active":
        case "in-active":
          return {
            key: i,
            label: (
              <>
                <button
                  className="btn linear-action-btn d-inline-flex"
                  onClick={() => {
                    setShowDeleteBlogModal(true);
                    setSelectedCta({ ...item, blogId: row.blogId });
                  }}
                >
                  <img src={DeleteIcon} />
                </button>
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setShowChangeStatusModal(true);
                    setSelectedCta(item);
                  }}
                >
                  <img src={BlockSvg} alt="icon" />
                  <span>{item.value}</span>
                </div>
              </>
            ),
          };
        case "delete_role":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => {
                  setShowDeleteUserRoleModal(true);
                  console.log(row);
                  setSelectedCta({ ...item, roleId: row.roleId });
                }}
              >
                <img src={BlockSvg} alt="icon" />
                <span>{item.value}</span>
              </div>
            ),
          };
        case "assigning_role":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => {
                  setShowEditUserRoleModal(true);
                  console.log(row);
                  setSelectedCta({ ...item, roleId: row.roleId });
                }}
              >
                <img src={ViewDetailsSvg} alt="icon" />
                <span>{item.value}</span>
              </div>
            ),
          };
      }
    });
    return res;
  };

  const UserRoleColumns = [
    {
      title: "Account name",
      dataIndex: "account_name",
      key: "account_name",
      render: (text, record) => (
        <div className="1">
          <div className="avtr">
            {record.icon ? (
              <img src={record.icon} alt="Avatar" />
            ) : (
              text.charAt(0).toUpperCase()
            )}
          </div>

          <div className="userData">
            {text}
            <div>
              {record.subTitle}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.type.localeCompare(b.status.type),
      render: (text, record, i) => (
        <span className={`status-btn _${text.type}`}>{text.value}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const items = getMenuItems(record);
        return (
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu className="action-btn action-dropdown" items={items} />
              }
              trigger={["click"]}
            >
              <Button shape="circle">
                <img src={DropdownIcon} />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
  ];
  let locale = {
    emptyText
  }

  return (
    <>
      <AdminTable
        {...props}
        locale={locale}
        dataSource={dataSource}
        columns={UserRoleColumns}
      />

      {showDeleteUserRoleModal && (
        <DeleteUserRoleModal selectedCta={selectedCta}
          handleCtaPostApi={handleCtaPostApi} handleCancel={() => setShowDeleteUserRoleModal(false)} />
      )}

      {showEditUserRoleModal && (
        <EditUserRoleEventModal selectedCta={selectedCta} roleData={roleData}
          handleCtaPostApi={handleCtaPostApi} handleCancel={() => setShowEditUserRoleModal(false)} />
      )}
    </>
  );
};

export default UserRoleTable;
