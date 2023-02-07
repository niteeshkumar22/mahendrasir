import axios from "axios";
import {
  USER_GET_BLOG_DETAIL_URL,
  USER_GET_BLOG_DATA_URL,
  USER_PUBLISH_BLOG_URL,
  USER_MODIFY_BLOG_URL,
  USER_GET_BLOG_COUNT_URL,
  USER_GET_BLOG_TABLE_CONTENT_URL,
  ADMIN_UPLOAD_FILE_URL,
  USER_GET_RELATED_BLOG_URL

} from "../../constants";
import { getCommonApiHeader, getCurrentUserDetails } from "../../../utils/util";

export const getTabsData = () => {
  return (dispatch, getState) => {
    const { MyBlogsReducer,  } = getState();
    const userDetails = getCurrentUserDetails();
    dispatch(getMyBlogsDataRequest());
    axios
      .get(USER_GET_BLOG_COUNT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: {
          userId: userDetails?.user?.sachUserId
        }
      })
      .then((response) => {
        if (response.data && response.data.tabsData) {
          dispatch({
            type: "MY_BLOGS_SET_TAB_DATA",
            data: response.data,
          });
          dispatch(setActiveTab(response.data.tabsData[0].value));
          dispatch(
            getMyBlogsData({
              type: response.data.tabsData[0].value,
              start: MyBlogsReducer.start,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(myBlogsToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const getMyBlogsData = (data) => {
  return (dispatch) => {
    const userDetails = getCurrentUserDetails();
    dispatch(getMyBlogsDataRequest());
    axios
      .get(USER_GET_BLOG_DATA_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data, userId: userDetails?.user?.sachUserId},
      })
      .then((response) => {
        dispatch(getMyBlogsDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(myBlogsToggleLoader())
        dispatch(handleError({...err}));
      });
  };
};

export const getBlogDetail = (data) => {
  return (dispatch, getState) => {
    const userDetails = getCurrentUserDetails();
    dispatch(getMyBlogsDataRequest());
    axios
      .get(USER_GET_BLOG_DETAIL_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data,  userId: userDetails?.user?.sachUserId },
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: "MY_BLOGS_SET_BLOG_DETAIL",
            data: response.data,
          });
        }
      })
      .catch((err) => {
        dispatch(myBlogsToggleLoader())
        dispatch(handleError(err));
      });
  };
};
export const getRelatedBlogs = (data) => {
  return (dispatch, getState) => {
  axios
  .get(USER_GET_RELATED_BLOG_URL, {
    headers: {
      ...getCommonApiHeader(),
    },
    params: { ...data},
  })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: "MY_BLOGS_SET_RELATED_BLOG_DETAIL",
          data: response.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

export const getBlogTableContent = (data) => {
  return (dispatch, getState) => {
    const { MyBlogsReducer } = getState();
    const userDetails = getCurrentUserDetails();
    axios
      .post(USER_GET_BLOG_TABLE_CONTENT_URL,
        {...data,  userId: userDetails?.user?.sachUserId},
       { headers: {
          ...getCommonApiHeader(),
        },}
      )
      .then((response) => {
        if (response.data) {
          dispatch({
            type: "MY_BLOGS_SET_DATA",
            data: {
              blogDetail : {...MyBlogsReducer.blogDetail ,...response.data}
            },
          });
        }
      })
      .catch((err) => {
        dispatch(myBlogsToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const modifyBlog = (data) => {
  return (dispatch) => {
    const userDetails = getCurrentUserDetails();
    axios
      .post(USER_MODIFY_BLOG_URL,
        {...data,  userId: userDetails?.user?.sachUserId},
       { headers: {
          ...getCommonApiHeader(),
        },}
      )
      .then((response) => {
        if (response.data) {
          dispatch(handleSuccess({...response, message: "Status Changed!"}));
        }
      })
      .catch((err) => {
        dispatch(myBlogsToggleLoader())
        dispatch(handleError(err));
      });
  };
};

export const handlePublishBlog = (data) => {
  return (dispatch) => {
    const userDetails = getCurrentUserDetails();
    dispatch(getMyBlogsDataRequest());
    axios
      .post(
        USER_PUBLISH_BLOG_URL,
        {
          ...data,  userId: userDetails?.user?.sachUserId
        },
        {
          headers: {
            ...getCommonApiHeader(),
          },
        }
      )
      .then((response) => {
        dispatch(myBlogsToggleLoader())
        dispatch(handleSuccess(response.data));
        // fetch new data again
        dispatch(getTabsData());
      })
      .catch((err) => {
        dispatch(myBlogsToggleLoader())
        dispatch(handleError(err?.response?.data));
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
            type: "MY_BLOGS_SET_DATA",
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
export const getMyBlogsSetData= (data) => {
  return {
    type: "MY_BLOG_SET_DATA",
    data,
  };
};
export const myBlogsToggleLoader = (data) => {
  return {
    type: "MY_BLOGS_TOGGLE_LOADER",
  };
};

export const setActiveTab = (data) => {
  return {
    type: "MY_BLOGS_SET_ACTIVE_TAB",
    data,
  };
};

export const getMyBlogsDataRequest = (data) => {
  return {
    type: "MY_BLOGS_DATA_REQUESTED",
  };
};

export const getMyBlogsDataRespond = (data) => {
  return {
    type: "MY_BLOGS_DATA_RESPONSE",
    data: data,
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
