import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Checkout from "../components/tabs/checkout/Checkout";
import Dashboard from "../components/tabs/dashboard/Dashboard";
import Sessions from "../components/tabs/sessions/Sessions";
import Users from "../components/tabs/users/Users";
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
    if (activeTab === "checkout") {
      return <Checkout />;
    }
    if (activeTab === "users") {
      return <Users />;
    }
    if (activeTab === "history") {
      return <Sessions />;
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
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-transparent" onClick={toggleSideBar}>
              <i className="bi bi-list"></i>
            </button>
            <button className="btn btn-transparent" onClick={handleLogout}>
              <i className="bi bi-door-open" />
            </button>
          </div>
        </div>
        {handleTabs()}
      </div>
    </div>
  );
};

export default MainPage;
