import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./commons/Login";
import { checkAuthentication } from "./utils/util";
// Admin
// import AdminDashboard from "./admin/components/Dashboard";
// import UserViewDetail from "./admin/components/UserManagement/ViewDetail";
// import Testimonial from "./admin/components/Testimonial";
// import BlogManagement from "./admin/components/BlogManagement";

// import Settings from "./admin/components/Settings";

// const UserManagement = React.lazy(() =>
//   import("./admin/components/UserManagement")
// );
// const EventManagement = React.lazy(() =>
//   import("./admin/components/EventManagement")
// );
// const CategoryManagement = React.lazy(() =>
//   import("./admin/components/CategoryManagement")
// );
// const UserRoleManagement = React.lazy(() =>
//   import("./admin/components/UserRoleManagement")
// );

// import AdminOutlet from "./admin/components";

import { AdminRoutes, UserRoutes } from "./routes";
// User
import UserBlogHomePage from "./user/components/Blogs";
import BlogsSummary from "./user/components/Blogs/BlogsSummary";
import UserEventHomePage from "./user/components/Events";
import EventsSummary from "./user/components/Events/EventsSummary";
import EventsDetails from "./user/components/Events/EventDetails";
import UserDashboard from "./user/components/Dashboard";
import Home from "./user/components/HomePage/index";
import About from "./user/components/About/index";
import FoundationInfo from "./user/components/About/FoundationInfo";
import FoundationInner from "./user/components/About/FoundationInner";

import AdminWriteBlog from "./user/components/MyAccount/MyBlogs/WriteBlog";
import AdminBlogDetail from "./user/components/MyAccount/MyBlogs/BlogDetail";

import ChildEducation from "./user/components/Sectoral/ChildEducation";
import SachScholoarship from "./user/components/Sectoral/SachScholarship";
import Grant from "./user/components/Grant/Grant";
import SachImpact from "./user/components/Sectoral/SachImpact";
import Agriculture from "./user/components/Sectoral/AgricultureDevelopment";
import Shows from "./user/components/Sectoral/Shows";
import Esselerator from "./user/components/Sectoral/Esselerator";
import Sarthi from "./user/components/Sectoral/Sarthi";
import FAQ from "./user/components/Footer/FAQ";
import PrivacyPolicy from "./user/components/Footer/PrivacyPolicy";
import TnC from "./user/components/Footer/TnC";
import ContactUs from "./user/components/Footer/ContactUs";
import OrganicFarming from "./user/components/Organic_Farming";
import VijayScholarship from "./user/components/Sectoral/VijayScholarship";
import CategoryDetails from "./user/components/Category/CategoryDetails";
import CategoryVideo from "./user/components/Category/CategoryVideo";
import CategoryHome from "./user/components/Category";
import UserTestimonialsPage from "./user/components/Testimonials";
import Counseling from "./user/components/Counseling";
import Contribute from "./user/components/Contribute";
import AOS from "aos";
import "aos/dist/aos.css";
import CookiePolicy from "./user/components/Footer/CookiePolicy";

const BaseDashboard = React.lazy(() => import("./user"));
const UserMyAccount = React.lazy(() => import("./user/components/MyAccount"));

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
  let isAuthenticatedCpy = checkAuthentication();
  return isAuthenticatedCpy ? children : <Navigate to="/login" />;
};

