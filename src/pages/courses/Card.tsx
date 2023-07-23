import { MoreVert } from "@mui/icons-material";
import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa"
import React from "react";

interface CourseCardCP {
    isActive?: boolean,
}

const CourseCard = ({ isActive }: CourseCardCP) => {
    return (
        <div className="courseCard__Wrapper">
            <div className="courseCard__Header">
                <div className="title">
                    <h5>Web development and JavaScript</h5>
                </div>
                <div className="options">
                    <IconButton size="small">
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="courseCard__Description">
                <p>
                    By explicitly specifying the type of acceptedFiles as File,
                    you should no longer see the TypeScript error.
                </p>
            </div>
            <div className="courseCard__Avatar">
                <AvatarGroup max={4}>
                    <Avatar sx={{ height: 30, width: 30 }} alt="Remy Sharp" />
                    <Avatar sx={{ height: 30, width: 30 }} alt="Travis Howard" />
                    <Avatar sx={{ height: 30, width: 30 }} alt="Cindy Baker" />
                    <Avatar sx={{ height: 30, width: 30 }} alt="Agnes Walker" />
                    <Avatar sx={{ height: 30, width: 30 }} alt="Trevor Henderson" />
                </AvatarGroup>
                <div className="checkbox">
                    {
                        isActive ? <FaRegCheckCircle/> : <FaRegCircle />
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
