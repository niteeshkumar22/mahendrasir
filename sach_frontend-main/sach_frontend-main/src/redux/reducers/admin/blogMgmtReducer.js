const initState = {
  isLoading: false,
  tableData: [],
  tabsData: [],
  activeTab: "",
  blogDetail: {},
};
const BlogMgmtReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "BLOG_MGMT_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "BLOG_MGMT_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        blogDetail: null,
        ...data
      };
    case "BLOG_MGMT_SET_TAB_DATA":
      return {
        ...state,
        isLoading: false,
        tabsData: data.tabsData,
      };
    case "BLOG_MGMT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "BLOG_MGMT_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "BLOG_MGMT_SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: data,
      };
    case "BLOG_MGMT_SET_BLOG_DETAIL": 
    return {
      ...state,
      isLoading: false,
      blogDetail: data,
    }; 
    case "BLOG_MGMT_SET_DATA":
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};
export default BlogMgmtReducer;
