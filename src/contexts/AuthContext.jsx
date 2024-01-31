import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();

  const saveToken = (tokenFromLogin) => {
    setToken(tokenFromLogin);
    setIsAuthenticated(true);
    window.localStorage.setItem("authToken", tokenFromLogin);

    const { _id, username } = jwtDecode(tokenFromLogin);
    setUserId(_id);
    setUsername(username);
  };

  const verifyToken = async (tokenFromLocalStorage) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${tokenFromLocalStorage}` },
      });
      if (res.status === 200) {
        setIsAuthenticated(true);
        setToken(tokenFromLocalStorage);
        setIsLoading(false);

        const { _id, username } = jwtDecode(tokenFromLocalStorage);
        setUserId(_id);
        setUsername(username);
      } else {
        setIsLoading(false);
        window.localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      window.localStorage.removeItem("authToken");
    }
  };

  const fetchWithToken = async (endpoint, method = "GET", payload) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(payload),
          method,
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setToken();
    window.localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUserId();
    setUsername();
  };

  useEffect(() => {
    const tokenFromLocalStorage = window.localStorage.getItem("authToken");
    if (tokenFromLocalStorage) {
      verifyToken(tokenFromLocalStorage);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        saveToken,
        isAuthenticated,
        isLoading,
        fetchWithToken,
        userId,
        username,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
