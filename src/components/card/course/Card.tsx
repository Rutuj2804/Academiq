import { MoreVert } from "@mui/icons-material";
import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa"
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../../utils/hooks";

interface CourseCardCP {
    isActive?: boolean,
    name: string;
    description: string;
    id: string;
}

const CourseCard = ({ isActive, name, description, id }: CourseCardCP) => {

    const navigate = useNavigate()

    const { encrypt } = useCrypto()

    return (
        <div className="courseCard__Wrapper" onClick={()=>navigate(`/course/${encrypt(id)}`)}>
            <div className="courseCard__Header">
                <div className="title">
                    <h5>{name}</h5>
                </div>
                <div className="options">
                    <IconButton size="small">
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="courseCard__Description">
                <p>
                    {description}
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
