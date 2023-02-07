import axios from "axios";
import {
    GET_ALL_TESTIMONIAL_URL,
    USER_GET_CATEGORY_All_DATA
} from "../constants";
import { getCommonApiHeader } from "../../utils/util";

export const getTop3Testdata = (params) => {
  return (dispatch, getState) => {
    const { CommonReducer } = getState();
    axios
      .get(GET_ALL_TESTIMONIAL_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params
      })
      .then((response) => {
        if (response.data?.sectionData?.testimonials) {
          dispatch({
            type: "GET_TOP3_TEST",
            data: response.data?.sectionData?.testimonials,
          });
        }
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const getTopVideosHome = (params) => {
  return (dispatch, getState) => {
    const { CommonReducer } = getState();
    axios
      .get(USER_GET_CATEGORY_All_DATA, {
        headers: {
          ...getCommonApiHeader(),
        },
        params
      })
      .then((response) => {
        if (response.data) {
          dispatch({
            type: "GET_TOP_VIDEOS_HOME",
            data: response.data,
          });
        }
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
