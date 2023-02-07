import axios from "axios";
import { appendQueryParamToUrl, getCommonApiHeader } from "../../../utils/util";
import { FETCH_EVENTS_URL, SEARCH_EVENTS_URL, FETCH_EACH_EVENT_URL, REGISTER_EVENT_URL } from "../../constants";

export const fetchEventsData = (data) => {
    return dispatch => {
        dispatch(fetchEventsRequest());
        axios
            .get(FETCH_EVENTS_URL,{
                headers: {
                  ...getCommonApiHeader(),
                },
               params: { ...data},
              })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    dispatch(fetchEventsResponse(response?.data));
                } else {
                    dispatch(fetchEventsError(response?.data));
                }

            }).catch((err) => {
                dispatch(fetchEventsError(err?.response));
            });
    };
}


export const fetchEventsRequest = data => {
    return {
        type: "FETCH_EVENTS_REQUESTED",
    };
};

export const fetchEventsResponse = data => {
    return {
        type: "FETCH_EVENTS_RESPONSE",
        data: data,
    };
};
export const fetchEventsError = data => {
    return {
        type: "FETCH_EVENTS_ERROR",
        data: data,
    };
};


export const searchEventCall = (data) => {
    const url = appendQueryParamToUrl(SEARCH_EVENTS_URL, data);
    return dispatch => {
        dispatch(searchEventDataRequest());
        axios
            .get(url,{
                headers: {
                  ...getCommonApiHeader(),
                },
               // params: { ...data},
              })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    dispatch(searchEventDataResponse(response?.data));
                } else {
                    dispatch(searchEventDataError(response?.data));
                }

            }).catch((err) => {
                dispatch(searchEventDataError(err?.response));
            });
    };
}


export const searchEventDataRequest = data => {
    return {
        type: "SEARCH_EVENTS_REQUESTED",
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
export const searchEventDataResponse = data => {
    return {
        type: "SEARCH_EVENTS_RESPONSE",
        data: data,
    };
};
export const searchEventDataError = data => {
    return {
        type: "SEARCH_EVENTS_ERROR",
        data: data,
    };
};


export const fetchEventDetailsCall = (data) => {
    const url = appendQueryParamToUrl(FETCH_EACH_EVENT_URL, data);
    return dispatch => {
        dispatch(fetchEventDetailsRequest());
        axios
            .get(url,{
                headers: {
                  ...getCommonApiHeader(),
                },
                //params: { ...data},
              })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    dispatch(fetchEventDetailsResponse(response?.data));
                } else {
                    dispatch(fetchEventDetailsError(response?.data));
                }

            }).catch((err) => {
                dispatch(fetchEventDetailsError(err?.response));
            });
    };
}

export const resetEventData = data => {
    return {
        type: "FETCH_EVENT_DETAIL_RESPONSE",
    };
};


export const fetchEventDetailsRequest = data => {
    return {
        type: "FETCH_EVENT_DETAIL_REQUESTED",
    };
};

export const fetchEventDetailsResponse = data => {
    return {
        type: "FETCH_EVENT_DETAIL_RESPONSE",
        data: data,
    };
};
export const fetchEventDetailsError = data => {
    return {
        type: "FETCH_EVENT_DETAIL_ERROR",
        data: data,
    };
};


export const registerEventCall = (data, navigate) => {
    
    return dispatch => {
        dispatch(registerEventRequest());
        axios
            .post(REGISTER_EVENT_URL, data,   { headers: {
                ...getCommonApiHeader(),
              },})
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    if(data.page != 'userProfile'){
                        if(data.type == 'register'){
                            if (response.status === 201 || response.status === 200) {
                                dispatch(fetchEventDetailsResponse(response?.data));
                            }
                            dispatch(toggleRegisterPopUp())
                        // navigate("/user/account?tab=my-events");
                        }else{
                            navigate("/user/account?tab=wishlist")
                        }
                    }else{
                         if (data.type == 'register' && !data.value){
                            dispatch(
                                handleSuccess({ ...response, message: "Event declined successfully!" })
                              );
                         }   
                    }
                }
            }).catch((err) => {
                if (err?.response?.data?.redirect) {
                    navigate(redirect);
                } else {
                    navigate("/login?redirect="+window.location.href+"&fromEvent=true");
                }
            });
    };
}


export const registerEventRequest = data => {
    return {
        type: "REGISTER_EVENT_REQUESTED",
    };
};
export const toggleRegisterPopUp = data => {
    return {
        type: "TOGGLE_REGISTER_POPUP",
    };
};