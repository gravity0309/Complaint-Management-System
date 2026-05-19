import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getProfile, loginUser, signupUser } from "../services/authService";

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
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const login = async (payload) => {
    const data = await loginUser(payload);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    toast.success("Logged in successfully");
    return data.user;
  };

  const signup = async (payload) => {
    const data = await signupUser(payload);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    toast.success("Account created successfully");
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
