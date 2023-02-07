import axios from "axios";
import {
  ADMIN_GET_BLOG_DETAIL_URL,
  ADMIN_GET_BLOG_DATA_URL,
  ADMIN_PUBLISH_BLOG_URL,
  ADMIN_MODIFY_BLOG_URL,
  ADMIN_GET_BLOG_COUNT_URL,
  ADMIN_GET_BLOG_TABLE_CONTENT_URL,
  ADMIN_UPLOAD_FILE_URL

} from "../../constants";
import { getCommonApiHeader } from "../../../utils/util";

export const getTabsData = () => {
  return (dispatch, getState) => {
    const { BlogMgmtReducer } = getState();
    dispatch(getBlogMgmtDataRequest());
    axios
      .get(ADMIN_GET_BLOG_COUNT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response.data && response.data.tabsData) {
          dispatch({
            type: "BLOG_MGMT_SET_TAB_DATA",
            data: response.data,
          });
          dispatch(setActiveTab(response.data.tabsData[0].value));
          dispatch(
            getBlogMgmtData({
              type: response.data.tabsData[0].value,
              start: BlogMgmtReducer.start,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(blogMgmtToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const getBlogMgmtData = (data) => {
  return (dispatch) => {
    dispatch(getBlogMgmtDataRequest());
    axios
      .get(ADMIN_GET_BLOG_DATA_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data },
      })
      .then((response) => {
        dispatch(getBlogMgmtDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(blogMgmtToggleLoader())
        dispatch(handleError({...err}));
      });
  };
};

export const getBlogDetail = (data) => {
  return (dispatch, getState) => {
    dispatch(getBlogMgmtDataRequest());
    axios
      .get(ADMIN_GET_BLOG_DETAIL_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data },
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: "BLOG_MGMT_SET_BLOG_DETAIL",
            data: response.data,
          });
        }
      })
      .catch((err) => {
        dispatch(blogMgmtToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const getBlogTableContent = (data) => {
  return (dispatch, getState) => {
    const { BlogMgmtReducer } = getState();
    axios
      .post(ADMIN_GET_BLOG_TABLE_CONTENT_URL,
        data,
       { headers: {
          ...getCommonApiHeader(),
        },}
      )
      .then((response) => {
        if (response.data) {
          dispatch({
            type: "BLOG_MGMT_SET_DATA",
            data: {
              blogDetail : {...BlogMgmtReducer.blogDetail ,...response.data}
            },
          });
        }
      })
      .catch((err) => {
        dispatch(blogMgmtToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const modifyBlog = (data) => {
  return (dispatch) => {
    axios
      .post(ADMIN_MODIFY_BLOG_URL,
        data,
       { headers: {
          ...getCommonApiHeader(),
        },}
      )
      .then((response) => {
        if (response.data) {
          dispatch(handleSuccess({...response.data, message: "Posted Successfully!"}));
        }
      })
      .catch((err) => {
        dispatch(blogMgmtToggleLoader())
        dispatch(handleError(err.response.data));
      });
  };
};

export const handlePublishBlog = (data) => {
  return (dispatch) => {
    dispatch(getBlogMgmtDataRequest());
    axios
      .post(
        ADMIN_PUBLISH_BLOG_URL,
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
        dispatch(blogMgmtToggleLoader())
        dispatch(handleSuccess(response.data));
        // reset data 
        dispatch(getBlogMgmtDataRespond({thumbnailURL: null, blogDetail: null }))

        dispatch(getTabsData());
      })
      .catch((err) => {
        dispatch(blogMgmtToggleLoader())
        dispatch(handleError({...err, message: "Something went wrong"}));
      });
  };
};
export const handleUploadFile= (data) => {
  return (dispatch) => {
    axios
      .post(
        ADMIN_UPLOAD_FILE_URL,
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
            ...getCommonApiHeader(),
          },
        }
      )
      .then((response) => {
        if (response && response.data) {
          dispatch({
            type: "BLOG_MGMT_SET_DATA",
            data: { thumbnailURL: response.data.fileName },
          });
          dispatch(handleSuccess({message: response.data.message}));
        }
      })
      .catch((err) => {
        dispatch({
          type: "TOGGLE_UPLOAD_LOADER",
          data: false,
        });
        dispatch(handleError(err.response.data));
      });
  };
};

export const blogMgmtToggleLoader = (data) => {
  return {
    type: "BLOG_MGMT_TOGGLE_LOADER",
  };
};

export const setActiveTab = (data) => {
  return {
    type: "BLOG_MGMT_SET_ACTIVE_TAB",
    data,
  };
};

export const getBlogMgmtDataRequest = (data) => {
  return {
    type: "BLOG_MGMT_DATA_REQUESTED",
  };
};

export const getBlogMgmtDataRespond = (data) => {
  return {
    type: "BLOG_MGMT_DATA_RESPONSE",
    data: data,
  };
};
export const getBlogMgmtSetData= (data) => {
  return {
    type: "BLOG_MGMT_SET_DATA",
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
