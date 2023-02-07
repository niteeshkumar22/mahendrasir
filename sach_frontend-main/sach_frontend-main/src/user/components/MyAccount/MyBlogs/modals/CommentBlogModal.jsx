import React from "react";
import AdminModal from "../../../../../admin/components/Common/AdminModal";

const CommentBlogModal = ({ handleCancel, text, title }) => {

  return (
    <AdminModal onCancel={handleCancel}>
      <div class="sach-title indv">
        <h4>{title}</h4>
      </div>
      <p>
        {text}
      </p>
    </AdminModal>
  );
};

export default CommentBlogModal;
