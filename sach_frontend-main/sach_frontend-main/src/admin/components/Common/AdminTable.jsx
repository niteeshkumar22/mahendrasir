import React from "react";
import { Table } from "antd";

const AdminTable = (props) => {
  const { start, total, handlePaginationOnChange } = props;
  const handleOnChange = (page, pageSize) => {
    handlePaginationOnChange && handlePaginationOnChange(page - 1);
  };
  return (
    <Table
      {...props}
      className="table sach-admin-table"
      showSorterTooltip={false}
      scroll={{ x: 600 }}
      pagination={{
        current: start + 1,
        total: total,
        defaultPageSize: 10,
        showSizeChanger: false,
        onChange: handleOnChange,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  );
};
export default AdminTable;
