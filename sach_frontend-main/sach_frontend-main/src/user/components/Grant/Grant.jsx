import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GrantData } from "./mockData";

function Grant() {
  const style1 = {
    boxShadow: "0 0 -0.75rem 0 var(--rgba-primary-2)",
  };
  const style = {
    backgroundColor: "var(--theme-orange)",
  };
  return (
    <>
      <section className="grant-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Link to="/" className="grant-back-btn">
                <i className="bi bi-chevron-left"></i> Back
              </Link>
              <p className="h6">Partnering for progress</p>
              <p className="h1">Grants</p>
              <p className="para">
                Subhash Chandra Foundation contributes towards diversified
                sectors including arts & cultural heritage, social
                infrastructure and environmental sustainability through grant
                interventions.
              </p>
              <div className="img-container">
                <img
                  src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/hero-img.png"
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-12">
              <div className="sach-nav-tabs grant-nav-tabs">
                <div
                  className="nav nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-tab-1"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-1"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-1"
                    aria-selected="true"
                    style={style1}
                  >
                    Madhav Netralaya
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-tab-2"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-2"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-2"
                    aria-selected="false"
                    style={style1}
                  >
                    Rashtriya Sewa Bharti
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-tab-3"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-3"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-3"
                    aria-selected="false"
                    style={style1}
                  >
                    Pratap Gaurav Kendra Rashtriya Tirth
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-tab-4"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-4"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-4"
                    aria-selected="false"
                    style={style1}
                  >
                    Saat Saath Arts
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-tab-5"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-5"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-5"
                    aria-selected="false"
                    style={style1}
                  >
                    C.C.S Haryana Agricultural University
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-tab-6"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-6"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-6"
                    aria-selected="false"
                    style={style1}
                  >
                    Ekal Vidyalaya
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-tab-7"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-7"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-7"
                    aria-selected="false"
                    style={style1}
                  >
                    Wageningen University & Research
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-tab-8"
                    data-bs-toggle="pill"
                    data-bs-target="#v-tab-8"
                    type="button"
                    role="tab"
                    aria-controls="v-tab-8"
                    aria-selected="false"
                    style={style1}
                  >
                    Sabka Development Association
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-tab-1"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-1"
                  >
                    <div className="h1">Madhav Netralaya</div>
                    <div className="h5">Specialised eye care facility</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-1.png"
                      alt="Grants"
                    />
                    <p>
                      Subhash Chandra Foundation believes that adopting
                      preventive healthcare is a way to healthy lifestyle. The
                      foundation focuses on providing quality healthcare
                      infrastructure to the economically weaker communities, and
                      contribute towards the larger goal of maintaining health
                      and well being in the country. As a step towards this, the
                      foundation supported Madhav Netralaya, a charitable eye
                      care institute and research centre, for expansion and
                      construction of affordable and credible ophthalmic eye
                      care research institute in Central India. This facility
                      will be one of a kind eye care infrastructure in central
                      India with a high tech pathology and research laboratories
                      and an ultra modern eye bank. Madhav Netralaya aims to
                      provide highest international standard quality service to
                      the poorest of poor patient under the guidance of
                      specialized doctors through this project.
                    </p>
                    <a
                      href="https://www.madhavnetralaya.org/"
                      target="_blank"
                      className="btn btn-sach"
                      style={style}
                    >
                      View More
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Property 1=arrow-right">
                          <path
                            id="Icon"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-tab-2"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-2"
                  >
                    <div className="h1">Rashtriya Sewa Bharti</div>
                    <div className="h5">
                      Building training infrastructure for women empowerment
                    </div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-2.png"
                      alt="Grants"
                    />
                    <p>
                      Empowerment continues to be one of the core focus areas
                      for development for Subhash Chandra Foundation. The
                      foundation understands that, developing ways to empower
                      women and providing them an equal opportunity is a key
                      aspect to strengthening gender equality in the nation. In
                      order to support this objective, the foundation
                      contributed towards Rashtriya Sewa Bharti for development
                      of training infrastructure for women centred activities in
                      Delhi. Rashtriya Sewa Bharti is an umbrella organization
                      for 953 affiliated community based organizations across
                      the country. It provides them with a national platform and
                      empowers them through training, research and development.
                      The objective of this project is to develop a training
                      facility cum auditorium for conducting capacity building
                      sessions for Rashtriya Sewa Bharti’s partner
                      organizations. These partners are working on subjects
                      including women empowerment, child welfare, implementation
                      of CSR, skill training and other relevant issues.
                    </p>
                    <a
                      href="http://www.rashtriyasewabharati.org/en"
                      target="_blank"
                      className="btn btn-sach"
                      style={style}
                    >
                      View More
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Property 1=arrow-right">
                          <path
                            id="Icon"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-tab-3"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-3"
                  >
                    <div className="h1">
                      Pratap Gaurav Kendra Rashtriya Tirth
                    </div>
                    <div className="h5">Preserving national heritage</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-3.png"
                      alt="Grants"
                    />
                    <p>
                      The foundation aims to glorify national heritage by
                      providing detailed information about the history of the
                      great leaders of the country. Working towards this, the
                      foundation contributed towards building Pratap Gaurav
                      Kendra Rashtriya Tirth in Udaipur, Rajasthan. Started by
                      Veer Shiromani Maharana Pratap Samiti, this project is an
                      attempt to re-establish the glory of the history and
                      achievements of the king of Mewar Maharana Pratap. This
                      would include a monument dedicated to Maharana Pratap to
                      inspire the youth of the country and art galleries to show
                      case the achievements of the great leader.
                    </p>
                    <a
                      href="https://pratapgauravkendra.org/"
                      target="_blank"
                      className="btn btn-sach"
                      style={style}
                    >
                      View More
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Property 1=arrow-right">
                          <path
                            id="Icon"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-tab-4"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-4"
                  >
                    <div className="h1">Saat Saath Arts</div>
                    <div className="h5">Preserving arts and culture</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-4.png"
                      alt="Grants"
                    />
                    <p>
                      Subhash Chandra Foundation contributed towards
                      conservation and promotion of arts and heritage in the
                      country by supporting an initiative by Saat Saath Arts to
                      lanuch the Sculpture Park at Madhavendra Palace,Nahargarh
                      Fort. ZEE Group became a corporate promoter and sponosored
                      the royal cooridor at the Sculpture Park in Madhavendra
                      Palace, Nahargarh Fort, Jaipur. The sculpture park is
                      designed to work as an economic uplift for cultural
                      development, job creation, education, tourism and growth.
                      It will be used for art and cultural workshops, artists
                      meet and greet sessions, vocational training and
                      interactive sessions.
                    </p>
                    <a
                      href="http://www.saatsaatharts.org/"
                      target="_blank"
                      className="btn btn-sach"
                      style={style}
                    >
                      View More
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Property 1=arrow-right">
                          <path
                            id="Icon"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-tab-5"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-5"
                  >
                    <div className="h1">
                      C.C.S Haryana Agricultural University
                    </div>
                    <div className="h5">
                      Promoting agricultural development and research
                    </div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-5.png"
                      alt="Grants"
                    />
                    <p>
                      The foundation believes that agricultural development is a
                      key contributor to integrated rural development in the
                      country. Amidst other interventions in agricultural
                      development, the foundation has also established a chair
                      in Chaudhary Charan Singh Haryana Agricultural University
                      to undertake focused agricultural research and development
                      in Haryana. Through this collaboration, the foundation
                      aims to work towards farmer welfare program by conducting
                      in depth research on viable technology, food processing
                      and sustainable practices that can contribute to
                      agricultural development.
                    </p>
                    <a
                      href="http://www.hau.ernet.in/"
                      target="_blank"
                      className="btn btn-sach"
                      style={style}
                    >
                      View More
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Property 1=arrow-right">
                          <path
                            id="Icon"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-tab-6"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-6"
                  >
                    <div className="h1">Ekal Vidyalaya</div>
                    <div className="h5">Supporting early child education</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-6.png"
                      alt="Grants"
                    />
                    <p>
                      Subhash Chandra Foundation is dedicated towards the cause
                      of early child education in India. To ensure that every
                      child has access to quality education, the foundation is
                      reaching out to the marginalized communities through Ekal
                      Vidyalaya. Ekal is a grassroot movement taking quality and
                      inclusive education to the remotest parts of the country
                      through One teacher One school model.
                    </p>
                    <p>
                      It takes off from the valuable words of Swami Vivekananda
                      ji - 'If a poor child cannot come to school, the school
                      must come him'. Ekal Vidyalaya uses joyful learning system
                      through non-formal teaching to impart education, and this
                      has led to significant reduction in the drop-out rates
                      among students in schools.
                    </p>
                    <p>
                      Started in 1989, Ekal Abhiyan presently runs 65,177
                      schools across India and 1900 in Nepal. It has so far
                      touched the lives of around 18 lakh children, especially
                      in the Naxal hit areas. And, it envisions of starting
                      1,00,000 schools by 2022. Taking the concept overseas,
                      Ekal has also spread its unique literacy program to ten
                      other countries becoming the largest grass-root NGO
                      literacy movement in the world.
                    </p>
                    <a
                      href="https://www.ekal.org/in"
                      target="_blank"
                      className="btn btn-sach"
                      style={style}
                    >
                      View More
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Property 1=arrow-right">
                          <path
                            id="Icon"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-tab-7"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-7"
                  >
                    <div className="h1">Wageningen University & Research</div>
                    <div className="h5">
                      Realizing accelerated development of the agricultural
                      sector
                    </div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-7.png"
                      alt="Grants"
                    />
                    <p>
                      The foundation has partnered with Wageningen University &
                      Research, Netherlands to undertake a diagnostic research
                      study on agricultural lands in the selected districts of
                      Haryana and Rajasthan in India. Wageningen University &
                      Research is one of the leading universities globally in
                      the space of life sciences, agricultural and environmental
                      sciences.
                    </p>
                    <p>
                      The objective of the study is to identify and assess
                      existing practices in the areas of crop management, water
                      management and waste management and identify potentials,
                      suggest best practices and appropriate technologies which
                      can be implemented and showcased among farmer groups and
                      multi stakeholder groups (including government) for large
                      scale adoption. Through this collaboration, the foundation
                      aims to develop a long term strategy and plan on how to
                      address various challenges faced by farmer community on
                      field, thereby improving the economic and social condition
                      in the agricultural sector.
                    </p>
                    <a
                      href="https://www.wur.nl/"
                      target="_blank"
                      className="btn btn-sach"
                      style={style}
                    >
                      View More
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Property 1=arrow-right">
                          <path
                            id="Icon"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-tab-8"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-8"
                  >
                    <div className="h1">Sabka Development Association</div>
                    <div className="h5">Promoting rural development</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Grant/img-8.png"
                      alt="Grants"
                    />
                    <p>
                      The foundation is working towards integrated rural
                      development of the villages in Hisar district (Haryana)
                      through Sabka Development Association, an enterprise
                      registered under section 8 of the Indian companies act,
                      2013. Sabka Development Association is engaged in overall
                      community and social infrastructure development in the
                      target villages. It has undertaken several initiatives
                      including developing a plan for smart village development,
                      providing access of sustainable energy services, creating
                      awareness on importance of education and healthcare
                      facilities, promoting sustainable agricultural practices
                      and promoting sports among children and youth in the
                      villages.
                    </p>
                    {/* <a href="javascript:void(0);"  className="btn btn-sach"  style={style}>View More
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g id="Property 1=arrow-right">
                      <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" />
                    </g>
                  </svg>
                </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Grant;
