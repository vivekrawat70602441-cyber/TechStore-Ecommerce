"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
}

interface AuthContextType {
    user: User | null;
    token: boolean;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(true);

    // LOGIN
    const login = (newUser: User) => {
        setToken(true);
        setUser(newUser);
    };

    // LOGOUT
    const logout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
            method: "POST",
            credentials: "include",
        });
        setToken(false);
        setUser(null);
    };

     // Restore AUTHENTICATION
   useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
          credentials: "include",
      })
          .then(async (response) => {
              if (!response.ok) {
                  return;
              }

              const savedUser = await response.json();
              setToken(true);
              setUser(savedUser);
          })
          .catch((error) => {
              console.error("Failed to restore authentication:", error);
          })
          .finally(() => {
              setLoading(false);
          });
   }, []);

    // AUTH STATUS
    const isAuthenticated = Boolean(token && user);
    const isAdmin = user?.role === "admin";

    const value: AuthContextType = {
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        logout,
    }
    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

 // USE AUTH HOOK
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}