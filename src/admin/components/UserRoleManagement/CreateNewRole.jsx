
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

import { connect } from "react-redux";
import { getRoleData, handleApplyPermUser, handleCreateRole, handleAddEditUserRole } from "../../../redux/action/admin/userRoleMgmt";
import { AddIcon, BackIcon } from "../../icons";
import AddUserRoleModal from "./modals/AddUserRoleModal";
import '../style.css';
const { Option } = Select;


const CreateNewRole = ({ permissionData,
  handleCancel,
  getRoleData,
  roleData,
  roleIdSelected,
  handleCreateRole,
  handleApplyPermUser, handleAddEditUserRole }) => {

  const [currActiveRole, setCurrActiveRole] = useState(null);
  const [showCreateUserRoleModal, setShowCreateUserRoleModal] = useState(false);
  const [roleIndex, setRoleIndex] = useState(roleData[0]);

  const submitEditAddUserRole = () => {
    handleAddEditUserRole(currActiveRole);
    handleCancel();


  }

  const onChangeAccessibleReadPermission = (accessibleId) => {
    let userRoleDataCpy = Object.assign({}, currActiveRole);
    userRoleDataCpy.accessibleList.map((item) => {
      if (item.id === accessibleId) {
        item.read = item.read ? false : true;
      }
    })
    setCurrActiveRole(userRoleDataCpy);
  }

  const onChangeAccessibleWritePermission = (accessibleId) => {
    let userRoleDataCpy = Object.assign({}, currActiveRole);
    userRoleDataCpy.accessibleList.map((item) => {
      if (item.id === accessibleId) {
        item.write = item.write ? false : true;
      }
    })
    setCurrActiveRole(userRoleDataCpy);
  }

  useEffect(() => {
    getRoleData()
  }, [])
  const renderPermissionTable = () => {
    return (currActiveRole && currActiveRole.accessibleList.length > 0 && currActiveRole.accessibleList.map((item) => (
      <div className="notificaiton-btn-section">

        <div className="n-btn-inner">
          <h4>{item.name}</h4>
          <span>Grant access to the user permission </span>
        </div>

        <div className="btn-group sach-btn-group ms-auto" role="group"
        >
          {item.read ? <><input type="checkbox" className="btn-check" checked id={item.name + "1"} onClick={(e) => onChangeAccessibleReadPermission(item.id)} />
            <label className="btn btn-outline-primary" htmlFor={item.name + "1"}>
              Read </label> </> :
            <><input type="checkbox" className="btn-check" id={item.name + "1"} onClick={(e) => onChangeAccessibleReadPermission(item.id)} />
              <label className="btn btn-outline-primary" htmlFor={item.name + "1"}>
                Read </label> </>}



          {item.write ? <> <input type="checkbox" checked className="btn-check" id={item.name} onClick={(e) => onChangeAccessibleWritePermission(item.id)} />
            <label className="btn btn-outline-primary" htmlFor={item.name}>
              Write</label> </>
            :
            <> <input type="checkbox" className="btn-check" id={item.name} onClick={(e) => onChangeAccessibleWritePermission(item.id)} />
              <label className="btn btn-outline-primary" htmlFor={item.name}>
                Write</label> </>
          }

        </div>
      </div>
    )))
  }
  return (
    <>
      <header className="container-fluid page-header">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <h2 className="page-title">Create Role &amp; Permission</h2>
            <span className="page-sub-title">
              Set custom permission and assign the role.
            </span>
          </div>
          <div className="col-lg-6 col-md-6 text-md-end text-center my-3 my-md-0 d-flex align-items-center justify-content-md-end justify-content-around">
            <button
              className="btn-sach btn-sach-linear me-3"
              onClick={handleCancel}
            >
              <img src={BackIcon} />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      <Form
        name="basic"
        className="container-fluid pb-5"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={submitEditAddUserRole}
        autoComplete="off"
      >
        <div className="row mb-4">
          <div className="col-lg-12 col-md-12">
            <div className="row">
              <div className="col-lg-4 col-md-4 sach-form">
                <label className="form-label">
                  Role <small>*</small>
                </label>
                <div className="input-group">

                  <Select className="form-control" defaultValue={roleData[0]} onChange={(value) => {
                    //const data = getRoleData.filter((role) => role.roleId === value)[0]?.accessibleList;
                    const activeData = roleData?.filter((role) => role.roleId === value)[0];
                    setCurrActiveRole(activeData);
                    // setRoleData(data);
                  }}>
                    {roleData?.map((role) => (
                      <Option value={role.roleId} >{role.roleName}</Option>
                    ))}
                  </Select>
                  <button className="btn-sach bg-sach-dark" type="button" onClick={() => setShowCreateUserRoleModal(true)}>
                    <img src={AddIcon} />
                  </button>
                </div>
              </div>

              <div className="sub-page-title-2 mt-4 mb-2">
                <h2>Permission Assessment</h2>
                <span>
                  These permissions will be applied to each administration with
                  this role.
                </span>
              </div>

              {/* <div className="col-lg-2 col-md-2">
              <button
                className="btn-sach bg-sach-red btn-sach-sm"
              >
                <span>Unckeck All</span>
              </button>
            </div> */}
              <div class="col-md-12">
                <div className="table-responsive">
                  {renderPermissionTable()}

                </div>
              </div>

              <div className="footer-fixed-btn">
                <div className="row">
                  <div className="col-lg-12 col-md-12 text-md-end text-center">
                    <button
                      className="btn-sach btn-sach-linear me-3"
                    >
                      <span>Cancel</span>
                    </button>
                    <button type="submit"
                      className="btn-sach bg-sach-dark"
                    >
                      <span>Update &amp; Send</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Form>

      {showCreateUserRoleModal && (
        <AddUserRoleModal
          handleCancel={() => {
            setShowCreateUserRoleModal(false);
          }}
          handleAddEditUserRole={handleAddEditUserRole}
          roleData={roleData}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { UserRoleMgmtReducer } = state;
  const { roleData } = UserRoleMgmtReducer;
  return {
    roleData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateRole: (data) => dispatch(handleCreateRole(data)),
    getRoleData: (data) => dispatch(getRoleData(data)),
    handleApplyPermUser: (data) => dispatch(handleApplyPermUser()),
    handleAddEditUserRole: (data) => dispatch(handleAddEditUserRole(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewRole);

