import { combineReducers } from "redux";
import LoginReducer from "./loginReducer";
import SignUpReducer from "./signUpReducer";
import CommonReducer from "./common";
// user reducer
import EventReducer from './user/eventReducer';
import BlogReducer from './user/blogReducer';
import UserCategoryReducer from './user/categoryReducer';
import UserHomePageReducer from './user/homepage';
import MyBlogsReducer from './user/myBlogsReducer';
import MyTestimonialReducer from './user/myTestimonialReducer';  
import ContactReducer from "./user/ContactReducer";
import AdviceTopicReducer from "./user/adviseTopicReducer";

// admin reducer
import AdminDashboardReducer from "./admin/dashboard";
import EventMgmtReducer from "./admin/eventMgmtReducer";
import UserMgmtReducer from "./admin/userMgmtReducer";
import UserRoleMgmtReducer from "./admin/userRoleMgmtReducer";
import CategoryMgmtReducer from "./admin/categoryMgmtReducer";
import TestimonialMgmtReducer from "./admin/testimonialMgmtReducer";
import BlogMgmtReducer from "./admin/blogMgmtReducer";
import ChangePasswordReducer from "./admin/changePasswordReducer";

const commonReducers = {
  LoginReducer,
  CommonReducer,
  SignUpReducer,
  ChangePasswordReducer,
};

const userReducers = {
    UserCategoryReducer,
    UserHomePageReducer,
    EventReducer,
    BlogReducer,
    MyBlogsReducer,
    MyTestimonialReducer,
    ContactReducer,
    AdviceTopicReducer,
}

const adminReducers = {
  AdminDashboardReducer,
  EventMgmtReducer,
  UserMgmtReducer,
  UserRoleMgmtReducer,
  CategoryMgmtReducer,
  TestimonialMgmtReducer,
  BlogMgmtReducer,
};

const rootReducer = combineReducers({
  ...commonReducers,
  ...adminReducers,
  ...userReducers,
});

export default rootReducer;
