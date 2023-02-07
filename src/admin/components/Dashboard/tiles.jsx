import React from "react";
import ActiveUser from "../../icons/dashboard/ActiveUser.svg";
import InactiveUser from "../../icons/dashboard/InactiveUser.svg";
import TotalUser from "../../icons/dashboard/TotalUser.svg";
import NewUser from "../../icons/dashboard/NewUser.svg";

const Tiles = ({ label, value, bgColor, fgColor, id }) => {
  const getTileIcon = () => {
    let imgUrl;
    switch (id) {
      case "all":
        imgUrl = TotalUser;
        break;
      case "active":
        imgUrl = ActiveUser
        break;

      case "in-active":
        imgUrl = InactiveUser;
        break;

      case "pending":
        imgUrl = NewUser;
        break;
      default: 
        break;
    }
    return <img src={imgUrl} alt="icon" />;
  };
  return (
    <div
      className="dashboard_graph "
      style={{ backgroundColor: bgColor && bgColor[0], borderColor: fgColor && fgColor[0] }}
    >
      <div className="dash_icon" style={{ backgroundColor: fgColor && fgColor[0] }}>{getTileIcon()}</div>
      <div className="dash_data">
        <h2>{value}</h2>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default React.memo(Tiles);
