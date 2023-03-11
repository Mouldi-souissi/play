import React from "react";
import userIcon from "../assets/user.png";
import useGlobalStore from "../store";

const Login = () => {
  const login = useGlobalStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(data.entries());

    login(values.email, values.password);
  };

  return (
    <div className="login d-flex align-items-center justify-content-center">
      <div className="card shadow p-5 col-lg-4">
        <div className="d-flex justify-content-center align-items-end mb-4">
          <img
            src={userIcon}
            alt="profile_picture"
            className="img-fluid userIcon"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              name="password"
            />
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
