import React, { useEffect, useState } from "react";

const useTableInit = ({ tableData, searchKeys = [] }) => {
  const [searchText, setSearchText] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setSearchText(null);
  }, [tableData]);

  const onSearchChange = (e) => {
    let currValue = e.target.value;
    if (currValue) {
      setSearchText(currValue);
      currValue = currValue.toLowerCase();
      const filteredData = tableData.filter((data) => {
        for(let i = 0; i< searchKeys.length; i++) {
          const key = searchKeys[i];
          if (data[key] && data[key].toLowerCase().includes(currValue)) {
            return true;
          }
        };
        return false;
      });
      setFilteredData(filteredData);
    } else {
      setSearchText(null);
      setFilteredData([]);
    }
  };

  return {
    searchText,
    setSearchText,
    filteredData,
    setFilteredData,
    onSearchChange
  };
};
export default useTableInit;
