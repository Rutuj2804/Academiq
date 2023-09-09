import React, { useState, useEffect } from "react";
import {Logo} from "../../common/logo";
import { Input } from "../../common/forms/input";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth/actions";
import { RootState } from "../../store";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
    });

    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)

    const navigate = useNavigate()

    const dispatch = useDispatch<any>()

    const { password } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // await dispatch(loginUser({ email: password }))
        setFormData(v=>({ password: "" }))
    }

    useEffect(() => {
        if(isAuthenticated) navigate("/")
    }, [isAuthenticated]);

    return (
        <div className="login__Wrapper">
            <div className="login__Form">
                <div className="login__SpaceBox">
                    <div className="login__Header">
                        <Logo />
                        <p>Learn More</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="login__Title">
                            <h3>Reset Password</h3>
                            <p>Enter new password to proceed</p>
                        </div>
                        <Input
                            type="password"
                            value={password}
                            onChange={handleChange}
                            name="password"
                            placeholder={"Password"}
                            required
                        />
                        <div className="login__Dialouge" onClick={()=>navigate("/forgot-password")}>
                            <p>Enter your new password</p>
                        </div>
                        <div className="input__Buttons">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
                <div className="login__SecondaryDialouge" onClick={()=>navigate("/login")}>
                    <p>Back to <span>Login</span></p>
                </div>
            </div>
            <div className="login__Images"></div>
        </div>
    );
};

export default ResetPassword;
