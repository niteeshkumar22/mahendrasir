import React, { useState } from "react";
import { Form, Input } from "antd";
import AdminModal from "../../Common/AdminModal";
import UploadPic from "../UploadPic";

import { connect } from "react-redux";
import { handleUploadFile } from "../../../../redux/action/admin/userMgmt";
const InviteUserModal = ({ isUploadLoader, handleUploadFile, avatarURL, handleCancel, handleInviteUser }) => {
  
  const handleInviteUserClick = () => {};

  const onFinish = (values) => {
    values['userProfileUrl'] = avatarURL;
    handleInviteUser({
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
    <AdminModal onOk={handleInviteUserClick} onCancel={handleCancel}>
      <div>
        <div>
          <div className="sub-page-title py-3">
            <h2>Add New User</h2>
          </div>
        </div>
        <UploadPic isUploadLoader={isUploadLoader} handleUploadFile={handleUploadFile} />
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Name"
            name="userFullName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="E-mail Address"
            name="userEmail"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Enter your email ID" />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
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
    avatarURL: UserMgmtReducer.avatarURL
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleUploadFile: (data) => dispatch(handleUploadFile(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteUserModal);


