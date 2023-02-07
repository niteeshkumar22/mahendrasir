import React, { useState, useEffect } from "react";
import AdminTable from "../Common/AdminTable";
import { Button, Dropdown, Menu, Space } from "antd";
import { DropdownIcon } from "../../icons";
import ViewDetailsSvg from "../../../static/admin/img/icons/viewDetails.svg";
import ResendInviteSvg from "../../../static/admin/img/icons/resendInvite.svg";
import BlockSvg from "../../../static/admin/img/icons/block.svg";
import ChangeStatusModal from "./modals/ChangeStatusModal";
import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "../../../routes";

const UserTable = (props) => {
  let navigate = useNavigate();

  const { handleCtaPostApi, emptyText, getViewDetail } = props;
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);

  const [selectedCta, setSelectedCta] = useState({});
  const [dataSource, setDataSource] = useState(props.tableData || []);

  useEffect(() => {
    setDataSource(props.tableData);
  }, [props.tableData]);

  const handleStatusClick = (record) => {
    const { action } = record;
    const item = action.filter(
      (d) => d.type === "in-active" || d.type === "active"
    )[0];
    setShowChangeStatusModal(true);
    setSelectedCta(item);
  };

  const getMenuItems = (row) => {
    const res = row.action.map((item, i) => {
      switch (item.type) {
        case "re-invite":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item sendInvitation"
                onClick={() => handleCtaPostApi(item)}
              >
                <img src={ResendInviteSvg} alt="icon" />
                <span>{item.value}</span>
              </div>
            ),
          };
        case "view_details":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => {
                  navigate(`${AdminRoutes.USER_VIEW_DETAIL}?id=${row.userId}`)
                }}
              >
                <img src={ViewDetailsSvg} alt="icon" />
                <span>View Details</span>
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
                    getViewDetail({ id: row.userId });
                  }}
                >
                  <img src={ViewDetailsSvg} alt="icon" />
                  <span>{item.value}</span>
                </div>
              ),
            };  
        case "active":
        case "in-active":
          return {
            key: i,
            label: (
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
            ),
          };
      }
    });
    return res;
  };

  const UserColumns = [
    {
      title: "User Name",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div className="userName">
          <div className="avtr">
            {record.icon ? (
              <img src={record.icon} alt="Avatar" />
            ) : (
              text.charAt(0).toUpperCase()
            )}
          </div>

          <div className="userData">
            {text}
            <div>{record.subTitle}</div>
          </div>
        </div>
      ),
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId.localeCompare(b.userId),
    },
    {
      title: "Mobile No.",
      dataIndex: "userContact",
      key: "userContact",
    },
    {
      title: "Last Activity",
      dataIndex: "lastActivity",
      key: "lastActivity",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.type.localeCompare(b.status.type),
      render: (text, record, i) => (
        <span
          className={`status-btn _${text.type}`}
          onClick={() => handleStatusClick(record)}
        >
          {text.value}
        </span>
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
    emptyText,
  };
  return (
    <>
      <AdminTable
        {...props}
        locale={locale}
        dataSource={dataSource}
        columns={UserColumns}
      />
      {showChangeStatusModal && (
        <ChangeStatusModal
          page="user"
          selectedCta={selectedCta}
          handleCancel={() => setShowChangeStatusModal(false)}
          handleCtaPostApi={handleCtaPostApi}
        />
      )}
    </>
  );
};

export default UserTable;
