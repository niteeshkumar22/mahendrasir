import React, { useState } from "react";

import AdminModal from "../../../../../admin/components/Common/AdminModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeclineEventModal = ({ handleCancel, handleRegisterClick, chooseItem }) => {
  const handleDecline = () => {
    handleRegisterClick(chooseItem);
    handleCancel();
  };
  return (
    <AdminModal className="deleteEventModal" centered visible={true} onCancel={handleCancel} footer={null}>
      <div className="row">
        <div className="col-12 my-2"></div>
        <div className="col-12">
          <div className="sub-page-title">
            <h2>Decline</h2>
            <span>
              Are you sure you want to decline <b>"Event"</b>?
            </span>
          </div>
        </div>

        <div className="col-12 text-end">
          <hr className="admin-hr" />
          <button className="btn-sach btn-sach-linear me-3" onClick={handleCancel}>
            <span>Cancel</span>
          </button>
          <button className="btn-sach bg-sach-red" onClick={(e) => handleDecline()}>
            <span>Decline</span>
          </button>
          <ToastContainer />
        </div>
      </div>
    </AdminModal>
  );
};

export default DeclineEventModal;
