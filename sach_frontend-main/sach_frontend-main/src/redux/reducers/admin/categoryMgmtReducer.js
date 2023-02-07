const initState = {
  isLoading: false,
  tableData: [],
  categoryData: [],
};
const CategoryMgmtReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "CATEGORY_MGMT_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "CATEGORY_MGMT_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        categoryData: data,
      };
    case "CATEGORY_MGMT_VIDEO_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        tableData: data,
      };
    case "CATEGORY_MGMT_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "CATEGORY_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "CATEGORY_MGMT_SET_COUNT_DATA" :
      return {
        ...state,
        isLoading: false,
        videoCount: data?.totalCount,
      };
    case "CATEGORY_MGMT_SET_DATA": 
      return {
        ...state,
        ...data,
      };
    case "USER_CATEGORY_MGMT_VIDEO_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default CategoryMgmtReducer;
