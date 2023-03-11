import { create } from "zustand";
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
  games: [],
  isLoading: false,
  users: [],
  sessions: [],
  account: { deposit: 0, totalGames: 0, gain: 0 },

  // ********* account
  account: {},
  getAccount: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/account/fond`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ account: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },
  addAccount: (account) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/account`, account, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ account: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  editAccount: (id, account) => {
    set({ isLoading: true });
    axios
      .put(`${API_URL}/account/${id}`, account, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ account: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  getGames: () => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/game`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set({ games: res.data });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  addGame: (game) => {
    set({ isLoading: true });
    axios
      .post(`${API_URL}/game`, game, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({ games: [...state.games, res.data] }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  deleteGame: (id) => {
    set({ isLoading: true });
    axios
      .delete(`${API_URL}/game/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          games: state.games.filter((game) => game._id !== id),
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  editGame: (id, game) => {
    set({ isLoading: true });
    axios
      .put(`${API_URL}/game/${id}`, game, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        set((state) => ({
          games: [...state.games.filter((game) => game._id !== id), res.data],
        }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        set({ isLoading: false });
      });
  },

  getSessions: (period = "daily", station = "Postes") => {
    set({ isLoading: true });
    axios
      .get(`${API_URL}/session/${period}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        if (station === "Postes") {
          set({ sessions: res.data });
        }
        if (station !== "Postes") {
          set({ sessions: res.data.filter((s) => s.station.name === station) });
        }
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
        { isActive: !isActive, session: { start: new Date() } },
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
      link: "account",
      icon: "bi bi-coin",
      text: "Caisse",
    },
    {
      link: "games",
      icon: "bi bi-disc",
      text: "Jeux",
    },
  ],
  userRoutes: [
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
      link: "account",
      icon: "bi bi-coin",
      text: "Caisse",
    },
    {
      link: "games",
      icon: "bi bi-disc",
      text: "Jeux",
    },
  ],

  toggleSideBar: () => {
    set((state) => ({ isSidebarHidden: !state.isSidebarHidden }));
  },
  switchTab: (tab) => {
    localStorage.setItem("activeTab", tab);
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
        localStorage.setItem("activeTab", "dashboard");
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
