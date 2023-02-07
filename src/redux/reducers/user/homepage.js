

const initState = {
    isLoading: false,
}
const UserHomePageReducer = (state = initState, action) => {
    const data = action.data;
    switch (action?.type) {
        case "USER_CATEGORY_MGMT_DATA_REQUESTED":
        return {
          ...state,
          isLoading: true,
        };
      case "USER_CATEGORY_MGMT_DATA_RESPONSE":
        return {
          ...state,
          isLoading: false,
          categoryData: data,
        };
      case "USER_CATEGORY_MGMT_TOGGLE_LOADER":
        return {
          ...state,
          isLoading: false,
        };
      case "USER_CATEGORY_ERROR":
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      case "USER_CATEGORY_MGMT_SET_COUNT_DATA" :
        return {
          ...state,
          isLoading: false,
          videoCount: data?.totalCount,
        };
      case "USER_CATEGORY_MGMT_SET_DATA": 
        return {
          ...state,
          ...data,
        };
        default:
            return state;
    }
}
export default UserHomePageReducer;


