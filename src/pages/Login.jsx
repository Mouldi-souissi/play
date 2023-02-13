import React, { useState } from "react";
import userLogo from "../assets/user.png";
import useGlobalStore from "../strore";

const Login = () => {
  const [formData, setData] = useState({ email: "", password: "" });
  const login = useGlobalStore((state) => state.login);

  const handleInput = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("submits");
    login(formData.email, formData.password);
  };

  return (
    <div className="login d-flex align-items-center justify-content-center">
      <div className="card shadow p-5 col-lg-4">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={userLogo}
            alt="profile_picture"
            className="img-fluid mb-4 userLogo"
          />
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-floating  mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={handleInput}
            />
            <label>Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              name="password"
              onChange={handleInput}
            />
            <label>Mot de passe</label>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-secondary">
              Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
