const initState = {
  isLoading: false,
  contactData: [],
  error: null,
};
const ContactReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "Contact_Data_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "Contact_DATA_RESPONSE":
      return {
        ...state,
        contactData: data,
        isLoading: false
      };
    default:
      return state;
  }
};
export default ContactReducer;
