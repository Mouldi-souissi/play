import React from "react";
import userIcon from "../assets/user.png";
import useGlobalStore from "../strore";

const Sidebar = () => {
  const isSidebarHidden = useGlobalStore((state) => state.isSidebarHidden);
  const switchTab = useGlobalStore((state) => state.switchTab);
  const activeTab = useGlobalStore((state) => state.activeTab);
  const username = useGlobalStore((state) => state.username);
  const userType = useGlobalStore((state) => state.userType);
  const adminRoutes = useGlobalStore((state) => state.adminRoutes);
  const userRoutes = useGlobalStore((state) => state.userRoutes);

  return (
    <div className={`sidebar ${isSidebarHidden ? "hidden" : ""}`}>
      <div className="profile mb-4">
        <img src={userIcon} alt="profile_picture" className="img-fluid" />
        <h5 className="text-center text-white">{username}</h5>
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
