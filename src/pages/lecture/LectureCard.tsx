import { MoreVertRounded } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { BsChatLeft, BsCheckLg, BsFillChatLeftFill, BsHeart, BsHeartFill, BsXLg } from "react-icons/bs";

interface LectureCardCI {
    liked?: boolean,
    comment?: boolean,
}

const LectureCard = ({ liked, comment }: LectureCardCI) => {

    const [isLiked, setIsLiked] = useState(liked)
    const [isCommented, setIsCommented] = useState(comment)

    return (
        <div className="lectureCard__Wrapper">
            <div className="lectureCard__Header">
                <div className="left">
                    <Avatar />
                    <div className="user">
                        <h6>Rutuj Jeevan Bokade</h6>
                        <p>Monday, 26 May, 2023</p>
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
                    <h4>Jun</h4>
                    <h1>8</h1>
                </div>
                <div className="line"></div>
                <div className="details">
                    <div className="top">
                        9:00 AM | Machine Learning 
                    </div>
                    <div className="bottom">
                        <h4>Cloud and its types</h4>
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
