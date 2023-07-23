import { BsInfoCircle } from "react-icons/bs";
import { Avatar, Tooltip } from "@mui/material"
import { MdOutlineFestival } from "react-icons/md";

interface HolidayCardCP {
    startDate?: string;
    name?: string;
}

const HolidayCard = ({ startDate="14 Jan", name="Makar Sankranti"} : HolidayCardCP) => {
    return (
        <div className="holidayCard__Wrapper">
            <div className="left">
                <Avatar variant="rounded" sx={{ bgcolor: "#007fff" }} >
                    <MdOutlineFestival />
                </Avatar>
                <div className="details">
                    <h6>
                        {name}
                    </h6>
                    <p>{startDate}</p>
                </div>
            </div>
                <Tooltip title="This is something very special in hindu culture where they celebrate new harvest in different parts of Bharat">
            <div className="right">
                    <BsInfoCircle />
            </div>
                </Tooltip>
        </div>
    );
};

export default HolidayCard;
