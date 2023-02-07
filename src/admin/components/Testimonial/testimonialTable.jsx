import React, { useState, useEffect } from "react";
import AdminTable from "../Common/AdminTable";
import { Button, Dropdown, Menu, Space } from "antd";
import { AddIcon, DropdownIcon, PreviewIcon } from "../../icons";
import BlockSvg from "../../../static/admin/img/icons/block.svg";
import { parseHtml } from "../../../utils/util";
import DeleteTestimonialModal from "./modals/DeleteTestimonialModal";
import ReplyModal from "./modals/ReplyModal";
import ChangeStatusModal from "./modals/ChangeStatusModal";

const TestimonialTable = (props) => {
  const { handleCtaPostApi, modifyTestimonial } = props;
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [selectedCta, setSelectedCta] = useState(false);
  const [dataSource, setDataSource] = useState(props.tableData || []);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteTestimonialModal, setShowDeleteTestimonialModal] =
    useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    setDataSource(props.tableData);
  }, [props.tableData]);

  const handleModifyTestimonial = (val, reason) => {
    modifyTestimonial([
      {
        blogId: selectedCta.blogId,
        blogFieldName: "status",
        blogFieldValue: val,
      },
      {
        blogId: selectedCta.blogId,
        blogFieldName: "comment",
        blogFieldValue: reason,
      },
    ]);
  };

  const getMenuItems = (row) => {
    const res = row.action.map((item, i) => {
      switch (item.type) {
        case "view":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => {
                  setSelectedCta(row);
                  setShowReplyModal(true);
                }}
              >
                <img src={PreviewIcon} alt="icon" />
                <span>{item.value}</span>
              </div>
            ),
          };
        case "approve":
        case "decline":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => {
                  setType(item.type);
                  setShowChangeStatusModal(true);
                  setSelectedCta(row);
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
      title: "Author",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div className="userName">
          <div className="avtr">
            {record.icon ? (
              <img src={record.icon} alt="" />
            ) : (
              text?.charAt(0).toUpperCase()
            )}
          </div>

          <div className="userData">
            {text}
            <p>
              <span>{record.subTitle}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Review",
      dataIndex: "description",
      key: "description",
      render: (text) => parseHtml(text),
    },
    {
      title: "Date & Time",
      dataIndex: "datetime",
      key: "datetime",
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

  let locale = (
    <div class="empty-table">
      <img src="img/icons/no-data.svg" alt="No Data Found" />
      <h3>No more In-Active users</h3>
      <p>
        Please click the <b>“Invite User”</b> button to proceed appears here.
      </p>
      <button class="btn-sach bg-sach-dark">
        <img src={AddIcon} />
        <span>Invite User</span>
      </button>
    </div>
  );

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
          type={type}
          selectedCta={selectedCta}
          handleCancel={() => setShowChangeStatusModal(false)}
          handleModifyTestimonial={handleModifyTestimonial}
          handleCtaPostApi={handleCtaPostApi}
        />
      )}
      {showReplyModal && (
        <ReplyModal
          selectedCta={selectedCta}
          modifyTestimonial={modifyTestimonial}
          handleCancel={() => setShowReplyModal(false)}
        />
      )}
      {showDeleteTestimonialModal && (
        <DeleteTestimonialModal
          selectedCta={selectedCta}
          handleCtaPostApi={handleCtaPostApi}
          handleCancel={() => setShowDeleteTestimonialModal(false)}
        />
      )}
    </>
  );
};

export default TestimonialTable;
