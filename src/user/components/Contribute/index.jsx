import React, { useState } from "react";
import Hope from "../../../static/user/img/img-icons/hope.svg";
import Happiness from "../../../static/user/img/img-icons/happiness.svg";
import Health from "../../../static/user/img/img-icons/health.svg";
import Aspiration from "../../../static/user/img/img-icons/aspiration.svg";

const Contribute = (props) => {
  const [contributeSubmitted, setcontributeSubmitted] = useState(false);

  return (
    <>
      <section className="contribute-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="sach-title">
                <h1 className="f-800">
                  Get{" "}
                  <span className="o">
                    Hope, Happiness,
                    <br />
                    Health,
                  </span>{" "}
                  and
                  <br />
                  <span className="o">Aspiration</span> in Life
                </h1>
                <p>
                  Are you someone who wants to get Hope,Happiness,Health,and Aspiration in Life With little or no <br /> suffering and sadness? Then this is the place for you to join and become <span className="o">You</span> again.
                </p>
                <ul className="contri-tabClone">
                  <li className="active">
                    <span>NGO and Individual doners</span>
                  </li>
                  <li>
                    <span>Volunteers</span>
                  </li>
                  <li>
                    <span>Interns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="hhha">
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <div className="hhha-item">
                <img src={Hope} alt="icon" />
                <h2>Hope</h2>
                <p>There is always a way to come out of a problem and solve it. It is nature's Law that there is always 'Cause and Effect' and nothing is permanent.</p>
              </div>
            </div>
            <div className="col-md-3 col-lg-3">
              <div className="hhha-item">
                <img src={Happiness} alt="icon" />
                <h2>Happiness</h2>
                <p>To be and remain happy is within our power, we need to discover our own power. We will guide you how.</p>
              </div>
            </div>
            <div className="col-md-3 col-lg-3">
              <div className="hhha-item">
                <img src={Health} alt="icon" />
                <h2>Health</h2>
                <p>Medical science has proven that if you have a friend who is wiser than you and you trust your friend, talking with the friend gives you a long and healthy life.</p>
              </div>
            </div>
            <div className="col-md-3 col-lg-3">
              <div className="hhha-item">
                <img src={Aspiration} alt="icon" />
                <h2>Aspiration</h2>
                <p>
                  We all have desire to be successful in our life. Aspiration in life means intention, attitude & a movement inside all of us. <b>SACH</b> helps you to arrive at right understanding and right aspiration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!contributeSubmitted ? (
        <>
          <div className="container mb-5 pb-md-5 pb-0">
            <div className="row">
              <div className="col-md-10 col-lg-10 mx-auto">
                <div className="sach-admin-tabs contribute-tabs">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pills-tab-1" data-bs-toggle="pill" data-bs-target="#pills-1" type="button" role="tab" aria-controls="pills-1" aria-selected="true">
                        NGO and Individual doners
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-tab-2" data-bs-toggle="pill" data-bs-target="#pills-2" type="button" role="tab" aria-controls="pills-2" aria-selected="false">
                        Volunteers
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pills-tab-3" data-bs-toggle="pill" data-bs-target="#pills-3" type="button" role="tab" aria-controls="pills-3" aria-selected="false">
                        Interns
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="pills-tabContent">
                    {/* <!-- Tab - 1 --> */}
                    <div className="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-tab-1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="contiForm-title">For NGO and Individual doners</div>
                          <div className="contiForm-para">A full plate of food filled with the goodness of nutrients is nourishing, gives one strength; both bodily and mental, keeps one active and free from diseases. One of the most important aspect for any kind of development</div>
                        </div>

                        <div className="col-md-6 sach-form my-4">
                          <label className="contiForm-para mb-0">
                            Enter Donation Amount<small>*</small>
                          </label>
                          <div className="donationField">
                            <input type="text" className="form-control" defaultValue="0.00 INR" />
                            <span>or</span>
                            <span className="autoAmnt">₹3,000</span>
                            <span className="autoAmnt">₹5,000</span>
                            <span className="autoAmnt">₹8,000</span>
                            <span className="autoAmnt">₹10,000</span>
                          </div>
                        </div>

                        {/* <div className="col-md-12 my-4">
                          <div className="contiForm-para mb-2">
                            Are you a citizen of India?<small>*</small>
                          </div>
                          <div className="sach-check form-check d-inline-block">
                            <input className="form-check-input" type="radio" name="citizenOfIND" id="citizenOfINDYes" checked={true} />
                            <label className="form-check-label" for="citizenOfINDYes">
                              Yes
                            </label>
                          </div>
                          <div className="sach-check form-check d-inline-block">
                            <input className="form-check-input" type="radio" name="citizenOfIND" id="citizenOfINDNo" />
                            <label className="form-check-label" for="citizenOfINDNo">
                              No
                            </label>
                          </div>
                        </div> */}

                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="contiForm-para mb-2">Personal Details</div>
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                First Name<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Last Name<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Email address<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Address<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                State<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                City<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Country<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Pincode<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Mobile Number<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                PAN<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-12 sach-form">
                              <label className="form-label">Post Your Query</label>
                              <textarea className="form-control" rows="4"></textarea>
                            </div>
                            <div className="col-lg-12 text-center my-4 py-3">
                              <a onClick={() => setcontributeSubmitted(true)} className="btn btn-sach bg-sach-dark px-5">
                                <span className="px-5">Submit</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Tab - 2 --> */}
                    <div className="tab-pane fade" id="pills-2" role="tabpanel" aria-labelledby="pills-tab-2">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="contiForm-title">For Volunteers</div>
                          <div className="contiForm-para">A full plate of food filled with the goodness of nutrients is nourishing, gives one strength; both bodily and mental, keeps one active and free from diseases. One of the most important aspect for any kind of development</div>
                        </div>

                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="contiForm-para mb-2">Personal Details</div>
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                First Name<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Last Name<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Email address<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Address<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                City<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                State<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Country<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Pincode<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Mobile Number<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                PAN<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-12 sach-form">
                              <label className="form-label">Post Your Query</label>
                              <textarea className="form-control" rows="4"></textarea>
                            </div>
                            <div className="col-lg-12 text-center my-4 py-3">
                              <a onClick={() => setcontributeSubmitted(true)} className="btn btn-sach bg-sach-dark px-5">
                                <span className="px-5">Submit</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Tab - 3 --> */}
                    <div className="tab-pane fade" id="pills-3" role="tabpanel" aria-labelledby="pills-tab-3">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="contiForm-title">For Interns</div>
                          <div className="contiForm-para">A full plate of food filled with the goodness of nutrients is nourishing, gives one strength; both bodily and mental, keeps one active and free from diseases. One of the most important aspect for any kind of development</div>
                        </div>

                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="contiForm-para mb-2">Personal Details</div>
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                First Name<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Last Name<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Email address<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Address<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                City<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                State<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Country<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Pincode<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                Mobile Number<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-4 sach-form">
                              <label className="form-label">
                                PAN<small>*</small>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col-md-12 sach-form">
                              <label className="form-label">Post Your Query</label>
                              <textarea className="form-control" rows="4"></textarea>
                            </div>
                            <div className="col-lg-12 text-center my-4 py-3">
                              <a onClick={() => setcontributeSubmitted(true)} className="btn btn-sach bg-sach-dark px-5">
                                <span className="px-5">Submit</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container py-5 my-5">
            <div className="row">
              <div className="col-md-12">
                <div className="mb-4 text-center">
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.2722 37.8549C32.4812 38.6459 31.0804 38.6459 30.2894 37.8549L27.0492 34.6146L24.0664 37.5974L31.7807 45.3117L47.9326 29.16L44.9477 26.1772L33.2722 37.8549Z" fill="#64C880" />
                    <path
                      d="M68.6217 21.5462C68.5126 21.4432 66.2053 19.2946 63.3257 17.7415C62.992 14.4848 61.8899 11.5308 61.8363 11.3908C61.6222 10.8244 61.1751 10.3773 60.6087 10.1631C60.4686 10.1096 57.5147 9.00751 54.258 8.67381C52.7048 5.79202 50.5543 3.48496 50.4533 3.37569C50.0372 2.93287 49.4522 2.6197 48.8465 2.71237C48.6982 2.71645 45.5466 2.82768 42.4094 3.76705C39.8716 1.69904 37.0041 0.250344 36.8681 0.18847C36.3161 -0.0628233 35.6816 -0.0628233 35.1296 0.18847C34.9936 0.250204 32.1263 1.6989 29.5885 3.76705C26.4512 2.82768 23.2996 2.71645 23.1513 2.71237C22.5168 2.62378 21.9607 2.93273 21.5446 3.37569C21.4436 3.48482 19.2931 5.79202 17.7399 8.67381C14.4832 9.00751 11.5293 10.1096 11.3892 10.1631C10.8228 10.3773 10.3757 10.8244 10.1616 11.3908C10.108 11.5308 9.00592 14.4848 8.67223 17.7415C5.79044 19.2946 3.48337 21.4452 3.37411 21.5462C2.93326 21.9623 2.69026 22.5473 2.71079 23.1529C2.71487 23.3013 2.8261 26.4529 3.76546 29.5901C1.69732 32.1279 0.248622 34.9954 0.186888 35.1312C-0.062296 35.6833 -0.062296 36.3178 0.186888 36.8697C0.248622 37.0057 1.69732 39.873 3.76546 42.4108C2.8261 45.5481 2.71487 48.6998 2.71079 48.848C2.69026 49.4537 2.93326 50.0386 3.37411 50.4548C3.48323 50.5557 5.79044 52.7063 8.67223 54.2594C9.00592 57.5161 10.108 60.4701 10.1616 60.6101C10.3757 61.1766 10.8228 61.6236 11.3913 61.8378C11.5314 61.8913 14.4832 62.9934 17.7399 63.3271C19.2931 66.2069 21.4415 68.514 21.5446 68.6231C21.9586 69.0659 22.554 69.3441 23.1513 69.2884C23.2997 69.2843 26.4513 69.1731 29.5865 68.2337C32.1265 70.2998 34.9938 71.7506 35.1298 71.8123C35.4058 71.938 35.7024 71.9998 35.9991 71.9998C36.2958 71.9998 36.5924 71.938 36.8684 71.8123C37.0044 71.7506 39.8717 70.2998 42.4095 68.2337C45.5468 69.1731 48.6985 69.2843 48.8467 69.2884C49.4729 69.3399 50.0373 69.0659 50.4535 68.6231C50.5564 68.514 52.705 66.2068 54.2581 63.3271C57.5148 62.9934 60.4667 61.8913 60.6067 61.8378C61.1753 61.6236 61.6223 61.1766 61.8365 60.6101C61.89 60.4701 62.9921 57.5161 63.3258 54.2594C66.2056 52.7063 68.5127 50.5578 68.6218 50.4548C69.0646 50.0408 69.3078 49.4558 69.2871 48.848C69.283 48.6996 69.1718 45.548 68.2324 42.4108C70.3006 39.873 71.7493 37.0056 71.811 36.8697C72.0602 36.3176 72.0602 35.6831 71.811 35.1312C71.7493 34.9952 70.3006 32.1279 68.2324 29.5901C69.1718 26.4528 69.283 23.3011 69.2871 23.1529C69.3076 22.5453 69.0645 21.9603 68.6217 21.5462ZM52.406 30.6509L33.2716 49.7855C32.8595 50.1976 32.3198 50.4036 31.7803 50.4036C31.2407 50.4036 30.7008 50.1976 30.2889 49.7855L19.5919 39.0885C18.768 38.2646 18.768 36.9296 19.5919 36.1057L25.5574 30.1402C26.3813 29.3163 27.7162 29.3163 28.5402 30.1402L31.7804 33.3804L43.4559 21.7028C44.2798 20.8789 45.6148 20.8789 46.4387 21.7028L52.4063 27.6683C53.2301 28.4922 53.2295 29.8276 52.406 30.6509Z"
                      fill="#64C880"
                    />
                    <circle cx="35.5" cy="35.5" r="19.5" fill="#64C880" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M52.1772 24.8217C52.8281 25.4725 52.8281 26.5278 52.1772 27.1787L32.1772 47.1787C31.5263 47.8295 30.4711 47.8295 29.8202 47.1787L19.8202 37.1787C19.1693 36.5278 19.1693 35.4725 19.8202 34.8217C20.4711 34.1708 21.5263 34.1708 22.1772 34.8217L30.9987 43.6431L49.8202 24.8217C50.4711 24.1708 51.5263 24.1708 52.1772 24.8217Z" fill="white" />
                  </svg>
                </div>

                <div class="sach-title text-center">
                  <h1 class="f-700 fs-40">Thank You for your Contribution</h1>
                  <h2 class="f-700 fs-40">
                    <span class="o">Payment Gateway Integration is in progress</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Contribute;
