import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Agriculture() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    document.querySelector("body").scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="grant-hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Link to="/" className="grant-back-btn">
                <i className="bi bi-chevron-left"></i> Back
              </Link>
              <p className="h6">Towards holistic development of rural india</p>
              <p className="h1">Integrated Rural Development</p>
              <p className="para w-75">
                Subhash Chandra Foundation aims to drive rural India towards the
                road of prosperity through its interventions.
              </p>
              <div className="img-container">
                <img
                  src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/integratedRuralDev.png"
                  alt="Hero Image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-5">
        <div className="row early-edu-description">
          <div className="col-md-12">
            <div className="h1">
              <span>Village </span>
              <span className="text-sach">Development</span>
            </div>
            <div className="para">
              Subhash Chandra Foundation is working to improve the living
              conditions of socially and economically backward communities
              through its Village Development Program. Various strategic
              interventions in the space of education, health, agriculture and
              sports are undertaken to ensure holistic development of villages.
              Some of the key initiatives under health intervention includes
              facilitating development of a government hospital in the targeted
              village and creating awareness among the community on health and
              sanitation issues. Agriculture development also forms an integral
              part of the village development program and, the foundation is
              actively engaged to address agricultural challenges and improve
              agricultural productivity in the targeted villages. The foundation
              also provides organic fertilizers to the farmer community with an
              objective to promote organic farming and sustainable farm
              practices.
            </div>
            <img
              src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/villageDev.png"
              className="img-fluid w-100"
              alt="img"
            />
            <div className="para">
              A total of 161 farmers have been so far associated with this
              sustainable agriculture intervention. The foundation promotes and
              organizes various sports activities in the villages to attract
              children and youth towards the importance of physical fitness.
              Under this initiative, the foundation provides sports training &
              learning opportunity through community volunteers in the villages.
              Close to 500 children participated in the sports excellency
              program organized in the village in Hisar district, Haryana, out
              of which 3 girls from the village were also awarded with silver
              and gold medals in the district and state level tournament. These
              sports activities are changing the perspective of the village
              community towards relevance of sports and also empowering girls to
              come forth to participate in these activities leading to an
              unbiased environment. The foundation is also facilitating the
              development of a sport training center for boxing, kho-kho,
              kabaddi and football to increase the scope of learning
              opportunities for children in the nearby areas.
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row early-edu-description">
          <div className="col-md-12">
            <div className="h1">
              <span>Sustainable </span>
              <span className="text-sach">Agricultural Development</span>
            </div>
            <div className="para">
              Subhash Chandra Foundation aims to support farmer based livelihood
              in villages through aggregation models and farmer associations.
              The intent is to create centres for agricultural diversification,
              thereby enabling forward and backward linkages which will
              contribute to overall agricultural development in villages. With
              an aim to develop a roadmap for agriculture development, the
              foundation organized Krishi Kranti 2018, one day long workshop
              along with Intellecap as knowledge partner with an objective to
              bring together leading practitioners, researchers and policy
              makers to address challenges in agricultural development and
              design solutions that can effectively reach the last mile. The key
              points that surfaced during interaction sessions will form a part
              of future intervention plan for agriculture development for the
              foundation. The foundation has also partnered with leading
              agricultural institutes including Himgiri Zee University,
              Chaudhary Charan Singh Haryana Agricultural University and,
              Wageningen University and Research to undertake research and
              development to develop scientific ways that can help improve the
              overall productivity of farming and agriculture in India.
            </div>
            <img
              src="https://sach-public-file.s3.ap-south-1.amazonaws.com/Sactoral+Focus/SustainableAgriDev.png"
              className="img-fluid w-100"
              alt="img"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Agriculture;
