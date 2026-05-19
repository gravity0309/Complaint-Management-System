// import {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useCallback,
//   useState
// } from "react";
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

const getStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  console.log(storedToken);

  if (!storedToken || storedToken === "undefined" || storedToken === "null") {
    localStorage.removeItem("token");
    return null;
  }

  return storedToken;
};

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
      localStorage.removeItem("user");
      return null;
    }

    return storedUser ? JSON.parse(storedUser) : null;
  } catch (_error) {
    localStorage.removeItem("user");
    return null;
  }
};

const normalizeAuthResponse = (data) => {
  const token =
    data?.token ||
    data?.accessToken ||
    data?.data?.token ||
    data?.data?.accessToken;

  const user =
    data?.user ||
    data?.data?.user ||
    data?.profile ||
    data?.data?.profile;

  if (!token || token === "undefined" || token === "null") {
    throw new Error(
      "Login succeeded, but the API response did not include a valid token."
    );
  }

  if (!user || typeof user !== "object") {
    throw new Error(
      "Login succeeded, but the API response did not include user details."
    );
  }

  return { token, user };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());

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
    console.log("HIII");
    const authhh = await loginUser(payload);
    console.log(authhh);
    const auth = normalizeAuthResponse(authhh);
    console.log(auth);
    console.log(auth.token);
    localStorage.setItem("token", auth.token);
    setToken(auth.token);

    localStorage.setItem(
      "user",
      JSON.stringify(auth.user)
    );

    setUser(auth.user);

    toast.success("Logged in successfully");

    return auth;
  }, []);

  // SIGNUP
  const signup = useCallback(async (payload) => {
    const auth = normalizeAuthResponse(await signupUser(payload));

    localStorage.setItem("token", auth.token);
    setToken(auth.token);

    localStorage.setItem(
      "user",
      JSON.stringify(auth.user)
    );

    setUser(auth.user);

    toast.success("Account created successfully");

    return auth.user;
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
