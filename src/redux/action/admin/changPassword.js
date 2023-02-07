import axios from "axios";
import { getCurrentUserDetails, logoutSessionForPasswordChange, setSessionKeyValue } from "../../../utils/util";
import { MODIFY_USER_URL, CHANGE_USER_PASSWORD_URL } from "../../constants";
import { handleError } from "../common";
import { handleSuccess } from "./userMgmt";
import { handleForgot } from "./userMgmt";
export const submitChangeUser = (data, navigate) => {
  return (dispatch) => {
    dispatch(passwordChangeRequest());
    axios
      .post(MODIFY_USER_URL, data)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          const userDetails = getCurrentUserDetails();
          userDetails.user[data?.fieldName] = data?.fieldValue;
          if (data?.fieldName === "userProfileUrl") {
            userDetails.user["icon"] = response?.data?.dpUrl;
            setSessionKeyValue("userDetails", JSON.stringify(userDetails));
            navigate(0);
          } else {
            dispatch(passwordChangeRespond(response?.data));
            dispatch(handleSuccess({ ...response.data, message: "User updated!" }));
            setSessionKeyValue("userDetails", JSON.stringify(userDetails));
          }
        } else {
          dispatch(handleError({ ...response?.data, message: "Something went wrong!" }));
        }
      })
      .catch((err) => {
        dispatch(passwordChangeFailed(err?.response));
      });
  };
};
export const submitChangePassword = (data, navigate) => {
  return (dispatch) => {
    dispatch(passwordChangeRequest());
    axios
      .post(data.fieldName === "userPassword" ? CHANGE_USER_PASSWORD_URL : MODIFY_USER_URL, data)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(passwordChangeRespond(response?.data));
          // dispatch(handleSuccess({ ...response.data, message: "User updated!" }));
          dispatch(handleForgot());
          // logoutSessionForPasswordChange(navigate);
        } else {
          dispatch(passwordChangeFailed(response?.data));
        }
      })
      .catch((err) => {
        dispatch(passwordChangeFailed(err?.response));
      });
  };
};
export const passwordChangeRequest = (data) => {
  return {
    type: "CHANGE_PASSWORD_REQUESTED",
  };
};
export const passwordChangeRespond = (data) => {
  return {
    type: "CHANGE_PASSWORD_RESPONSE",
    data: data,
  };
};
export const passwordChangeFailed = (data) => {
  return {
    type: "CHANGE_PASSWORD_FAILED",
    data: data,
  };
};

export const resetPasswordChange = () => {
  return {
    type: "CHANGE_PASSWORD_RESET",
  };
};
