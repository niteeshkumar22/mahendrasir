import React from "react";
import Philosophy from "../../../static/user/img/about/philosophy.png";
import Presence from "../../../static/user/img/about/presence.png";

function FoundationInner() {
  const style1 = {
    boxShadow: "0 0 -0.75rem 0 var(--rgba-primary-2)",
  };
  return (
    <>
      <section>
        <div className="container">
          <div className="sach-foundation-inner">
            <div className="row">
              <div className="col-md-6 offset-md-1 text-md-start text-center">
                <div className="foundation-title">
                  <h1>
                    Subhash Chandra <span className="text-sach">Foundation</span>
                  </h1>
                  <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying..</p>
                </div>
              </div>
              <div class="col-md-4 position-relative">
                <div class="sach-foundation-heroImg">
                  <div class="heroImg-inner">
                    <img src="https://sach-public-file.s3.ap-south-1.amazonaws.com/DrSubhashChandra.png" alt="Dr. Subhash Chandra" class="img-fluid" />
                    <div class="heroImg-inner-details">
                      <span>Dr. Subhash Chandra</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-11 mx-auto">
              <div className="d-flex align-items-start sach-nav-tabs">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <button className="nav-link active" id="v-pills-ourStory-tab" data-bs-toggle="pill" data-bs-target="#v-pills-ourStory" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true" style={style1}>
                    Our Story
                  </button>
                  <button className="nav-link" id="v-pills-philosophy-tab" data-bs-toggle="pill" data-bs-target="#v-pills-philosophy" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false" style={style1}>
                    Philosophy
                  </button>
                  <button className="nav-link" id="v-pills-presence-tab" data-bs-toggle="pill" data-bs-target="#v-pills-presence" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false" style={style1}>
                    Presence
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-ourStory" role="tabpanel" aria-labelledby="v-pills-ourStory-tab">
                    <h4>Our Story</h4>
                    <h5 className="quotes">The Essel Family Truly Believes That What Comes From The People Must Go Back To Them</h5>
                    <p>A Global leader, Visionary and a Philanthropist - Shri Subhash Chandra is an epitome of a self-made man. He has consistently demonstrated the ability to nurture the nation and elevate it globally through his business ideas and lead them on the path of success.</p>
                    <p>He is a firm believer of “Vasudhaiva Kutumbakam” (which means One World - One Family) and advocates that it is imperative for the citizens of our nation to come together for India's progress towards sustainable development.</p>
                    <p>Shri Subhash ji's vision is to take India to a global stage and to eradicate the challenges faced by the nation at domestic and international level. He has invested in propagating human values and empowering people from all walks of life through several social impact and development initiatives. Capacity building through Subhash Chandra Foundation aims to deliver social impact to the last mile through its strategic interventions.</p>
                    <p>He is a firm believer of “Vasudhaiva Kutumbakam” (which means One World - One Family) and advocates that it is imperative for the citizens of our nation to come together for India's progress towards sustainable development.</p>
                  </div>
                  <div className="tab-pane fade" id="v-pills-philosophy" role="tabpanel" aria-labelledby="v-pills-philosophy-tab">
                    <h4>Our Philosophy</h4>
                    <img src={Philosophy} alt="Our Philosophy" className="img-fluid w-100" />
                    <p>Through the creation of the Subhash Chandra Foundation, Shri Subhash ji is focused on creating & delivering a larger platform with greater impact by offering to the less privileged and the misfortunate, opportunities to fight social and economic inequality thereby giving them the tools to redefine their fortune.</p>
                    <p>The deep social consciousness that comes out of a liberal highly successful entrepreneurial group - the Essel family is using its CSR as well as philanthropic resources committed by Shri Subhash ji through Subhash Chandra Foundation by contributing towards building capacity of the nation in various frontiers.</p>
                  </div>
                  <div className="tab-pane fade" id="v-pills-presence" role="tabpanel" aria-labelledby="v-pills-presence-tab">
                    <h4>Presence</h4>
                    <img src={Presence} alt="Presence" className="img-fluid w-100" />
                    <h5>On-ground partners for research and implementation spread across the country</h5>
                    <p>Through the creation of the Subhash Chandra Foundation, Shri Subhash ji is focused on creating & delivering a larger platform with greater impact by offering to the less privileged and the misfortunate, opportunities to fight social and economic inequality thereby giving them the tools to redefine their fortune.</p>
                    <p>The deep social consciousness that comes out of a liberal highly successful entrepreneurial group - the Essel family is using its CSR as well as philanthropic resources committed by Shri Subhash ji through Subhash Chandra Foundation by contributing towards building capacity of the nation in various frontiers.</p>
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

export default FoundationInner;
