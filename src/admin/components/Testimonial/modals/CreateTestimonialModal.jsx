import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import AdminModal from "../../Common/AdminModal";
import SimpleEditor from "../../../../commons/TextEditor/SimpleEditor";

import { connect } from "react-redux";
import { handleUploadFile } from "../../../../redux/action/admin/userMgmt";
import { handleCreateTestimonial } from "../../../../redux/action/admin/testimonialMgmt";
const CreateTestimonialModal = ({
  isUploadLoader,
  handleCancel,
  handleCreateTestimonial,
}) => {
  const [descValue, setDescValue] = useState("");

  const onFinish = (values) => {
    handleCreateTestimonial({
      blogBody: descValue,
      status: "published",
    });
    handleCancel();
  };

  //   const validateMessages = {
  //     required: "${label} is required!",
  //     types: {
  //       email: "${label} is not a valid email!",
  //       number: "${label} is not a valid number!",
  //     },
  //     number: {
  //       range: "${label} must be between ${min} and ${max}",
  //     },
  //   };
  return (
    <AdminModal width={600} onCancel={handleCancel}>
      <div>
        <div>
          <div className="sub-page-title py-3">
            <h2>Write Testimonial</h2>
          </div>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Language"
            // name="userFullName"
            // rules={[{ required: true }]}
          >
            <Select placeholder="English" disabled={true}></Select>
          </Form.Item>

          <Form.Item label="Write Review">
            <SimpleEditor
              value={descValue}
              setValue={setDescValue}
              placeholder="Add here"
            ></SimpleEditor>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div className="text-end mt-4">
              <button
                className="btn-sach btn-sach-linear me-3"
                onClick={handleCancel}
              >
                <span>Cancel</span>
              </button>
              <button
                className={`btn-sach bg-sach-dark ${
                  descValue.length < 5 ? "disable" : ""
                }`}
                disabled={descValue.length < 5}
                type="submit"
              >
                <span>Post</span>
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
    handleCreateTestimonial: (data) => dispatch(handleCreateTestimonial(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTestimonialModal);
