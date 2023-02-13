import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/tabs/dashboard/Dashboard";
import useGlobalStore from "../strore";

const MainPage = () => {
  const toggleSideBar = useGlobalStore((state) => state.toggleSideBar);
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const activeTab = useGlobalStore((state) => state.activeTab);
  const logout = useGlobalStore((state) => state.logout);
  const checkAuth = useGlobalStore((state) => state.checkAuth);

  const handleTabs = () => {
    if (activeTab === "dashboard") {
      return <Dashboard />;
    }
  };
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="mainPage">
      <Sidebar />
      <div className={`content ${isSidebarHidden ? "full" : ""}`}>
        <div className="topBar">
          <div className="d-flex align-items-center">
            <button className="btn btn-transparent" onClick={toggleSideBar}>
              <i className="fa fa-bars"></i>
            </button>

            <i
              className="fa-solid fa-arrow-right-from-bracket btn"
              onClick={handleLogout}
            ></i>
          </div>
        </div>
        <div className="container">{handleTabs()}</div>
      </div>
    </div>
  );
};

export default MainPage;
