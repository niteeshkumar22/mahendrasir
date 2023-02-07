import { Row, Col, Input, Select, Form, Upload } from "antd";
const { Dragger } = Upload;

import React, { useEffect, useState } from "react";
const { Option } = Select;
import {
  getMyBlogsSetData,
  getBlogTableContent,
  handleUploadFile,
} from "../../../../../redux/action/user/myBlogs";
import { getCategoryData } from "../../../../../redux/action/admin/categoryMgmt";
import { connect } from "react-redux";
import { parseHtml } from "../../../../../utils/util";
import { useNavigate } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "../../../../../routes";
import AdminModal from "../../../../../admin/components/Common/AdminModal";
import { DropFileIcon } from "../../../../../admin/icons";

const PublishBlogModal = ({
  fromUser,
  handleCancel,
  handlePublishBlog,
  getCategoryData,
  categoryData,
  thumbnailURL,
  handleUploadFile,
  blogTitle,
  blogBody,
  blogDetail,
  tableContent,
  getBlogTableContent,
  handlePreviewBlogModal,
  getMyBlogsSetData,
}) => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [publishBlogForm] = Form.useForm();

  let navigate = useNavigate();

  useEffect(() => {
    getCategoryData();
    getBlogTableContent({ blogBody });
  }, []);

  useEffect(() => {
    if (blogTitle) {
      publishBlogForm.setFieldValue("blogTitle", blogTitle);
    }
  }, [blogTitle]);

  useEffect(() => {
    publishBlogForm.setFieldValue("blogSubCategory", null);
  }, [subCategoryData]);

  const handleFormInvalid = () => {
    return publishBlogForm.validateFields();     
  };

  const onFinish = (values) => {
    const params = new URLSearchParams(location.search);
    const paramsObj = Object.fromEntries(params);
    const data = {
      blogBody,
      blogTitle: values.blogTitle,
      blogThumnail: thumbnailURL,
      tags: values?.tags?.split(","),
      blogCategory: values.blogCategory.split("-")[0],
      blogSubCategory: values.blogSubCategory.split("-")[0],
      status: fromUser ? "pending" : "published",
      tableContent,
      id: paramsObj?.id,
    };
    console.log("values:", data);
    handlePublishBlog(data);
    handleCancel();
    navigate(
      fromUser
        ? `${UserRoutes.MY_ACCOUNT}?tab=my-blogs`
        : `${AdminRoutes.BLOG_MANAGEMENT}`
    );
  };

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

  const draggerProps = {
    name: "thumbnail",
    accept: ".jpeg,.png",
    maxCount: 1,
    beforeUpload: (file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return true;
      }
      const data = new FormData();
      data.append("file", file, file.name);
      handleUploadFile(data);
      return false;
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    onChange(file) {
      if (file.fileList.length === 0) {
        getMyBlogsSetData({ thumbnailURL: null });
      }
    },
  };

  return (
    <AdminModal
      onOk={handlePublishBlog}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <div className="sub-page-title py-3">
        <h2>Story Settings</h2>
      </div>
      <Form
        form={publishBlogForm}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <div>
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
            <Input />
          </Form.Item>
          <div>
            <div className="mdl-ttl">Thumbnail image</div>

            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <img src={DropFileIcon} />
              </p>
              <div className="dropDes">
                <span>Upload</span>
              </div>
            </Dragger>
          </div>

          <hr className="admin-hr" />
          <Row>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="blogCategory"
                rules={[{ required: true,  validationTrigger: 'onChange' }]}
                // validateTrigger={"onBlur"}
              >
                <Select
                  style={{
                    width: "90%",
                  }}
                  onFocus={() => setSubCategoryData([])}
                  onChange={(value) => {
                    setSubCategoryData(
                      categoryData.filter(
                        (d) => d.categoryId === value.split("-")[0]
                      )[0].subCategories
                    );
                  }}
                >
                  {categoryData.map((cat, i) => (
                    <Option
                      key={`cat-${i}`}
                      value={`${cat.categoryId}-${cat.categoryName}`}
                    >
                      {cat.categoryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sub-Category"
                name="blogSubCategory"
                rules={[{ required: true }]}
              >
                <Select
                  style={{
                    width: "90%",
                  }}
                >
                  {subCategoryData &&
                    subCategoryData.map((d, i) => (
                      <Option
                        key={`subCat-${i}`}
                        value={`${d.subCategoryId}-${d.subCategoryName}`}
                      >
                        {d.subCategoryName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Form.Item name="tags" label="Tags">
              <Input placeholder="Add tags..." />
            </Form.Item>
          </Row>
          {tableContent && (
            <div>
              <div className="col-12">
                <div className="sub-page-title">
                  <h2>Table of Contents</h2>
                </div>
              </div>

              {tableContent.map((d) => {
                return (
                  <div className="col-12 sach-check">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={d.isSelected}
                      />
                      <label className="form-check-label" for="TblCont3">
                        {parseHtml(d.title)}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="col-12 text-end">
            <button
              className="btn-sach btn-sach-linear me-3"
              onClick={handleCancel}
            >
              <span>Cancel</span>
            </button>
            <button
              className={`btn-sach bg-sach-dark me-3`}
              type="button"
              onClick={async (e) => {
                await handleFormInvalid()
                .then(values => {
                  handlePreviewBlogModal(true, {
                    ...publishBlogForm.getFieldsValue(),
                  });
                })
                // .catch(errorInfo => {
                //   console.log('promise errorInfo', errorInfo);
                // });

              }}
            >
              <span>Save &amp; Preview</span>
            </button>
            <button
              type="submit"
              className={`btn-sach btn-success`}
            >
              <span>Publish Now</span>
            </button>
          </div>
        </div>
      </Form>
    </AdminModal>
  );
};

const mapStateToProps = (state) => {
  const { MyBlogsReducer, CategoryMgmtReducer, CommonReducer } = state;
  const { categoryData } = CategoryMgmtReducer;
  const { thumbnailURL, tableContent, blogDetail } = MyBlogsReducer;
  return {
    categoryData,
    thumbnailURL,
    tableContent: blogDetail?.tableContent,
    blogDetail,
    isUploadLoader: CommonReducer.isUploadLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyBlogsSetData: (data) => dispatch(getMyBlogsSetData(data)),
    getCategoryData: (data) => dispatch(getCategoryData(data)),
    handleUploadFile: (data) => dispatch(handleUploadFile(data)),
    getBlogTableContent: (data) => dispatch(getBlogTableContent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishBlogModal);
