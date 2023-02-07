import React from "react";
// import "./style.css";
// import ProfileSvg from "../../icons/profile.svg";
// import SettingsSvg from "../../icons/settings.svg";
// import CalenderSvg from "../../icons/calendar.svg";
// import HeartSvg from "../../icons/heart.svg";
// import ListSvg from "../../icons/list.svg";
// import PlaySvg from "../../icons/play.svg";
// import ChatSvg from "../../icons/chatbubble.svg";
// import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
// import { UserRoutes } from "../../../routes";
// import { useState } from "react";
// import { getCurrentUserDetails } from "../../../utils/util";
// import Testimonial from "../MyAccount/Testimonial";
// const UserMyEvents = React.lazy(() => import("./MyEvents"));
// const UserMyBlogs = React.lazy(() => import("./MyBlogs"));
// const UserMyLibrary = React.lazy(() => import("./MyLibrary"));
// const UserSettings = React.lazy(() => import("./Settings"));
// const UserWishlist = React.lazy(() => import("./Wishlist"));
// const UserTestimonial = React.lazy(() => import("./Testimonial"));
const TestimonialPage = (props) => {

//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const userDetails = getCurrentUserDetails();
//   const [activeTab, setActiveTab] = useState(searchParams.get('tab') || "settings");


//   React.useEffect(() => {
//     // runs on location, i.e. route, change
//     setActiveTab(searchParams.get('tab'))
//   }, [location])

//   const changeParam = (val) => {
//     navigate(`${UserRoutes.MY_ACCOUNT}?tab=${val}`);
//   };

//   const getTabClass = (tab) => {
//     let isActive = tab === activeTab;
//     return `nav-link ${isActive ? "active" : ""}`;
//   };

//   const tabOrder = [
//     {key: "my-library", label: "My Library", icon: PlaySvg },
//     {key: "my-events", label: "My Events", icon: CalenderSvg },
//     {key: "my-blogs", label: "My Blogs", icon: ListSvg },
//     {key: "wishlist", label: "Wishlist", icon: HeartSvg },
//     {key: "testimonial", label: "Testimonial", icon: ChatSvg },
//     {key: "settings", label: "Settings", icon: SettingsSvg },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "my-library": {
//         return <UserMyLibrary />;
//       }
//       case "my-events": {
//         return <UserMyEvents />;
//       }
//       case "my-blogs": {
//         return <UserMyBlogs />;
//       }
//       case "wishlist": {
//         return <UserWishlist />;
//       }
//       case "testimonial": {
//         return <UserTestimonial />;
//       }
//       case "settings": {
//         return <UserSettings />;
//       }

//       default:
//         break;
//     }
//   };
//   return (
//     <main className="settings-sec">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-3">
//             <div className="nav_tabs">
//               <div
//                 className="nav flex-column nav-pills"
//                 id="v-pills-tab"
//                 role="tablist"
//                 aria-orientation="vertical"
//               >
//                 {userDetails && <div className="userName">
//                   <div className="avtr">
//                     <img
//                       src={userDetails.user?.icon}
//                       alt=""
//                     />
//                   </div>
//                  {userDetails.user && <div className="userData">
//                     <h4>{userDetails.user?.userFullName}</h4>
//                     <ul>
//                       <li>{userDetails.user?.userEmail}</li>
//                     </ul>
//                   </div>}
//                 </div>}
//                 {tabOrder.map((t, tIndex) => (
//                   <button
//                     className={`${getTabClass(t.key)}`}
//                     id={`v-pills-tab-${tIndex}`}
//                     key={`#v-pills-${tIndex}`}
//                     type="button"
//                     role="tab"
//                     aria-controls={`#v-pills-${tIndex}`}
//                     aria-selected="false"
//                     onClick={() => {
//                       changeParam(t.key)
//                     }}
//                   >
//                     <img src={t.icon} alt="nav-icon" />
//                     <span>{t.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="col-md-9">
//             <div className="nav_content">
//               <div className="tab-content" id="v-pills-tabContent">
//                   <div
//                     // className="tab-pane"
//                     role="tabpanel"
//                     tabindex="0"
//                   >
//                     <div className="userSettingCont">
//                       {renderTabContent()}
//                     </div>
//                   </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
};

export default TestimonialPage;
