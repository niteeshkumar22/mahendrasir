const initState = {
  isLoading: false,
  tableData: [],
  tabsData: [],
  activeTab: "",
};
const TestimonialMgmtReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "TESTIMONIAL_MGMT_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "TESTIMONIAL_MGMT_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        tableData: data.tableData,
        start: data.start,
      };
    case "TESTIMONIAL_MGMT_SET_TAB_DATA":
      return {
        ...state,
        isLoading: false,
        tabsData: data.tabsData,
      };
    case "TESTIMONIAL_MGMT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "TESTIMONIAL_MGMT_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "TESTIMONIAL_MGMT_SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: data,
      };
    default:
      return state;
  }
};
export default TestimonialMgmtReducer;
