import axios from "axios";
import { ADMIN_GET_USERS_URL, ADMIN_GET_USER_COUNT_URL, ADMIN_GET_VIEW_DETAIL_URL, ADMIN_INVITE_USER_URL, ADMIN_UPLOAD_FILE_URL } from "../../constants";
import { getCommonApiHeader } from "../../../utils/util";

export const getTabsData = () => {
  return (dispatch, getState) => {
    const { UserMgmtReducer } = getState();
    dispatch(getUserMgmtDataRequest());
    axios
      .get(ADMIN_GET_USER_COUNT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response.data && response.data.tabsData) {
          dispatch({
            type: "USER_MGMT_SET_TAB_DATA",
            data: response.data,
          });
          dispatch(setActiveTab(response.data.tabsData[0].value));
          dispatch(
            getUserMgmtData({
              type: response.data.tabsData[0].value,
              start: UserMgmtReducer.start,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(userMgmtToggleLoader());
        dispatch(handleError(err));
      });
  };
};

export const getUserMgmtData = (data) => {
  return (dispatch) => {
    dispatch(getUserMgmtDataRequest());
    axios
      .get(ADMIN_GET_USERS_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data },
      })
      .then((response) => {
        dispatch(getUserMgmtDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(userMgmtToggleLoader());
        dispatch(handleError({ ...err }));
      });
  };
};

export const getViewDetail = (data) => {
  return (dispatch) => {
    dispatch(getUserMgmtDataRequest());
    axios
      .get(ADMIN_GET_VIEW_DETAIL_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data },
      })
      .then((response) => {
        dispatch(getUserMgmtDataRespond({ viewDetail: response?.data }));
      })
      .catch((err) => {
        dispatch(userMgmtToggleLoader());
        dispatch(handleError(err));
      });
  };
};

export const handleInviteUser = (data) => {
  return (dispatch) => {
    dispatch(getUserMgmtDataRequest());
    axios
      .post(
        ADMIN_INVITE_USER_URL,
        {
          ...data,
        },
        {
          headers: {
            ...getCommonApiHeader(),
          },
        }
      )
      .then((response) => {
        dispatch(userMgmtToggleLoader());
        dispatch(handleSuccess({ ...response, message: "Successfully Uploaded!" }));
        // fetch new data again
        dispatch(getTabsData());
      })
      .catch((err) => {
        dispatch(userMgmtToggleLoader());
        dispatch(handleError(err.response.data));
      });
  };
};

export const handleUploadFile = (data) => {
  return (dispatch) => {
    axios
      .post(ADMIN_UPLOAD_FILE_URL, data, {
        headers: {
          "content-type": "multipart/form-data",
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response && response.data) {
          dispatch({
            type: "USER_MGMT_SET_DATA",
            data: { avatarURL: response.data.fileName },
          });
          dispatch(handleSuccess({ message: response.data.message }));
        }
      })
      .catch((err) => {
        dispatch({
          type: "TOGGLE_UPLOAD_LOADER",
          data: false,
        });
        dispatch(handleError(err));
      });
  };
};

export const userMgmtToggleLoader = (data) => {
  return {
    type: "USER_MGMT_TOGGLE_LOADER",
  };
};

export const setActiveTab = (data) => {
  return {
    type: "USER_MGMT_SET_ACTIVE_TAB",
    data,
  };
};

export const getUserMgmtDataRequest = (data) => {
  return {
    type: "USER_MGMT_DATA_REQUESTED",
  };
};

export const getUserMgmtDataRespond = (data) => {
  return {
    type: "USER_MGMT_DATA_RESPONSE",
    data: data,
  };
};
export const handleSuccess = (data) => {
  return {
    type: "SHOW_TOAST",
    data,
    toastType: "success",
    passwordChanged: true,
  };
};
export const handleError = (error) => {
  return {
    type: "SHOW_TOAST",
    data: error,
    toastType: "error",
  };
};

export const handleForgot = () => {
  return {
    type: "SHOW_TOAST",
    data: true,
    toastType: "password",
  };
};
