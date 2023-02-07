import axios from "axios";
import { getCommonApiHeader } from "../../../utils/util";
import { ADMIN_GET_CATEGORY_VIDEO_URL, ADMIN_GET_CATEGORY_URL, USER_GET_CATEGORY_VIDEO_URL, 
  USER_GET_CATEGORY_VIDEO_BY_ID_URL, USER_GET_CATEGORY_All_DATA, USER_GET_CATEGORY_VIDEO_COMMENTS ,
  USER_POST_CATEGORY_VIDEO_COMMENTS, USER_POST_CATEGORY_COMMENTS_REPLY } from "../../constants";


export const getUserCategoryData = (data) => {
  return (dispatch, getState) => {
    dispatch(getCategoryDataRequest());
    let url = ADMIN_GET_CATEGORY_URL ;
    axios
      .get(url, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data},
      })
      .then((response) => {
        dispatch(getCategoryDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(handleError({...err,  message: "Failed to fetch data"}));
      });
  };
};

export const getEachCategoryData = (data) => {
    return (dispatch, getState) => {
      dispatch(getCatVideoDataRequest());
      axios
        .get(USER_GET_CATEGORY_VIDEO_URL, {
          headers: {
            ...getCommonApiHeader(),
          },
          params: { ...data },
        })
        .then((response) => {
          dispatch(getCatVideoDataRespond(response?.data));
        })
        .catch((err) => {
          dispatch(handleError({...err,  message: "Failed to fetch data"}));
        });
    };
  };

  export const getEachVideoData = (data) => {
    return (dispatch, getState) => {
      dispatch(getCatVideoDataRequest());
      axios
        .get(USER_GET_CATEGORY_VIDEO_BY_ID_URL, {
          headers: {
            ...getCommonApiHeader(),
          },
          params: { ...data },
        })
        .then((response) => {
          dispatch(getEachVideoDataRespond(response?.data));
        })
        .catch((err) => {
          dispatch(handleError({...err,  message: "Failed to fetch data"}));
        });
    };
  };

  export const getCategoryAllData = (data) => {
    return (dispatch, getState) => {
      dispatch(getCatVideoDataRequest());
      axios
        .get(USER_GET_CATEGORY_All_DATA, {
          headers: {
            ...getCommonApiHeader(),
          },
          params: { ...data },
        })
        .then((response) => {
          dispatch(getCategoryAllDataResponse(response?.data));
        })
        .catch((err) => {
          dispatch(handleError({...err,  message: "Failed to fetch data"}));
        });
    };
  };

  export const getVideoLikeComments = (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: "USER_CATEGORY_MGMT_VIDEO_COMMENT_DATA_REQUESTED",
      });
      axios
        .get(USER_GET_CATEGORY_VIDEO_COMMENTS, {
          headers: {
            ...getCommonApiHeader(),
          },
          params: { ...data },
        })
        .then((response) => {
          dispatch(
            {
              type: "USER_CATEGORY_MGMT_VIDEO_COMMENT_DATA_RESPONSE",
              data: response?.data,
            }
            );
        })
        .catch((err) => {
          dispatch(handleError({...err,  message: "Failed to fetch data"}));
        });
    };
  };


  export const postVideoLikeComments = (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: "USER_CATEGORY_MGMT_VIDEO_COMMENT_DATA_REQUESTED",
      });
      axios
        .post(USER_POST_CATEGORY_VIDEO_COMMENTS, data, {
          headers: {
            ...getCommonApiHeader(),
          },
        })
        .then((response) => {
          dispatch({
              type: "USER_CATEGORY_MGMT_VIDEO_LIKE_COMMENT_DATA_RESPONSE",
              data: response?.data,
            });
        })
        .catch((err) => {
          dispatch(handleError({...err,  message: "Failed to fetch data"}));
        });
    };
  };

  export const postCommentsLikesReplies = (data) => {
    return (dispatch, getState) => {
      dispatch({
        type: "USER_CATEGORY_MGMT_VIDEO_COMMENT_DATA_REQUESTED",
      });
      axios
        .post(USER_POST_CATEGORY_COMMENTS_REPLY, data, {
          headers: {
            ...getCommonApiHeader(),
          },
        })
        .then((response) => {
          dispatch({
              type: "USER_CATEGORY_MGMT_COMMENTS_LIKE_REPLY_DATA_RESPONSE",
              data: response?.data,
            });
        })
        .catch((err) => {
          dispatch(handleError({...err,  message: "Failed to fetch data"}));
        });
    };
  };
  

  export const getCategoryDataRequest = (data) => {
    return {
      type: "USER_CATEGORY_MGMT_DATA_REQUESTED",
    };
  };

  export const getCategoryDataRespond = (data) => {
    return {
      type: "USER_CATEGORY_MGMT_DATA_RESPONSE",
      data: data,
    };
  };

  export const getCatVideoDataRequest = (data) => {
    return {
      type: "USER_CATEGORY_MGMT_VIDEO_DATA_REQUESTED",
    };
  };
  

  export const getCatVideoDataRespond = (data) => {
    return {
      type: "USER_CATEGORY_MGMT_VIDEO_DATA_RESPONSE",
      data: data,
    };
  };
  export const getEachVideoDataRespond = (data) => {
    return {
      type: "USER_CATEGORY_EACH_VIDEO_DATA_RESPONSE",
      data: data,
    };
  };
  export const getCategoryAllDataResponse = (data) => {
    return {
      type: "USER_CATEGORY_ALL_DATA_RESPONSE",
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
  