import axios from "axios";
import { getCommonApiHeader } from "../../utils/util";
import { BASE_URL, GET_ADMIN_INFO } from "../constants";

export const showPopup = (popupType = null, data = {}) => {
  return {
    type: "OPEN_POPUP",
    popupType,
    data,
  };
};

export const resetToast = () => {
  return {
    type: "RESET_TOAST",
  };
};

export const handleCtaPostApi = (cta, callback) => {
  return (dispatch) => {
    axios
      .post(
        BASE_URL + cta.url,
        {
          ...cta.data,
        },
        {
          headers: {
            ...getCommonApiHeader(),
          },
        }
      )
      .then((response) => {
        dispatch(handleSuccess({ ...response.data, message: "Status Changed!" }));
        if (callback) {
          dispatch(callback());
        }
      })
      .catch((err) => {
        dispatch(handleError({ ...err, message: "Something went wrong" }));
      });
  };
};

export const getAdminInfo = (data) => {
  return (dispatch, getState) => {
    axios
      .get(GET_ADMIN_INFO, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        dispatch({
          type: "SET_DATA",
          data: { adminInfo: { ...response.data } },
        });
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const handleSuccess = (data) => {
  return {
    type: "SHOW_TOAST",
    data,
    toastType: "success",
  };
};

export const handleError = (error) => {
  return {
    type: "SHOW_TOAST",
    data: error,
    toastType: "error",
  };
};
