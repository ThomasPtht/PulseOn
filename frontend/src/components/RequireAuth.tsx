import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();


    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    background: "transparent",
                    color: "orange",  
                }}
            >
                <LoadingIndicator
                    type="dot-circle"
                    size="xl"
                    label="Loading..."

                />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth