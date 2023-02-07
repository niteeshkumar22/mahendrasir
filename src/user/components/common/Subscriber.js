import React from "react";

const Subcriber = () => {
    return ( <>
    <section className="newsletter about-newsletter" >
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="sach-title">
            <h1 className="f-700 fs-40 text-white text-center" >Subscribe to Weekly thoughts by Dr. Subhash Chandra. </h1>
            <p className="text-white text-center" >Join our subscribers list to get weekly videos and thoughts from Dr. Subhash Chandra on diffrent topics, suggestions and solutions.</p>
          </div>
          <div className="row g-3 align-items-center my-md-4 my-2">
            <div className="col-lg-8" >
              <input type="text" id="newsletterEmail" className="form-control p-3 pe-5 transpInput" placeholder="Enter E-mail" />
            </div>
            <div className="col-lg-4 col-sm-12 text-md-start text-center">
              <a href="#" className="btn btn-sach bg-sach w-100 justify-content-center" >Get Started
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g id="Property 1=arrow-right">
                    <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M5 13H16.865L13.232 17.36C12.878 17.784 12.936 18.415 13.36 18.768C13.785 19.122 14.415 19.064 14.769 18.64L19.769 12.64C19.808 12.593 19.827 12.538 19.856 12.486C19.88 12.444 19.909 12.408 19.927 12.362C19.972 12.247 19.999 12.126 19.999 12.004C19.999 12.003 20 12.001 20 12C20 11.999 19.999 11.997 19.999 11.996C19.999 11.874 19.972 11.753 19.927 11.638C19.909 11.592 19.88 11.556 19.856 11.514C19.827 11.462 19.808 11.407 19.769 11.36L14.769 5.36C14.57 5.123 14.286 5 14 5C13.774 5 13.547 5.076 13.36 5.232C12.936 5.585 12.878 6.216 13.232 6.64L16.865 11H5C4.448 11 4 11.448 4 12C4 12.552 4.448 13 5 13Z" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </section>
     </> );
}

export default Subcriber;