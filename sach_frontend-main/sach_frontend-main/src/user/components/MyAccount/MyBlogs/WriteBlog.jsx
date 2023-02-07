import { Form, Input, message } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../../../commons/TextEditor";
import { getBlogDetail, getBlogTableContent, handlePublishBlog, modifyBlog } from "../../../../redux/action/admin/blogMgmt";
import { handlePublishBlog as UserhandlePublishBlog } from "../../../../redux/action/user/myBlogs";
import { CloseIcon } from "../../../icons";
// import { AdminRoutes } from "../../../routes";
import PreviewBlogModal from "./modals/PreviewBlogModal";
import PublishBlogModal from "./modals/PublishBlogModal";
import "./style.css";
const WriteBlog = (props) => {
  let navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const paramsObj = Object.fromEntries(params);
  const [writeBlogForm] = Form.useForm();

  const { handlePublishBlog, UserhandlePublishBlog, blogDetail, getBlogDetail, thumbnailURL, thumbnailBase, fromUser } = props;
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [previewBlogModal, setPreviewBlogModal] = useState(false);
  const [additionalData, setAdditionalData] = useState({});

  const finalhandlePublishBlog = fromUser ? UserhandlePublishBlog : handlePublishBlog;

  useEffect(() => {
    if (blogDetail) {
      if (!writeBlogForm.getFieldValue("blogTitle") && blogDetail.blogTitle) {
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
    setBlogTitle('');
    setBlogBody('');
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

  const handlePreview = () => {
    writeBlogForm
      .validateFields()
      .then((d) => {
        setPreviewBlogModal(true);
      })
      .catch((err) => {
        message.error("Please check the form fields");
      });
  };

  const handleSaveDraft = () => {
    writeBlogForm
      .validateFields()
      .then((d) => {
        const params = new URLSearchParams(location.search);
        const paramsObj = Object.fromEntries(params);
        finalhandlePublishBlog({
          status: "draft",
          blogTitle,
          blogBody,
          id: paramsObj?.id,
        });
        navigate(-1);
      })
      .catch((err) => {
        message.error("Please check the form fields");
      });
  };

  const onFinish = (values) => {
    setShowPublishModal(true);
  };

  const renderHeader = () => {
    return (
      <header className="page-header blog-header">
        <div className="container">
          <div className="row align-items-center py-2 g-0">
            <div className="col-lg-6 col-md-6 d-flex align-items-center">
              <h2 className="page-title mb-0">Write New Story</h2>
              <div className="dvdr mx-3"></div>
            </div>
            <div className="col-lg-6 col-md-6 text-center text-md-end ms-auto ms-auto">
              <button className={`btn-sach btn-sach-linear mt-3 mt-md-0`} type="button" onClick={handlePreview}>
                <span>Preview</span>
              </button>
              <button onClick={handleSaveDraft} className={`btn-sach btn-sach-linear mt-3 mt-md-0 ms-3`} type="button">
                <span>Save Draft</span>
              </button>
              <button className={`btn-sach bg-sach mt-3 mt-md-0 ms-3 border-0`} type="button" onClick={onFinish} >
                <span>Publish</span>
              </button>
              <div
                className="close-btn-wrp"
                onClick={() => {
                  navigate(-1);
                  return;
                }}
              >
                <img className="closeBtn" src={CloseIcon} alt="Close Link" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

  return (
    <>
      {renderHeader()}
      <section className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <Form form={writeBlogForm} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} validateMessages={validateMessages} onFinish={onFinish}>
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
                  className="blogTitle"
                  placeholder="Enter your title here"
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </Form.Item>
              <TextEditor blogId={paramsObj.id} value={blogBody} setValue={setBlogBody} placeholder="Add here"></TextEditor>
            </Form>
          </div>
        </div>
      </section>
      {showPublishModal && <PublishBlogModal fromUser={fromUser} blogTitle={blogTitle} blogBody={blogBody} handleCancel={() => setShowPublishModal(false)} handlePreviewBlogModal={handlePreviewBlogModal} handlePublishBlog={finalhandlePublishBlog} />}
      {previewBlogModal && <PreviewBlogModal fromUser={fromUser} handleCancel={() => setPreviewBlogModal(false)} blogTitle={blogTitle} blogBody={blogBody} tableContent={blogDetail?.tableContent} thumbnailURL={thumbnailURL} thumbnailBase={thumbnailBase} {...additionalData} />}
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
