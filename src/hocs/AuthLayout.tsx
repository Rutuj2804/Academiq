import React from "react";
import Messages from "../modules/messages";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Loader from "../components/loader";

interface CProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: CProps) => {
    const isLoading = useSelector(
        (state: RootState) => state.loading.isLoading
    );

    return (
        <div>
            <Messages />
            {children}

            {isLoading > 0 ? <Loader /> : null}
        </div>
    );
};

export default AuthLayout;
