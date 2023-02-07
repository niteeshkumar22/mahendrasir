import axios from "axios";
import { appendQueryParamToUrl, getCommonApiHeader } from "../../../utils/util";
import { FETCH_BLOGS_URL, SEARCH_BLOGS_URL, FETCH_EACH_BLOG_URL, REGISTER_BLOG_URL } from "../../constants";

export const fetchBlogsData = (data) => {
    return dispatch => {
        dispatch(fetchBlogsRequest());
        axios
            .get(FETCH_BLOGS_URL,{
                headers: {
                  ...getCommonApiHeader(),
                },
               params: { ...data},
              })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    dispatch(fetchBlogsResponse(response?.data));
                } else {
                    dispatch(fetchBlogsError(response?.data));
                }

            }).catch((err) => {
                dispatch(fetchBlogsError(err?.response));
            });
    };
}


export const fetchBlogsRequest = data => {
    return {
        type: "FETCH_BLOGS_REQUESTED",
    };
};

export const fetchBlogsResponse = data => {
    return {
        type: "FETCH_BLOGS_RESPONSE",
        data: data,
    };
};
export const fetchBlogsError = data => {
    return {
        type: "FETCH_BLOGS_ERROR",
        data: data,
    };
};


export const searchBlogCall = (data) => {
    const url = appendQueryParamToUrl(SEARCH_BLOGS_URL, data);
    return dispatch => {
        dispatch(searchBlogDataRequest());
        axios
            .get(url,{
                headers: {
                  ...getCommonApiHeader(),
                },
               // params: { ...data},
              })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    dispatch(searchBlogDataResponse(response?.data));
                } else {
                    dispatch(searchBlogDataError(response?.data));
                }

            }).catch((err) => {
                dispatch(searchBlogDataError(err?.response));
            });
    };
}


export const searchBlogDataRequest = data => {
    return {
        type: "SEARCH_BLOGS_REQUESTED",
    };
};

export const searchBlogDataResponse = data => {
    return {
        type: "SEARCH_BLOGS_RESPONSE",
        data: data,
    };
};
export const searchBlogDataError = data => {
    return {
        type: "SEARCH_BLOGS_ERROR",
        data: data,
    };
};


// export const fetchBlogDetailsCall = (data) => {
//     const url = appendQueryParamToUrl(FETCH_EACH_BLOG_URL, data);
//     return dispatch => {
//         dispatch(fetchBlogDetailsRequest());
//         axios
//             .get(url,{
//                 headers: {
//                   ...getCommonApiHeader(),
//                 },
//                 //params: { ...data},
//               })
//             .then((response) => {
//                 if (response.status === 201 || response.status === 200) {
//                     dispatch(fetchBlogDetailsResponse(response?.data));
//                 } else {
//                     dispatch(fetchBlogDetailsError(response?.data));
//                 }

//             }).catch((err) => {
//                 dispatch(fetchBlogDetailsError(err?.response));
//             });
//     };
// }


export const fetchBlogDetailsRequest = data => {
    return {
        type: "FETCH_BLOG_DETAIL_REQUESTED",
    };
};

export const fetchBlogDetailsResponse = data => {
    return {
        type: "FETCH_BLOG_DETAIL_RESPONSE",
        data: data,
    };
};
export const fetchBlogDetailsError = data => {
    return {
        type: "FETCH_BLOG_DETAIL_ERROR",
        data: data,
    };
};