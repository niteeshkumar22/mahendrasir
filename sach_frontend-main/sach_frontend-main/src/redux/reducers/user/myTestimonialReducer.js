const initState = {
  isLoading: false,
  tableData: [],
  tabsData: [],
  activeTab: "",
};
const MyTestimonialReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "MY_TESTIMONIAL_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "ALL_TESTIMONIAL_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "MY_TESTIMONIAL_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "MY_TESTIMONIAL_TOGGLE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
    case "MY_TESTIMONIAL_SET_DATA":
      return {
        ...state,
        ...data
      };
    case "MY_TESTIMONIAL_SET_BLOG_DETAIL": 
      return {
        ...state,
        isLoading: false,
        testDetail: data,
      };
    case "ALL_TESTIMONIAL_SET_DATA":
      return {
        ...state,
        isLoading: false,
        allTestimonials: data,
      };
    default:
      return state;
  }
};
export default MyTestimonialReducer;
