const initState = {
    isLoading: false,
    otpVerified: true,
}
const SignUpReducer = (state = initState, action) => {
    switch (action?.type) {
        case "GENERATE_OTP_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "GENERATE_OTP_RESPONSE":
            return {
                ...state,
                isError: false,
                isLoading: false,
            };
        case "GENERATE_OTP_FAILED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                data: action?.data
            };
        case "VERIFY_OTP_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "VERIFY_OTP_RESPONSE":
            return {
                ...state,
                isLoading: false,
                otpVerified: true,
                data: action?.data
            };
        case "VERIFY_OTP_FAILED":
            return {
                ...state,
                isLoading: false,
                otpVerified: false,
                data: action?.data
            };
        case "SUBMIT_BASIC_INFO_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "SUBMIT_BASIC_INFO_RESPONSE":
            return {
                ...state,
                isLoading: false,
                data: action?.data
            };
        case "SUBMIT_BASIC_INFO_FAILED":
            return {
                ...state,
                isLoading: false,
                data: action?.data
            };
        case "RESET_SIGNUP_DATA":
            return {
                ...initState
            }
        default:
            return state;
    }
}
export default SignUpReducer;