import axios from "axios";
import { setSessionKeyValue } from "../../utils/util";
import { LOGIN_URL } from "../constants";
export const submitLogin = (data, navigate) => {
  return (dispatch) => {
    dispatch(userLoginRequest());
    axios
      .post(LOGIN_URL, data)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(userLoginRespond(response?.data));
          if (response?.data?.access_token) {
            setSessionKeyValue("auth-token", response?.data?.access_token);
            setSessionKeyValue(
              "userDetails",
              JSON.stringify(response?.data.userDetails)
            );
            if (data.redirectUrl && data.redirectUrl.length > 0) {
              window.location.href = data.redirectUrl
            } else {
              navigate("/");
            }
            return;
          }
        } else {
          dispatch(userLoginFailed(response?.data));
        }
      })
      .catch((err) => {
        dispatch(userLoginFailed(err?.response));
      });
  };
};

export const userLoginRequest = (data) => {
  return {
    type: "LOGIN_REQUESTED",
  };
};

export const userLoginRespond = (data) => {
  return {
    type: "LOGIN_RESPONSE",
    data: data,
  };
};
export const userLoginFailed = (data) => {
  return {
    type: "LOGIN_FAILED",
    data: data,
  };
};

export const resetLoginData = () => {
  return {
    type: "RESET_LOGIN_DATA",
  };
};
