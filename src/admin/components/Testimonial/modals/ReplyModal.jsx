import React, { useState } from "react";
import SimpleEditor from "../../../../commons/TextEditor/SimpleEditor";
import { getCurrentUserDetails } from "../../../../utils/util";
import AdminModal from "../../Common/AdminModal";

const ReplyModal = ({ handleCancel, modifyTestimonial, selectedCta }) => {
  const [value, setValue] = useState("");
  const userDetail = getCurrentUserDetails();

  const onFinish = () => {
    modifyTestimonial([
      {
        blogId: selectedCta.blogId,
        blogFieldName: "comment",
        blogFieldValue: value,
      },
    ]);
    handleCancel();
  };

  return (
    <AdminModal
      className="replyModal"
      centered
      visible={true}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <div className="col-md-12">
        <div className="userName">
          <div className="avtr">
            <span>CW</span>
          </div>
          <div className="userData">
            <h4>
              {selectedCta.title}
              <a className="status-btn _active ms-2">
                {selectedCta?.status?.value}
              </a>
            </h4>
            <ul>
              <li>jackson.graham@example.com</li>
              <li>{selectedCta.datetime}</li>
            </ul>
          </div>
        </div>
        <div className="review-cont">{selectedCta.description}</div>
        <div className="comment-wrp">
          <div className="commentReviewer">
            <img src="img/icons/avtar.svg" alt="Admin" />
            <h2>{userDetail.user.userFullName}</h2>
          </div>
          <div>
          <SimpleEditor
            value={value}
            setValue={setValue}
            id="commentReply"
            rows="2"
            placeholder="Add a reply..."
            ></SimpleEditor>
          </div>     
          
          <div className="row">
            <div className="col-lg-6 col-md-6 text-end">
              <div className="d-inline-flex">
                <button
                  className="btn-sach btn-sach-linear btn-sm me-3"
                  onClick={handleCancel}
                >
                  <span>Discard</span>
                </button>
                <button
                  className="btn-sach bg-sach-dark btn-sm"
                  onClick={onFinish}
                >
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminModal>
  );
};

export default ReplyModal;
