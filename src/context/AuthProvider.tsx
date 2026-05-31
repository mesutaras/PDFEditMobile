"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface User {
  email: string;
  description: string;
  picture: string;
  name: string;
  sub: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  const user: User | null = session?.user
    ? {
        email: session.user.email ?? "",
        description: "Google User",
        picture: session.user.image ?? "",
        name: session.user.name ?? "",
        sub: session.user.email ?? "",
      }
    : null;

  const login = () => {
    signIn("google");
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
