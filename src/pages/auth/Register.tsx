import React, { useState } from "react";
import { Logo } from "../../common/logo";
import { layoutTheme } from "../../store/settings/types";
import { Input } from "../../common/forms/input";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        midname: "",
        dob: "",
        state: "",
        country: "",
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const {
        username,
        password,
        firstname,
        midname,
        lastname,
        dob,
        state,
        country,
    } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setFormData((v) => ({
            firstname: "",
            lastname: "",
            midname: "",
            dob: "",
            state: "",
            country: "",
            username: "",
            password: "",
        }));
    };
    return (
        <div className="register__Wrapper">
            <div className="register__Form">
                <div className="register__SpaceBox">
                    <div className="register__Header">
                        <Logo mode={layoutTheme[0]} />
                        <p>Learn More</p>
                    </div>
                    <form className="register" onSubmit={handleSubmit}>
                        <div className="register__Title">
                            <h3>Welcome Back</h3>
                            <p>Register to checkout your latest feeds</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <Input
                                    type="text"
                                    value={firstname}
                                    onChange={handleChange}
                                    name="firstname"
                                    placeholder={"First Name"}
                                    required
                                />
                                <Input
                                    type="text"
                                    value={lastname}
                                    onChange={handleChange}
                                    name="lastname"
                                    placeholder={"Last Name"}
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
                                <Input
                                    type="text"
                                    value={state}
                                    onChange={handleChange}
                                    name="state"
                                    placeholder={"State"}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <Input
                                    type="text"
                                    value={midname}
                                    onChange={handleChange}
                                    name="midname"
                                    placeholder={"Middle Name"}
                                />
                                <Input
                                    type="email"
                                    value={username}
                                    onChange={handleChange}
                                    name="username"
                                    placeholder={"Email"}
                                    required
                                />
                                <Input
                                    type="date"
                                    value={dob}
                                    onChange={handleChange}
                                    name="dob"
                                    placeholder={"Date of birth"}
                                />
                                <Input
                                    type="text"
                                    value={country}
                                    onChange={handleChange}
                                    name="country"
                                    placeholder={"Country"}
                                />
                            </div>
                        </div>
                        <div className="register__Dialouge">
                            <p>Terms and Conditions</p>
                        </div>
                        <div className="input__Buttons">
                            <Button type="submit">Register</Button>
                        </div>
                    </form>
                </div>
                <div
                    className="register__SecondaryDialouge"
                    onClick={() => navigate("/login")}
                >
                    <p>
                        Already have a account? <span>Login Now</span>
                    </p>
                </div>
            </div>
            <div className="login__Images"></div>
        </div>
    );
};

export default Register;
