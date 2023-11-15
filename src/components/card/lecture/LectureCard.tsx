import { MoreVertRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { BsChatLeft, BsCheckLg, BsFillChatLeftFill, BsHeart, BsHeartFill, BsXLg } from "react-icons/bs";

interface LectureCardCI {
    liked?: boolean,
    comment?: boolean,
    createdBy: string,
    createdAt: string,
    scheduledDate: string,
    course: string,
    title: string
}

const LectureCard = ({ liked, comment, createdBy, createdAt, scheduledDate, course, title }: LectureCardCI) => {

    const [isLiked, setIsLiked] = useState(liked)
    const [isCommented, setIsCommented] = useState(comment)

    return (
        <div className="lectureCard__Wrapper">
            <div className="lectureCard__Header">
                <div className="left">
                    <Avatar />
                    <div className="user">
                        <h6>{createdBy}</h6>
                        <p>{createdAt}</p>
                    </div>
                </div>
                <div className="right">
                    <IconButton>
                        <MoreVertRounded />
                    </IconButton>
                </div>
            </div>
            <div className="lectureCard__Main">
                <div className="date">
                    <h4>{moment(scheduledDate).format("MMM")}</h4>
                    <h1>{moment(scheduledDate).format("D")}</h1>
                </div>
                <div className="line"></div>
                <div className="details">
                    <div className="top">
                        {moment(scheduledDate).format("HH:mm a")} | {course}
                    </div>
                    <div className="bottom">
                        <h4>{title}</h4>
                    </div>
                </div>
            </div>
            <div className="lectureCard__Footer">
                <div className="left">
                    <div className="like" onClick={()=>setIsLiked(v=>!v)}>{isLiked ? <BsHeartFill /> : <BsHeart />}</div>
                    <div className="comment" onClick={()=>setIsCommented(v=>!v)}>{isCommented ? <BsFillChatLeftFill /> : <BsChatLeft />}</div>
                </div>
                <div className="right">
                    <IconButton className="accept">
                        <BsCheckLg />
                    </IconButton>
                    <IconButton className="reject">
                        <BsXLg />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default LectureCard;
