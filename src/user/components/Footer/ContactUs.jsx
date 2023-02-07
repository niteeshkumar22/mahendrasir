import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import { connect } from "react-redux";
import {  postForm } from "../../../redux/action/user/contact";
import { resetToast } from "../../../redux/action/common";
import { checkAuthentication, checkValidFullName, checkValidPhone, checkValidUsername, getCurrentUserDetails, inputNumberOnly } from "../../../utils/util";
import SachLoader from "../../../commons/Loader";

const ContactUs = ({ isLoading, postForm, contactData }) => {
  const checkUser = checkAuthentication();

  const authUser = checkUser ? getCurrentUserDetails() : "";
  const [isFormValid, setValidForm] = useState(false);
  const [sachID, setSachID] = useState(authUser && authUser.user && authUser.user.sachUserId ? authUser.user.sachUserId : " ");
  const [showError, setShowError] = useState("");
  let [formValues, setFormValues] = useState([]);

  useEffect(() => {
    if(contactData) {
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        meassage: ''
      });
      console.log(contactData)
    }
  }, [contactData])

  const onChangeSignUpform = (event) => {
    if (showError) {
      setShowError("");
    }
      const copyForm = Object.assign({}, formValues);
    copyForm[event.target.id] = event.target.value;
    if (event.target.id === "firstName" && event.target.value !== "" && checkValidFullName(event.target.value)) {
      copyForm["isValidName"] = true;
    } else if (event.target.id === "firstName" && event.target.value !== "" && !checkValidFullName(event.target.value)) {
      copyForm["isValidName"] = false;
    }
    if (event.target.id === "lastName" && event.target.value !== "" && checkValidFullName(event.target.value)) {
      copyForm["isValidlastName"] = true;
    } else if (event.target.id === "lastName" && event.target.value !== "" && !checkValidFullName(event.target.value)) {
      copyForm["isValidlastName"] = false;
    }
    if (event.target.id === "email" && event.target.value !== "" && checkValidUsername(event.target.value)) {
      copyForm["isValidEmail"] = true;
    } else if (event.target.id === "email" && event.target.value !== "" && !checkValidUsername(event.target.value)) {
      copyForm["isValidEmail"] = false;
    }

    if (event.target.id === "phoneNumber" && event.target.value !== "" && checkValidPhone(event.target.value)) {
      copyForm["isValidPhone"] = true;
    } else if (event.target.id === "phoneNumber" && event.target.value !== "" && !checkValidPhone(event.target.value)) {
      copyForm["isValidPhone"] = false;
    }
    if (copyForm["isValidName"] && copyForm["isValidlastName"] && copyForm["isValidEmail"] && copyForm["isValidPhone"]) {
      setValidForm(true);
    } else {
        setValidForm(false);
    }
    setFormValues(copyForm);
  };

  const setErrorMsg = () => {
    if (!formValues["firstName"] || !formValues["isValidName"]) {
      setShowError("Please Enter Valid Name, Only alphabets are allowed");
    }else if (!formValues["lastName"] || !formValues["isValidlastName"]) {
      setShowError("Please Enter Valid Name, Only alphabets are allowed");
    } else if (!formValues["email"] || !formValues["isValidEmail"]) {
      setShowError("Please Enter Valid Email Address");
    } else if (!formValues["phoneNumber"] || !formValues["isValidPhone"]) {
      setShowError("Please Enter Valid Phone Number");
    } else {
      return true;
    }
  };
  const onFinish = () => {
    if (!isFormValid) {
      setErrorMsg();
      return;
    }
const  {firstName, lastName, email, meassage, phoneNumber} = formValues;
    postForm({
      firstName, lastName, phoneNumber,
      meassage: meassage,
      emailId: email,
      sachUserId: sachID
    });
  };
  if (isLoading) {
    return <SachLoader />;
  }
  return (
    <>
      <section className="cms-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="h1">Contact Us</div>
              <p className="para">Have questions about our products, features, trials, or pricing? Need a demo? Our teams will help you.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="contactUs-form">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="h4">Get in Touch</div>
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
                <div className="col-lg-6 col-md-6 col-sm-6 sach-form">
                  <label htmlFor="name" className="form-label">
                    First Name<small>*</small>
                  </label>
                  <input type="text" value={formValues.firstName} className="form-control" maxLength={50} id="firstName" onChange={(e) => onChangeSignUpform(e)} required />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 sach-form">
                  <label htmlFor="name" className="form-label">
                    Last Name<small>*</small>
                  </label>
                  <input type="text" className="form-control" value={formValues.lastName} id="lastName" maxLength={50} onChange={(e) => onChangeSignUpform(e)} required />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 sach-form">
                  <label htmlFor="email" className="form-label">
                    Email address<small>*</small>
                  </label>
                  <input type="email" className="form-control" value={formValues.email} id="email" onChange={(e) => onChangeSignUpform(e)} required />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 sach-form">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number<small>*</small>
                  </label>
                  <input type="text" min={6} max={10} minLength={6} maxLength={10} pattern="[789][0-9]{9}" className="form-control" id="phoneNumber" 
                   value={formValues.phoneNumber}
                   onKeyDown={ inputNumberOnly }
                  onChange={(e) => onChangeSignUpform(e)} required />
                </div>

                <div className="col-lg-12 sach-form">
                  <label htmlFor="description" className="form-label">
                    Your Message<small>*</small>
                  </label>
                  <textarea value={formValues.meassage} maxLength={200} className="form-control" id="meassage" rows="3" max={200} placeholder="Enter here..."  onChange={(e) => onChangeSignUpform(e)} required></textarea>
                </div>
                {showError && <div className="col-12 mt-1 error-msg">{showError}</div>}
                <p className="para">By submitting this form you agree to our terms and conditions and our Privacy Policy which explains how we may collect, use and disclose your personal information including to third parties.</p>

                <div className="col-lg-12 text-center">
                  <button className="btn btn-sach bg-sach-dark">Send Now</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-details">
        <div class="container">
          <div class="row">
            <div class="col-md-10 mx-auto">
              <div class="row">
                <div class="col-md-4">
                  <div class="details-sec">
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.25 2C16.799 2 20.5 5.729 20.5 10.313C20.5 15.948 14.044 21.5 12.25 21.5C10.456 21.5 4 15.948 4 10.313C4 5.729 7.701 2 12.25 2ZM12.25 3.5C8.528 3.5 5.5 6.557 5.5 10.313C5.5 15.092 11.124 19.748 12.25 19.996C13.376 19.747 19 15.091 19 10.313C19 6.557 15.972 3.5 12.25 3.5ZM12.251 7C14.043 7 15.501 8.458 15.501 10.251C15.501 12.043 14.043 13.5 12.251 13.5C10.459 13.5 9.001 12.043 9.001 10.251C9.001 8.458 10.459 7 12.251 7ZM12.251 8.5C11.286 8.5 10.501 9.285 10.501 10.251C10.501 11.216 11.286 12 12.251 12C13.216 12 14.001 11.216 14.001 10.251C14.001 9.285 13.216 8.5 12.251 8.5Z" />
                      </svg>
                    </span>
                    <b>Corporate Office</b>
                    <p>Reach us at</p>
                    <a className="text-center">
                      7th Floor, Subhash Chandra Foundation,
                      <br />
                      FC-19, Sector-16A, Film City,
                      <br />
                      Noida-201301, UP, India
                    </a>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="details-sec">
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.4004 20C10.0114 20 4.00037 13.988 4.00037 6.6C4.00037 5.166 5.16637 4 6.60037 4C6.70937 4 6.81737 4.007 6.92737 4.021L7.98837 8.642C7.85707 8.71031 7.71655 8.7838 7.5795 8.85547L7.45037 8.923C6.58837 9.373 5.90837 9.729 6.26537 10.514C7.44137 13.86 10.1404 16.56 13.4464 17.72C14.2887 18.0575 14.6155 17.4325 15.0674 16.5684L15.0734 16.557C15.1253 16.4586 15.1788 16.356 15.2318 16.2543C15.2747 16.172 15.3172 16.0903 15.3584 16.012L19.9784 17.072C19.9934 17.18 20.0004 17.289 20.0004 17.4C20.0004 18.834 18.8344 20 17.4004 20ZM21.7514 15.908C21.6384 15.583 21.3664 15.339 21.0304 15.262L15.0664 13.893C14.7374 13.819 14.3934 13.912 14.1504 14.146C14.0074 14.282 14.0044 14.286 13.3544 15.527C11.2244 14.557 9.47937 12.818 8.47537 10.644C9.71437 9.995 9.71737 9.992 9.85437 9.85C10.0884 9.606 10.1824 9.262 10.1074 8.934L8.73837 2.97C8.66137 2.634 8.41637 2.361 8.09137 2.248C7.85337 2.166 7.60837 2.104 7.36637 2.065C7.11737 2.022 6.86037 2 6.60037 2C4.06337 2 2.00037 4.063 2.00037 6.6C2.00037 15.092 8.90837 22 17.4004 22C19.9364 22 22.0004 19.937 22.0004 17.4C22.0004 17.142 21.9774 16.887 21.9354 16.639C21.8954 16.389 21.8334 16.144 21.7514 15.908ZM13 8C14.654 8 16 9.346 16 11C16 11.553 16.447 12 17 12C17.553 12 18 11.553 18 11C18 8.243 15.757 6 13 6C12.448 6 12 6.447 12 7C12 7.553 12.448 8 13 8ZM20 11C20 7.141 16.859 4 13 4C12.448 4 12 3.553 12 3C12 2.447 12.448 2 13 2C17.963 2 22 6.037 22 11C22 11.553 21.553 12 21 12C20.447 12 20 11.553 20 11Z"
                        />
                      </svg>
                    </span>
                    <b>Call us</b>
                    <p>Call us to speak to a member of our team. We are always happy to help.</p>
                    <a href="tel:01662-232384" className="text-center">
                      01662-232384
                    </a>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="details-sec">
                    <span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.25 2C16.799 2 20.5 5.729 20.5 10.313C20.5 15.948 14.044 21.5 12.25 21.5C10.456 21.5 4 15.948 4 10.313C4 5.729 7.701 2 12.25 2ZM12.25 3.5C8.528 3.5 5.5 6.557 5.5 10.313C5.5 15.092 11.124 19.748 12.25 19.996C13.376 19.747 19 15.091 19 10.313C19 6.557 15.972 3.5 12.25 3.5ZM12.251 7C14.043 7 15.501 8.458 15.501 10.251C15.501 12.043 14.043 13.5 12.251 13.5C10.459 13.5 9.001 12.043 9.001 10.251C9.001 8.458 10.459 7 12.251 7ZM12.251 8.5C11.286 8.5 10.501 9.285 10.501 10.251C10.501 11.216 11.286 12 12.251 12C13.216 12 14.001 11.216 14.001 10.251C14.001 9.285 13.216 8.5 12.251 8.5Z" />
                      </svg>
                    </span>
                    <b>Regional Office</b>
                    <p>Reach us at</p>
                    <a className="text-center">
                      1038-39, Sector-14, Hisar-125001,
                      <br />
                      Haryana, India
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
const mapStateToProps = (state) => {
  const { ContactReducer, CommonReducer } = state;
  return {
    isLoading: ContactReducer.isLoading,
    toastData: CommonReducer.toastData,
    toastType: CommonReducer.toastType,
    contactData: ContactReducer.contactData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postForm: (data) => dispatch(postForm(data)),
    resetToast: () => dispatch(resetToast()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
