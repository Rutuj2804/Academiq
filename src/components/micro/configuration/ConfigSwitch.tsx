import { Switch } from "@mui/material";
import React from "react";

interface CProps {
    name: string,
    description: string,
    value?: boolean
}

const ConfigSwitch = ({ name, description, value }:CProps) => {
    return (
        <div className="configSwitch__Wrapper">
            <div className="left">
                <h6>{name}</h6>
                <p>
                    {description}
                </p>
            </div>
            <div className="right">
                <Switch defaultChecked={value} />
            </div>
        </div>
    );
};

export default ConfigSwitch;
