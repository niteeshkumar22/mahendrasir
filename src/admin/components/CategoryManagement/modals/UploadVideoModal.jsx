import React, { useState, useEffect } from "react";
import { Select, Form, Input, Switch } from "antd";
import AdminModal from "../../Common/AdminModal";

const UploadVideoModal = (props) => {
  const { handleCancel, categoryData, onSubmitAddEditVideo, initValues } = props;
  const [subCategoryData, setSubCategoryData] = useState([]);
  
  useEffect(() => {
    if(initValues?.categoryId && initValues?.subCategoryId){
      const data = categoryData.filter((cat) => cat.categoryId === initValues.categoryId)[0]?.subCategories;
      setSubCategoryData(data);
    }
  }, [])
  
  const handleUploadClick = (data) => {
    if(initValues?.videoId){
      data.videoId = initValues?.videoId;
    }
    data.duration = 0//parseInt(data.duration);
    onSubmitAddEditVideo(data);
  }
  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
  };

  return (
    <AdminModal
      centered
      visible={true}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <div>
          <div className="row">
            <div className="col-12">
              <div className="sub-page-title py-3">
                <h2>Upload Video</h2>
              </div>
            </div>


            <Form
              name="basic"
              className="w-100"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={handleUploadClick}
              autoComplete="off"
              validateMessages={validateMessages}
              initialValues={initValues}
            >
              <Form.Item
                label="Video Id"
                name="dynVideoId"
                rules={[{ required: true }]}
              >
                <Input className="w-100" defaultValue="" />
              </Form.Item>

              <Form.Item
                label="Video Title"
                name="videoTitle"
                rules={[{ required: true }]}
              >
                <Input className="w-100" />
              </Form.Item>

              {/* <Form.Item
                label="Video Duration (in mins)"
                name="duration"
                rules={[{ required: true }]}
              >
                <Input type="number" className="w-100" />
              </Form.Item> */}

              <Form.Item
                label="Video Description"
                name="videoDescription"
              >
                <Input.TextArea className="w-100" autoSize={{ minRows: 2, maxRows: 6 }} />
              </Form.Item>
              <div className="d-flex w-100">
                <div className="col-6 sach-form">
                  <Form.Item
                    label="Category"
                    name="categoryId"
                    className="w-100"
                    rules={[{ required: true }]}
                  >
                    <Select
                      style={{
                        width: "95%",
                      }}
                      name="selectCategory"
                      id="selectCategory"
                      onChange={(value) => {
                        const data = categoryData.filter((cat) => cat.categoryId === value)[0]?.subCategories;
                        setSubCategoryData(data);
                      }}
                    >
                      {categoryData.map((cat) => (
                        <Option value={cat.categoryId}>{cat.categoryName}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-6 sach-form">
                  <Form.Item
                    label="Sub Category"
                    name="subCategoryId"
                    className="w-100"
                    rules={[{ required: true }]}
                  >
                    <Select
                      style={{
                        width: "95%",
                      }}
                      name="subCategoryId"
                      id="subCategoryId"
                    >
                      {subCategoryData && subCategoryData.length > 0 && subCategoryData.map((cat) => (
                        <Option value={cat.subCategoryId}>{cat.subCategoryName}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>


              <div className="col-12 videoPrivacy">
                <div className="d-flex">
                  <h4>Video Privacy</h4>
                  <span>Enable if you want your video to be private</span>
                </div>
                <div className="form-check form-switch sach-form-switch">
                  <Form.Item
                    name="publicSwitch"
                    className="w-100">
                    <Switch
                      label="video is public"
                      name="publicSwitch" >
                    </Switch>
                  </Form.Item>
                </div>
              </div>


              <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                <span className="btn-sach btn-sach-linear me-3" onClick={() => handleCancel()}>
                  <span>Cancel</span>
                </span>
                <button className="btn-sach bg-sach-dark" type="submit"
                >
                  <span>Upload</span>
                </button>
              </Form.Item>
            </Form>


          </div>
        </div>

      </div>
    </AdminModal>
  );
};

export default UploadVideoModal;
