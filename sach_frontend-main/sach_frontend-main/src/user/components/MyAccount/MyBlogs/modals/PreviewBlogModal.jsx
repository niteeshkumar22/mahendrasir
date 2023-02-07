import { Col, Row } from "antd";
import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import AdminModal from "../../../../../admin/components/Common/AdminModal";
import { getBlogTableContent } from "../../../../../redux/action/admin/blogMgmt";
import { parseHtml } from "../../../../../utils/util";

const PreviewBlogModal = ({
  handleCancel,
  blogTitle,
  blogBody,
  tableContent,
  thumbnailURL,
  thumbnailBase,
  blogCategory,
  blogSubCategory,
  getBlogTableContent
}) => {
  const anchorRef = useRef();
  const cat = blogCategory ? blogCategory.split("-")[1] : null;
  const subCat = blogSubCategory ? blogSubCategory.split("-")[1] : null;

  useEffect(() => {
    getBlogTableContent({ blogBody });
  }, []);
  const handleLinkClick = (e) => {
    // e.stoppropagation();
    const id = e.target.getAttribute("data-id");
    const id1 = document.getElementById(id);
    if (id) {
      id1.scrollIntoView();
    }
  };
  return (
    <AdminModal onCancel={handleCancel} footer={null} width={"90%"}>
      <div className="container-fluid previewBlog">
        <div>
          {cat && <span className="badge rounded-pill bg-primary">{cat}</span>}
          {subCat && (
            <span className="badge rounded-pill bg-primary">{subCat}</span>
          )}
        </div>
        <Row>
          {tableContent && (
            <Col span={6}>
              <div className="blog-table-content">
                <h2>Table of Contents: </h2>
                {tableContent.length > 0 &&
                  tableContent.map((d) => (
                    <div className="content__item" onClick={handleLinkClick}>
                      {parseHtml(d.title)}
                    </div>
                  ))}
              </div>
            </Col>
          )}
          <Col span={18}>
            <div className="preview-blog-wrp">
              {blogTitle && <p style={{ fontSize: "50px" }}>{blogTitle}</p>}
              {thumbnailURL && (
                <img
                  style={{ width: "90%", borderRadius: "6px" }}
                  src={`${thumbnailBase}${thumbnailURL}`}
                />
              )}
              {blogBody.length ? (
                parseHtml(blogBody)
              ) : (
                <p>Nothing to preview</p>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </AdminModal>
  );
};

const mapStateToProps = (state) => {
  const { BlogMgmtReducer } = state;
  const {  blogDetail } = BlogMgmtReducer;
  return {
    tableContent: blogDetail?.tableContent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogTableContent: (data) => dispatch(getBlogTableContent(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewBlogModal);
