import axios from "axios";
import { json } from "react-router-dom";
import { POST_CONTACT_US } from "../../constants";
import { handleError, handleSuccess } from "../common";

export const contact = (data) => {
  return (dispatch, getState) => {
    dispatch(getContactDataRequest());
    axios
      .post(POST_CONTACT_US, data)
      .then((response) => {
        dispatch(getContactDataRespond(response?.data));
        dispatch(handleSuccess({...response?.data, message: 'Your query has been forwarded to respective team'}));
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const postForm = (data) => {
  return (dispatch, getState) => {
    dispatch(getContactDataRequest());
    axios
      .post(POST_CONTACT_US, data)
      .then((response) => {
        if (response) {
          dispatch(handleSuccess({...response?.data, message: 'Your query has been forwarded to respective team'}));
        }
        dispatch(getContactDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const getContactDataRequest = (data) => {
  return {
    type: "Contact_Data_REQUESTED",
  };
};

export const getContactPostDataRequest = (data) => {
  return {
    type: "Contact_POST_Data_REQUESTED",
  };
};

export const getContactDataRespond = (data) => {
  return {
    type: "Contact_DATA_RESPONSE",
    data: data,
  };
};