const App = () => {
  const [intervalState, setIntervalState] = useState();
  clearInterval(intervalState);
  return (
    <div className="App">
      <Routes>
        {/*-----Common Routes--------*/}
        <Route path="/login" element={<Login />} />

        {/*-----User Routes--------*/}
        <Route
          path="/"
          element={
            <Suspense fallback={<div></div>}>
              <BaseDashboard />
            </Suspense>
          }
        >
          <Route path="/" element={<UserDashboard />} />
          <Route path={UserRoutes.USER_EVENT} element={<UserEventHomePage />} />
          <Route path={UserRoutes.USER_EVENT_SUMMARY} element={<EventsSummary />} />
          <Route path={UserRoutes.USER_EVENT_DETAILS} element={<EventsDetails setIntervalState={setIntervalState} />} />
          <Route path={UserRoutes.USER_BLOGS} element={<UserBlogHomePage />} />
          <Route path={UserRoutes.USER_BLOG_SUMMARY} element={<BlogsSummary />} />
          <Route path={UserRoutes.CATEGORY_DETAIL_PAGE} element={<CategoryDetails />} />
          <Route path={UserRoutes.CATEGORY_HOME_PAGE} element={<CategoryHome />} />
          <Route path={UserRoutes.USER_TESTIMONIALS} element={<UserTestimonialsPage />} />
          <Route path={UserRoutes.USER_CONTRIBUTE} element={<Contribute />} />
          <Route path={UserRoutes.CATEGORY_VIDEO_PAGE} element={<CategoryVideo />} />

          <Route path={UserRoutes.DASHBOARD} element={<Home />} />
          <Route path={UserRoutes.ABOUT} element={<About />} />
          <Route path={UserRoutes.FOUNDATION} element={<FoundationInfo />}></Route>
          <Route path={UserRoutes.FOUNDATION_INNER} element={<FoundationInner />}></Route>
          <Route path={UserRoutes.SECTORAL_CHILD_EDUCATION} element={<ChildEducation />}></Route>
          <Route path={UserRoutes.SECTORAL_SACH_SCHOLARSHIP} element={<SachScholoarship />}></Route>
          <Route path={UserRoutes.SECTORAL_SACH_AGRICULTURE} element={<Agriculture />}></Route>
          <Route path={UserRoutes.SECTORAL_SACH_SHOWS} element={<Shows />}></Route>
          <Route path={UserRoutes.GRANT} element={<Grant />}></Route>
          <Route path={UserRoutes.SECTORAL_SACH_IMPACT} element={<SachImpact />}></Route>
          <Route path={UserRoutes.SECTORAL_SACH_ESSELERATOR} element={<Esselerator />}></Route>
          <Route path={UserRoutes.SECTORAL_SACH_SARTHI} element={<Sarthi />}></Route>
          <Route path={UserRoutes.FAQ} element={<FAQ />}></Route>
          <Route path={UserRoutes.PRIVACY_POLICY} element={<PrivacyPolicy />}></Route>
          <Route path={UserRoutes.COOKIE_POLICY} element={<CookiePolicy />}></Route>
          <Route path={UserRoutes.TNC} element={<TnC />}></Route>
          <Route path={UserRoutes.CONTACT_US} element={<ContactUs />}></Route>
          <Route path={UserRoutes.ORGANIC_FARMING} element={<OrganicFarming />}></Route>
          <Route path={UserRoutes.USER_VIJAY_SCHOLARSHIP} element={<VijayScholarship />}></Route>
          <Route path={UserRoutes.COUNSELING} element={<Counseling />}></Route>
          <Route
            path={UserRoutes.MY_ACCOUNT}
            element={
              <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
                <UserMyAccount />
              </PrivateRoute>
            }
          />
          <Route
            path={UserRoutes.WRITE_BLOG}
            element={
              <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
                <div className="user-blog-wrapper">
                  <AdminWriteBlog fromUser={true} />
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path={UserRoutes.BLOG_DETAIL}
            element={
              <div className="user-blog-wrapper">
                <AdminBlogDetail fromUser={true} />
              </div>
            }
          />

          {/*-----Admin Routes--------*/}
          {/* <Route
          path="/"
          element={
            <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
              <AdminOutlet />
            </PrivateRoute>
          }
        >
          <Route
            path={AdminRoutes.DASHBOARD}
            element={
              <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={AdminRoutes.USER_MANAGEMENT}
            element={
              <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <UserManagement />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={AdminRoutes.USER_VIEW_DETAIL}
            element={<UserViewDetail />}
          />
          <Route
            path={AdminRoutes.EVENT_MANAGEMENT}
            element={
              <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <EventManagement />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={AdminRoutes.CATEGORY_MANAGEMENT}
            element={
              <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
                <Suspense fallback={<div></div>}>
                  <CategoryManagement />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route
            path={AdminRoutes.USER_ROLE_MANAGEMENT}
            element={
              <PrivateRoute auth={{ isAuthenticated: checkAuthentication() }}>
                <Suspense fallback={<div>Loading...</div>}>
                  <UserRoleManagement />
                </Suspense>
              </PrivateRoute>
            }
          />
          <Route path={AdminRoutes.TESTIMONIALS} element={<Testimonial />} />
          <Route
            path={AdminRoutes.BLOG_MANAGEMENT}
            element={<BlogManagement />}
          />
          <Route path={AdminRoutes.WRITE_BLOG} element={<AdminWriteBlog />} />
          <Route path={AdminRoutes.BLOG_DETAIL} element={<AdminBlogDetail />} />
          <Route path={AdminRoutes.SETTINGS} element={<Settings />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
