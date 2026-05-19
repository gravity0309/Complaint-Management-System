import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState
} from "react";

import toast from "react-hot-toast";

import {
  getProfile,
  loginUser,
  signupUser
} from "../services/authService";

const AuthContext = createContext(null);

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (_error) {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        localStorage.removeItem("user");
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (_error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  // LOGIN
  const login = useCallback(async (payload) => {
    const data = await loginUser(payload);

    localStorage.setItem("token", data.token);
    setToken(data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    toast.success("Logged in successfully");

    return data.user;
  }, []);

  // SIGNUP
  const signup = useCallback(async (payload) => {
    const data = await signupUser(payload);

    localStorage.setItem("token", data.token);
    setToken(data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    toast.success("Account created successfully");

    return data.user;
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    toast.success("Logged out");
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === "admin",
      login,
      signup,
      logout
    }),
    [user, loading, token, login, signup, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
