import React, { useEffect } from "react";

const TnC = (props) => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    // document.querySelector("body").scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="cms-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="h1">Terms &amp; Conditions</div>
              <p className="para">Effective Date: 01 April 2022</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pt-5 pb-3 pb-md-5">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="cms-title">Terms of Use</div>
              <ol className="cms-para-list">
                <li>
                  ALL THE INFORMATION ON OUR WEBSITEIS PUBLISHED IN GOOD FAITH
                  AND FOR GENERAL INFORMATION PURPOSE ONLY. WE DO NOT MAKE ANY
                  WARRANTIES ABOUT THE COMPLETENESS, RELIABILITY AND ACCURACY OF
                  THIS INFORMATION. ANY ACTION YOU TAKE UPON THE INFORMATION ON
                  OUR WEBSITE IS STRICTLY AT YOUR OWN RISKAND WE WILL NOT BE
                  LIABLE FOR ANY LOSSES AND DAMAGES IN CONNECTION WITH THE USE
                  OF OUR WEBSITE.
                </li>
                <li>
                  FROM OUR WEBSITE, YOU CAN VISIT OTHER WEBSITES BY FOLLOWING
                  HYPERLINKS TO THESE SITES. WHILE WE STRIVE TO PROVIDE ONLY
                  LINKS TO USEFUL AND ETHICAL WEBSITES, WE HAVE NO CONTROL OVER
                  THE CONTENT AND NATURE OF THESE SITES AND THE LINKS TO OTHER
                  SITES DO NOT IMPLY A RECOMMENDATION TO THESE SITES.
                </li>
                <li>
                  PLEASE BE AWARE THAT WHEN YOU LEAVE OUR WEBSITE, OTHER SITES
                  MAY HAVE DIFFERENT PRIVACY POLICIES AND TERMS WHICH ARE BEYOND
                  OUR CONTROL.
                </li>
                <li>
                  THE USER SHALL USE THE WEBSITE DILIGENTLY AND FOR LAWFUL
                  PURPOSES AND IN A MANNER WHICH DOES NOT INFRINGE ANY RIGHTS OF
                  THE FOUNDATION OR OF ANY THIRD PARTY (INCLUDING WITHOUT
                  LIMITATION ANYSUBHASH CHANDRA FOUNDATION SPONSOR OR
                  BENEFICIARY) OR THE USE AND ENJOYMENT OF THE WEBSITE BY ANY
                  THIRD PARTY.
                </li>
                <li>
                  WE ARE A <b>NON-PROFIT ORGANISATION/TRUST/SOCIETY,</b> WHICH
                  IS NOT ENGAGED IN BUSINESS OF PROVIDING COUNSELING SERVICES
                  DIRECTLY TO OUR USERS OR ANY INDIVIDUAL. OUR NATURE OF
                  SERVICES ENTAILS GENERAL ASSISTANCE AND WHICH IS COMMON TO ALL
                  USERS WHERE NO SPECIFIC OR SPECIAL TREATMENT SHALL BE PROVIDED
                  TO ANY USER. SUCH INFORMATION SHALL BE ONLY CONSIDERED FOR
                  REFERNECE PURPOSES.
                </li>
                <li>
                  WE SHALL NOT BE HELD RESPOSIBLE FOR ANY
                  ADVICE/SUGGESTION/RECOMMENDATION PROVIDED BY ANY
                  SPECIALIST/PSYCHOLOGIST/DOCTOR/MEDICAL PRACTITIONER WHO THE
                  USERS REFER TO USING THE INFORMATION/CONTACT DETAILS PROVIDED
                  ON OUR WEBSITE. ANY COMMUNICATION BETWEEN THE
                  SPECIALIST/PSYCHOLOGIST/DOCTOR/MEDICAL PRACTITIONER AND USER
                  SHALL NOT HAVE ANY INVOLVEMENT FROM OUR SIDE.
                </li>
                <li>
                  SACH FOUNDATION DOES NOT SEEK ANY DIRECT REMUNERATION/ PAYMENT
                  FROM ITS USERS TOWARDS RENDERING THE SERVICES ON THE WEBSITE.
                  HOWEVER, USERS SHALL AT THEIR OWN BEHEST, DONATE ANY
                  AMOUNT/SUM OF MONEY BY USING THE “DONATE” FEATURE ON THE
                  WEBSITE.
                </li>
                <li>
                  THE CONTENT POSTED BY THE USERS ON THE WEBSITE USING THEIR
                  ACCOUNTS WOULD NOT BE TESTED BY US FOR AUTHENTICITY, VALIDITY
                  AND ACCURACY. OTHER USERS AND INDIVIDUALS VISITING THE WEBSITE
                  SHALL RELY ON SUCH INFORMATION AT THEIR OWN RISK. THE
                  FOUNDATION DENIES ALL LIABILITY WITH REGARDS TO THE
                  AUTHENTICITY, VALIDITY AND ACCURACY OF SUCH INFORMATION.
                </li>
                <li>
                  BY POSTING CONTENT/INFORMATION ON THE WEBSITE, THE USER SHALL
                  REALISE THAT SUCH CONTENT POSTING WOULD NOT CREATE ANY AGENCY-
                  RELATIONSHIP/ MASTER-SERVANT RELATIONSHIP/ EMPLOYER-EMPLOYEE
                  RELATIONSHIP/ PARTNERSHIP/ ASSOCIATION OF PERSONS OR ANY OTHER
                  FORM OF JOINT ENTERPRISE WITH US.
                </li>
                <li>
                  THE USER IS RESTRICTED FROM USING CODES/SOFTWARE/HACKING
                  DEVICES OR ANY OTHER MEANS TO
                  DISRUPT/ALTER/MODIFY/CHANGE/AMEND THE FUNCTIONING OF THE
                  WEBSITE. THE USER SHALL ALSO REFRAIN FROM COPYING THE
                  LAYOUT/FORMAT/CODE OF THE WEBSITE FOR ANY COMMERCIAL OR
                  NON-COMMERCIAL PURPOSE.
                </li>
                <li>
                  WE RESERVE THE RIGHT TO AMEND ALL OUR POLICIES AT ANY TIME BY
                  POSTING CHANGES ONLINE UNDER ALL OUR POLICIES SUCH AS “PRIVACY
                  POLICY”; “COOKIE POLICY” AND “TERMS AND CONDITIONS”. YOUR
                  CONTINUED USE OF THE WEBSITE AFTER CHANGES HAVE BEEN POSTED ON
                  THE WEBSITE CONSTITUTES ACCEPTANCE OF SUCH MODIFIED POLICIES.
                </li>
                <li>
                  WE SHALL, IN NO EVENT, BE LIABLE FOR ANY DAMAGES INCLUDING,
                  WITHOUT LIMITATION, DIRECT, INDIRECT OR CONSEQUENTIAL DAMAGES,
                  WHATSOEVER ARISING FROM OR IN CONNECTION WITH THE USE OR LOSS
                  OF USE OF THE WEBSITE, OR ANY CONTENT ON THE WEBSITE.
                </li>
                <li>
                  WE DO NOT GUARANTEE THAT THE WEBSITE’S FACILITIES AND
                  FUNCTIONS, WEBSITE OR THE SERVER THAT MAKES IT AVAILABLE TO
                  YOUWILL BE FREE FROM ERRORS, VIRUSES, BUGS OR DEFECTS, OR THAT
                  THE CONTENT ON THE WEBSITE IS ACCURATE OR COMPLETE.
                </li>
                <li>
                  WE RESERVE THE RIGHT TO REMOVE WITHOUT NOTICE ANY MATERIAL
                  POSTED ON THE WEBSITE.
                </li>
              </ol>
              <p className="cms-para mt-5">
                THIS DISCLAIMER SHALL NOT BE UNDERSTOOD AS AN EXHAUSTIVE LIST OF
                RESPONSIBILITIES OF THE USER. THE USE OF THE WEBSITE BY A USER
                SHALL BE ALSO GOVERNED BY THE POLICIES OF THE FOUNDATION AND THE
                APPLICABLE LAWS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TnC;
