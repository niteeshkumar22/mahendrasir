const initState = {
    isLoading: false
}
const LoginReducer = (state = initState, action) => {
    const data = action?.data;
    switch (action?.type) {
        case "LOGIN_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "LOGIN_RESPONSE":
            return {
                ...state,
                isLoading: false,
                loginData: data,
            };
        case "LOGIN_FAILED":
            return {
                ...state,
                isLoading: false,
                isLoginFailed: true,
                loginData: data?.data,
            };
        case "RESET_LOGIN_DATA":
            return {
                ...initState
            }
        default:
            return state;
    }
}
export default LoginReducer;