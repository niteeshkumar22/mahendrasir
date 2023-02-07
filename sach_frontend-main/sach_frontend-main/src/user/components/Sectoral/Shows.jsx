import React, { useEffect } from "react";



function Shows() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth"
    // });
    document.querySelector('body').scrollTo(0, 0)
  }, []);

  const style = { width: "207.667px", marginRight: "10px" }
  const videoData = { display: "flex" }

  return (<>
    <section className="categories-inner-hero" >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1">
            <div className="sach-title">
              <h1 className="f-700 fs-40 text-md-start text-center" >Dr.Subhash Chandra show</h1>
              <p className="text-md-start text-center">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="searchbar">
      <div className="container">

        <div className="row">
          <div className="col-md-12">
            <div className="sach-title text-start">
              <h2 className="f-700" >Sub categories</h2>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12 col-lg-12 mt-3 mb-4" >
            <div className="owl-carousel owl-theme custom-owl-nav-1" id="solutionsPills" style={videoData}>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill active">Category-1</span></a>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-2</span></a>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-3</span></a>
              </div>
              <div className="item">
                <a href=""></a><span className="badge bg-light text-dark custom-badge rounded-pill">Category-4</span>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-5</span></a>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-6</span></a>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill active">Category-1</span></a>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-2</span></a>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-3</span></a>
              </div>
              <div className="item">
                <a href=""></a><span className="badge bg-light text-dark custom-badge rounded-pill">Category-4</span>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-5</span></a>
              </div>
              <div className="item">
                <a href=""><span className="badge bg-light text-dark custom-badge rounded-pill">Category-6</span></a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-8">
            <div className="input-group">
              <span className="input-group-text">
                <img src={require('../../../static/user/img/icons/search.svg').default} />
              </span>
              <input type="text" className="form-control" placeholder="Search Topic, categories....." />
              <span className="input-group-text">
                <img src={require('../../../static/user/img/icons/mic.svg').default} />
              </span>
            </div>
          </div>
          <div className="col-auto">
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Language
                <img src={require('../../../static/user/img/icons/dropdown-icon-down.svg').default} /></button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <span className="title dropdown-item">Language</span>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangEnglish" />
                      <label className="form-check-label" for="LangEnglish">English</label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangHindi" />
                      <label className="form-check-label" for="LangHindi">Hindi</label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangTamil" />
                      <label className="form-check-label" for="LangTamil">Tamil</label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangTelugu" />
                      <label className="form-check-label" for="LangTelugu">Telugu</label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-auto">
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Duration
                <img src={require('../../../static/user/img/icons/dropdown-icon-down.svg').default} /></button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <span className="title dropdown-item">Duration</span>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="duration1" />
                      <label className="form-check-label" for="duration1">0-1 hrs <i>(10)</i></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangHindi" />
                      <label className="form-check-label" for="LangHindi">1-3 hrs <i>(3)</i></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangTamil" />
                      <label className="form-check-label" for="LangTamil">3-6 hrs <i>(11)</i></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangTelugu" />
                      <label className="form-check-label" for="LangTelugu">6-9 hrs <i>(23)</i></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangTelugu" />
                      <label className="form-check-label" for="LangTelugu">9-12 hrs <i>(15)</i></label>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown-item">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="LangTelugu" />
                      <label className="form-check-label" for="LangTelugu">12+ hrs <i>(6)</i></label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-auto">
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Sort by
                <img src={require('../../../static/user/img/icons/dropdown-icon-down.svg').default} /></button>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <span className="title dropdown-item">Sort by</span>
                </li>
                <li><a href="#" className="dropdown-item">Most Popular</a></li>
                <li><a href="#" className="dropdown-item">Newest</a></li>
                <li><a href="#" className="dropdown-item">Trending</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="mt-5">
      <div className="container">

        <div className="row">
          <div className="col-lg-6 me-auto col-sm-12">
            <div className="category-title">
              <h5 >Title of the Category</h5>
              <p >In publishing and graphic design, Lorem ipsum is a placeholder text commonly.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-2" >
            <div className="owl-carousel owl-theme categoriesVidoeCard" style={videoData}>

              <div className="item">
                <div className="card category-video">
                  <div className="video-thumb">
                    <img src={require('../../../static/user/img/categories/category-1/img-1.png').default} alt="video-thumb" />
                    <span className="video-play-btn"></span>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">The Living Legend Leads Young Entrepreneurs</h6>
                    <p className="card-text"><span>Dr. Subhash Chandra Show</span><i className="bi bi-circle-fill"></i> 11 mins</p>
                    <p className="info">What is fear?Why do people fear? If these are your questions.this is the right video ....</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="card category-video">
                  <div className="video-thumb">
                    <img src={require('../../../static/user/img/categories/category-1/img-2.png').default} alt="video-thumb" />
                    <span className="video-play-btn"></span>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">Learn from failure, it teaches your better and faster then suc...</h6>
                    <p className="card-text"><span>Dr. Subhash Chandra Show</span><i className="bi bi-circle-fill"></i> 11 mins</p>
                    <p className="info">What is fear?Why do people fear? If these are your questions.this is the right video ....</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="card category-video">
                  <div className="video-thumb">
                    <img src={require('../../../static/user/img/categories/category-1/img-3.png').default} alt="video-thumb" />
                    <span className="video-play-btn"></span>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">How to smartly utilise you time?</h6>
                    <p className="card-text"><span>Dr. Subhash Chandra Show</span><i className="bi bi-circle-fill"></i> 11 mins</p>
                    <p className="info">What is fear?Why do people fear? If these are your questions.this is the right video ....</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>


    <section>
      <div className="container">

        <div className="row">
          <div className="col-lg-12 mb-2" >
            <div className="owl-carousel owl-theme categoriesVidoeCard" style={videoData}>

              <div className="item">
                <div className="card category-video">
                  <div className="video-thumb">
                    <img src={require('../../../static/user/img/categories/category-1/img-4.png').default} alt="video-thumb" />
                    <span className="video-play-btn"></span>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">A village boy from haryana became the indian media tycoon</h6>
                    <p className="card-text"><span>Birth <i className="bi bi-circle-fill"></i> Preganancy</span><i className="bi bi-circle-fill"></i> 11 mins</p>
                    <p className="info">What is fear?Why do people fear? If these are your questions.this is the right video ....</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="card category-video">
                  <div className="video-thumb">
                    <img src={require('../../../static/user/img/categories/category-1/img-5.png').default} alt="video-thumb" />
                    <span className="video-play-btn"></span>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">Mantra for success</h6>
                    <p className="card-text"><span>Birth <i className="bi bi-circle-fill"></i> Preganancy</span><i className="bi bi-circle-fill"></i> 11 mins</p>
                    <p className="info">What is fear?Why do people fear? If these are your questions.this is the right video ....</p>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="card category-video">
                  <div className="video-thumb">
                    <img src={require('../../../static/user/img/categories/category-1/img-6.png').default} alt="video-thumb" />
                    <span className="video-play-btn"></span>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">Are you doing right kind of time management</h6>
                    <p className="card-text"><span>Birth <i className="bi bi-circle-fill"></i> Preganancy</span><i className="bi bi-circle-fill"></i> 11 mins</p>
                    <p className="info">What is fear?Why do people fear? If these are your questions.this is the right video ....</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col-lg-12 text-center">
          <a href="#" className="btn btn-sach bg-sach-dark">Show more</a>
        </div>
      </div>
    </section>


    <section className="topicForm">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">

            <div className="sach-title text-start">
              <h1 className="f-700 fs-40" >Topic <span className="o">Request form</span></h1>
              <p data-aos="zoom-in" data-aos-delay="100">Please let us know the topic on which you want Dr. Subhash Chandra to speak in DSC Show.</p>

              <div className="row" >
                <div className="col-lg-4 col-md-4 col-sm-6 sach-form">
                  <label for="name" className="form-label">Name <small>*</small></label>
                  <input type="text" className="form-control" id="name" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 sach-form">
                  <label for="email" className="form-label">Email address <small>*</small></label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 sach-form">
                  <label for="mobile" className="form-label">Mobile <small>*</small></label>
                  <input type="text" className="form-control" id="mobile" />
                </div>
              </div>

              <div className="row" >
                <div className="col-lg-12 sach-form">
                  <label for="topic" className="form-label">Topic <small>*</small></label>
                  <input type="text" className="form-control" id="topic" />
                </div>
                <div className="col-lg-12 sach-form">
                  <label for="description" className="form-label">Description <small>*</small></label>
                  <textarea className="form-control" id="description" rows="3"></textarea>
                </div>
                <div className="col-lg-12 text-center mt-5">
                  <a href="#" className="btn btn-sach bg-sach-dark btn-sach-lg">Submit</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </>);
}

export default Shows;