const initState = {
  adviseTopicData: [],
  error: null,
};
const AdviceTopicReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "Topic_Request_Data_REQUESTED":
      return {
        ...state,
      };
    case "Topic_Request_DATA_RESPONSE":
      return {
        ...state,
        adviseTopicData: data,
      };
    case "Topic_Request_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default AdviceTopicReducer;
