import React, { useState } from "react";
import AdminModal from "../../Common/AdminModal";
import {
  Form,
  Input,
  Upload,
} from "antd";
const { Dragger } = Upload;
import {
  DropFileIcon,
} from "../../../icons";


const AddCategoryModal = (props) => {
  const { handleCancel, handleAddEditCategory, thumbnailURL, handleUploadCategoryFile } = props;
  
  const onCreateCategory = (data) => {
    handleAddEditCategory({categoryName: data?.categoryName, url:thumbnailURL});
    handleCancel();
  };
  const draggerProps = {
    name: "csvfile",
    accept: ".jpeg,.png",
    maxCount: 1,
    action: (file) => {
      const data = new FormData();
        data.append(
          "file",
          file,
          file.name
        );
        handleUploadCategoryFile(data)
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const validateMessages = {
    required: "${label} is required!",
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
          <div className="sub-page-title py-3">
            <h2>Add Category</h2>
          </div>
        </div>
        <div className="sach-form">
        <Form
              name="basic"
              className="w-100"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onCreateCategory}
              autoComplete="off"
              validateMessages={validateMessages}
              // initialValues={initValues}
            >
              <Form.Item
                label="Category Name"
                name="categoryName"
                rules={[{ required: true }]}
              >
                <Input className="w-100" />
              </Form.Item>
              <Form.Item>
              <div>
            <div className="mdl-ttl">
              Category Image <span>(Optional)</span>
            </div>
            <p className="mdl-para">
              Image should be in <b>JPEG, PNG</b> format. Recommended
              dimensions are <b>1920x1080 at 72 DPI,</b> smaller resolutions may
              result in a pixelated image. The file size limit is <b>2 MB.</b>
            </p>
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <img src={DropFileIcon} />
              </p>
              <div className="dropDes">
                <span>Drag &amp; Drop your the file here</span>
                <small> or </small>
                <a>Browse</a>
              </div>
            </Dragger>
          </div>
              </Form.Item>
              <Form.Item>
              <div className="text-end mt-4">
                <button onClick={() => handleCancel()} className="btn-sach btn-sach-linear me-3">
                  <span>Cancel</span>
                </button>
                <button type='submit' 
                className="btn-sach bg-sach-dark">
                  <span>Add</span>
                </button>
              </div>
              </Form.Item>
          </Form>
        </div>
       
        
      </div>
    </AdminModal>
  );
};

export default AddCategoryModal;
