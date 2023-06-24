import { NorthWestRounded, PlayArrowRounded } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";

interface CardCProps {
    title: string
    timestamp: string
}

const Card = ({ title, timestamp }: CardCProps) => {
    return (
        <div className="card__Wrapper">
            <div className="header">
                <h6>{title}</h6>
                <p>{timestamp}</p>
            </div>
            <div className="profile">
                <Avatar />
                <div className="user">
                    <h4>Rutuj Bokade</h4>
                    <p>Faculty for Cloud Computing</p>
                </div>
            </div>
            <div className="footer">
                <IconButton size="small"><NorthWestRounded /></IconButton>
                <IconButton size="small"><PlayArrowRounded /></IconButton>
            </div>
        </div>
    );
};

export default Card;
