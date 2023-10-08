import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

interface StudentCProps {
    name: string
}

const StudentCard = ({ name }: StudentCProps) => {
    return (
        <div className="studentCard__Wrapper">
            <div className="left">
                <Avatar />
                <div className="user-details">
                    <h6>{name}</h6>
                    <p>Pune, Maharashtra</p>
                </div>
            </div>
            <div className="right">
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
    );
};

export default StudentCard;
