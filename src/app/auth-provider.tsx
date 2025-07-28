"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  nickName?: string;
  picture?: string;
  access_token?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = Cookies.get("auth_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    Cookies.set("auth_data", JSON.stringify(userData), {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("auth_data");
    router.push("/login");
  };

  const isAuthenticated = !!user?.access_token;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
