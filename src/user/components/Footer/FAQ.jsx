import React, { useEffect } from "react";

const FAQ = (props) => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    document.querySelector("body").scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="cms-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="h5">The FAQ's</div>
              <div className="h1">Help Centre</div>
              <p className="para">Everything you need to know about the product and billing.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="contactUs-form">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="helpCenter pb-4 pb-md-0">
                <span>Support</span>
                <div className="h2">FAQ's</div>
                <p>
                  For any support please write to us at: <a href="mailto:support@sach.org.in">support@sach.org.in</a>
                </p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="sach-accordion-2 accordion" id="FAQ_Accordion">
                <div className="accordion-item">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_1" aria-expanded="true" aria-controls="collapse_1">
                    1. How can I donate to the “Sach” Foundation?
                  </button>
                  <div id="collapse_1" className="accordion-collapse collapse show" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>
                        You can go to the contribute section of Sach Foundation’s website and donate online. For other donation queries please write to <a href="mailto:support@sach.org.in">support@sach.org.in</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_2" aria-expanded="false" aria-controls="collapse_2">
                    2. How can I get updates about the events?
                  </button>
                  <div id="collapse_2" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>To begin with, you must register with us. Once you register, we will send you emails informing you of upcoming events. Alternatively, you can check our website’s event section page for regular updates.</div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_3" aria-expanded="false" aria-controls="collapse_3">
                    3. How can I request for more topics?
                  </button>
                  <div id="collapse_3" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>When you go through our website's about page, you will find a box built just for you that asks for advice in the Overview Section down below. Here, you may let us know what subject you would like Dr. Subhash Chandra to cover on The DSC Show.</div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_4" aria-expanded="false" aria-controls="collapse_4">
                    4. How can I work for Sach foundation?
                  </button>
                  <div id="collapse_4" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>Visit our website's Contribute Section if you are an interested applicant as an intern or a volunteer, you can work for Sach. Fill out the part that applies to you and send it to us.If you are shortlisted, we will contact you as soon as possible.</div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_5" aria-expanded="false" aria-controls="collapse_5">
                    5. Didn't receive a confirmation after a successful transaction
                  </button>
                  <div id="collapse_5" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <p>Worry not, it happens sometimes. The transaction might have been successful but we might not have received a confirmation from the bank. In such instances we recommend you wait at least 24 hrs to see the confirmation from Sach.</p>
                      <p className="mb-0">The transaction has been marked as failed and reversed if you still do not receive a confirmation from Sach. Your account will be credited within 5-7 working days. In case of any queries, please contact us at</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_6" aria-expanded="false" aria-controls="collapse_6">
                    6. Is this website safe to make online payments?
                  </button>
                  <div id="collapse_6" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>Yes, the website is safe for any kind of transaction. Also any information exchange is kept safe and in no condition gets disclosed. Also the payment gateway is a third party payment gateway recognized by the financial institutions under the government of India. So any transaction also is thoroughly secured.</div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_7" aria-expanded="false" aria-controls="collapse_7">
                    7. If there is a problem with the net banking or credit card donation process, whom to contact?
                  </button>
                  <div id="collapse_7" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>Feel free to write to us. We are always happy to help.</div>
                      <span>Please mail us at: </span>
                      <a href="mailto:support@sach.org.in">support@sach.org.in</a>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_8" aria-expanded="false" aria-controls="collapse_8">
                    8. If I forgot my password, How do I find it?
                  </button>
                  <div id="collapse_8" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>It's very easy for you to reset it yourself. Click the link in the top right hand corner of our site that says "Login." When you do, enter your email address and click "Forgot your password?" Our system will then send you an email with a link that will allow you to choose a new password for your account. The link in the email is only valid upto 24 hours.</div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_9" aria-expanded="false" aria-controls="collapse_9">
                    9. How can I refer to the Sach Vijaya Scholarship form?
                  </button>
                  <div id="collapse_9" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>The Sach Vijaya Scholarship application is available on our website under the sectoral focus column. Download it, complete it, and send it to us.</div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_10" aria-expanded="false" aria-controls="collapse_10">
                    10. Different Modes of Payments to donate
                  </button>
                  <div id="collapse_10" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>
                        <b>Users in India can make a payment using the following methods:</b>
                      </div>
                      <span>Debit card, credit card, net banking, bank transfer, digital wallets, UPI, QR code, BHIM.</span>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_11" aria-expanded="false" aria-controls="collapse_11">
                    11. What are the other ways I can donate?
                  </button>
                  <div id="collapse_11" className="accordion-collapse collapse" data-bs-parent="#FAQ_Accordion">
                    <div className="accor_wrp">
                      <div>
                        <span>
                          If you want to donate offline you can write to us and send your details at: <a href="mailto:support@sach.org.in">support@sach.org.in</a>
                        </span>
                      </div>
                    </div>
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

export default FAQ;
