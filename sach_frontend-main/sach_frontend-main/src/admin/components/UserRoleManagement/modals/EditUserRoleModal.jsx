import React, { useState } from "react";
import { InvalidIcon } from "../../../icons";
import AdminModal from "../../Common/AdminModal";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";


const EditUserRoleEventModal = ({ handleCancel, handleCtaPostApi, selectedCta, roleData }) => {
  const [currActiveRole, setCurrActiveRole] = useState(null);

  console.log(roleData);
  const handleUserRoleEvent = () => {
    console.log(selectedCta.cta)
    // handleCtaPostApi({ ...selectedCta.cta, roleId: currActiveRole.roleId });
  };
  return (
    <AdminModal
      onOk={handleUserRoleEvent}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="row">
        <div className="col-12 my-2">
          Edit Role To
        </div>
        <div className="col-12">
          <div className="sub-page-title">
            <h2> Select Role *</h2>
            <Select className="form-control" defaultValue={roleData[0].roleId} onChange={(value) => {
              //const data = getRoleData.filter((role) => role.roleId === value)[0]?.accessibleList;
              const activeData = roleData?.filter((role) => role.roleId === value)[0];
              setCurrActiveRole(activeData);
              // setRoleData(data);
            }}>
              {roleData?.map((role) => (
                <Option value={role.roleId} >{role.roleName}</Option>
              ))}
            </Select>
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
            <span>Update</span>
          </button>
        </div>
      </div>
    </AdminModal>
  );
};

export default EditUserRoleEventModal;
