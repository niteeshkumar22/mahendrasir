const initState = {
    isLoading: false,
    dashboardData: [],
    error: null
  };
  const DashboardReducer = (state = initState, action) => {
    const data = action?.data;
    switch (action?.type) {
      case "ADMIN_DASHBOARD_DATA_REQUESTED":
        return {
          ...state,
          isLoading: true,
        };
      case "ADMIN_DASHBOARD_DATA_RESPONSE":
        return {
          ...state,
          isLoading: false,
          dashboardData: data,
        };
      case "ADMIN_DASHBOARD_ERROR":
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      case "ADMIN_DASHBOARD_TOGGLE_LOADER":
        return {
          ...state,
          isLoading: false,
        };
      default:
        return state;
    }
  };
  export default DashboardReducer;
  