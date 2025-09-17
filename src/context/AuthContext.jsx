import React, { createContext, useEffect, useState } from "react";
import {
  saveToken,
  saveUser,
  removeToken,
  removeUser,
  getToken,
  getUser,
  isTokenExpired,
} from "../utils/token";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const t = getToken();
      if (t && !isTokenExpired(t)) {
        try {
          const res = await fetch(
            `${
              process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
            }/api/auth/me`,
            {
              headers: { Authorization: `Bearer ${t}` },
            }
          );
          if (!res.ok) throw new Error("Invalid token");
          const data = await res.json();
          setUser(data);
          setToken(t);
        } catch (err) {
          console.error("Token validation failed", err);
          logout();
        }
      } else {
        logout();
      }
      setLoading(false);
    }
    init();
  }, []);

  async function login({ token: newToken, user: userFromResp }) {
    saveToken(newToken);
    let u = userFromResp;
    if (!u) {
      const res = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
        }/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${newToken}` },
        }
      );
      if (!res.ok) throw new Error("Token validation failed");
      u = await res.json();
    }
    saveUser(u);
    setToken(newToken);
    setUser(u);
  }

  function logout() {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
