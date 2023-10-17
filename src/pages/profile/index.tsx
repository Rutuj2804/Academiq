import React, { useEffect } from "react";
import { Avatar } from "@mui/material"
import { Input } from "../../common/forms/input";

const Profile = () => {

    useEffect(() => {}, [])

    return (
        <div className="section__Wrapper">
            <main className="profile__Wrapper">
                <div className="paper">
                    <div className="profile__Container">
                        <div className="profile__UserFields">
                            <Avatar sx={{ height: 150, width: 150 }} />
                            <div className="profile__Subtext">
                                <h5>Rutuj Jeevan Bokade</h5>
                                <p>Maharashtra, India</p>
                            </div>
                        </div>

                        <div className="profile__OtherDetails">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={"bokaderutuj36@gmail.com"}
                                        disabled
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <Input
                                        value={"MITU19BTCS0063"}
                                        disabled
                                        placeholder="Enrolment Number"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
