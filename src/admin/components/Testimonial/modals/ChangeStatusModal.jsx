import React, { useState } from "react";
import AdminModal from "../../Common/AdminModal";

const ChangeStatusModal = ({
  type,
  title,
  handleCancel,
  handleModifyTestimonial,
}) => {
  const [reason, setReason] = useState("");
  const handleChangeStatusClick = () => {
    handleModifyTestimonial(type, reason);
    handleCancel();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setReason(value);
  };
  return (
    <AdminModal onCancel={handleCancel} footer={null} closable={false}>
      <div>
        <div className="sub-page-title">
          <div className="col-12">
            <div className="sub-page-title flx-ttl py-2">
              {type === "approved" ? (
                <div className="head-ico success">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.21965 14.9999C7.98965 14.9999 7.76965 14.9049 7.61215 14.7374L3.55965 10.4216C3.24381 10.0866 3.26131 9.55906 3.59631 9.24406C3.93215 8.92906 4.45965 8.94572 4.77381 9.28072L8.21131 12.9399L15.218 5.27156C15.5296 4.93072 16.0563 4.90822 16.3963 5.21822C16.7355 5.52822 16.7588 6.05572 16.4488 6.39489L8.83465 14.7282C8.67881 14.8999 8.45715 14.9982 8.22548 14.9999H8.21965Z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <div className="head-ico danger">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.4142 11.9998L17.7072 7.70676C18.0982 7.31576 18.0982 6.68376 17.7072 6.29276C17.3162 5.90176 16.6842 5.90176 16.2933 6.29276L12.0002 10.5858L7.70725 6.29276C7.31625 5.90176 6.68425 5.90176 6.29325 6.29276C5.90225 6.68376 5.90225 7.31576 6.29325 7.70676L10.5862 11.9998L6.29325 16.2928C5.90225 16.6838 5.90225 17.3158 6.29325 17.7068C6.48825 17.9018 6.74425 17.9998 7.00025 17.9998C7.25625 17.9998 7.51225 17.9018 7.70725 17.7068L12.0002 13.4138L16.2933 17.7068C16.4882 17.9018 16.7443 17.9998 17.0002 17.9998C17.2562 17.9998 17.5122 17.9018 17.7072 17.7068C18.0982 17.3158 18.0982 16.6838 17.7072 16.2928L13.4142 11.9998Z"
                    ></path>
                  </svg>
                </div>
              )}
              <div className="head-data">
                <h2 style={{ textTransform: "capitalize" }}>{type}</h2>
                <span>Please enter the following procees.</span>
              </div>
            </div>
          </div>
          <div className="col-12 sach-form mt-4">
            <label className="form-label">BLOG TITLE</label>
            <input
              className="form-control not-form"
              type="text"
              value={title}
            />
          </div>
          <div className="col-12 sach-form">
            <label className="form-label">
              Reason why you {type}?<small>*</small>
            </label>
            <textarea
              rows="2"
              className="form-control h-auto"
              placeholder="Enter here..."
              value={reason}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="col-12 text-end">
          <hr className="admin-hr" />
          <button
            className="btn-sach btn-sach-linear me-3"
            onClick={handleCancel}
          >
            <span>Cancel</span>
          </button>
          <button
            className={`btn-sach bg-sach-red ${
              reason.length < 2 ? "disable" : ""
            }`}
            disabled={reason.length < 2}
            onClick={ () => {
              reason.length > 3 ? handleChangeStatusClick() : null
            } }
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
};

export default ChangeStatusModal;
