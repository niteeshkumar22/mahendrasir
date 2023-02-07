import axios from "axios";
import { getCommonApiHeader } from "../../../utils/util";

import {
  ADMIN_GET_CATEGORY_URL,
  ADMIN_GET_CATEGORY_VIDEO_URL,
  ADMIN_DELETE_VIDEO_URL,
  ADMIN_UPLOAD_VIDEO_URL,
  ADMIN_CREATE_EDIT_CATEGORY_URL,
  ADMIN_GET_CATEGORY_COUNT_URL,
  ADMIN_CATEGORY_NAME_FILE_URL
} from "../../constants";

export const getCategoryData = (data) => {
  return (dispatch, getState) => {
    dispatch(getCategoryDataRequest());
    let url = ADMIN_GET_CATEGORY_URL;
    // url = 'https://jsonblob.com/api/jsonBlob/1012741835931795456';
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
export const getCatVideoData = (data) => {
  return (dispatch, getState) => {
    dispatch(getCategoryDataRequest());
    dispatch(getCatTabsData(data));
    axios
      .get(ADMIN_GET_CATEGORY_VIDEO_URL, {
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

export const getCatTabsData = (data) => {
  return (dispatch, getState) => {
    // const { EventMgmtReducer } = getState();
    dispatch(getCategoryDataRequest());
    axios
      .get(ADMIN_GET_CATEGORY_COUNT_URL, {
        headers: {
          ...getCommonApiHeader(),
        },
        params: { ...data},
      })
      .then((response) => {
        if (response.data && response.data) {
          dispatch(catMgmtToggleLoader());
          dispatch({
            type: "CATEGORY_MGMT_SET_COUNT_DATA",
            data: response.data,
          });
          
        }
      })
      .catch((err) => {
        dispatch(handleError({...err,  message: "Failed to fetch tabs data"}));
        dispatch({
          type: "SHOW_TOAST",
          data: err,
          toastType: "error",
        });
      });
  };
};

export const onDeleteVideoClick = (data) => {
  return (dispatch, getState) => {
    dispatch(getCategoryDataRequest());
    axios
      .post(ADMIN_DELETE_VIDEO_URL, data, 
        {
          headers: {
            ...getCommonApiHeader(),
          }
        }
      )
      .then((response) => {
        dispatch(catMgmtToggleLoader());
        dispatch(handleSuccess({...response,  message: "Video deleted successfully!"}));
        dispatch(getCategoryData({ type: 'all' }));
        dispatch(getCatVideoData({ catId: data?.categoryId, subCatId: data?.subCategoryId }))
      })
      .catch((err) => {
        dispatch(catMgmtToggleLoader());
        dispatch(handleError({...err,  message: "Video delete failed!"}));
      });
  };
};


export const handleAddEditCategory = (data) => {
  return (dispatch, getState) => {
    dispatch(getCategoryDataRequest());
    axios
      .post(ADMIN_CREATE_EDIT_CATEGORY_URL, data, 
        {
          headers: {
            ...getCommonApiHeader(),
          }
        }
      )
      .then((response) => {
        dispatch(catMgmtToggleLoader());
        dispatch(handleSuccess({...response,  message: "Category created successfully!"}));
        dispatch(getCategoryData({ type: 'all' }));
      })
      .catch((err) => {
        dispatch(catMgmtToggleLoader());
        dispatch(handleError({...err,  message: "Category creation failed!"}));
      });
  };
};


export const submitUploadVideo = (data) => {
  return (dispatch, getState) => {
    dispatch(getCategoryDataRequest());
    axios
      .post(ADMIN_UPLOAD_VIDEO_URL, data, 
        {
          headers: {
            ...getCommonApiHeader(),
          }
        }
      )
      .then((response) => {
        dispatch(catMgmtToggleLoader());
        dispatch(handleSuccess({...response,  message: "Video upload successfully!"}));
        dispatch(getCategoryData({ type: 'all' }));
        dispatch(getCatVideoData({ catId: data?.categoryId, subCatId: data?.subCategoryId }))
      })
      .catch((err) => {
        dispatch(catMgmtToggleLoader());
        dispatch(handleError({...err,  message: "Video upload failed!"}));
      });
  };
};

export const handleUploadCategoryFile = (data) => {
  return (dispatch) => {
    axios
      .post(
        ADMIN_CATEGORY_NAME_FILE_URL,
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
            type: "CATEGORY_MGMT_SET_DATA",
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
        dispatch(handleError(err));
      });
  };
};


export const catMgmtToggleLoader = (data) => {
  return {
    type: "CATEGORY_MGMT_TOGGLE_LOADER",
  };
};
export const getCategoryDataRequest = (data) => {
  return {
    type: "CATEGORY_MGMT_DATA_REQUESTED",
  };
};

export const getCategoryDataRespond = (data) => {
  return {
    type: "CATEGORY_MGMT_DATA_RESPONSE",
    data: data,
  };
};
export const getCatVideoDataRespond = (data) => {
  return {
    type: "CATEGORY_MGMT_VIDEO_DATA_RESPONSE",
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
