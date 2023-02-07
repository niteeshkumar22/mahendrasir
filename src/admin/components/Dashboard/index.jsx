import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./style.css";
import Tiles from "./tiles";
import SachLoader from "../../../commons/Loader";
import { getDashboardData } from "../../../redux/action/admin/dashboard";
// import { Col, Row } from "antd";

const Dashboard = ({ isLoading, dashboardData, getDashboardData }) => {
  useEffect(() => {
    getDashboardData();
  }, []);
  if (isLoading) {
    return <SachLoader />;
  }
  return (
    <React.Fragment>
      <header className="container-fluid page-header">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <h2 className="page-title">Dashboard</h2>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row">
          {dashboardData.tabsData &&
            dashboardData.tabsData.length > 0 &&
            dashboardData.tabsData.map((d, i) => (
              <div className="col-lg-3 col-md-3" key={`dashTile-${i}`}>
                <Tiles
                  label={d.dashLabel}
                  value={d.dashValue}
                  bgColor={d.bgColor}
                  fgColor={d.fgColor}
                  id={d.value}
                />
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { AdminDashboardReducer } = state;
  return {
    isLoading: AdminDashboardReducer.isLoading,
    dashboardData: AdminDashboardReducer.dashboardData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardData: () => dispatch(getDashboardData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
