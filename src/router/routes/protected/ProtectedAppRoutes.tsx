import { useAuth } from "@/contexts/auth/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedAppRouteProps {
    redirectTo: string;
    children: React.ReactNode;
}

const ProtectedAppRoute: React.FC<ProtectedAppRouteProps> = ({ redirectTo, children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default ProtectedAppRoute;