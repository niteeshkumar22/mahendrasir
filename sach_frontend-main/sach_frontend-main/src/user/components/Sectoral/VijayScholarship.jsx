import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function VijayScholarship() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth"
    // });
    document.querySelector('body').scrollTo(0, 0)
  }, []);
  const style = {
    backgroundColor: "var(--theme-orange)"
  }
  return (<>
    <section className="grant-hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <Link to="/" className="grant-back-btn"><i className="bi bi-chevron-left"></i> Back</Link>
            <p className="h1 w-75 mt-4">
              <span className="text-sach">SACH </span>
              <span>Vijaya Scholarship Application</span>
              <span className="text-sach"> Guidelines</span>
            </p>
            <p className="para w-75">The Subhash Chandra Foundation's SACH Vijaya Scholarship is a national level, merit cum means scholarship that aims to provide financial assistance to girls from economically weak backgrounds to support them in pursuing higher levels of education.</p>
            <div className="img-container">
              <img src={require('../../../static/user/img/SectoralFocus/Vijaya-Scholarship.png').default} alt="Hero Image" />
            </div>
          </div>
        </div>
      </div>
    </section>


    <div className="container mt-5">
      <div className="row early-edu-description pb-0">
        <div className="col-md-12">
          <div className="dowld-sec border-0 justify-content-end">
            <span>Download:</span>
            <a href="form/SACH-Vijaya-Application-form-2020-form.pdf" download className="btn btn-sach" style={style}>
              <svg className="me-2" width="20" height="20" viewBox="0 0 21 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 0.128906C10.6642 0.128906 11 0.464693 11 0.878906V12.9199C11 13.3341 10.6642 13.6699 10.25 13.6699C9.83579 13.6699 9.5 13.3341 9.5 12.9199V0.878906C9.5 0.464693 9.83579 0.128906 10.25 0.128906Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6953 9.46077C13.9887 9.75306 13.9897 10.2279 13.6974 10.5214L10.7814 13.4494C10.6407 13.5907 10.4495 13.6702 10.25 13.6702C10.0506 13.6702 9.85934 13.5907 9.7186 13.4494L6.8026 10.5214C6.51031 10.2279 6.51128 9.75306 6.80478 9.46077C7.09827 9.16848 7.57314 9.16945 7.86543 9.46295L10.25 11.8573L12.6346 9.46295C12.9269 9.16945 13.4018 9.16848 13.6953 9.46077Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M18.75 9.29808C18.7501 8.91271 18.6743 8.5311 18.5269 8.17504C18.3795 7.81898 18.1634 7.49544 17.8909 7.22291C17.6185 6.95038 17.295 6.73419 16.939 6.58669C16.583 6.4392 16.2014 6.36328 15.816 6.36328H14.883C14.4688 6.36328 14.133 6.02749 14.133 5.61328C14.133 5.19907 14.4688 4.86328 14.883 4.86328H15.816C16.3984 4.86328 16.9751 4.97801 17.5131 5.20091C18.0511 5.42382 18.54 5.75053 18.9517 6.1624C19.3635 6.57426 19.6901 7.0632 19.9128 7.6013C20.1356 8.13933 20.2501 8.71597 20.25 9.29828C20.25 9.29835 20.25 9.29821 20.25 9.29828V14.1823C20.25 15.3559 19.7838 16.4814 18.9539 17.3112C18.1241 18.1411 16.9986 18.6073 15.825 18.6073H4.685C3.50877 18.6073 2.3807 18.14 1.54898 17.3083C0.717257 16.4766 0.25 15.3485 0.25 14.1723V9.28728C0.250319 8.11391 0.716665 6.9885 1.54648 6.15891C2.37629 5.32932 3.50163 4.86328 4.675 4.86328H5.617C6.03121 4.86328 6.367 5.19907 6.367 5.61328C6.367 6.02749 6.03121 6.36328 5.617 6.36328H4.675C3.89938 6.36328 3.15552 6.67134 2.60699 7.21971C2.05852 7.76804 1.75027 8.51173 1.75 9.28728C1.75 9.28735 1.75 9.28721 1.75 9.28728V14.1723C1.75 14.9507 2.05922 15.6972 2.60964 16.2476C3.16006 16.7981 3.90659 17.1073 4.685 17.1073H15.825C16.6008 17.1073 17.3447 16.7991 17.8933 16.2506C18.4418 15.702 18.75 14.958 18.75 14.1823V9.29808Z" />
              </svg>
              <span>Application Form</span>
            </a>
            <a href="form/SACH-Vijaya-Recommendation-form-2020-form.pdf" download className="btn btn-sach ms-3" style={style}>
              <svg className="me-2" width="20" height="20" viewBox="0 0 21 19" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.25 0.128906C10.6642 0.128906 11 0.464693 11 0.878906V12.9199C11 13.3341 10.6642 13.6699 10.25 13.6699C9.83579 13.6699 9.5 13.3341 9.5 12.9199V0.878906C9.5 0.464693 9.83579 0.128906 10.25 0.128906Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6953 9.46077C13.9887 9.75306 13.9897 10.2279 13.6974 10.5214L10.7814 13.4494C10.6407 13.5907 10.4495 13.6702 10.25 13.6702C10.0506 13.6702 9.85934 13.5907 9.7186 13.4494L6.8026 10.5214C6.51031 10.2279 6.51128 9.75306 6.80478 9.46077C7.09827 9.16848 7.57314 9.16945 7.86543 9.46295L10.25 11.8573L12.6346 9.46295C12.9269 9.16945 13.4018 9.16848 13.6953 9.46077Z" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M18.75 9.29808C18.7501 8.91271 18.6743 8.5311 18.5269 8.17504C18.3795 7.81898 18.1634 7.49544 17.8909 7.22291C17.6185 6.95038 17.295 6.73419 16.939 6.58669C16.583 6.4392 16.2014 6.36328 15.816 6.36328H14.883C14.4688 6.36328 14.133 6.02749 14.133 5.61328C14.133 5.19907 14.4688 4.86328 14.883 4.86328H15.816C16.3984 4.86328 16.9751 4.97801 17.5131 5.20091C18.0511 5.42382 18.54 5.75053 18.9517 6.1624C19.3635 6.57426 19.6901 7.0632 19.9128 7.6013C20.1356 8.13933 20.2501 8.71597 20.25 9.29828C20.25 9.29835 20.25 9.29821 20.25 9.29828V14.1823C20.25 15.3559 19.7838 16.4814 18.9539 17.3112C18.1241 18.1411 16.9986 18.6073 15.825 18.6073H4.685C3.50877 18.6073 2.3807 18.14 1.54898 17.3083C0.717257 16.4766 0.25 15.3485 0.25 14.1723V9.28728C0.250319 8.11391 0.716665 6.9885 1.54648 6.15891C2.37629 5.32932 3.50163 4.86328 4.675 4.86328H5.617C6.03121 4.86328 6.367 5.19907 6.367 5.61328C6.367 6.02749 6.03121 6.36328 5.617 6.36328H4.675C3.89938 6.36328 3.15552 6.67134 2.60699 7.21971C2.05852 7.76804 1.75027 8.51173 1.75 9.28728C1.75 9.28735 1.75 9.28721 1.75 9.28728V14.1723C1.75 14.9507 2.05922 15.6972 2.60964 16.2476C3.16006 16.7981 3.90659 17.1073 4.685 17.1073H15.825C16.6008 17.1073 17.3447 16.7991 17.8933 16.2506C18.4418 15.702 18.75 14.958 18.75 14.1823V9.29808Z" />
              </svg>
              <span>Recommendation Form</span>
            </a>
          </div>
        </div>
        <div className="col-md-12">
          <div className="h2">What does the Scholarship Cover?</div>
          <ol className="num-list mt-4">
            <li>The Scholarship is of <b>INR 10,000</b> maximum for each selected student and can be utilized towards funding School Tuition Fees, Books & Periodicals, School Uniform & Stationary.</li>
            <li>Each Selected student will be assigned with a Mentor, who will mentor the scholar through <b>one year.</b></li>
            <li>
              <span>Membership to the exclusive <b>SCF Scholars Group.</b> The benefits of the membership include.</span>
              <div>•Summer Placements & Internships</div>
              <div>•Opportunities to lead social initiatives</div>
              <div>•Attend Domestic conferences</div>
            </li>
          </ol>
        </div>
      </div>
    </div>


    <div className="container">
      <div className="row early-edu-description py-0">
        <div className="col-md-12">
          <div className="h2">Eligibility</div>
          <ol className="num-list mt-4">
            <li>The scholarship is open to girls who are <b>Indian nationals</b></li>
            <li>The student should be a regular <b>full-time</b> student studying in school</li>
            <li>Scholarship for studying will only be available for <b>one year.</b> If a student must repeat a className, she would not get the scholarship for that className for the (or subsequent) year</li>
            <li>Only students whose <b>parents'/guardians'</b> (Family income) does not exceed <b>₹3 lakhs per annum</b> from all sources will be eligible for the scholarship program</li>
            <li>Students <b>graduating</b> from Grade 8 & Grade 10 in 2020 (Tier I) and taking admission in Grade 9 & Grade 11 classNamees (Tier II) respectively</li>
            <li><span className="text-sach">For Scholarship Tier I:</span> Student must have scored minimum 70% in Grade <b>7 final</b> school exam & 70% in Grade 8 Half Yearly school exam</li>
            <li><span className="text-sach">For Scholarship Tier II:</span> Student must have scored minimum 70% in Grade <b>9 final</b> school exam & 70% in Grade 10 Half Yearly school exam</li>
            <li>For <b>specially-abled,</b> the minimum cut off is 50% across all the tiers. Such students need to provide Disability certificate at the time of shortlisting</li>
          </ol>
        </div>
      </div>
    </div>


    <div className="container">
      <div className="row early-edu-description py-0">
        <div className="col-md-12">
          <div className="h2">Deadlines</div>
          <p>Submission of Application form along with Recommendation Forms need to reach us at: <b>31st January 2020</b></p>
        </div>
      </div>
    </div>


    <div className="container">
      <div className="row early-edu-description py-0">
        <div className="col-md-12">
          <div className="h2">Applications</div>
          <ol className="num-list mt-4">
            <li>Application Form can be downloaded, filled and then submitted at <b className="text-sach">info@dscfoundation.org</b> with subject line: SACH Vijaya Scholarship 2020 Application Form</li>
            <li>The recommendation form can be downloaded and submitted along with letters. They should be sent by courier to the following address: <br /><b>SACH Vijaya Scholarship 2020 Subhash Chandra Foundation 7th Floor FC- 19/20,Sector 16-A (Filmcity) Noida : 201301</b></li>
            <li>Please visit our website <b className="text-sach">www.subhashchandrafoundation.org</b> in order to apply</li>
            <li>Incomplete applications are liable to be rejected</li>
            <li>In case of any queries, send an e-mail at <b className="text-sach">info@dscfoundation.org</b> or call us at <b>72780 72784</b></li>
            <li>The shortlisted applicants will need to furnish proof of the information provided in the application form</li>
            <li>The <b>tentative interview dates</b> for the shortlisted candidates will be scheduled between <b>February 17 - March 10, 2020</b></li>
          </ol>
        </div>
      </div>
    </div>


    <div className="container">
      <div className="row early-edu-description py-0">
        <div className="col-md-12">
          <div className="h2">Criteria for short-listing applicants for the interview stage</div>
          <ol className="num-list mt-4">
            <li>50% weightage: <b>Academic Strength</b></li>
            <li>10% weightage: <b>Co-curricular Activities</b></li>
            <li>30% weightage: <b>Essays</b></li>
            <li>10% weightage: <b>Recommendation & Outstanding Merit</b></li>
          </ol>
          <p className="my-5 pb-5">For any further queries please contact us at <b>info@dscfoundation.org</b> or by giving a missed call at <b>72780 72784</b></p>
        </div>
      </div>
    </div></>);
}

export default VijayScholarship;