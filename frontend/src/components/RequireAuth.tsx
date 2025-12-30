import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";


const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { userLoggedIn } = useAuth(
    );
    const location = useLocation();

    if (!userLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return (
        children
    )
}

export default RequireAuth
