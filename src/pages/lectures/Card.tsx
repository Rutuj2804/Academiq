import { NorthWestRounded, PlayArrowRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
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
            <div className="footer">
                <Button startIcon={<NorthWestRounded />}>Visit Class</Button>
                <Button startIcon={<PlayArrowRounded />}>Start Lecture</Button>
            </div>
        </div>
    );
};

export default Card;
