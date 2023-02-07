import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import SachLoader from "../../../commons/Loader";
import {
  getBlogDetail,
  modifyBlog,
} from "../../../redux/action/admin/blogMgmt";
import { AdminRoutes } from "../../../routes";
import { parseHtml } from "../../../utils/util";
import { DeleteIcon, BlockIcon, CloseIcon } from "../../icons";
import ChangeStatusModal from "./modals/ChangeStatusModal";

const BlogDetail = ({ isLoading, blogDetail, getBlogDetail, modifyBlog, roleInfo }) => {
  let navigate = useNavigate();
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsObj = Object.fromEntries(params);
    getBlogDetail(paramsObj);
  }, []);

  const handleModifyBlog = (val, reason) => {
    modifyBlog([
      {
        blogId: blogDetail.id,
        blogFieldName: "status",
        blogFieldValue: val,
      },
      {
        blogId: blogDetail.id,
        blogFieldName: "comment",
        blogFieldValue: reason,
      },
    ]);
    navigate(-1);
  };

  if (isLoading) {
    return <SachLoader />;
  }

  if (!blogDetail) return null;

  const getSuccessButton = () => {
    if (roleInfo.view_action && (blogDetail?.status === "pending" || blogDetail?.status === "new")) {
      return (
        <>
          <div
            className="btn-sach btn-success mt-3 mt-md-0 ms-3"
            onClick={() => {
              setType("published");
              setShowChangeStatusModal(true);
            }}
          >
            <svg
              width="20"
              height="20"
              className="me-2"
              viewBox="0 0 20 20"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.21965 14.9999C7.98965 14.9999 7.76965 14.9049 7.61215 14.7374L3.55965 10.4216C3.24381 10.0866 3.26131 9.55906 3.59631 9.24406C3.93215 8.92906 4.45965 8.94572 4.77381 9.28072L8.21131 12.9399L15.218 5.27156C15.5296 4.93072 16.0563 4.90822 16.3963 5.21822C16.7355 5.52822 16.7588 6.05572 16.4488 6.39489L8.83465 14.7282C8.67881 14.8999 8.45715 14.9982 8.22548 14.9999H8.21965Z"
              ></path>
            </svg>
            <span>Approve</span>
          </div>

          <div className="dvdr mx-3"></div>
        </>
      );
    }
  };
  const getDeclineButton = () => {
    if (roleInfo.view_action && (blogDetail?.status === "pending" || blogDetail?.status === "new")) {
      return (
        <>
          <div
            className="btn-sach btn-sach-linear mt-3 mt-md-0"
            onClick={() => {
              setType("declined");
              setShowChangeStatusModal(true);
            }}
          >
            <img className="me-2" src={BlockIcon} />
            <span>Decline</span>
          </div>
          <div className="dvdr mx-3"></div>
        </>
      );
    }
  };

  const renderHeader = () => {
    return (
      <header className="container-fluid page-header blog-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 d-flex align-items-center">
            <div style={{marginLeft: "50px"}} className="userName blog-Auth">
             {blogDetail.authorImage && <div className="avtr">
              <img src={blogDetail.authorImage} alt="icon" />
              </div>}
              <div className="userData">
                <h4>{blogDetail.author}</h4>
                <ul>
                  <li>{blogDetail.dateTime}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 text-center text-md-end ms-auto ms-auto">
            {getDeclineButton()}
            {getSuccessButton()}
            <div
              className="btn-sach bg-sach-dark btn-circle mt-3 mt-md-0"
              onClick={() => {
                navigate(-1)
                return;
              }}
            >
              <img className="closeBtn" src={CloseIcon} alt="Close Link" />
            </div>
          </div>
        </div>
      </header>
    );
  };
  return (
    <>
      <div>
        {renderHeader()}
        <div className="mx-5 writeblog-wrp">
          {blogDetail.blogTitle && <h1>{blogDetail.blogTitle}</h1>}
          <div>
            {blogDetail.blogBody.length ? (
              parseHtml(blogDetail.blogBody)
            ) : (
              <p>Nothing to preview</p>
            )}
          </div>
        </div>
      </div>
      {showChangeStatusModal && (
        <ChangeStatusModal
          type={type}
          title={blogDetail?.blogTitle}
          handleCancel={() => setShowChangeStatusModal(false)}
          handleModifyBlog={handleModifyBlog}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { BlogMgmtReducer, CommonReducer } = state;
  const { isLoading, blogDetail } = BlogMgmtReducer;
  return {
    isLoading,
    blogDetail,
    roleInfo: CommonReducer?.adminInfo?.others?.blog_mgmt || {}

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogDetail: (data) => dispatch(getBlogDetail(data)),
    modifyBlog: (data) => dispatch(modifyBlog(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
