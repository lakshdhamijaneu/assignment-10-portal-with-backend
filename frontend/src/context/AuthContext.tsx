import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User, LoginResponse } from "../types";
import { axiosClient } from "../api/axiosClient";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage BEFORE rendering protected routes
  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved && saved !== "undefined" && saved !== "null") {
      try {
        setUser(JSON.parse(saved));
      } catch (err) {
        console.error("Invalid stored user", err);
        localStorage.removeItem("user");
      }
    }

    setLoading(false); // Done loading initial state
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axiosClient.post<LoginResponse>("/user/login", {
      email,
      password,
    });

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
