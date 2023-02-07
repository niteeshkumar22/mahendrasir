import React from "react";

const UserAccountTabs = ({ tabsData, onTabClick, activeTab }) => {
  return (
    <div className="sach-admin-tabs">
      <ul className="nav nav-pills" id="pills-tab" role="tablist">
        {tabsData &&
          tabsData.map((item, i) => (
            <li key={`tabItem-${i + 1}`} className="nav-item" onClick={() => onTabClick(item.value)}>
              <button className={`nav-link ${activeTab === item.value ? "active" : ""}`} id={`pills-tab-${i + 1}`} type="button" role="tab" aria-controls="pills-1" aria-selected="true">
                {item.label}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default UserAccountTabs;
