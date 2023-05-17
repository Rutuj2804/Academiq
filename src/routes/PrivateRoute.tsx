import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    children,
}) => {

    const authenticated = true
    
    if (!authenticated) {
        return <Navigate to="/home" replace />
    }

    return children;
};

export default PrivateRoute;
