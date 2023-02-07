import React, { useState } from "react";
import AdminModal from "../../common/AdminModal";
import { parseHtml } from "../../../../utils/util";

const ViewModal = ({ handleCancel, selectedCta }) => {
  return (
    <AdminModal className="replyModal" centered visible={true} onCancel={handleCancel} footer={null} width={700}>
      <div className="col-md-12">
        <div className="userName">
          <div className="avtr">
            <img src={selectedCta.icon} alt="Admin" />
          </div>
          <div className="userData">
            <span>{selectedCta.author} </span>
          </div>
          <div className="userData">
            <h4>
              {selectedCta.title}
              <a className="status-btn _active ms-2">{selectedCta?.status?.value}</a>
            </h4>
            <ul>
              <li>{selectedCta.subTitle}</li>
              <li>{selectedCta.datetime}</li>
            </ul>
          </div>
        </div>
        <div className="review-cont">{parseHtml(selectedCta.description)}</div>
      </div>
    </AdminModal>
  );
};

export default ViewModal;
