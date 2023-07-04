import { IconButton } from "@mui/material";
import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface HolidayCardCP {
    startDate: string;
    isRange: boolean;
    endDate: string;
    name: string;
    onlyStudents: boolean;
}

const HolidayCard = ({ startDate, endDate, isRange, name, onlyStudents} : HolidayCardCP) => {
    return (
        <div className="holidayCard__Wrapper">
            <div className="left">
                <h6>
                    {name} <span>{onlyStudents ? "Only For Students" : null}</span>
                </h6>
                <p>{startDate} {isRange ? ` to  ${endDate}` : null}</p>
            </div>
            <IconButton size="small">
                <RiCloseCircleFill />
            </IconButton>
        </div>
    );
};

export default HolidayCard;
