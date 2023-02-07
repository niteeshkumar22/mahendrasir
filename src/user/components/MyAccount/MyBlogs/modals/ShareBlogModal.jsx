import React from "react";
import AdminModal from "../../../../../admin/components/Common/AdminModal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { message } from "antd";

const ShareBlogModal = ({ handleCancel, link }) => {
  // const handleShareBlog = () => {
  //   handleCtaPostApi({ ...selectedCta.cta, eventId: selectedCta.eventId });
  // };
  return (
    <AdminModal className="sach-modal-share" onCancel={handleCancel}>
      <div class="sach-title indv">
        <h4>Share a link</h4>
      </div>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Share link"
          readOnly="true"
          value={link}
        />
        <button className="btn btn-outline-secondary">
          <CopyToClipboard
            text={link}
            onCopy={() => {
              message.success("Link copied!");
            }}
          >
            <span>Copy</span>
          </CopyToClipboard>
        </button>
      </div>
    </AdminModal>
  );
};

export default ShareBlogModal;
