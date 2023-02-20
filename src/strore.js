import { create } from "zustand";
import games from "./db/games.json";
import axios from "axios";
import decode from "jwt-decode";

const API_URL = "http://localhost:5000/api";

const useGlobalStore = create((set, get) => ({
  isSidebarHidden: false,
  activeTab: "dashboard",
  loggedUser: "",
  username: "",
  userType: "",
  consoles: [],
  games: games,
  isLoading: false,
  users: [],
  sessions: [],

  getSessions: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/session`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ sessions: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  addSession: (session) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/session`, session, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({ sessions: [...state.sessions, res.data] }));
        get().resetStation(session.station.id);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  resetStation: (id) => {
    set({ isLoading: true });
    axios
      .put(
        `${API_URL}/station/${id}`,
        {
          isActive: false,
          games: [],
          session: {
            start: new Date(),
            end: new Date(),
          },
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        set((state) => ({
          consoles: [...state.consoles.filter((c) => c._id !== id), res.data],
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  getStations: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/station`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ consoles: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  toggleConsoleActivity: (id, isActive) => {
    set({ isLoading: true });
    axios
      .put(
        `${API_URL}/station/${id}`,
        { isActive: !isActive },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        set((state) => ({
          consoles: [...state.consoles.filter((c) => c._id !== id), res.data],
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  addGameToSession: (station, game) => {
    const { _id, games } = station;
    set({ isLoading: true });
    axios
      .put(
        `${API_URL}/station/${_id}`,
        { games: [...games, game] },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        set((state) => ({
          consoles: [...state.consoles.filter((c) => c._id !== _id), res.data],
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  deleteGameFromSession: (station, gameId) => {
    const { _id, games } = station;
    set({ isLoading: true });
    axios
      .put(
        `${API_URL}/station/${_id}`,
        { games: games.filter((game) => game.id !== gameId) },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        set((state) => ({
          consoles: [...state.consoles.filter((c) => c._id !== _id), res.data],
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  adminRoutes: [
    {
      link: "dashboard",
      icon: "bi bi-controller",
      text: "Postes",
    },
    {
      link: "history",
      icon: "bi bi-clock-history",
      text: "Historique",
    },
    { link: "users", icon: "bi bi-people-fill", text: "Utilisateurs" },
    {
      link: "checkout",
      icon: "bi bi-coin",
      text: "Caisse",
    },
    {
      link: "parametres",
      icon: "bi bi-gear",
      text: "Parametres",
    },
  ],
  userRoutes: [
    {
      link: "dashboard",
      icon: "bi bi-controller",
      text: "Postes",
    },
    { link: "users", icon: "bi bi-people-fill", text: "Utilisateurs" },
    {
      link: "checkout",
      icon: "bi bi-coin",
      text: "Caisse",
    },
    {
      link: "history",
      icon: "bi bi-clock-history",
      text: "historique",
    },
    {
      link: "parametres",
      icon: "bi bi-gear",
      text: "Parametres",
    },
  ],

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
  switchTab: (tab) => {
    set({ activeTab: tab });
  },

  //*********  user
  getUsers: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/user`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ users: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  login: (email, password) => {
    axios
      .post(`${API_URL}/user/login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data);
        const decodedToken = decode(res.data);
        set({
          username: decodedToken.name,
          userType: decodedToken.type,
          activeTab: "dashboard",
        });
        window.location.replace("/");
      })
      .catch((err) => console.log(err));
  },
  logout: () => {
    window.localStorage.removeItem("token");
    window.location.replace("/login");
  },
  checkAuth: () => {
    const token =
      localStorage.getItem("token") && localStorage.getItem("token");
    const decodedToken = decode(token);
    if (token) {
      set({
        username: decodedToken.name,
        userType: decodedToken.type,
        activeTab: "dashboard",
      });
    }
  },
  addUser: (userData) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/user/register`, userData, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({ users: [...state.users, res.data] }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  editUser: (user) => {
    set({ isLoading: true });
    axios
      .put(
        `${API_URL}/user/${user._id}`,
        { name: user.name, type: user.type },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        set((state) => ({
          users: [
            ...state.users.filter((user) => user._id !== res.data._id),
            res.data,
          ],
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  deleteUser: (id) => {
    set({ isLoading: true });
    axios
      .delete(`${API_URL}/user/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          users: state.users.filter((user) => user._id !== res.data._id),
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export default useGlobalStore;
