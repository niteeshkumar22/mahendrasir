import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import AdminModal from "../../Common/AdminModal";

const AddUserRoleModal=({ handleCancel,roleData,handleAddEditUserRole }) => {
    const [currActiveCategory, setCurrActiveCategory] = useState();
    const [newUserRoleName, setNewUserRoleName] = useState('');
    const [userRoleData, setUserRoleData] = useState(roleData);

    const submitEditAddUserRole = () => {
let newRoleData;
        if (userRoleData.length > 0) {
            let userRoleDataCpy = Object.assign([], userRoleData);
                newRoleData={
                    roleName: newUserRoleName
                  };
                  console.log(newRoleData);
                  handleAddEditUserRole(newRoleData);
                  handleCancel();
        
      }
    }

      const toggleEditable = (editableId, value) => {
        let userData ;
        let userRoleDataCpy = Object.assign([], userRoleData);
        userRoleDataCpy.map((cat) => {
          if (cat?.roleId === editableId) {
            cat['isEditable'] = value;
            userData = cat;
            if(value === false)
            {
                handleAddEditUserRole(userData);
            }
          }
        })
        setUserRoleData(userRoleDataCpy);
      }

      const onChangeUserRole = (event, editableId) => {
        let userRoleDataCpy = Object.assign([], userRoleData);
        if (editableId) {
            
          // Edit existing category
          userRoleDataCpy.map((cat) => {
            if (cat?.roleId === editableId) {
              cat['edit'] = true;
              cat.roleName = event.target.value;
            }
          })
        }
        setUserRoleData(userRoleDataCpy);
      }

      const submitNewSubCat = (e) => {
        if (!newUserRoleName) return;
        let userRoleDataCpy = Object.assign([], userRoleData);
        userRoleDataCpy.push({
          addedNew: true,
          roleId: '',
          roleName: newUserRoleName
        })
        setUserRoleData(userRoleDataCpy);
        setNewUserRoleName('');
      }

    const handleUserRoleEvent = () => {};
    const validateMessages = {
        required: "Field is required!",
      };
    return (<AdminModal
        onOk={handleUserRoleEvent}
        onCancel={handleCancel}
        footer={null}
      >
        <div class="row">
					<div class="col-12">
						<div class="sub-page-title py-3">
							<h2>Add Role</h2>
						</div>
					</div>
                    <Form
            name="basic"
            className="w-100"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={submitEditAddUserRole}
            autoComplete="off"
            validateMessages={validateMessages}
          >
              <Form.Item
              label="Enter User Role"
              name="userRole"
              className="w-100"
              rules={[{ required: true }]}
            >
					<div class="col-12 sach-form">
						<label class="form-label">Role Name <small>*</small></label>
						<input type="text" class="form-control" id="superAdmin" placeholder="Super Admin"  value={newUserRoleName} onChange={(e) => setNewUserRoleName(e.target.value)} />
					</div>
                   
                    </Form.Item>

					<div class="col-12 mt-4">
						<div class="table-responsive">
							<table class="table sach-admin-table table-48 table-bordered">
								<thead>
									<tr>
										<th>
											<span>Existing Role</span>
											<img src={require('../../../../static/admin/img/icons/sort.svg').default} alt="sort" />
										</th>
										<th>
											<span>Action</span>
										</th>
									</tr>
								</thead>
								<tbody>
                                {roleData?.map((role) => (
              
									<tr>
										<td>
                                        <input type="text" className={`${role?.isEditable ? "editable" : "noneditable"}`} value={role.roleName} onChange={(e) => onChangeUserRole(e, role.roleId)} />
                                            </td>
										<td>
										<div class="d-flex justify-content-around">
                                           
                                        {
                                     role?.isEditable ?
                                    <span className="action-style" onClick={() => toggleEditable(role.roleId, false)}>
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="#EE6C4D"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <g id="Icons-Others=checkmark">
                                          <path
                                            id="Icon"
                                            fill-rule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.86326 18C9.58726 18 9.32326 17.886 9.13426 17.685L4.27126 12.506C3.89226 12.104 3.91326 11.471 4.31526 11.093C4.71826 10.715 5.35126 10.735 5.72826 11.137L9.85326 15.528L18.2613 6.32599C18.6353 5.91699 19.2673 5.88999 19.6753 6.26199C20.0823 6.63399 20.1103 7.26699 19.7383 7.67399L10.6013 17.674C10.4143 17.88 10.1483 17.998 9.87026 18H9.86326Z"
                                          ></path>
                                        </g>
                                      </svg>
                                    </span>
                                    :
                                    <span className="action-style" onClick={() => toggleEditable(role.roleId, true)}>
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="#4D4354"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clipRule="evenodd"
                                          d="M13.3488 8.89881L11.1029 6.65298L12.7263 5.02881L14.9713 7.27381L13.3488 8.89881ZM7.56625 14.6871L5.08542 14.913L5.30542 12.4496L9.98625 7.76881L12.2329 10.0155L7.56625 14.6871ZM16.1696 6.11465L16.1688 6.11381L13.8871 3.83215C13.2696 3.21631 12.2088 3.18715 11.6238 3.77465L4.12709 11.2713C3.85542 11.5421 3.68709 11.9021 3.65209 12.283L3.33625 15.758C3.31459 16.0038 3.40209 16.2471 3.57709 16.4221C3.73459 16.5796 3.94709 16.6663 4.16625 16.6663C4.19209 16.6663 4.21709 16.6655 4.24209 16.663L7.71709 16.3471C8.09875 16.3121 8.45792 16.1446 8.72875 15.8738L16.2263 8.37631C16.8329 7.76798 16.8071 6.75298 16.1696 6.11465V6.11465Z"
                                        ></path>
                                      </svg>
                                    </span>
                                }
												
											</div>
										</td>
									</tr>
									
                                    ))}
									
								</tbody>
							</table>
						</div>
					</div>
                    <Form.Item>
              <div className="col-12 text-end mt-4">
                <button
                  className="btn-sach btn-sach-linear me-3"
                  onClick={handleCancel}
                >
                  <span >Cancel</span>
                </button>
                <button type='submit' className="btn-sach bg-sach-dark">
                  <span
                  >Add</span>
                </button>
              </div>
            </Form.Item>

                    </Form>
				</div>

        </AdminModal> );
}

export default AddUserRoleModal;