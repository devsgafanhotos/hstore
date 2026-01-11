import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ redirectTo = "/home" }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
}
