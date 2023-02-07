const initState = {
  isLoading: false,
  tableData: [],
  tabsData: [],
  roleData:[],
  activeTab: "",
};
const UserRoleMgmtReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "USER_ROLE_MGMT_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_ROLE_MGMT_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        tableData: data.tableData,
        start: data.start,
      };
    case "USER_ROLE_MGMT_SET_TAB_DATA":
      return {
        ...state,
        isLoading: false,
        tabsData: data.tabsData,
      };
    case "USER_ROLE_MGMT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "USER_ROLE_MGMT_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "ROLE_MGMT_DATA_RESPONSE": 
    return {
      ...state,
      isLoading: false,
      roleData: data,
    }; 
    case "USER_ROLE_MGMT_SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: data,
      };
    default:
      return state;
  }
};
export default UserRoleMgmtReducer;
