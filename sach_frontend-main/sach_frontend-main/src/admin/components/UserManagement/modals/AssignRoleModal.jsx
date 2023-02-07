import React, { useState } from "react";
import { InvalidIcon } from "../../../icons";
import AdminModal from "../../Common/AdminModal";

const AssignRoleModal = ({ page, handleCancel, selectedCta, handleCtaPostApi }) => {
  const handleChangeStatusClick = () => {
    handleCtaPostApi(selectedCta.cta);
  };
  return (
    <AdminModal
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <div>
        <div>
            <img src={InvalidIcon}/>
        </div>
        <div>
          <div className="sub-page-title">
            <h2>{selectedCta.value}</h2>
            <span>
              Are you sure you want to {selectedCta.value} {page} in to
              do list?
            </span>
          </div>
        </div>

        <div className="col-12 text-end">
          <hr className="admin-hr" />
          <button className="btn-sach btn-sach-linear me-3" onClick={handleCancel}>
            <span>Cancel</span>
          </button>
          <button className="btn-sach bg-sach-red" onClick={handleChangeStatusClick}>
            <span>{selectedCta.value}</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
};

export default AssignRoleModal;
