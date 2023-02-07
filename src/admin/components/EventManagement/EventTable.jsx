import React, { useState, useEffect } from "react";
import AdminTable from "../Common/AdminTable";
import { Button, Dropdown, Menu, Space } from "antd";
import { DeleteIcon, DropdownIcon, EditIcon } from "../../icons";
import ViewDetailsSvg from "../../../static/admin/img/icons/viewDetails.svg";
// import ResendInviteSvg from "../../../static/admin/img/icons/resendInvite.svg";
import BlockSvg from "../../../static/admin/img/icons/block.svg";
import DeleteEventModal from "./modals/DeleteEventModal";
import ChangeStatusModal from "../UserManagement/modals/ChangeStatusModal";
// import InactiveEventModal from "./modals/InactiveEventModal";

const EventTable = (props) => {
  const { handleCtaPostApi, emptyText, editEventData, setEditEventId, setShowCreateEventModal } = props;
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [selectedCta, setSelectedCta] = useState(false);
  const [dataSource, setDataSource] = useState(props.tableData || []);

  useEffect(() => {
    setDataSource(props.tableData);
  }, [props.tableData]);

  useEffect(() => {
    if(editEventData) {

    }
  });

  const handleInactiveEvent = () => {};

  const handleEditEvent = () => {};

  const handleStatusClick = (record) => {
    const {action} = record;
    const item =  action.filter(d => d.type === "in-active" ||  d.type === "active" )[0];
    setShowChangeStatusModal(true);
    setSelectedCta(item);
  }

  const getMenuItems = (row) => {
    const res = row.action.map((item, i) => {
      switch (item.type) {
        case "detail":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => handleCtaPostApi(item)}
              >
                <img src={ViewDetailsSvg} alt="icon" />
                <span>Edit Event</span>
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
        case "delete":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => {
                  setShowDeleteEventModal(true);
                  setSelectedCta({...row, cta: item.cta});
                }}
              >
                <img src={DeleteIcon} alt="icon" />
                <span>{item.value}</span>
              </div>
            ),
          };
          case "edit":
            return {
              key: i,
              label: (
                <div
                className="dropdown-item"
                onClick={() => {
                  setEditEventId(row.eventId);
                  setShowCreateEventModal(true);
                }}
              >
                <img src={EditIcon} alt="icon" />
                <span>{item.value}</span>
              </div>
              ),
            };
      }
    });
    return res;
  };

  const EventColumns = [
    {
      title: "Event Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div className="blog-table-data">
          <div className="blog-bg _sm">
            <img src={record.icon} alt="Event Image" />
          </div>
          <div className="blog-data">
            <h5>{text}</h5>
            <ul className="inline-bullet-list">
              <li>
                <span>{record.category}</span>
              </li>
              <li>
                <span>{record.subCategory}</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      sorter: (a, b) => a.paymentMode.localeCompare(b.paymentMode),
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
      key: "eventType",
    },
    {
      title: "Register guest",
      dataIndex: "registerGuest",
      key: "registerGuest",
    },
    {
      title: "Attend guest",
      dataIndex: "attendGuest",
      key: "attendGuest",
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
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
        columns={EventColumns}
      />
      {showDeleteEventModal && (
        <DeleteEventModal
          selectedCta={selectedCta}
          handleCtaPostApi={handleCtaPostApi}
          handleCancel={() => setShowDeleteEventModal(false)}
        />
      )}
      {showChangeStatusModal && (
        <ChangeStatusModal
          page="event"
          selectedCta={selectedCta}
          handleCancel={() => setShowChangeStatusModal(false)}
          handleCtaPostApi={handleCtaPostApi}
        />
      )}
    </>
  );
};

export default EventTable;
