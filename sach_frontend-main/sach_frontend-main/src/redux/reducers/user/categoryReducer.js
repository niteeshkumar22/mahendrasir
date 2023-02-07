

const initState = {
  isLoading: false,
}
const UserCategoryReducer = (state = initState, action) => {
  const data = action.data;
  switch (action?.type) {
    case "USER_CATEGORY_MGMT_VIDEO_DATA_REQUESTED":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_CATEGORY_MGMT_VIDEO_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        data: data,
      };
    case "USER_CATEGORY_EACH_VIDEO_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        eachVideoData: data,
        currVideoObject: data?.sectionData?.videoDetail
      };
    case "USER_CATEGORY_ALL_DATA_RESPONSE":
      return {
        ...state,
        isLoading: false,
        allCategoryData: data,
      };
    case "USER_CATEGORY_MGMT_VIDEO_COMMENT_DATA_REQUESTED":
      return {
        ...state,
        
        commentSectionData: {
          ...state?.commentSectionData,
          isLoading: true
        }
      };
    case "USER_CATEGORY_MGMT_VIDEO_COMMENT_DATA_RESPONSE":
      return {
        ...state,
        commentSectionData: {
          ...state?.commentSectionData,
          isLoading: false,
          commentData: data
        }
      };
    case "USER_CATEGORY_MGMT_VIDEO_LIKE_COMMENT_DATA_RESPONSE":
      return {
        ...state,
        currVideoObject: {
          ...state?.currVideoObject,
          ...data,
        },
        commentSectionData: {
          ...state?.commentSectionData,
          isLoading: false
        }
      };
    case "USER_CATEGORY_MGMT_COMMENTS_LIKE_REPLY_DATA_RESPONSE":
      return {
        ...state,
        commentSectionData: {
          ...state?.commentSectionData,
          isLoading: false,
          commentData: data
        }
      }
    default:
      return state;
  }
}
export default UserCategoryReducer;


