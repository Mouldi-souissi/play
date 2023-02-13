import { create } from "zustand";
import users from "./db/users.json";

const useGlobalStore = create((set) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",
  loggedUser: "",
  username: "User",
  userType: "",

  adminRoutes: [
    { link: "dashboard", icon: "fa fa-desktop", text: "Tableau de bord" },
    { link: "users", icon: "fa fa-user-o", text: "Utilisateurs" },
    {
      link: "deposit",
      icon: "fa fa-money",
      text: "Caisse",
    },
    {
      link: "history",
      icon: "fa fa-clock-o",
      text: "historique",
    },
    {
      link: "parametres",
      icon: "fa fa-cog",
      text: "Parametres",
    },
  ],
  userRoutes: [
    { link: "dashboard", icon: "fa fa-desktop", text: "Tableau de bord" },
    { link: "users", icon: "fa fa-user-o", text: "Utilisateurs" },
    {
      link: "deposit",
      icon: "fa fa-money",
      text: "Caisse",
    },
    {
      link: "history",
      icon: "fa fa-clock-o",
      text: "historique",
    },
  ],

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
  switchTab: (tab) => {
    set({ activeTab: tab });
  },

  login: (email, password) => {
    console.log("users", users);
    const match = users.find(
      (user) => user.email === email && user.password === password
    );

    if (match) {
      localStorage.setItem("token", email);
      set({ username: "admin", userType: "admin", activeTab: "dashboard" });
      window.location.replace("/");
    }
  },
  logout: () => {
    window.localStorage.removeItem("token");
    window.location.replace("/login");
  },
  checkAuth: () => {
    const token =
      localStorage.getItem("token") && localStorage.getItem("token");
    if (token) {
      set({
        username: "admin",
        userType: "admin",
        activeTab: "dashboard",
      });
    }
  },
}));

export default useGlobalStore;
