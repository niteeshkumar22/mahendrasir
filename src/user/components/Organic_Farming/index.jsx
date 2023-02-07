import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function OrganicFarming() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const style = {
    boxShadow: "0 0 -0.75rem 0 var(--rgba-primary-2)",
  };
  const style1 = {
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
              {/* <p className="h6">Comming Soon</p> */}
              <p className="h1">
                Agro Atmanirbhar Farmers
                <br />
                Producer Co. Ltd.
              </p>
              <p className="para">
                Organic farming in India is gaining popularity day by day. One
                can get organic certification by strictly following organic
                farming methods. Organic produces have great market value and
                demand. Learn what is organic farming and how you can convert
                your land into a certified organic farm.
              </p>
              <div className="img-container">
                <img
                  src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Organic+Farming/hero-img.png"
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
                    style={style}
                  >
                    Vermicompost
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
                    style={style}
                  >
                    Organic Manure
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
                    style={style}
                  >
                    Concept of Organic Farming
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
                    style={style}
                  >
                    Silent Features of Organic Farming
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
                    style={style}
                  >
                    Regulatory Body and Organic Certification
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
                    style={style}
                  >
                    Organic Farm Management
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-tab-1"
                    role="tabpanel"
                    aria-labelledby="v-pills-tab-1"
                  >
                    <div className="h1">Vermicompost</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Organic+Farming/img-1.png"
                      alt="Grants"
                    />
                    <p>
                      Biologically, it is defined as the process of turning
                      organic debris into worm castings that play a crucial role
                      in increasing the fertility of soil. These castings
                      contain seven times more potash, five times more nitrogen
                      and 1.5 times more calcium than what is found in the
                      topsoil. In addition they have better moisture retention
                      capacity, aeration, porosity and structure than the
                      topsoil. The water absorption capacity of the soil is
                      enhanced thanks to the burrowing action of the earthworm,
                      and the organic content in the castings. Research has
                      shown the castings to hold nine times their weight in
                      water.
                    </p>
                    <a
                      href="https://www.madhavnetralaya.org"
                      target="_blank"
                      className="btn btn-sach"
                      style={style1}
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
                    <div className="h1">Organic Manure</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Organic+Farming/img-2.png"
                      alt="Grants"
                    />
                    <p>
                      They contain nutrients in small quantities. Hence they are
                      applied in large quantities to the fields. They are of
                      different types but farmyard manure, green manure and
                      compost are the most commonly used forms of bulky organic
                      manure. The advantages of using bulky manure as below:
                      Increase nutrient availability in soil. Act as a medium
                      for plants to absorb nutrients from soil including
                      micronutrients. Improve the physical properties of soil
                      like its porosity, structure, water holding capacity, etc.
                      Since the microbial balance in the soil is altered it
                      indirectly controls the fungi and nematodes present in
                      soil.
                    </p>
                    <a
                      href="http://www.rashtriyasewabharati.org"
                      target="_blank"
                      className="btn btn-sach"
                      style={style1}
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
                    <div className="h1">Concept of Organic Farming</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Organic+Farming/img-3.png"
                      alt="Grants"
                    />
                    <p>
                      Organic farming is a very native concept to India. It is
                      based on the following principles:
                    </p>
                    <p>Soil is a living entity.</p>
                    <p>
                      Nature is the best teacher for farming since it does not
                      use any external nutrients or additional water. Organic
                      farming is based on understanding the ways of nature. It
                      does not mine the soil of its nutrients nor does it
                      degrade the soil for fulfilling the needs of the common
                      man.
                    </p>
                    <p>
                      The living population of the soil is protected and
                      nurtures. The natural micro-organisms in soil are not
                      harmed in any way.
                    </p>
                    <p>
                      The focus in organic farming is the soil itself. The
                      health of the soil and its structure is maintained as it
                      is believed to the most important medium.
                    </p>
                    <p>
                      Thus organic farming is a system of farming that aims at
                      keeping the soil alive, maintaining its good health,
                      cultivating the land and then raising the crops. This must
                      be done to maintain a pollution-free environment and in an
                      ecological manner.
                    </p>
                    <a
                      href="https://pratapgauravkendra.org"
                      target="_blank"
                      className="btn btn-sach"
                      style={style1}
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
                    <div className="h1">Silent Features of Organic Farming</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Organic+Farming/img-4.png"
                      alt="Grants"
                    />
                    <div>
                      <b>
                        Some of the salient features of organic farming include:
                      </b>
                      <ul>
                        <li>Protecting soil fertility</li>
                        <li>Maintaining the level of organic matter</li>
                        <li>Encouraging biological activity in soils</li>
                        <li>
                          Providing nutrients through the microbial action
                        </li>
                        <li>
                          Using legumes to fulfill the nitrogen requirements of
                          the soil.
                        </li>
                        <li>
                          Recycling organic matter like crop residues and
                          manures
                        </li>
                        <li>
                          Managing diseases, pests and weeds through the use of
                          techniques like natural predators, organic manuring,
                          crop rotation, maintaining diversity, growing
                          resistant varieties, etc.
                        </li>
                        <li>
                          Effective livestock management by paying special
                          attention to their nutrient requirements, housing,
                          breeding, rearing, etc.
                        </li>
                      </ul>
                    </div>
                    <a
                      href="http://www.hau.ernet.in"
                      target="_blank"
                      className="btn btn-sach"
                      style={style1}
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
                      Regulatory Body and Organic Certification
                    </div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Organic+Farming/img-5.png"
                      alt="Grants"
                    />
                    <div>
                      <ul>
                        <li>
                          Since India has traditionally been practicing organic
                          farming, there is a regulatory body that ensures
                          quality.
                        </li>
                        <li>
                          National Program on Organic Production (NPOP) is the
                          authority defining the regulatory mechanism. They have
                          two different bodies for regulation in the domestic
                          and export markets.
                        </li>
                        <li>
                          Under Foreign Trade Development Regulation Act, NPOP
                          looks after the export requirements.
                        </li>
                        <li>
                          Under Agriculture Produce Grading, Marking and
                          Certification Act, it looks after the domestic market
                          and imports.
                        </li>
                        <li>
                          Agricultural and Processed Foods Export Development
                          Authority (APEDA) is a regulatory body of NPOP as per
                          FTDR Act. It is also the Agriculture Marketing
                          Advisory under Agricultural Ministry.
                        </li>
                      </ul>
                    </div>
                    <a
                      href="https://www.ekal.org"
                      target="_blank"
                      className="btn btn-sach"
                      style={style1}
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
                    <div className="h1">Organic Farm Management</div>
                    <img
                      src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Organic+Farming/img-6.png"
                      alt="Grants"
                    />
                    <p>
                      Since the entire concept of organic farming revolves
                      around a healthy, living soil crop residue management,
                      effective crop rotation, proper cropping patterns etc.
                      must be practiced carefully. This ensures optimum
                      productivity without any fertility loss. In addition,
                      organic systems also respect the natural ecology of the
                      area such as the weather, flora and fauna of the place,
                      the native animals there etc.
                    </p>
                    <b>
                      One of the first steps in organic farming is to understand
                      the area and basic requirements following which the long
                      term strategies must be addressed. Some of the problems
                      faced by the country are:
                    </b>
                    <div>
                      <ul>
                        <li>
                          Poor soil health due to loss of organic matter and
                          soil microbes.
                        </li>
                        <li>Increased temperatur</li>
                        <li>Reduced water supply</li>
                        <li>Costly high inputs as opposed to lower returns.</li>
                      </ul>
                    </div>
                    <a
                      href="https://www.wur.nl"
                      target="_blank"
                      className="btn btn-sach"
                      style={style1}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrganicFarming;
