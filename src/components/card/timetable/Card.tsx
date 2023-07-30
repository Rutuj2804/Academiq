import { MoreVertRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa"
import React from "react";

interface TimetableCardCP {
    isActive?: boolean;
}

const TimetableCard = ({ isActive }: TimetableCardCP) => {
    return (
        <div className="timetableCard__Wrapper">
            <div className="timetableCard__Header">
                <div className="title">Timetable for class LY Core 1</div>
                <div className="options">
                    <IconButton size="small">
                        <MoreVertRounded />
                    </IconButton>
                </div>
            </div>
            <div className="timetableCard__Description">
                <p>
                    By explicitly specifying the type of acceptedFiles as File,
                    you should no longer see the TypeScript error.
                </p>
            </div>
            <div className="timetableCard__Bottom">
                <p>Assigned to 1 class</p>
                <div className="checkbox">
                    {isActive ? <FaRegCheckCircle /> : <FaRegCircle />}
                </div>
            </div>
        </div>
    );
};

export default TimetableCard;
