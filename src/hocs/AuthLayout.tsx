import React from "react";
import Messages from "../modules/messages";

interface CProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: CProps) => {
    return (
        <div>
            <Messages />
            {children}
        </div>
    );
};

export default AuthLayout;
