const initState = {
  isLoading: false,
  tableData: [],
  tabsData: [],
  activeTab: "",
};
const MyBlogReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "MY_BLOGS_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "MY_BLOGS_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        blogDetail: null,
        ...data
      };
    case "MY_BLOGS_SET_TAB_DATA":
      return {
        ...state,
        isLoading: false,
        tabsData: data.tabsData,
      };
    case "MY_BLOGS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "MY_BLOGS_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "MY_BLOGS_SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: data,
      };
    case "MY_BLOGS_SET_BLOG_DETAIL": 
    return {
      ...state,
      isLoading: false,
      blogDetail: data,
    }; 
    case "MY_BLOGS_SET_RELATED_BLOG_DETAIL":
      return {
        ...state,
        relatedPost: data,
      };
    case "MY_BLOGS_SET_DATA":
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};
export default MyBlogReducer;
