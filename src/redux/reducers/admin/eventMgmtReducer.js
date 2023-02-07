const initState = {
  isLoading: false,
  tableData: [],
  tabsData: [],
  activeTab: "",
};
const EventMgmtReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "EVENT_MGMT_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "EVENT_MGMT_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        ...data
      };
    case "EVENT_MGMT_SET_TAB_DATA":
      return {
        ...state,
        isLoading: false,
        tabsData: data.tabsData,
      };
    case "EVENT_MGMT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "EVENT_MGMT_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "EVENT_MGMT_SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: data,
      };
    case "EVENT_MGMT_SET_DATA":
      return {
        ...state,
        ...data,
      };
    default:
      return state;
  }
};
export default EventMgmtReducer;
