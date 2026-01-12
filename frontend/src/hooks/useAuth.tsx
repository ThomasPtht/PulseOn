import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { GET_CURRENT_USER, LOGOUT } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client/react";
import { LOGIN } from "@/graphql/mutations";

type User = {
    id: string;
    username: string;
    email: string;
};

type GetCurrentUserData = {
    getCurrentUser: User;
};

// Hook pour le contexte
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Hooks Apollo avec typage
export const useCurrentUser = () => {
    return useQuery<GetCurrentUserData>(GET_CURRENT_USER, {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
    });
};

export const useLogin = () => {
    return useMutation(LOGIN, {
        update: (cache) => {
            // Vider tout le cache pour éviter les données d'autres utilisateurs
            cache.reset();
        },
        refetchQueries: [{ query: GET_CURRENT_USER }],
    });
};

export const useLogout = () => {
    return useMutation(LOGOUT, {
        update: (cache) => {
            // Vider complètement le cache lors du logout
            cache.reset();
        },
    });
};

export default useAuth;