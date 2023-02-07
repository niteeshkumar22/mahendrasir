import React from "react";
import { InvalidIcon } from "../../../icons";
import AdminModal from "../../Common/AdminModal";

const DeleteBlogModal = ({ handleCancel, handleCtaPostApi, selectedCta }) => {
  const handleDeleteBlog = () => {
    handleCtaPostApi({...selectedCta.cta, eventId: selectedCta.eventId});
  };
  return (
    <AdminModal
      className="deleteBlogModal"
      centered
      visible={true}
      onOk={handleDeleteBlog}
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
              Are you sure you want to delete <b>"Blog"</b> in to do list?
            </span>
          </div>
        </div>

        <div className="col-12 text-end">
          <hr className="admin-hr" />
          <button className="btn-sach btn-sach-linear me-3" onClick={handleCancel}>
            <span>Cancel</span>
          </button>
          <button className="btn-sach bg-sach-red" onClick={handleDeleteBlog}>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
};

export default DeleteBlogModal;
