import { Col, Row } from "antd";
import React, { useRef } from "react";
import { parseHtml } from "../../../../utils/util";
import AdminModal from "../../Common/AdminModal";

const PreviewBlogModal = ({
  handleCancel,
  blogTitle,
  blogBody,
  tableContent,
  thumbnailURL,
  thumbnailBase,
  blogCategory,
  blogSubCategory,
}) => {
  const anchorRef = useRef();
  const cat = blogCategory ? blogCategory.split("-")[1] : null;
  const subCat = blogSubCategory ? blogSubCategory.split("-")[1] : null;

  const handleLinkClick = (e) => {
    // e.stoppropagation();
    const id = e.target.getAttribute("data-id");
    anchorRef.current = e.target;
    if (id) {
      anchorRef?.current.scrollIntoView();
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
            <div>
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

export default PreviewBlogModal;
