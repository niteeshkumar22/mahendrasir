import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, Input } from "antd";
import { adviseTopicRequest } from "../../../redux/action/user/topicRequest";
import { resetToast } from "../../../redux/action/common";
import { checkAuthentication, getCurrentUserDetails } from "../../../utils/util";
import { toast } from "react-toastify";

const TopicRequestForm = (props) => {
  const { adviseTopicRequest, toastType, toastData, resetToast, type } = props;

  const checkUser = checkAuthentication();

  const authUser = checkUser ? getCurrentUserDetails() : "";

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [topicRequest, setTopicRequest] = useState("");
  const [description, setDescription] = useState("");
  const [sachID, setSachID] = useState(authUser && authUser.user && authUser.user.sachUserId ? authUser.user.sachUserId : " ");
    
  useEffect(() => {
    if (toastType) {
      showToast();
      resetToast();
    }
  }, [toastType]);

  const showToast = () => {
    switch (toastType) {
      case "success":
        toast.success(toastData.message);
        break;
      case "error":
        toast.error(toastData.message);
        break;
      case "warning":
        toast.warning(toastData.message);
        break;
      default:
        break;
    }
  };
  const onFinish = () => {
    const data = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      emailId: emailId,
      topicRequest: topicRequest,
      description: description,
      type: type,
      sachUserId: sachID
    };
    setFullName("");
    setPhoneNumber("");
    setEmailId("");
    setTopicRequest("");
    setDescription("");
    adviseTopicRequest(data);
  };

  return (
    <>
      <section className="topicForm">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="sach-title text-start">
                <h1 className="f-700 fs-40">
                  Request for <span className="o">advise</span>
                </h1>
                <p>Please let us know the topic on which you want Dr. Subhash Chandra to speak in DSC Show.</p>
                <Form
                  className="row"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  onFinish={onFinish}
                >
                  <Input type="hidden" id="sachUserId" name="sachUserId" value={sachID} />
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-6 sach-form">
                      <label htmlFor="name" className="form-label" min="2" max="50">
                        Name <small>*</small>
                      </label>
                      <input type="text" className="form-control" id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 sach-form">
                      <label htmlFor="email" className="form-label">
                        Emal address <small>*</small>
                      </label>
                      <input type="email" className="form-control" id="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-6 sach-form">
                      <label htmlFor="mobile" className="form-label">
                        Mobile <small>*</small>
                      </label>
                      <input type="text" min={6} max={10} pattern="[789][0-9]{9}" className="form-control" id="mobile" value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)} required  />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 sach-form">
                      <label htmlFor="topic" className="form-label">
                        Topic <small>*</small>
                      </label>
                      <input type="text" className="form-control" id="topic" value={topicRequest} onChange={(e) => setTopicRequest(e.target.value)} required />
                    </div>
                    <div className="col-lg-12 sach-form">
                      <label htmlFor="description" className="form-label">
                        Description <small>*</small>
                      </label>
                      <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <div className="col-lg-12 text-center mt-5">
                      <button type="submit" className="btn btn-sach bg-sach-dark btn-sach-lg">
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { CommonReducer } = state;
  return {
    toastData: CommonReducer.toastData,
    toastType: CommonReducer.toastType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adviseTopicRequest: (data) => dispatch(adviseTopicRequest(data)),
    resetToast: () => dispatch(resetToast()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicRequestForm);
