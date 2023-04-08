import React, { useEffect, lazy, Suspense } from "react";
import Sidebar from "../components/Sidebar";
import useGlobalStore from "../store";

const LazyConsoles = lazy(() => import("../components/tabs/consoles/Consoles"));
const LazySessions = lazy(() => import("../components/tabs/sessions/Sessions"));
const LazyGames = lazy(() => import("../components/tabs/games/Games"));
const LazyAccount = lazy(() => import("../components/tabs/Account/Account"));
const LazyUsers = lazy(() => import("../components/tabs/users/Users"));

const MainPage = () => {
  const toggleSideBar = useGlobalStore((state) => state.toggleSideBar);
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const activeTab = useGlobalStore((state) => state.activeTab);
  const logout = useGlobalStore((state) => state.logout);
  const checkAuth = useGlobalStore((state) => state.checkAuth);

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
        {activeTab === "consoles" && (
          <Suspense>
            <LazyConsoles />
          </Suspense>
        )}
        {activeTab === "users" && (
          <Suspense>
            <LazyUsers />
          </Suspense>
        )}
        {activeTab === "account" && (
          <Suspense>
            <LazyAccount />
          </Suspense>
        )}
        {activeTab === "history" && (
          <Suspense>
            <LazySessions />
          </Suspense>
        )}
        {activeTab === "games" && (
          <Suspense>
            <LazyGames />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default MainPage;
