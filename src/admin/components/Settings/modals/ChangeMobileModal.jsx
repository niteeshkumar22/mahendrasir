import React, { useState } from "react";
import { Form, Input } from "antd";
import AdminModal from "../../Common/AdminModal";

import { connect } from "react-redux";
// import { handleUploadFile } from "../../../../redux/action/admin/userMgmt";
const ChangeMobileModal = ({
  isUploadLoader,
  handleUploadFile,
  handleCancel,
  handleSendOtp,
}) => {
  const handleSendOtpClick = () => {};

  const onFinish = (values) => {
    values["userProfileUrl"] = avatarURL;
    handleSendOtp({
      identifier: "add",
      users: [values],
    });
    handleCancel();
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
  return (
    <AdminModal onOk={handleSendOtpClick} onCancel={handleCancel}>
      <div>
        <div>
          <div className="sub-page-title py-3">
            <h2>Add New User</h2>
          </div>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Current Mobile Number"
            name="userContact"
            rules={[
              {
                required: true,
                max: 10,
                message: "Mobile number must be 10 digits",
              },
              {
                min: 10,
                message: "Mobile should be atleast 10 digits",
              },
              {
                pattern: "^([-]?[1-9][0-9]*|0)$",
                message: "Mobile number must be a numeric value.",
              },
            ]}
          >
            <Input placeholder="Enter your mobile number" />
          </Form.Item>
          <Form.Item
            label="Enter New Mobile Number"
            name="userContact"
            rules={[
              {
                required: true,
                max: 10,
                message: "Mobile number must be 10 digits",
              },
              {
                min: 10,
                message: "Mobile should be atleast 10 digits",
              },
              {
                pattern: "^([-]?[1-9][0-9]*|0)$",
                message: "Mobile number must be a numeric value.",
              },
            ]}
          >
            <Input placeholder="Enter your mobile number" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="text-end mt-4">
              <button
                className="btn-sach btn-sach-linear me-3"
                onClick={handleCancel}
              >
                <span>Cancel</span>
              </button>
              <button className="btn-sach bg-sach-dark" type="submit">
                <span>Add</span>
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </AdminModal>
  );
};
const mapStateToProps = (state) => {
  const { CommonReducer, UserMgmtReducer } = state;
  return {
    isUploadLoader: CommonReducer.isUploadLoader,
    avatarURL: UserMgmtReducer.avatarURL,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleUploadFile: (data) => dispatch(handleUploadFile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMobileModal);
