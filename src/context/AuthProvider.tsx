import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, logout } from "../services/authService";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.get("http://localhost:3000/api/auth/protected", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => setIsAuthenticated(true))
        .catch(() => {
          logout();
          setIsAuthenticated(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logoutUser: logout }}>
      {children}
    </AuthContext.Provider>
  );
}
