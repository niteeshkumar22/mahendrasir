import React, { useState, useEffect } from "react";
import AdminTable from "../Common/AdminTable";
import { Space, Dropdown, Menu, Button } from "antd";
import { AddIcon, DeleteIcon, DropdownIcon, EditIcon, PreviewIcon } from "../../icons";
import ResendInviteSvg from "../../../static/admin/img/icons/resendInvite.svg";
import BlockSvg from "../../../static/admin/img/icons/block.svg";
import WriteBlog from "./WriteBlog";
import DeleteBlogModal from "./modals/DeleteBlogModal";
import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "../../../routes";

const BlogTable = (props) => {
  const { handleCtaPostApi, emptyText , getBlogDetail} = props;
  // const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [selectedCta, setSelectedCta] = useState(false);
  const [dataSource, setDataSource] = useState(props.tableData || []);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false);

  let navigate = useNavigate();


  useEffect(() => {
    setDataSource(props.tableData);
  }, [props.tableData]);

  const getMenuItems = (row) => {
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
        case "delete":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item"
                onClick={() => {
                  setShowDeleteBlogModal(true);
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
                  navigate(`${AdminRoutes.WRITE_BLOG}?id=${row.blogId}`)
                  // setShowCreateBlogModal(true);
                }}
              >
                <img src={EditIcon} alt="icon" />
                <span>{item.value}</span>
              </div>
            ),
          };
          case "view":
            return {
              key: i,
              label: (
                <div
                  className="dropdown-item"
                  onClick={() => {
                    navigate(`${AdminRoutes.BLOG_DETAIL}?id=${row.blogId}`)
                    // setShowCreateBlogModal(true);
                  }}
                >
                  <img src={PreviewIcon} alt="icon" />
                  <span>{item.value}</span>
                </div>
              ),
            };
      }
    });
    return res;
  };

  const BlogColumns = [
    {
      title: "Blog Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div className="blog-table-data">
          <div className="blog-bg _sm">
            {record.icon ? (
              <img src={record.icon} />
            ) : (
              text.charAt(0).toUpperCase()
            )}
          </div>

          <div className="blog-data">
            {record.category && <span className="badge rounded-pill bg-primary">
              {record.category}
            </span>}
            {record.subCategory && <span className="badge rounded-pill bg-primary">
              {record.subCategory}
            </span>}
            <h4>{text}</h4>
            <ul className="inline-list">
              {record.tags &&
                record.tags.map((tag, i) => (
                  <li key={`tag-${i}`}>
                    <span className="badge rounded-pill linear-badge">
                      {tag}
                    </span>
                  </li>
                ))}
            </ul>
            <ul className="inline-bullet-list">
              {record.author && <li>
                <div>{record.author}</div>
              </li>}
              {record.datetime && <li>
                <span>{record.datetime}</span>
              </li>}
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Visibility",
      dataIndex: "publicSwitch",
      key: "visibility",
      sorter: (a, b) => a.publicSwitch - b.publicSwitch,
      render: (data, record) => 
      {
        return (
          <div class="icon-btn-tprnt">
            {
              !data ? <svg width="24" height="24" viewBox="0 0 24 24" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.5C11.173 13.5 10.5 12.827 10.5 12C10.5 11.9869 10.5031 11.9741 10.5061 11.9613L10.5061 11.9613C10.5088 11.9496 10.5116 11.9379 10.512 11.926L12.074 13.488C12.0621 13.4885 12.0504 13.4912 12.0388 13.494C12.0259 13.497 12.0131 13.5 12 13.5ZM4.70705 3.29301C4.31605 2.90201 3.68405 2.90201 3.29305 3.29301C2.90205 3.68401 2.90205 4.31601 3.29305 4.70701L8.92305 10.337C8.64705 10.846 8.50005 11.411 8.50005 12C8.50005 13.93 10.0701 15.5 12 15.5C12.5891 15.5 13.154 15.353 13.663 15.077L19.293 20.707C19.488 20.902 19.744 21 20 21C20.2561 21 20.5121 20.902 20.7071 20.707C21.0981 20.316 21.0981 19.684 20.7071 19.293L4.70705 3.29301ZM12.2198 16.9976C7.91475 17.0976 5.10475 13.4146 4.17275 11.9956C4.62975 11.2816 5.39575 10.2356 6.45575 9.28461L5.04475 7.87261C3.52275 9.26161 2.54675 10.7796 2.13275 11.5026C1.95575 11.8106 1.95575 12.1896 2.13275 12.4976C2.76175 13.5946 6.16175 18.9996 12.0247 18.9996C12.1067 18.9996 12.1888 18.9986 12.2708 18.9966C13.4548 18.9666 14.5268 18.7106 15.4978 18.3266L13.9178 16.7466C13.3828 16.8886 12.8198 16.9826 12.2198 16.9976ZM11.7297 5.00341C17.7048 4.81641 21.2297 10.3904 21.8678 11.5024C22.0438 11.8104 22.0438 12.1894 21.8678 12.4974C21.4527 13.2204 20.4767 14.7384 18.9548 16.1274L17.5437 14.7154C18.6038 13.7644 19.3708 12.7184 19.8267 12.0044C18.8948 10.5854 16.0717 6.89441 11.7808 7.00241C11.1807 7.01741 10.6178 7.11141 10.0817 7.25341L8.50175 5.67341C9.47375 5.28941 10.5448 5.03341 11.7297 5.00341Z"></path>
              </svg> :
              <svg class="text-sach" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.5C11.173 13.5 10.5 12.827 10.5 12C10.5 11.173 11.173 10.5 12 10.5C12.827 10.5 13.5 11.173 13.5 12C13.5 12.827 12.827 13.5 12 13.5ZM12 8.50002C10.0701 8.50002 8.50005 10.07 8.50005 12C8.50005 13.93 10.0701 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12C15.5 10.07 13.93 8.50002 12 8.50002ZM12.2197 16.9976C7.91375 17.0976 5.10475 13.4146 4.17275 11.9956C5.19875 10.3906 7.78275 7.10462 11.7807 7.00262C16.0697 6.89362 18.8948 10.5856 19.8267 12.0046C18.8018 13.6096 16.2168 16.8956 12.2197 16.9976ZM21.8678 11.5026C21.2297 10.3906 17.7057 4.81662 11.7297 5.00362C6.20175 5.14362 2.98675 10.0136 2.13275 11.5026C1.95575 11.8106 1.95575 12.1896 2.13275 12.4976C2.76175 13.5946 6.16175 18.9996 12.0247 18.9996C12.1067 18.9996 12.1888 18.9986 12.2708 18.9966C17.7977 18.8556 21.0138 13.9866 21.8678 12.4976C22.0438 12.1896 22.0438 11.8106 21.8678 11.5026Z"></path>
            </svg>
            }
            <span>{data ? "Public" : "Private"}</span>
          </div>
        )
      }
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

  if (showCreateBlog) {
    return (
      <WriteBlog
        handleCancel={() => setShowCreateBlog(false)}
        handleCtaPostApi={handleCtaPostApi}
      />
    );
  }
  let locale = {
    emptyText,
  };

  return (
    <>
      <AdminTable
        {...props}
        locale={locale}
        dataSource={dataSource}
        columns={BlogColumns}
      />
      {showDeleteBlogModal && (
        <DeleteBlogModal
          selectedCta={selectedCta}
          handleCtaPostApi={handleCtaPostApi}
          handleCancel={() => setShowDeleteBlogModal(false)}
        />
      )}
    </>
  );
};

export default BlogTable;
