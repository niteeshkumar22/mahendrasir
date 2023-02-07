import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, OnPreviousPage, OnNextPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  // console.log(pagesCount);

  return (
    <nav className="sach-pagination-round">
      <ul className="pagination">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <a className="page-link" onClick={() => OnPreviousPage()}>
            <img src={require("../../../static/user/img/icons/arrow-ios-left.svg").default} alt="Left Arrow"></img>
          </a>
        </li>
        {pages.map((page) => (
          <li className="page-item" key={page}>
            <a className={page === currentPage ? "page-link active" : "page-link"} onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className={currentPage === pagesCount ? "page-item disabled" : "page-item"}>
          <a className="page-link" onClick={() => OnNextPage()}>
            <img src={require("../../../static/user/img/icons/arrow-ios-right.svg").default} alt="Right Arrow"></img>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
