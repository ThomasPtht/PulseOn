import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();


    if (isLoading) {
        return <div>Loading...</div>; // Ou votre composant Loader
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth