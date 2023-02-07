const initState = {
    isLoading: false
}
const ChangePasswordReducer = (state = initState, action) => {
    const data = action?.data;
    switch (action?.type) {
        case "CHANGE_PASSWORD_REQUESTED":
            return {
                ...state,
                isLoading: true,
            };
        case "CHANGE_PASSWORD_RESPONSE":
            return {
                ...state,
                isLoading: false,
                popUpShow:true,
                changePasswordData: data,
            };
        case "CHANGE_PASSWORD_FAILED":
            return {
                ...state,
                isLoading: false,
                isChangePasswordFailed: true,
                changePasswordData: data?.data,
            };
        case "CHANGE_PASSWORD_RESET":
            return {
                ...initState
            }
        default:
            return state;
    }
}
export default ChangePasswordReducer;