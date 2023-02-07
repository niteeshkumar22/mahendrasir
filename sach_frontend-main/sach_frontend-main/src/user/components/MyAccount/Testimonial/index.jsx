import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getMyTestimonialData,
  modifyTestimonial,
} from "../../../../redux/action/user/myTestimonial";
import { AdminRoutes, UserRoutes } from "../../../../routes";
import { useNavigate } from "react-router-dom";
import "./style.css";
import SimpleEditor from "../../../../commons/TextEditor/SimpleEditor";
const Testimonial = ({
  testDetail,
  getMyTestimonialData,
  modifyTestimonial,
}) => {
  const [textVal, setTextVal] = useState(null);
  const [showEdit, setShowEdit] = useState(false)
  useEffect(() => {
    getMyTestimonialData();
  }, []);


  useEffect(() => {
    if(testDetail.description) {
      setTextVal(testDetail.description)
      setShowEdit(true);
    }
  }, [testDetail]);

  return (
    <div className="col-md-9">
      <div className="nav_content">
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-1"
            role="tabpanel"
            aria-labelledby="v-pills-tab-1"
            tabindex="0"
          >
            <div className="userSettingCont">
              <div className="settHead">Testimonial</div>
              <div className="settPara">
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-4 col-md-4 sach-form">
                <label className="form-label">
                  Language Type <small>*</small>
                </label>
                <select className="form-control">
                  <option>English</option>
                  {/* <option>Hindi</option>
                      <option>Tamil</option>
                      <option>Telugu</option> */}
                </select>
              </div>
              
              <div className="col-lg-12 col-md-12 sach-form">
                  <label className="form-label">Write Review</label>
                   <SimpleEditor
                      value={textVal}
                      setValue={setTextVal}
                      placeholder="Write here..."
                      type={"testimonial"}
                      alreadyFilled={testDetail.description ? true : false}
                      readOnly={showEdit}

                    ></SimpleEditor>
                    {showEdit && <p style={{color: 'grey', marginTop: '5px', fontSize: '11px'}}>Editor is disabled. Please click on edit button to enable it.</p>}
                </div>
              {showEdit && testDetail.status && (
                <div className="col-lg-12">
                  <div className="testimonial-staus">
                    <label>Status:</label>
                    <span className={`status-btn _${testDetail.status.type}`}>
                      {testDetail.status.value}
                    </span>
                  </div>

                  {testDetail.status && testDetail.status.type === 'published' && <p style={{color: 'grey', marginTop: '5px', fontSize: '12px'}}>You can't edit the testimonial since it's status is published</p>}
                </div>
              )}

              <div className="col-12">
                <hr className="admin-hr my-3" />
                {showEdit ? (
                  <button
                    className="btn btn-sach bg-sach btn-md ms-2"
                    disabled={testDetail.status.type === 'published'}
                    onClick={() => {
                      setShowEdit(false);
                    }}
                  >
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-sach bg-sach btn-md ms-2"
                    disabled={!textVal || textVal.length < 1 ? true : false}
                    onClick={() => {
                      modifyTestimonial(textVal);
                    }}
                  >
                    <span>Post</span>
                  </button>
                )}
                <button className="btn btn-sach btn-md btn-sach-linear ms-2">
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { MyTestimonialReducer } = state;
  const { isLoading, tableData } = MyTestimonialReducer;
  return {
    isLoading,
    testDetail: tableData && tableData.length ? tableData[0] : {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyTestimonialData: () => dispatch(getMyTestimonialData()),
    modifyTestimonial: (data) => dispatch(modifyTestimonial(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Testimonial);
