const initState = {
  isLoading: false,
  tableData: [],
  tabsData: [],
  activeTab: "",
};
const UserMgmtReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "USER_MGMT_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_MGMT_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        ...data
      };
    case "USER_MGMT_SET_TAB_DATA":
      return {
        ...state,
        isLoading: false,
        tabsData: data.tabsData,
      };
    case "USER_MGMT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "USER_MGMT_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "USER_MGMT_SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: data,
      };
      case "USER_MGMT_SET_DATA":
        return {
          ...state,
          ...data,
        };
    default:
      return state;
  }
};
export default UserMgmtReducer;
