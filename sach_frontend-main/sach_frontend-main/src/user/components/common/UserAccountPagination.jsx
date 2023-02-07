import { Pagination } from "antd";
import React from "react";

const UserAccountPagination = ({ start, total, handlePaginationOnChange }) => {
  const handleOnChange = (page, pageSize) => {
    console.log("page, pageSize: ", page, pageSize);
    handlePaginationOnChange && handlePaginationOnChange(page - 1);
  };
  return (
    total > 0 && <Pagination
      style={{textAlign: "right"}}
      current={start + 1}
      total={total}
      defaultPageSize={10}
      showSizeChanger={false}
      onChange={handleOnChange}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
    />
  );
};
export default UserAccountPagination;
