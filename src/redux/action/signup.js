import axios from "axios";
import { goToLoginPage, setSessionKeyValue } from "../../utils/util";
import { GENERATE_OTP_URL, VALIDATE_OTP_URL, SUBMIT_BASIC_INFO_URL } from '../constants';

// export const getSignUpTemplate = (data) => {
//     return dispatch => {
//         dispatch(generateOTPRequest());
//         axios
//             .post(GENERATE_OTP_URL, data)
//             .then((response) => {
//                 if (response.status === 201 || response.status === 200) {
//                     dispatch(generateOTPResponse(response?.data));
//                 } else {
//                     dispatch(generateOTPFailed(response?.data));
//                 }

//             });
//     };
// }

export const generateOTPCall = (data) => {
    return dispatch => {
        dispatch(generateOTPRequest());
        axios
            .post(GENERATE_OTP_URL, data)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    dispatch(generateOTPResponse(response?.data));
                } else {
                    dispatch(generateOTPFailed(response?.data));
                }

            }).catch((err) => {
                dispatch(generateOTPFailed(err?.response || err));
            });
    };
}

export const generateOTPRequest = data => {
    return {
        type: "GENERATE_OTP_REQUESTED",
    };
};

export const generateOTPResponse = data => {
    return {
        type: "GENERATE_OTP_RESPONSE",
        data: data,
    };
};
export const generateOTPFailed = data => {
    return {
        type: "GENERATE_OTP_FAILED",
        data: data,
    };
};


export const verifyOTPCall = (data) => {
    return dispatch => {
        dispatch(verifyOTPRequest());
        axios
            .post(VALIDATE_OTP_URL, data)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    if (response?.data?.sachUserId) {
                        setSessionKeyValue('userInfo', JSON.stringify(response?.data));
                        document.getElementById("verified-popup").style.display = 'flex';
                    }
                    dispatch(verifyOTPResponse(response?.data));
                } else {
                    dispatch(verifyOTPFailed(response?.data));
                }

            }).catch((err) => {
                dispatch(verifyOTPFailed(err?.response || err));
            });
    };
}
export const verifyOTPRequest = data => {
    return {
        type: "VERIFY_OTP_REQUESTED",
    };
};

export const verifyOTPResponse = data => {
    return {
        type: "VERIFY_OTP_RESPONSE",
        data: data,
    };
};
export const verifyOTPFailed = data => {
    return {
        type: "VERIFY_OTP_FAILED",
        data: data,
    };
};

export const submitBasicInfo = (data, navigate, pathname) => {
    return dispatch => {
        dispatch(submitBasicInfoRequested());
        axios
            .post(SUBMIT_BASIC_INFO_URL, data)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    dispatch(submitBasicInfoResponse(response?.data));
                    if (response?.data?.redirect) {
                        navigate(`/${response?.data?.redirect}`);
                        return;
                    } else {
                        goToLoginPage(pathname, navigate)
                        return;
                    }
                } else {
                    dispatch(submitBasicInfoFailed(response?.data));
                }

            });
    };
}
export const submitBasicInfoRequested = data => {
    return {
        type: "SUBMIT_BASIC_INFO_REQUESTED",
    };
};

export const submitBasicInfoResponse = data => {
    return {
        type: "SUBMIT_BASIC_INFO_RESPONSE",
        data: data,
    };
};
export const submitBasicInfoFailed = data => {
    return {
        type: "SUBMIT_BASIC_INFO_FAILED",
        data: data,
    };
};

export const resetSignUpData = () => {
    return {
        type: "RESET_SIGNUP_DATA",
    }
}