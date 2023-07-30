import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/slice";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../common/logo";

const Logout = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate("/login");
    }, []);
    return (
        <div className="logout__Wrapper">
            <Logo />
        </div>
    );
};

export default Logout;
