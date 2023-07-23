import { Checkbox } from "@mui/material";
import React from "react";

const CheckboxAndLabel = () => {
    return (
        <div className="checkboxAndLabel__Wrapper">
            <div className="top">
                <Checkbox />
                <p>Send email invites</p>
            </div>
            <span>
                Enabling this will send emails of invitation to students and
                faculties informing them about their presence in online class.
                If a faculty or a student is not a user of Academiq will recieve
                invitation with login creadentials.
            </span>
        </div>
    );
};

export default CheckboxAndLabel;
