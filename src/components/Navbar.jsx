import React from "react";

const Navbar = () => {
  return (
    <div className="navbar_custom">
      <div className="logo red h2">Play</div>
      <div className="links_navbar">
        <div className="active_link">Dashboard</div>
        <div>Account</div>
        <div>Users</div>
        <div>Config</div>
      </div>
      <div className="navbar_right">
        <div className="me-2">User</div>
        <i className="fa fa-user-circle-o me-4"></i>
        <i className="fa fa-sign-out"></i>
      </div>
    </div>
  );
};

export default Navbar;
