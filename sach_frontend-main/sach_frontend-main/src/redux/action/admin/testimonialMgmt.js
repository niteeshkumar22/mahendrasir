import axios from "axios";
import {
  ADMIN_GET_TESTIMONIAL_URL,
  ADMIN_GET_TESTIMONIAL_COUNT_URL,
  ADMIN_MODIFY_TESTIMONIAL_URL,
  ADMIN_CREATE_TESTIMONIAL_URL,
  // ADMIN_INVITE_TESTIMONIAL_URL,
  // ADMIN_SET_TESTIMONIAL_STATUS_URL
} from "../../constants";
import { getCommonApiHeader } from "../../../utils/util";

export const getTabsData = () => {
  return (dispatch, getState) => {
    const { TestimonialMgmtReducer } = getState();
    dispatch(getTestimonialMgmtDataRequest());
    axios
      .get(ADMIN_GET_TESTIMONIAL_COUNT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response.data && response.data.tabsData) {
          dispatch({
            type: "TESTIMONIAL_MGMT_SET_TAB_DATA",
            data: response.data,
          });
          dispatch(setActiveTab(response.data.tabsData[0].value));
          dispatch(
            getTestimonialMgmtData({
              type: response.data.tabsData[0].value,
              start: TestimonialMgmtReducer.start,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(testimonialMgmtToggleLoader());
        dispatch(handleError(err));
      });
  };
};

export const getTestimonialMgmtData = (data) => {
  return (dispatch) => {
    dispatch(getTestimonialMgmtDataRequest());
    axios
      .get(ADMIN_GET_TESTIMONIAL_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data },
      })
      .then((response) => {
        dispatch(getTestimonialMgmtDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(testimonialMgmtToggleLoader());
        dispatch(handleError({ ...err }));
      });
  };
};

export const handleCreateTestimonial = (data) => {
  return (dispatch) => {
    dispatch(getTestimonialMgmtDataRequest());
    axios
      .post(
        ADMIN_CREATE_TESTIMONIAL_URL,
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
        dispatch(testimonialMgmtToggleLoader());

        dispatch(
          handleSuccess({ ...response, message: "Posted successfully!!" })
        );
        // fetch new data again
        // dispatch(getTabsData());
      })
      .catch((err) => {
        dispatch(testimonialMgmtToggleLoader());
        dispatch(handleError({ ...err, message: "Something went wrong." }));
      });
  };
};

export const modifyTestimonial = (data) => {
  return (dispatch) => {
    axios
      .post(ADMIN_MODIFY_TESTIMONIAL_URL,
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

export const testimonialMgmtToggleLoader = (data) => {
  return {
    type: "TESTIMONIAL_MGMT_TOGGLE_LOADER",
  };
};

export const setActiveTab = (data) => {
  return {
    type: "TESTIMONIAL_MGMT_SET_ACTIVE_TAB",
    data,
  };
};

export const getTestimonialMgmtDataRequest = (data) => {
  return {
    type: "TESTIMONIAL_MGMT_DATA_REQUESTED",
  };
};

export const getTestimonialMgmtDataRespond = (data) => {
  return {
    type: "TESTIMONIAL_MGMT_DATA_RESPONSE",
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
