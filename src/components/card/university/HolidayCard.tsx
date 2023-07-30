import { BsInfoCircle } from "react-icons/bs";
import { Avatar, Tooltip } from "@mui/material";
import { MdOutlineFestival } from "react-icons/md";
import moment from "moment";

interface HolidayCardCP {
    startDate?: string;
    name?: string;
    description?: string;
    selected?: boolean
}

const HolidayCard = ({
    startDate = "14 Jan",
    name = "Makar Sankranti",
    description = "",
    selected=false
}: HolidayCardCP) => {
    return (
        <div className={`holidayCard__Wrapper ${selected ? "active": null}`}>
            <div className="left">
                <Avatar variant="rounded" sx={{ bgcolor: "#007fff" }}>
                    <MdOutlineFestival />
                </Avatar>
                <div className="details">
                    <h6>{name}</h6>
                    <p>{moment(startDate).format("MMM Do")}</p>
                </div>
            </div>
            <Tooltip title={description}>
                <div className="right">
                    <BsInfoCircle />
                </div>
            </Tooltip>
        </div>
    );
};

export default HolidayCard;
