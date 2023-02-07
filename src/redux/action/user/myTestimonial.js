import axios from "axios";
import { USER_GET_TESTIMONIAL_URL, USER_MODIFY_TESTIMONIAL_URL, GET_ALL_TESTIMONIAL_URL } from "../../constants";
import { getCommonApiHeader, getCurrentUserDetails } from "../../../utils/util";
import { handleError, handleSuccess } from "../common";

export const getMyTestimonialData = () => {
  return (dispatch) => {
    const userDetails = getCurrentUserDetails();
    dispatch(getMyTestimonialDataRequest());
    axios
      .get(USER_GET_TESTIMONIAL_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { userId: userDetails?.user?.sachUserId },
      })
      .then((response) => {
        dispatch(getMyTestimonialSetData(response?.data));
      })
      .catch((err) => {
        dispatch(myTestimonialToggleLoader());
        dispatch(handleError({ ...err }));
      });
  };
};

export const getAllTestimonials = (data) => {
  return (dispatch) => {
    dispatch(getAllTestimonialDataRequest());
    axios
      .get(GET_ALL_TESTIMONIAL_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data },
      })
      .then((response) => {
        dispatch(getAllTestimonialSetData(response?.data));
      })
      .catch((err) => {
        dispatch(myTestimonialToggleLoader());
        dispatch(handleError({ ...err }));
      });
  };
};

export const modifyTestimonial = (data) => {
  return (dispatch) => {
    const userDetails = getCurrentUserDetails();
    axios
      .post(
        USER_MODIFY_TESTIMONIAL_URL,
        { blogBody: data, userId: userDetails?.user?.sachUserId, status: "pending" },
        {
          headers: {
            ...getCommonApiHeader(),
          },
        }
      )
      .then((response) => {
        if (response.data) {
          dispatch(handleSuccess({ ...response, message: "Saved Changes!" }));
          dispatch(getMyTestimonialData());
        }
      })
      .catch((err) => {
        dispatch(myTestimonialToggleLoader());
        dispatch(handleError(err));
      });
  };
};
export const getMyTestimonialSetData = (data) => {
  return {
    type: "MY_TESTIMONIAL_SET_DATA",
    data,
  };
};
export const getAllTestimonialSetData = (data) => {
  return {
    type: "ALL_TESTIMONIAL_SET_DATA",
    data: data,
  };
};
export const myTestimonialToggleLoader = (data) => {
  return {
    type: "MY_TESTIMONIAL_TOGGLE_LOADER",
  };
};

export const getMyTestimonialDataRequest = (data) => {
  return {
    type: "MY_TESTIMONIAL_DATA_REQUESTED",
  };
};

export const getAllTestimonialDataRequest = (data) => {
  return {
    type: "ALL_TESTIMONIAL_DATA_REQUESTED",
  };
};
