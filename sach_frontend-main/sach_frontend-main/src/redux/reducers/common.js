const initState = {
  toastData: null,
  toastType: null,
  isUploadLoader: false,
  testData: [],
  showTop3Test: false,
  topVideos: {},
};
const CommonReducer = (state = initState, action) => {
  const data = action.data;
  switch (action?.type) {
    case "OPEN_POPUP":
      return {
        ...state,
        popupType: action?.popupType,
        popupData: action?.data,
      };
    case "SHOW_TOAST":
      return {
        ...state,
        toastType: action?.toastType,
        toastData: action?.data,
      };
    case "RESET_TOAST":
      return {
        ...state,
        toastType: null,
        toastData: null,
      };
    case "TOGGLE_UPLOAD_LOADER":
      return {
        ...state,
        isUploadLoader: action.data,
      };
    case "SET_DATA":
      return {
        ...state,
        ...action?.data,
      };
    case "GET_TOP3_TEST":
      return {
        ...state,
        ...action?.data,
        testData: data,
        showTop3Test: true,
      };
    case "GET_TOP_VIDEOS_HOME":
      return {
        ...state,
        topVideos: data,
      };
    default:
      return state;
  }
};
export default CommonReducer;
