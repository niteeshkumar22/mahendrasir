import React, { useState } from "react";

const useCategorySearch = ({ categoryData }) => {
  const [searchCatText, setSearchCatText] = useState(null);
  const [filteredCatData, setFilteredCatData] = useState([]);

  const onSearchCategory = (event) => {
    const searchKeys = event.target.value;
    if(searchKeys) {
        setSearchCatText(searchKeys);
        let filteredCategory = _.filter(categoryData, function(item){
            return item.categoryName.toLowerCase().includes(searchKeys.toLowerCase());
          })
          setFilteredCatData(filteredCategory);
    } else {
      setSearchCatText(null);
      setFilteredCatData([]);
    }
  };


  return {
    searchCatText,
    setSearchCatText,
    filteredCatData,
    setFilteredCatData,
    onSearchCategory
  };
};
export default useCategorySearch;
