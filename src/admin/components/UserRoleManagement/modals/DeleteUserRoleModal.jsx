import React, { useState } from "react";
import { InvalidIcon } from "../../../icons";
import AdminModal from "../../Common/AdminModal";

const DeleteUserRoleEventModal = ({ handleCancel, handleCtaPostApi, selectedCta }) => {
  console.log(selectedCta);
  const handleUserRoleEvent = () => {
    handleCtaPostApi({ ...selectedCta.cta, roleId: selectedCta.roleId });
  };
  return (
    <AdminModal
      onOk={handleUserRoleEvent}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="row">
        <div className="col-12 my-2">
          <img src={InvalidIcon} />
        </div>
        <div className="col-12">
          <div className="sub-page-title">
            <h2>Delete</h2>
            <span>
              Are you sure you want to delete <b>"User Role Name"</b> in to do list?
            </span>
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
          <button className="btn-sach bg-sach-red" onClick={handleUserRoleEvent}>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
};

export default DeleteUserRoleEventModal;
