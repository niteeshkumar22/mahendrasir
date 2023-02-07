// export const BASE_URL = 'http://sachcbservicealb-645337283.ap-south-1.elb.amazonaws.com/api';
export const BASE_URL = "https://api.sach.org.in/api";
//export const BASE_URL = 'http://localhost:8000/api';

export const LOGIN_URL = `${BASE_URL}/login`;

export const GET_SIGNUP_TEMPLATE = `${BASE_URL}/signupTemplate`;

export const GENERATE_OTP_URL = `${BASE_URL}/generateOtp`;
export const VALIDATE_OTP_URL = `${BASE_URL}/validateOtp`;
export const SUBMIT_BASIC_INFO_URL = `${BASE_URL}/user/submitBasicInfo`;

/***************** User Section  *********************/

// events
export const FETCH_EVENTS_URL = `${BASE_URL}/getEventUI`;
export const SEARCH_EVENTS_URL = `${BASE_URL}/getEventUISearch`;
export const FETCH_EACH_EVENT_URL = `${BASE_URL}/getEventInfo`;
export const REGISTER_EVENT_URL = `${BASE_URL}/registerEvent`;

// blogs
export const FETCH_BLOGS_URL = `${BASE_URL}/getBlogUI`;
export const SEARCH_BLOGS_URL = `${BASE_URL}/getBlogUISearch`;

// my blogs
export const USER_GET_BLOG_DETAIL_URL = `${BASE_URL}/getBlogById`;
export const USER_GET_RELATED_BLOG_URL = `${BASE_URL}/getRelatedBlogById`;
export const USER_GET_BLOG_DATA_URL = `${BASE_URL}/getBlogUser`;
export const USER_PUBLISH_BLOG_URL = `${BASE_URL}/createBlog`;
export const USER_GET_BLOG_TABLE_CONTENT_URL = `${BASE_URL}/getTableContentUser`;
export const USER_MODIFY_BLOG_URL = `${BASE_URL}/modifyBlogUser`;
export const USER_GET_BLOG_COUNT_URL = `${BASE_URL}/getBlogCountUser`;

// my/all testimonial
export const USER_GET_TESTIMONIAL_URL = `${BASE_URL}/getTestUser`;
export const GET_ALL_TESTIMONIAL_URL = `${BASE_URL}/getUserTestUI`;
export const USER_MODIFY_TESTIMONIAL_URL = `${BASE_URL}/createTest`;
/***************** Admin Section  *********************/

//common
export const ADMIN_UPLOAD_FILE_URL = `${BASE_URL}/upload`;
export const GET_ADMIN_INFO = `${BASE_URL}/getAdminInfo`;

//dashboard
export const ADMIN_GET_USER_COUNT_URL = `${BASE_URL}/userCount`;

// user management
export const ADMIN_GET_USERS_URL = `${BASE_URL}/getUser`;
export const ADMIN_GET_VIEW_DETAIL_URL = `${BASE_URL}/getUserById`;
export const ADMIN_INVITE_USER_URL = `${BASE_URL}/user/invite`;
export const MODIFY_USER_URL = `${BASE_URL}/modifyUser`;
export const CHANGE_USER_PASSWORD_URL = `${BASE_URL}/users/changePassword`;

// userrole management
export const ADMIN_GET_USER_ROLE_COUNT_URL = `${BASE_URL}/userCountWithRole`;
export const ADMIN_GET_USER_ROLE_URL = `${BASE_URL}/getUserWithRole`;
export const ADMIN_GET_ROLE_URL = `${BASE_URL}/getRoles`;
export const ADMIN_CREATE_ROLE_URL = `${BASE_URL}/createRole`;
export const ADMIN_GET_PERM_USER_URL = `${BASE_URL}/getPermUserWithRole`;
export const ADMIN_APPLY_PERM_USER_URL = `${BASE_URL}/applyPermUserWithRole`;

// event management
export const ADMIN_GET_EVENT_COUNT_URL = `${BASE_URL}/getEventCount`;
export const ADMIN_GET_EVENT_URL = `${BASE_URL}/getEventByUserId`;
export const ADMIN_CREATE_EVENT_URL = `${BASE_URL}/createEvent`;
export const ADMIN_GET_EVENT_BY_ID_URL = `${BASE_URL}/getEventById`;
export const ADMIN_MODIFY_EVENT_URL = `${BASE_URL}/ModifyEvent`;
export const ADMIN_GENERATE_EVENT_URL = `${BASE_URL}/generateLinkEvent`;

// category management
export const ADMIN_GET_CATEGORY_URL = `${BASE_URL}/getCategory`;
export const ADMIN_GET_CATEGORY_COUNT_URL = `${BASE_URL}/getVideoCount`;
export const ADMIN_CREATE_EDIT_CATEGORY_URL = `${BASE_URL}/createCategory`;
export const ADMIN_GET_CATEGORY_VIDEO_URL = `${BASE_URL}/getVideo`;
export const ADMIN_DELETE_VIDEO_URL = `${BASE_URL}/modifyVideo`;
export const ADMIN_UPLOAD_VIDEO_URL = `${BASE_URL}/createVideo`;
export const ADMIN_CATEGORY_NAME_FILE_URL = `${BASE_URL}/upload`;

export const USER_GET_CATEGORY_VIDEO_URL = `${BASE_URL}/getVideoUI`;
export const USER_GET_CATEGORY_VIDEO_BY_ID_URL = `${BASE_URL}/getVideoById`;
export const USER_GET_CATEGORY_All_DATA = `${BASE_URL}/getVideoUISearch`;

export const USER_GET_CATEGORY_VIDEO_COMMENTS = `${BASE_URL}/getVideolikeComments`;
export const USER_POST_CATEGORY_VIDEO_COMMENTS = `${BASE_URL}/likeVideo`;
export const USER_POST_CATEGORY_COMMENTS_REPLY = `${BASE_URL}/comment`;
// testimonial management
export const ADMIN_GET_TESTIMONIAL_URL = `${BASE_URL}/getTest`;
export const ADMIN_GET_TESTIMONIAL_COUNT_URL = `${BASE_URL}/getTestCount`;
export const ADMIN_MODIFY_TESTIMONIAL_URL = `${BASE_URL}/modifyTest`;
export const ADMIN_CREATE_TESTIMONIAL_URL = `${BASE_URL}/createTest`;

// blog management
export const ADMIN_GET_BLOG_DETAIL_URL = `${BASE_URL}/getBlogById`;
export const ADMIN_GET_BLOG_DATA_URL = `${BASE_URL}/getBlog`;
export const ADMIN_PUBLISH_BLOG_URL = `${BASE_URL}/createBlog`;
export const ADMIN_GET_BLOG_TABLE_CONTENT_URL = `${BASE_URL}/getTableContent`;
export const ADMIN_MODIFY_BLOG_URL = `${BASE_URL}/modifyBlog`;
export const ADMIN_GET_BLOG_COUNT_URL = `${BASE_URL}/getBlogCount`;

export const POST_CONTACT_US = `${BASE_URL}/contact-us`;

export const ADVISE_TOPIC_REQUEST = `${BASE_URL}/requestForAdviseAndTopicRequest`;
