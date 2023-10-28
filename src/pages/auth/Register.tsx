import React, { useEffect, useState } from "react";
import { Logo } from "../../common/logo";
import { Input } from "../../common/forms/input";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth/actions";
import { RootState } from "../../store";
import { Dropdown } from "../../common/forms/dropdown";
import { getCountries, getStates } from "../../store/location/actions";

enum dropdownTypes {
    "STATE" = "STATE",
    "COUNTRY" = "COUNTRY",
}

const Register = () => {

    const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated)
    const location = useSelector((state: RootState) => state.location);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        midname: "",
        dob: "",
        stateID: location.state[0],
        countryID: location.country[0],
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const dispatch = useDispatch<any>()

    const {
        email,
        password,
        firstname,
        midname,
        lastname,
        dob,
        stateID,
        countryID,
    } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(registerUser({
            firstname: firstname,
            lastname: lastname,
            midname: midname,
            dob: dob,
            stateID: location.state[0].value,
            countryID: location.country[0].value,
            email: email,
            password: password,
        }))
        setFormData((v) => ({
            firstname: "",
            lastname: "",
            midname: "",
            dob: "",
            stateID: location.state[0],
            countryID: location.country[0],
            email: "",
            password: "",
        }));
    };

    const handleDropdowns = (t: dropdownTypes, v: any) => {
        if (t === dropdownTypes.COUNTRY) {
            setFormData({ ...formData, countryID: v });
        } else if (t === dropdownTypes.STATE) {
            setFormData({ ...formData, stateID: v });
        }
    };

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(() => {
        if(isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        setFormData(f=>({ ...f, countryID: location.country[0] }));
    }, [location.country]);

    useEffect(() => {
        setFormData(f=>({ ...f, stateID: location.state[0] }));
    }, [location.state]);

    useEffect(() => {
        if (countryID) dispatch(getStates(countryID.value));
    }, [countryID, dispatch]);

    return (
        <div className="register__Wrapper">
            <div className="register__Form">
                <div className="register__SpaceBox">
                    <div className="register__Header">
                        <Logo />
                        <p>Learn More</p>
                    </div>
                    <form className="register" onSubmit={handleSubmit}>
                        <div className="register__Title">
                            <h3>Welcome On Board</h3>
                            <p>Register to start your journey</p>
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
                                <Dropdown
                                    optionsArr={location.state}
                                    selected={stateID}
                                    setSelected={(v: number | string) =>
                                        handleDropdowns(dropdownTypes.STATE, v)
                                    }
                                    className="mb-3"
                                    placeholder="State"
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
                                    value={email}
                                    onChange={handleChange}
                                    name="email"
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
                                <Dropdown
                                    optionsArr={location.country}
                                    selected={countryID}
                                    setSelected={(v: number | string) =>
                                        handleDropdowns(dropdownTypes.COUNTRY, v)
                                    }
                                    className="mb-3"
                                    placeholder="Country"
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
