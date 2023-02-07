import axios from "axios";
import {
  ADMIN_GET_EVENT_COUNT_URL,
  ADMIN_GET_EVENT_URL,
  ADMIN_CREATE_EVENT_URL,
  ADMIN_GET_EVENT_BY_ID_URL,
  ADMIN_MODIFY_EVENT_URL,
  ADMIN_GENERATE_EVENT_URL,
  ADMIN_UPLOAD_FILE_URL,
} from "../../constants";
import { getCommonApiHeader, getCurrentUserDetails } from "../../../utils/util";
export const getTabsData = (data) => {
  return (dispatch, getState) => {
    const { EventMgmtReducer } = getState();
    const userDetails = getCurrentUserDetails();
    dispatch(getEventMgmtDataRequest());
    axios
      .get(ADMIN_GET_EVENT_COUNT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: {
          userId: userDetails?.user?.sachUserId,
          wishOrRegister: data?.wishOrRegister,
          page:data?.page,
        }  
      })  
      .then((response) => {
        if (response.data && response.data.tabsData) {
          dispatch(eventMgmtToggleLoader());
          dispatch({
            type: "EVENT_MGMT_SET_TAB_DATA",
            data: response.data,
          });
          let tabEnableType
          //if(data?.activeTab == 'event' && response.data.tabsData.length>1){
            //tabEnableType = response.data.tabsData[1].value
            //dispatch(setActiveTab(tabEnableType));
          //}else{
            tabEnableType = response.data.tabsData[0].value
            dispatch(setActiveTab(tabEnableType));
          //}
          dispatch(
            getEventMgmtData({
              type: tabEnableType,
              start: EventMgmtReducer.start,
              wishOrRegister: data?.wishOrRegister,
              page:data?.page
            })
          );
        }
      })
      .catch((err) => {
        dispatch(handleError({ ...err, message: "Failed to fetch tabs data" }));
      });
  };
};

export const getEventMgmtData = (data) => {
  return (dispatch, getState) => {
    dispatch(getEventMgmtDataRequest());
    const userDetails = getCurrentUserDetails();
    axios
      .get(ADMIN_GET_EVENT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data,     
              userId: userDetails?.user?.sachUserId,
          wishOrRegister: data.wishOrRegister
 },
  
      })
      .then((response) => {
        dispatch(getEventMgmtDataRespond(response?.data));
      })
      .catch((err) => { 
        console.error(err);
        dispatch(handleError({ ...err, message: "Failed to fetch data" }));
      });
  };
};

export const getEventDetail = (data) => {
  return (dispatch) => {
    dispatch(getEventMgmtDataRequest());
    axios
      .get(ADMIN_GET_EVENT_BY_ID_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data },
      })
      .then((response) => {
        if (response && response.data) {
          const { data } = response;
          // add meeting links in reducer
          let meetingLink = {};
          if (data.eventModeUrl && data.eventModeUrl.length > 0) {
            data.eventModeUrl.forEach((d) => {
              const linkKey = `${d.type}Link`;
              meetingLink[linkKey] = d.url;
            });
          }
          dispatch(
            getEventMgmtDataRespond({
              eventDetail: response?.data,
              ...meetingLink,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(eventMgmtToggleLoader());
        dispatch(handleError(err));
      });
  };
};

export const handleCreateEvent = (data) => {
  return (dispatch, getState) => {
    dispatch(getEventMgmtDataRequest());
    axios
      .post(
        ADMIN_CREATE_EVENT_URL,
        { ...data },
        {
          headers: {
            ...getCommonApiHeader(),
          },
        }
      )
      .then((response) => {
        dispatch(eventMgmtToggleLoader());
        dispatch(
          handleSuccess({ ...response, message: "Event created successfully!" })
        );
        dispatch(getTabsData());
      })
      .catch((err) => {
        dispatch(eventMgmtToggleLoader());
        dispatch(handleError({ ...err, message: "Event creation failed!" }));
      });
  };
};
export const handleGenerateEvent = (data) => {
  return (dispatch) => {
    dispatch({
      type: "TOGGLE_UPLOAD_LOADER",
      data: true,
    });
    axios
      .post(
        ADMIN_GENERATE_EVENT_URL,
        { ...data },
        {
          headers: {
            ...getCommonApiHeader(),
          },
        }
      )
      .then((response) => {
        dispatch({
          type: "TOGGLE_UPLOAD_LOADER",
          data: false,
        });
        if (response && response.data) {
          const key = `${data.type}Link`;
          dispatch({
            type: "EVENT_MGMT_SET_DATA",
            data: { [key]: response.data.link },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "TOGGLE_UPLOAD_LOADER",
          data: false,
        });
        dispatch(
          handleError({ ...err, message: "Failed to create meeting link" })
        );
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
            type: "EVENT_MGMT_SET_DATA",
            data: { thumbnailURL: response.data.fileName },
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

export const resetKey = (val) => {
  return (dispatch) => {
    dispatch({
      type: "EVENT_MGMT_SET_DATA",
      data: { ...val },
    });
  };
};

export const eventMgmtToggleLoader = (data) => {
  return {
    type: "EVENT_MGMT_TOGGLE_LOADER",
  };
};

export const setActiveTab = (data) => {
  return {
    type: "EVENT_MGMT_SET_ACTIVE_TAB",
    data,
  };
};

export const getEventMgmtDataRequest = (data) => {
  return {
    type: "EVENT_MGMT_DATA_REQUESTED",
  };
};

export const getEventMgmtDataRespond = (data) => {
  return {
    type: "EVENT_MGMT_DATA_RESPONSE",
    data,
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
