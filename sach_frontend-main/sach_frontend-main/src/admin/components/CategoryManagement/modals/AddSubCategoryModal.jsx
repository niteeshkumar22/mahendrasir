import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import _uniqueId from 'lodash/uniqueId';
import AdminModal from "../../Common/AdminModal";
const { Option } = Select;


const AddSubCategoryModal = ({ handleCancel, categoryData, handleAddEditSubCategory }) => {
  const [currActiveCategory, setCurrActiveCategory] = useState();
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const submitEditAddSubCategory = () => {
    if (currActiveCategory?.categoryId && subCategoryData.length > 0) {
      const data = {
        ...currActiveCategory,
        subCategories: subCategoryData
      }
      handleAddEditSubCategory(data);
      handleCancel();
    }
  }

  const submitNewSubCat = () => {
    if (!newCategoryName) return;
    let subCategoryDataCpy = Object.assign([], subCategoryData);
    subCategoryDataCpy.push({
      addedNew: true,
      subCategoryId: _uniqueId('SACH-'),
      subCategoryName: newCategoryName
    })
    setSubCategoryData(subCategoryDataCpy);
    setNewCategoryName('');
  }

  const toggleEditable = (editableId, value) => {
    let subCategoryDataCpy = Object.assign([], subCategoryData);
    subCategoryDataCpy.map((cat) => {
      if (cat?.subCategoryId === editableId) {
        cat['isEditable'] = value;
      }
    })
    setSubCategoryData(subCategoryDataCpy);
  }

  const onChangeSubCat = (event, editableId) => {
    let subCategoryDataCpy = Object.assign([], subCategoryData);
    if (editableId) {
      // Edit existing category
      subCategoryDataCpy.map((cat) => {
        if (cat?.subCategoryId === editableId) {
          cat['edit'] = true;
          cat.subCategoryName = event.target.value;
        }
      })
    }
    setSubCategoryData(subCategoryDataCpy);
  }

  const onDeleteSubCat = (id) => {
    let subCategoryDataCpy = Object.assign([], subCategoryData);
    subCategoryDataCpy = subCategoryDataCpy.filter((cat) => cat.subCategoryId !== id);
    setSubCategoryData(subCategoryDataCpy);
  }

  const validateMessages = {
    required: "Field is required!",
  };
  return (
    <AdminModal
      onCancel={handleCancel}
      footer={null}
    >
      <div className="row">
        <div className="col-12">
          <div className="sub-page-title py-3">
            <h2>Add Sub Category</h2>
          </div>
        </div>
        <div className="col-12 sach-form">
          <Form
            name="basic"
            className="w-100"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={submitEditAddSubCategory}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Select Category"
              name="selectCategory"
              rules={[{ required: true }]}
              className="w-100"
            >
              <Select
                className="w-100"
                name="selectCategory"
                id="selectCategory"
                onChange={(value) => {
                  const data = categoryData.filter((cat) => cat.categoryId === value)[0]?.subCategories;
                  const activeData = categoryData.filter((cat) => cat.categoryId === value)[0];
                  setCurrActiveCategory(activeData);
                  setSubCategoryData(data);
                }}
              >
                {categoryData.map((cat) => (
                  <Option value={cat.categoryId}>{cat.categoryName}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <div className="col-12 mt-4">
                <div className="table-responsive">
                  <table className="table sach-admin-table table-48 table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <span>Existing Sub Categories</span>
                          <img src={require("../../../../static/admin/img/icons/sort.svg").default} alt="sort" />
                        </th>
                        <th>
                          <span>Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" className="editable" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                        </td>
                        <td>
                          <div className="d-flex justify-content-around">
                            <span className="action-style" onClick={submitNewSubCat}>
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
                            <span className="action-style">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="#4D4354"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.4141 12L17.7071 7.70701C18.0981 7.31601 18.0981 6.68401 17.7071 6.29301C17.3161 5.90201 16.6841 5.90201 16.2931 6.29301L12.0001 10.586L7.70713 6.29301C7.31613 5.90201 6.68413 5.90201 6.29313 6.29301C5.90213 6.68401 5.90213 7.31601 6.29313 7.70701L10.5861 12L6.29313 16.293C5.90213 16.684 5.90213 17.316 6.29313 17.707C6.48813 17.902 6.74413 18 7.00013 18C7.25613 18 7.51213 17.902 7.70713 17.707L12.0001 13.414L16.2931 17.707C16.4881 17.902 16.7441 18 17.0001 18C17.2561 18 17.5121 17.902 17.7071 17.707C18.0981 17.316 18.0981 16.684 17.7071 16.293L13.4141 12Z"
                                ></path>
                              </svg>
                            </span>
                          </div>
                        </td>
                      </tr>
                      {subCategoryData &&
                        subCategoryData.map((cat) => (
                          <tr>
                            <td>
                              <input type="text" className={`${cat?.isEditable ? "editable" : "noneditable"}`} value={cat.subCategoryName} onChange={(e) => onChangeSubCat(e, cat.subCategoryId)} />
                            </td>
                            <td>
                              <div className="d-flex justify-content-around">
                                {
                                  cat?.isEditable ?
                                    <span className="action-style" onClick={() => toggleEditable(cat.subCategoryId, false)}>
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
                                    <span className="action-style" onClick={() => toggleEditable(cat.subCategoryId, true)}>
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

                                <span className="action-style" onClick={() => onDeleteSubCat(cat.subCategoryId)}>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="#4D4354"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clipRule="evenodd"
                                      d="M13.4141 12L17.7071 7.70701C18.0981 7.31601 18.0981 6.68401 17.7071 6.29301C17.3161 5.90201 16.6841 5.90201 16.2931 6.29301L12.0001 10.586L7.70713 6.29301C7.31613 5.90201 6.68413 5.90201 6.29313 6.29301C5.90213 6.68401 5.90213 7.31601 6.29313 7.70701L10.5861 12L6.29313 16.293C5.90213 16.684 5.90213 17.316 6.29313 17.707C6.48813 17.902 6.74413 18 7.00013 18C7.25613 18 7.51213 17.902 7.70713 17.707L12.0001 13.414L16.2931 17.707C16.4881 17.902 16.7441 18 17.0001 18C17.2561 18 17.5121 17.902 17.7071 17.707C18.0981 17.316 18.0981 16.684 17.7071 16.293L13.4141 12Z"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </Form.Item>
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
      </div>
    </AdminModal>
  );
};

export default AddSubCategoryModal;
