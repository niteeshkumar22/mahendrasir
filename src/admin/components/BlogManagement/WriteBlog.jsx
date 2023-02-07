import { Form, Input } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../../commons/TextEditor";
import {
  getBlogDetail,
  getBlogTableContent,
  handlePublishBlog,
  modifyBlog,
} from "../../../redux/action/admin/blogMgmt";
import { handlePublishBlog as UserhandlePublishBlog } from "../../../redux/action/user/myBlogs";
import { AdminRoutes } from "../../../routes";
import { CloseIcon } from "../../icons";
import PreviewBlogModal from "./modals/PreviewBlogModal";
import PublishBlogModal from "./modals/PublishBlogModal";

const WriteBlog = (props) => {
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);
  const [writeBlogForm] = Form.useForm();

  const {
    handlePublishBlog,
    UserhandlePublishBlog,
    blogDetail,
    getBlogDetail,
    thumbnailURL,
    thumbnailBase,
    fromUser,
  } = props;
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [previewBlogModal, setPreviewBlogModal] = useState(false);
  const [additionalData, setAdditionalData] = useState({});

  const finalhandlePublishBlog = fromUser
    ? UserhandlePublishBlog
    : handlePublishBlog;

  useEffect(() => {
    if (blogDetail) {
      console.log("logDetail.blogTitle", blogDetail.blogTitle);
      if (blogDetail.blogTitle) {
        setBlogTitle(blogDetail.blogTitle);
        writeBlogForm.setFieldValue("blogTitle", blogDetail.blogTitle);
      }
      if (blogDetail.blogBody) {
        setBlogBody(blogDetail.blogBody);
      }
    }
  }, [blogDetail]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paramsObj = Object.fromEntries(params);
    if (paramsObj.id) {
      getBlogDetail(paramsObj);
    }
  }, []);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const handlePreviewBlogModal = (val, data) => {
    setAdditionalData(data);
    setPreviewBlogModal(val);
  };

  const handleSaveDraft = () => {
    if (writeBlogForm.isFieldsValidating()) {
      const params = new URLSearchParams(location.search);
      const paramsObj = Object.fromEntries(params);
      finalhandlePublishBlog({
        status: "draft",
        blogTitle,
        blogBody,
        id: paramsObj?.id,
      });
      navigate(-1);
    }
  };

  const onFinish = (values) => {
    setShowPublishModal(true);
  };
  const isFormInvalid = () =>{
    return writeBlogForm.isFieldsValidating() ? false : true
    }


  const renderHeader = () => {
    return (
      <header className="container-fluid page-header blog-header">
        <div className="row">
          <div className="col-lg-6 col-md-6 d-flex align-items-center">
            <h2 className="page-title">Write New Story</h2>
          </div>
          <div className="col-lg-6 col-md-6 text-center text-md-end ms-auto ms-auto">
            <button
              className={`btn-sach btn-sach-linear mt-3 mt-md-0 ${
                isFormInvalid() ? "disable" : ""
              }`}
              disabled={isFormInvalid()}
              onClick={() => setPreviewBlogModal(true)}
            >
              <svg
                width="0"
                height="20"
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
              <span>Preview</span>
            </button>
            <button
              onClick={handleSaveDraft}
              className={`btn-sach btn-sach-linear mt-3 mt-md-0 ms-3 ${
                isFormInvalid() ? "disable" : ""
              }`}
              disabled={isFormInvalid()}
              type="button"
            >
              <svg
                width="0"
                height="20"
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
              <span>Save Draft</span>
            </button>
            <button
                className={`btn-sach mt-3 mt-md-0 ms-3 ${
                  isFormInvalid() ? "disable" : ""
                }`}
                disabled={isFormInvalid()}
                type="submit"
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
              <span>Publish</span>
            </button>
            <div className="dvdr mx-3"></div>
            <div
              className="btn-sach bg-sach-dark btn-circle mt-3 mt-md-0"
              onClick={() => {
                navigate(-1);
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
      <Form
        form={writeBlogForm}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        {renderHeader()}
        <div className="mx-5">
          <div className="my-4">
            {/* <label
              style={{
                color: "grey",
                fontSize: "16px",
                fontWeight: 600,
              }}
              className="ms-3"
            >
              Post Label <span>*</span>
            </label> */}
            <br />
            <Form.Item
              label="Post Title"
              name="blogTitle"
              rules={[
                { required: true },

                {
                  max: 50,
                  message: "Title should be upto 50 characters",
                },
                {
                  min: 10,
                  message: "Title should be atleast 10 characters",
                },
              ]}
            >
              <Input
                style={{
                  fontSize: "36px",
                  color: "grey",
                  border: "none",
                  padding: "20px 10px 30px 10px",
                }}
                value={blogTitle}
                placeholder="Enter your title here"
                onChange={(e) => setBlogTitle(e.target.value)}
              />
            </Form.Item>
          </div>

          <div>
            <TextEditor
              blogId={paramsObj.id}
              value={blogBody}
              setValue={setBlogBody}
              placeholder="Add here"
              // toolbar={textEditor.toolbar}
              // formats={textEditor.formats}
            ></TextEditor>
          </div>
        </div>
      </Form>
      {showPublishModal && (
        <PublishBlogModal
          fromUser={fromUser}
          blogTitle={blogTitle}
          blogBody={blogBody}
          handleCancel={() => setShowPublishModal(false)}
          handlePreviewBlogModal={handlePreviewBlogModal}
          handlePublishBlog={finalhandlePublishBlog}
        />
      )}
      {previewBlogModal && (
        <PreviewBlogModal
          fromUser={fromUser}
          handleCancel={() => setPreviewBlogModal(false)}
          blogTitle={blogTitle}
          blogBody={blogBody}
          tableContent={blogDetail?.tableContent}
          thumbnailURL={thumbnailURL}
          thumbnailBase={thumbnailBase}
          {...additionalData}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { BlogMgmtReducer } = state;
  const { isLoading, blogDetail, thumbnailURL } = BlogMgmtReducer;
  return {
    isLoading,
    blogDetail,
    thumbnailURL,
    thumbnailBase: blogDetail?.thumbnail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePublishBlog: (data) => dispatch(handlePublishBlog(data)),
    UserhandlePublishBlog: (data) => dispatch(UserhandlePublishBlog(data)),
    getBlogTableContent: (data) => dispatch(getBlogTableContent(data)),
    getBlogDetail: (data) => dispatch(getBlogDetail(data)),
    modifyBlog: (data) => dispatch(modifyBlog(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteBlog);
