import React, { useEffect } from "react";
import userIcon from "../assets/user.png";
import useGlobalStore from "../store";

const Sidebar = () => {
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const switchTab = useGlobalStore((state) => state.switchTab);
  const activeTab = useGlobalStore((state) => state.activeTab);
  const username = useGlobalStore((state) => state.username);
  const userType = useGlobalStore((state) => state.userType);
  const adminRoutes = useGlobalStore((state) => state.adminRoutes);
  const userRoutes = useGlobalStore((state) => state.userRoutes);
  const isLoading = useGlobalStore((state) => state.isLoading);

  useEffect(() => {
    switchTab(localStorage.getItem("activeTab"));
  }, []);

  return (
    <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
      <div className="d-flex justify-content-center align-items-end mb-2 userIconWrapper">
        <img
          src={userIcon}
          alt="profile_picture"
          className={`img-fluid userIcon ${isLoading && "isLoading"}`}
        />

        <h6 className="text-center text-dark text-uppercase ms-3">
          {username}
        </h6>
      </div>

      <ul>
        {userType === "admin" &&
          adminRoutes.map((route, i) => (
            <li key={i}>
              <div
                className={`navlink ${
                  activeTab === route.link ? "active" : ""
                }`}
                onClick={() => switchTab(route.link)}
              >
                <i className={route.icon}></i>

                <span className="item">{route.text}</span>
              </div>
            </li>
          ))}
        {userType === "utilisateur" &&
          userRoutes.map((route, i) => (
            <li key={i}>
              <div
                className={`navlink ${
                  activeTab === route.link ? "active" : ""
                }`}
                onClick={() => switchTab(route.link)}
              >
                <span className="icon">
                  <i className={route.icon}></i>
                </span>
                <span className="item">{route.text}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
