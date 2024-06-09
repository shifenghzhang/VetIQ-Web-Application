"use client"
import { createContext, useState, useContext, ReactNode } from "react";

interface User {    
    consulting_vet: boolean;
    email: string | null;
    password: string;
    site_id: number;
    user_id: number;
    user_name: string | null;
}

interface AuthContextProps {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value = {{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}