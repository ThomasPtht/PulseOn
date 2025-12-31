import { createContext, type ReactNode } from "react";
import { useCurrentUser, useLogout } from "../hooks/useAuth";

type User = {
    id: string;
    username: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data, loading, error } = useCurrentUser();
    const [logoutMutation] = useLogout();

    const logout = async () => {
        try {
            await logoutMutation();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const user = (!error && data?.getCurrentUser) ? data.getCurrentUser : null;

    const value: AuthContextType = {
        user,
        isLoading: loading,
        isAuthenticated: !!user,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};