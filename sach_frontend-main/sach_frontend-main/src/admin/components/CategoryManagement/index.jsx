import React, { useState } from "react";
import { connect } from "react-redux";
import { SearchIcon, DownloadIcon, AddIcon, EmptyTableIcon } from "../../icons";
import { Row, Col, Tree, Input, Dropdown, Menu } from "antd";
import CategoryTable from "./CategoryTable";
import "./style.css";
import { useEffect } from "react";
import AddCategoryModal from "./modals/AddCategoryModal";
import AddSubCategoryModal from "./modals/AddSubCategoryModal";
import UploadVideoModal from "./modals/UploadVideoModal";
import { getCatVideoData, getCategoryData, handleAddEditCategory, submitUploadVideo, onDeleteVideoClick, handleUploadCategoryFile } from "../../../redux/action/admin/categoryMgmt";
import useTableFilter from "../hooks/useTableFilter";
import SachLoader from "../../../commons/Loader";
import useCategorySearch from "../hooks/useCategorySearch";

const { Search } = Input;
const CategoryManagement = ({
  roleInfo,
  isLoading,
  start,
  tableData,
  activeTab,
  getCategoryData,
  getCatVideoData,
  handleCtaPostApi,
  categoryData,
  handleAddEditCategory,
  videoCount,
  submitUploadVideo,
  onDeleteVideoClick,
  thumbnailURL,
  handleUploadCategoryFile
}) => {
  const { searchText, filteredData, onSearchChange } = useTableFilter({
    searchKeys: ["title"],
    tableData
  });
  const { searchCatText, filteredCatData, onSearchCategory } = useCategorySearch({
    categoryData
  });

  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [showAddSubCatModal, setShowAddSubCatModal] = useState(false);
  const [showUploadVideoModal, setShowUploadVideoModal] = useState(false);
  const [editVideoData, setEditVideoData] = useState();

  const [selectedCatSubState, setSelectedCatSubState] = useState({});

  const [editableHoverCategoryId, setEditableHoverCategoryId] = useState();
  const [editableCategoryId, setEditableCategoryId] = useState();
  const [editableCatName, setEditableCatName] = useState();
  

  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = '!function (e, t, i) { if (void 0 === e._dyntube_v1_init) { e._dyntube_v1_init = !0; var a = t.createElement("script"); a.type = "text/javascript", a.async = !0, a.src = "https://embed.dyntube.com/v1.0/dyntube.js", t.getElementsByTagName("head")[0].appendChild(a) } }(window, document);';
    document.body.appendChild(s);
    getCategoryData({ type: 'all' });
  }, [])

  useEffect(() => {
    if (!selectedCatSubState?.selectedSubCat) {
      setSelectedCatSubState({ ...categoryData[0], selectedSubCat: categoryData[0]?.subCategories[0] || undefined });
      if (categoryData[0] && categoryData[0]?.subCategories[0]) {
        onClickSubCat(categoryData[0], categoryData[0]?.subCategories[0]);
      }
    } else if(selectedCatSubState?.selectedSubCat) {
      // set old selected cat/sub state
      let newCatData = categoryData?.filter((item) => item.categoryId === selectedCatSubState?.categoryId)[0];
      let newCatSubData = {} 
      newCatData?.subCategories?.filter((item) => {
        if(item.subCategoryId === selectedCatSubState?.selectedSubCat?.subCategoryId){
          newCatSubData = item;
        }
      })
      setSelectedCatSubState({ ...newCatData, selectedSubCat: newCatSubData });
    }
  }, [categoryData]);


  const onExpand = (category) => {
    // setSelectedCatSubState(category);
  };


  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
  
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }
  const exportToCsv = e => {
    e.preventDefault()
    console.log("swdf");
    // Headers for each column
    let headers = ['VideoDesc,VideoTitle,VideoLikesVsDislikes,VideoStatus,VideoComments']
  
    // Convert users data to a csv
    let usersCsv = tableData.reduce((acc, video) => {
      const {videoDescription, title, likesVsDislikes, status ,comment} = video
      const {value}  =  status
      acc.push([videoDescription, title, likesVsDislikes, value,comment].join(','))
      return acc
    }, [])
  
    downloadFile({
      data: [...headers, ...usersCsv].join('\n'),
      fileName: 'video.csv',
      fileType: 'text/csv',
    })
  }

  const onSubmitAddEditVideo = (data) => {
    if(data?.videoId) {
      setEditVideoData(null);
    }
    setShowUploadVideoModal(false);
    submitUploadVideo(data);
  }
  const submitEditCatSubCat = (type, category, subCategory) => {
    if(!editableCatName) {
      setEditableCategoryId(null);
      setEditableHoverCategoryId(null);
      return;
    };
    let data = {}
    if(type === 'category') {
      data.categoryName = editableCatName;
      data.categoryId = category?.categoryId;
    } else {
      data.categoryName = category?.categoryName;
      data.categoryId = category?.categoryId;
      data.subCategories = [{
        subCategoryName: editableCatName,
        subCategoryId: subCategory?.subCategoryId
      }]
    }
    handleAddEditCategory(data);
    onClickSubCat(category, subCategory);
    setSelectedCatSubState({ ...category, selectedSubCat: {
      ...subCategory
    }  });
    setEditableCategoryId(null);
    setEditableHoverCategoryId(null);
  }

  const onClickSubCat = (catObj, subCatObj) => {
    getCatVideoData({ catId: catObj?.categoryId, subCatId: subCatObj?.subCategoryId });
    setSelectedCatSubState({ ...catObj, selectedSubCat: subCatObj });
  }
  const onClickCatArea = (id) => {
    if(editableCategoryId != undefined && editableCategoryId !== id) {
      onSetEditableCategoryId(null);
    }
  }
  const onSetEditableCategoryId = (id) => {
    setEditableCategoryId(id);
    setEditableCatName(null);
  }
  const onEditVideoClick = (data) => {
    setEditVideoData(data);
    setShowUploadVideoModal(true);
  }
  const onAddVideoClick = () => {
    setEditVideoData(null);
    setShowUploadVideoModal(true);
  }
  if (isLoading) {
    return <SachLoader />;
  }
  const AddActionMenu = (
    <Menu
      className="action-btn action-dropdown"
      items={[
        {
          key: "1",
          label: (
            <div
              className="dropdown-item"
              onClick={() => setShowAddCatModal(true)}
            >
              <img src={AddIcon} alt="icon" />
              <span>Add Category</span>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              className="dropdown-item"
              onClick={() => setShowAddSubCatModal(true)}
            >
              <img src={AddIcon} alt="icon" />
              <span>Add Sub Category</span>
            </div>
          ),
        },
        {
          key: "3",
          label: (
            <div
              className="dropdown-item"
              onClick={onAddVideoClick}
            >
              <img src={AddIcon} alt="icon" />
              <span>Upload Video</span>
            </div>
          ),
        },
      ]}
    />
  );

  const renderHeader = () => {
    return (
      <header className="container-fluid page-header">
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <h2 className="page-title">Category Management</h2>
          </div>
          <div className="col-lg-4 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center my-3 my-md-0">
          {roleInfo.export && <button
              className="btn-sach btn-sach-linear me-3"
              onClick={exportToCsv}
            >
              <img src={DownloadIcon} alt="Download Icon" />
              <span>Export CSV</span>
            </button>}
            {roleInfo.add &&<Dropdown overlay={AddActionMenu} trigger={["click"]}>
              <button className="btn-sach bg-sach-dark">
                <img src={AddIcon} />
                <span>Add</span>
              </button>
            </Dropdown>}
          </div>
        </div>
      </header>
    );
  };

  const renderCategory = () => {

    let categoryDataCpy = categoryData;
    if (searchCatText) {
      categoryDataCpy = filteredCatData;
    }
    return (
      <div>
        <div className="container-fluid p-0 h-100v">
          <div className="row g-0 h-100">
            <div className="col-lg-3 col-md-3 sidebar-2 categoryMngmt mb-4 mb-md-0">
              <div className="input-group sach-input-group">
                <span className="input-group-text" id="basic-addon1">
                  <svg viewBox="0 0 20 20" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.16667 9.16667C4.16667 6.40917 6.40917 4.16667 9.16667 4.16667C11.9242 4.16667 14.1667 6.40917 14.1667 9.16667C14.1667 11.9242 11.9242 14.1667 9.16667 14.1667C6.40917 14.1667 4.16667 11.9242 4.16667 9.16667ZM17.2558 16.0775L14.4267 13.2475C15.3042 12.1192 15.8333 10.705 15.8333 9.16667C15.8333 5.49083 12.8425 2.5 9.16667 2.5C5.49083 2.5 2.5 5.49083 2.5 9.16667C2.5 12.8425 5.49083 15.8333 9.16667 15.8333C10.705 15.8333 12.1192 15.3042 13.2475 14.4267L16.0775 17.2558C16.24 17.4183 16.4533 17.5 16.6667 17.5C16.88 17.5 17.0933 17.4183 17.2558 17.2558C17.5817 16.93 17.5817 16.4033 17.2558 16.0775Z" />
                  </svg>
                </span>
                <input type="text" className="form-control" placeholder="Search by name..." value={searchCatText} onChange={onSearchCategory} />
              </div>

              <h3 className="ctgryList">List of Categories</h3>

              <div className="accordion categoryList" id="categoryList">
                {
                  categoryDataCpy && categoryDataCpy.length > 0 && categoryDataCpy.map((category, index) => {
                    return <div>
                      <div className="d-flex justify-content-between cat-button" onClick={() => onClickCatArea(category?.categoryId)} onMouseEnter={e => {
                        setEditableHoverCategoryId(category?.categoryId)
                      }}
                        onMouseLeave={e => {
                          setEditableHoverCategoryId(null)
                        }}>
                        {
                          editableCategoryId === category?.categoryId ?
                            <button className={`accordion-button accordion-button-style ${selectedCatSubState?.categoryId === category?.categoryId ? '' : "collapsed"} `} type="button"  data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                              <input type="text" className="editable-category" defaultValue={category?.categoryName} onChange={(e) => setEditableCatName(e.target.value)} />
                            </button>
                            :
                            <button className={`accordion-button accordion-button-style ${selectedCatSubState?.categoryId === category?.categoryId ? '' : "collapsed"} `} type="button"  data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>{category?.categoryName}</button>
                        }
                        {
                          editableHoverCategoryId === category?.categoryId && editableCategoryId !== category?.categoryId ? <span className="action-style mx-1 mt-1" onClick={() => onSetEditableCategoryId(category?.categoryId)}>
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
                          </span>: editableCategoryId === category?.categoryId ? <span className="action-style mx-1 mt-1" onClick={() => submitEditCatSubCat('category', category)}> 
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
                              </span>: null
                        }

                      </div>
                      <div id={`collapse${index}`} className={`accordion-collapse collapse ${selectedCatSubState?.categoryId === category?.categoryId ? 'show' : ""} `} data-bs-parent="#categoryList">
                        <ul>
                          {
                            category?.subCategories && category?.subCategories?.length > 0 && category?.subCategories?.map((subCat) => {
                              return <li className="cat-button" onMouseEnter={e => {
                                setEditableHoverCategoryId(subCat?.subCategoryId)
                              }}
                                onMouseLeave={e => {
                                  setEditableHoverCategoryId(null)
                                }}>
                                <div className="d-flex justify-content-between">
                                {
                          editableCategoryId === subCat?.subCategoryId ?
                            <span className={`subCat-Style ${selectedCatSubState?.selectedSubCat?.subCategoryId === subCat?.subCategoryId ? 'selected-subCat' : ""} `} >
                              <input type="text" className="editable-category" defaultValue={subCat?.subCategoryName} onChange={(e) => setEditableCatName(e.target.value)} />
                              </span>
                            :
                            <span className={`subCat-Style ${selectedCatSubState?.selectedSubCat?.subCategoryId === subCat?.subCategoryId ? 'selected-subCat' : ""} `} onClick={() => onClickSubCat(category, subCat)} >{subCat?.subCategoryName}</span>
                        }
                                  {
                                    editableHoverCategoryId === subCat?.subCategoryId && editableCategoryId !== subCat?.subCategoryId ? <span className="action-style mx-1" onClick={() => onSetEditableCategoryId(subCat?.subCategoryId)}>
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
                                    </span>: editableCategoryId === subCat?.subCategoryId ? <span className="action-style mx-1" onClick={() => submitEditCatSubCat('subCategory', category, subCat)} >
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
                              </span>: null
                                  }
                                </div>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  })
                }
              </div>

            </div>

            <div className="col-lg-9 col-md-9 px-3">
              <div className="row align-items-center mb-3">
                <div className="col-lg-9">
                  <div className="category-table-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#EE6C4D" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 3.5L2 21L20 20.5L22 11.5L20 6.5L11.5 6L10 3.5H2.5Z" fill="#EE6C4D" fill-opacity="0.08" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5C1 3.34315 2.34315 2 4 2H10C10.3344 2 10.6466 2.1671 10.8321 2.4453L12.5352 5H18C19.6569 5 21 6.34315 21 8V9.06313C22.6464 9.40546 23.7402 11.0865 23.2758 12.7894L21.3667 19.7894C21.0107 21.0945 19.8253 22 18.4724 22H2C1.44772 22 1 21.5523 1 21V5ZM19 9V8C19 7.44772 18.5523 7 18 7H12C11.6656 7 11.3534 6.8329 11.1679 6.5547L9.46482 4H4C3.44772 4 3 4.44772 3 5V13.5327L3.6333 11.2106C3.98926 9.90546 5.17474 9 6.52759 9H19ZM3.30925 20H18.4724C18.9234 20 19.3185 19.6982 19.4372 19.2631L21.3463 12.2631C21.5198 11.627 21.0409 11 20.3815 11H6.52759C6.07664 11 5.68148 11.3018 5.56283 11.7369L3.30925 20Z" />
                    </svg>
                    <span>{selectedCatSubState?.categoryName || ''} {` ${selectedCatSubState?.selectedSubCat?.subCategoryName ? `/ ${selectedCatSubState?.selectedSubCat?.subCategoryName}` : ""}`} ({videoCount})</span>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="input-group sach-input-group">
                    <span className="input-group-text" id="basic-addon1">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="#4D4354" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.16667 9.16667C4.16667 6.40917 6.40917 4.16667 9.16667 4.16667C11.9242 4.16667 14.1667 6.40917 14.1667 9.16667C14.1667 11.9242 11.9242 14.1667 9.16667 14.1667C6.40917 14.1667 4.16667 11.9242 4.16667 9.16667ZM17.2558 16.0775L14.4267 13.2475C15.3042 12.1192 15.8333 10.705 15.8333 9.16667C15.8333 5.49083 12.8425 2.5 9.16667 2.5C5.49083 2.5 2.5 5.49083 2.5 9.16667C2.5 12.8425 5.49083 15.8333 9.16667 15.8333C10.705 15.8333 12.1192 15.3042 13.2475 14.4267L16.0775 17.2558C16.24 17.4183 16.4533 17.5 16.6667 17.5C16.88 17.5 17.0933 17.4183 17.2558 17.2558C17.5817 16.93 17.5817 16.4033 17.2558 16.0775Z"></path>
                      </svg>
                    </span>
                    <input type="text" className="form-control" placeholder="Search by name..." onChange={onSearchChange} />
                  </div>
                </div>
              </div>
              <CategoryTable
                tableData={searchText ? filteredData : tableData}
                handleCtaPostApi={handleCtaPostApi}
                total={getCountTotalofRows()}
                start={start}
                handlePaginationOnChange={(size) => {
                  getCatVideoData && getCatVideoData({ size, start: size, type: activeTab, catId: selectedCatSubState?.categoryId, subCatId: selectedCatSubState?.selectedSubCat?.subCategoryId });
                }}
                onEditVideoClick={(data) => onEditVideoClick(data)}
                onDeleteVideoClick={onDeleteVideoClick}
                emptyText={
                  <div className="empty-table">
                    <img src={EmptyTableIcon} alt="No Data Found" />
                    <h3>No item selected</h3>
                    <p>
                      Please select on the left sidelist of items to appear
                      here.
                    </p>
                  </div>
                }
              />

            </div>

            <div className="col-lg-9 col-md-9 px-3 d-none">
              <div className="empty-table vh-100">
                <img src={require("../../../static/admin/img/icons/no-data-2.svg").default} alt="No Data Found" />
                <h3>No item selected</h3>
                <p>Please select on the left side list of items to appear here.</p>
              </div>
            </div>

          </div>
        </div>


      </div>
    );
  };
  
  const getCountTotalofRows = () => {
    return tableData?.length || 0;
  };
  return (
    <div>
      {renderHeader()}
      {renderCategory()}
      {showAddCatModal && (
        <AddCategoryModal handleAddEditCategory={handleAddEditCategory} handleCancel={() => setShowAddCatModal(false)} thumbnailURL={thumbnailURL} 
        handleUploadCategoryFile={handleUploadCategoryFile}/>
      )}
      {showAddSubCatModal && (
        <AddSubCategoryModal
          categoryData={categoryData}
          handleCancel={() => setShowAddSubCatModal(false)}
          handleAddEditSubCategory={handleAddEditCategory}
        />
      )}
      {showUploadVideoModal && (
        <UploadVideoModal initValues={editVideoData} categoryData={categoryData} onSubmitAddEditVideo={onSubmitAddEditVideo} handleCancel={() => setShowUploadVideoModal(false)} />
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  const { CategoryMgmtReducer, CommonReducer } = state;
  const { isLoading, categoryData, tableData, activeTab, videoCount, thumbnailURL } = CategoryMgmtReducer;
  return {
    isLoading,
    tableData: tableData?.tableData,
    activeTab,
    start: tableData?.start,
    categoryData,
    videoCount,
    thumbnailURL,
    roleInfo: CommonReducer?.adminInfo?.menu?.category_mgmt || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveTab: (data) => dispatch(setActiveTab(data)),
    getCategoryData: (data) => dispatch(getCategoryData(data)),
    getCatVideoData: (data) => dispatch(getCatVideoData(data)),
    handleAddEditCategory: (data) => dispatch(handleAddEditCategory(data)),
    handleCtaPostApi: (data) => dispatch(handleCtaPostApi(data, getTabsData)),
    submitUploadVideo: (data) => dispatch(submitUploadVideo(data)),
    onDeleteVideoClick: (data) => dispatch(onDeleteVideoClick(data)),
    handleUploadCategoryFile: (data) => dispatch(handleUploadCategoryFile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagement);
