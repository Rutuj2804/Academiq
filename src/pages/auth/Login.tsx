import React, { useState } from "react";
import {Logo} from "../../common/logo";
import { Input } from "../../common/forms/input";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    const { username, password } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData);
        setFormData(v=>({ username: "", password: "" }))
    }

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
                            <h3>Welcome Back</h3>
                            <p>Login to checkout your latest feeds</p>
                        </div>
                        <Input
                            type="email"
                            value={username}
                            onChange={handleChange}
                            name="username"
                            placeholder={"Email"}
                            required
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={handleChange}
                            name="password"
                            placeholder={"Password"}
                            required
                        />
                        <div className="login__Dialouge">
                            <p>Forget Password?</p>
                        </div>
                        <div className="input__Buttons">
                            <Button type="submit">Login</Button>
                        </div>
                    </form>
                </div>
                <div className="login__SecondaryDialouge" onClick={()=>navigate("/register")}>
                    <p>Don't have a account? <span>Register Now</span></p>
                </div>
            </div>
            <div className="login__Images"></div>
        </div>
    );
};

export default Login;
