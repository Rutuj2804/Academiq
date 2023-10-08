import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

interface FacultyCProps {
    name: string
}

const FacultyCard = ({ name }: FacultyCProps) => {
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

export default FacultyCard;
