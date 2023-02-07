import axios from "axios";
import { getCommonApiHeader } from "../../../utils/util";

import {
    ADMIN_GET_USER_ROLE_URL,
    ADMIN_GET_ROLE_URL,
    ADMIN_CREATE_ROLE_URL,
    ADMIN_APPLY_PERM_USER_URL,
    ADMIN_GET_USER_ROLE_COUNT_URL,
} from "../../constants";

export const getTabsData = () => {
  return (dispatch, getState) => {
    const { UserRoleMgmtReducer } = getState();
    dispatch(getUserRoleMgmtDataRequest());
    axios
      .get(ADMIN_GET_USER_ROLE_COUNT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response.data && response.data.tabsData) {
          dispatch({
            type: "USER_ROLE_MGMT_SET_TAB_DATA",
            data: response.data,
          });
          dispatch(setActiveTab(response.data.tabsData[0].value));
          dispatch(
            getUserRoleMgmtData({
              type: response.data.tabsData[0].value,
              start: UserRoleMgmtReducer.start,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(userRoleMgmtToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const getUserRoleMgmtData = (data) => {
  return (dispatch, getState) => {
    dispatch(getUserRoleMgmtDataRequest());
    axios
      .get(ADMIN_GET_USER_ROLE_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { type: data.type },
      })
      .then((response) => {
        dispatch(getUserRoleMgmtDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(userRoleMgmtToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const getRoleData = (data) => {
    return (dispatch, getState) => {
      
      axios
        .get(ADMIN_GET_ROLE_URL, {
          headers: {
            ...getCommonApiHeader(),
          },
          params: { ...data },
        })
        .then((response) => {
          dispatch(getRoleMgmtDataRespond(response?.data));
        })
        .catch((err) => {
          dispatch(handleError(err));
        });
    };
  };

  export const getPermUser = (data) => {
    return (dispatch, getState) => {
      dispatch(getUserRoleMgmtDataRequest());
      axios
        .get(ADMIN_GET_PERM_USER_URL, {
          headers: {
            ...getCommonApiHeader(),
          },
          params: { type: data.type },
        })
        .then((response) => {
          // dispatch(getUserRoleMgmtDataRespond(response?.data));
        })
        .catch((err) => {
          dispatch(handleError(err));
        });
    };
  };

  export const handleCreateRole = (data) => {
    return (dispatch, getState) => {
      axios
        .post(ADMIN_CREATE_ROLE_URL, {
          headers: {
            ...getCommonApiHeader(),
          },
          params: {  },
        })
        .then((response) => {
          dispatch(getUserRoleMgmtDataRespond(response?.data));
        })
        .catch((err) => {
          dispatch(handleError(err));
        });
    };
  };

  export const handleApplyPermUser = (data) => {
    return (dispatch, getState) => {
      dispatch(getUserRoleMgmtDataRequest());
      axios
        .post(ADMIN_CREATE_ROLE_URL, {
          headers: {
            ...getCommonApiHeader(),
          },
          data: {...data},
        })
        .then((response) => {
          dispatch(handleSuccess(response));
        })
        .catch((err) => {
          dispatch(handleError(err));
        });
    };
  };

  export const userRoleMgmtToggleLoader = (data) => {
    return {
      type: "USER_ROLE_MGMT_TOGGLE_LOADER",
    };
  };
  
  export const setActiveTab = (data) => {
    return {
      type: "USER_ROLE_MGMT_SET_ACTIVE_TAB",
      data,
    };
  };

export const getUserRoleMgmtDataRequest = (data) => {
  return {
    type: "USER_ROLE_MGMT_DATA_REQUESTED",
  };
};

export const getRoleMgmtDataRespond = (data) => {
  return {
    type: "ROLE_MGMT_DATA_RESPONSE",
    data: data,
  };
};
export const getUserRoleMgmtDataRespond = (data) => {
  return {
    type: "USER_ROLE_MGMT_DATA_RESPONSE",
    data: data,
  };
};
export const handleSuccess= (data) => {
  return {
    type: "SHOW_TOAST",
    data,
    toastType: "success"
  }
};
export const handleError = (error) => {
  return {
    type: "SHOW_TOAST",
    data: error,
    toastType: "error"
  }
};


export const handleAddEditUserRole = (data) => {
  return (dispatch, getState) => {
    axios
    .post(ADMIN_CREATE_ROLE_URL, data, 
      {
        headers: {
          ...getCommonApiHeader(),
        }
      }
    )
      .then((response) => {
        dispatch(getUserRoleMgmtDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};