import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import toast from "react-hot-toast";

import {
  getProfile,
  loginUser,
  signupUser
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();

        setUser(data.user);
      } catch (_error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // LOGIN
  const login = async (payload) => {
    const data = await loginUser(payload);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    toast.success("Logged in successfully");

    return data;
  };

  // SIGNUP
  const signup = async (payload) => {
    const data = await signupUser(payload);

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setUser(data.user);

    toast.success("Account created successfully");

    return data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logged out");
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      signup,
      logout
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);