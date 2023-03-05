import React, { useEffect, useState } from "react";
import useGlobalStore from "../../../strore";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";

const Users = () => {
  const getUsers = useGlobalStore((state) => state.getUsers);
  const users = useGlobalStore((state) => state.users);
  const isLoading = useGlobalStore((state) => state.isLoading);
  const [deleteData, setDeleteData] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <div className="d-flex align-items-baseline justify-content-center mb-5">
        <h4 className="me-3  sectionTitle">Utilisateurs</h4>
        <button
          className="btn btn-outline-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addUser"
        >
          <i className="bi bi-plus h4"></i>
        </button>
      </div>
      <div className="loader_wrapper">
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center ">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => {
                if (a._id < b._id) return 1;
                if (a._id > b._id) return -1;
                return 0;
              })
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.type}</td>
                  <td>
                    <button
                      className="btn btn btn-transparent btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#editUser"
                      onClick={() => setUser(user)}
                    >
                      <i className="bi bi-gear "></i>
                    </button>
                    <button
                      className="btn btn-transparent btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteUser"
                      onClick={() => setDeleteData(user)}
                    >
                      <i className="bi bi-trash3 red"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddUser />
      <EditUser user={user} />
      <DeleteUser user={deleteData} />
    </div>
  );
};

export default Users;
