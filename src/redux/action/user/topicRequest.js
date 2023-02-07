import axios from "axios";
import { json } from "react-router-dom";
import { ADVISE_TOPIC_REQUEST } from "../../constants";

export const adviseTopicRequest = (data) => {
  return (dispatch, getState) => {
    dispatch(getTopicReqDataRequest());
    axios
      .post(ADVISE_TOPIC_REQUEST, data)
      .then((response) => {
        if (response) {
          dispatch(handleSuccess({ message: response?.data?.message || 'Request posted successfully'}));
                   }
        dispatch(getTopicReqDataRequest(response?.data));
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

// export const postForm = (data) => {
//   return (dispatch, getState) => {
//     dispatch(getTopicReqPostDataRequest());
//     axios
//       .post(ADVISE_TOPIC_REQUEST, data)
//       .then((response) => {
//         if (response) {
//           dispatch(handleSuccess({ message: response.data.message }));
//         }
//       })
//       .catch((err) => {
//         dispatch(handleError(err));
//       });
//   };
// };

export const getTopicReqDataRequest = (data) => {
  return {
    type: "Topic_Request_Data_REQUESTED",
  };
};

export const getTopicReqPostDataRequest = (data) => {
  return {
    type: "Topic_Request_POST_Data_REQUESTED",
  };
};

export const getTopicReqDataRespond = (data) => {
  return {
    type: "Topic_Request_DATA_RESPONSE",
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
    type: "Topic_Request_ERROR",
    error,
  };
};
