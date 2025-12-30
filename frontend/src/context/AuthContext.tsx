import { createContext, useState, useEffect, type ReactNode } from "react";

type AuthContextType = {
    userLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUserLoggedIn(true);
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setUserLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUserLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ userLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};