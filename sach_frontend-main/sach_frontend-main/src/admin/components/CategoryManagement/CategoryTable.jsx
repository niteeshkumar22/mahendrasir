import React, { useState, useEffect } from "react";
import AdminTable from "../Common/AdminTable";
import { Button, Dropdown, Menu, Space } from "antd";
import { DeleteIcon, DropdownIcon, EditIcon } from "../../icons";
import DeleteVideoModal from "./modals/DeleteVideoModal";
import PlayVideoModal from "./modals/PlayVideoModal";

const CategoryTable = (props) => {
  const {onEditVideoClick, onDeleteVideoClick} = props;
  const [showDeleteVideoModal, setShowDeleteVideoModal] = useState(false);
  const [dataSource, setDataSource] = useState(props.tableData || []);
  
  const [toPlayVideo, setToPlayVideo] = useState(false);
  
  useEffect(() => {
    setDataSource(props.tableData);
  }, [props.tableData]);

  const handleDeleteVideo = () => {
    const data = {
      categoryId: showDeleteVideoModal?.categoryId,
      subCategoryId: showDeleteVideoModal?.subCategoryId,
      videoId: showDeleteVideoModal?.videoId,
    }
    onDeleteVideoClick(data);
  };

  const handleEditVideo = (record) => {
    onEditVideoClick(record)
  };
  const handleDeleteClick = (record) => {
    setShowDeleteVideoModal(record);
  }
  const getMenuItems = (action, data) => {
    const res = action.map((item, i) => {
      switch (item.type) {
        case "edit":
          return {
            key: i,
            label: (
              <div
                className="dropdown-item sendInvitation"
                onClick={() => handleEditVideo(data)}
              >
                <img src={EditIcon} alt="icon" />
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
              onClick={() => handleDeleteClick(data)}
            >
              <img src={DeleteIcon} alt="icon" />
              <span>{item.value}</span>
            </div>
            ),
          }
      }
    });
    return res;
  };
  const onPlayVideo = (record) => {
    setToPlayVideo(record);
  }
  const closeVideoClick = () => {
    setToPlayVideo(null);
  }

  const CategoryColumns = [
    {
      title: "Videos",
      dataIndex: "videos",
      key: "videos",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <div className="blog-table-data">
          <div className="blog-bg _sm">
          <img src={record.icon} alt="Video Image" onClick={() => onPlayVideo(record)}/>
          </div>
          <div className="blog-data">
            <h5>{record?.title}</h5>
            <ul className="inline-bullet-list">
              <li><span>{record?.duration}</span></li>
              {/* <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.29354 21C7.63754 21 6.06354 20.334 4.86154 19.125C2.47354 16.722 2.37554 12.912 4.64254 10.631L12.0285 3.201C12.7975 2.427 13.8355 2 14.9505 2C16.1435 2 17.2775 2.479 18.1425 3.349C19.8635 5.08 19.9295 7.831 18.2885 9.481L10.8935 16.91C10.4145 17.393 9.76954 17.658 9.07754 17.658C8.34654 17.658 7.65354 17.366 7.12754 16.837C6.07454 15.776 6.04154 14.085 7.05454 13.065L13.8795 6.21C14.2695 5.818 14.9015 5.816 15.2935 6.206C15.6845 6.596 15.6865 7.229 15.2965 7.62L8.47254 14.476C8.23254 14.718 8.26554 15.145 8.54654 15.427C8.69254 15.574 8.88654 15.658 9.07754 15.658C9.18754 15.658 9.34554 15.631 9.47554 15.5L16.8705 8.071C17.7375 7.198 17.6725 5.713 16.7245 4.759C15.8175 3.847 14.2785 3.775 13.4465 4.611L6.06054 12.041C4.56654 13.544 4.66454 16.09 6.28054 17.715C7.10354 18.544 8.17354 19 9.29354 19C10.2945 19 11.2225 18.622 11.9045 17.936L19.2915 10.506C19.6805 10.115 20.3135 10.112 20.7055 10.502C21.0965 10.892 21.0985 11.524 20.7095 11.916L13.3225 19.346C12.2625 20.412 10.8315 21 9.29354 21Z" />
                </svg>
                <span>2</span>
              </li> */}
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
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Likes vs Dislikes",
      dataIndex: "likesVsDislikes",
      key: "likesVsDislikes",
    },
    {
      title: "Comments",
      dataIndex: "comment",
      key: "comments",
      render: (text, record) => <div onClick={() => {}}>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (data, record) => 
      {
        const items = getMenuItems(record.action, data);
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
      }
      // (
      //   <Space size="middle">
      //     <button
      //       className="btn linear-action-btn d-inline-flex me-2"
      //       onClick={() => handleEditVideo(data)}
      //     >
      //       <img src={EditIcon} />
      //     </button>
      //     <button
      //       className="btn linear-action-btn d-inline-flex"
      //       onClick={() => setShowDeleteVideoModal(true)}
      //     >
      //       <img src={DeleteIcon} />
      //     </button>
      //   </Space>
      // ),
    },
  ];

  return (
    <>
      <AdminTable {...props} dataSource={dataSource} columns={CategoryColumns} />
      {showDeleteVideoModal && (
        <DeleteVideoModal handleDeleteVideo={handleDeleteVideo} handleCancel={() => setShowDeleteVideoModal(false)} />
      )}
      {toPlayVideo && (
        <PlayVideoModal handleCancel={closeVideoClick} videoData={toPlayVideo}/>
      )}
    </>
  );
};

export default CategoryTable;
