import axios from "axios";
import { getCommonApiHeader } from "../../../utils/util";
import { ADMIN_GET_USER_COUNT_URL } from "../../constants";

export const getDashboardData = (data) => {
    return (dispatch, getState) => {
        dispatch(getDashboardDataRequest());
        axios
        .get(ADMIN_GET_USER_COUNT_URL, {
            headers: {
                ...getCommonApiHeader()
            },
        })
        .then((response) => {
            dispatch(getDashboardDataRespond(response?.data));
        }).catch(err => {
            dispatch(handleError(err));
        });
    };
}


export const getDashboardDataRequest = data => {
    return {
        type: "ADMIN_DASHBOARD_DATA_REQUESTED",
    };
};

export const getDashboardDataRespond = data => {
    return {
        type: "ADMIN_DASHBOARD_DATA_RESPONSE",
        data: data,
    };
};
export const handleError = error => {
    return {
        type: "ADMIN_DASHBOARD_ERROR",
        error,
    };
};
