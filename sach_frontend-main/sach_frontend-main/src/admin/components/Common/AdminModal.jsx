import React from "react";

import { Modal } from "antd";

const AdminModal = (props) => {
  return (
    <Modal
      {...props}
      className={`sach-modal ${props.className}`}
      centered
      visible={true}
      footer={null}
    >
        {props.children}
    </Modal>
  );
};
export default AdminModal;
